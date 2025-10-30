import { useState, useEffect, createContext, useContext } from 'react'
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  User,
  Mail,
  Phone,
  Filter,
  Search,
  LogOut,
  Menu,
  X,
  Loader
} from 'lucide-react'

// ===================================================================
// START: Mock Dependencies (To make the single file runnable)
// ===================================================================

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center p-8">
    <Loader className="w-8 h-8 animate-spin" style={{ color: '#006D77' }} />
    <p className="mt-2 text-sm font-medium" style={{ color: '#006D77' }}>Loading...</p>
  </div>
)

const mockUser = {
  id: 'doc-123',
  name: 'Dr. Evelyn Reed',
  email: 'evelyn.reed@clinic.com',
  specialization: 'Cardiology',
}

const AuthContext = createContext()
const useAuth = () => ({ user: mockUser, logout: () => console.log('Logout executed') })

const SocketContext = createContext()
const useSocket = () => ({ connected: true })

const mockAppointments = [
  { id: 'a1', patient: { name: 'John Doe', email: 'john@example.com', phone: '555-1234' }, date: '2025-11-15', time: '10:00 AM', reason: 'Routine checkup', status: 'approved' },
  { id: 'a2', patient: { name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678' }, date: '2025-11-15', time: '11:30 AM', reason: 'Follow-up on blood test', status: 'pending' },
  { id: 'a3', patient: { name: 'Bob Johnson', email: 'bob@example.com', phone: '555-9012' }, date: '2025-11-16', time: '09:00 AM', reason: 'Consultation for headache', status: 'completed' },
  { id: 'a4', patient: { name: 'Alice Brown', email: 'alice@example.com', phone: '555-3456' }, date: '2025-11-16', time: '02:00 PM', reason: 'Annual physical exam', status: 'rejected' },
  { id: 'a5', patient: { name: 'Charlie Davis', email: 'charlie@example.com', phone: '555-7890' }, date: '2025-11-17', time: '01:00 PM', reason: 'Pain in knee', status: 'approved' },
]

const appointmentsAPI = {
  getByDoctor: async (doctorId, options) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (options?.stats) {
      const todayCount = mockAppointments.filter(a => a.date === '2025-11-15').length
      const pendingCount = mockAppointments.filter(a => a.status === 'pending').length
      const completedCount = mockAppointments.filter(a => a.status === 'completed').length
      return { success: true, stats: {
        total: mockAppointments.length,
        today: todayCount,
        upcoming: mockAppointments.length - completedCount,
        completed: completedCount,
        pending: pendingCount
      }}
    }

    return { success: true, appointments: mockAppointments }
  },
  updateStatus: async (appointmentId, status) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log(`Updating appointment ${appointmentId} to status: ${status}`)
    return { success: true, appointmentId, newStatus: status }
  }
}
// ===================================================================
// END: Mock Dependencies
// ===================================================================

const PRIMARY = '#006D77'
const SECONDARY = '#83C5BE'
const NEUTRAL = '#EDF6F9'

const DoctorDashboard = () => {
  const { user, logout } = useAuth()
  const { connected } = useSocket()
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    upcoming: 0,
    completed: 0,
    pending: 0
  })
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)

  useEffect(() => {
    const init = async () => {
      await fetchAppointments()
      await fetchStats()
      setLoading(false)
    }
    init()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await appointmentsAPI.getByDoctor(user.id)
      if (response.success) {
        setAppointments(response.appointments)
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await appointmentsAPI.getByDoctor(user.id, { stats: true })
      if (response.success) {
        setStats(response.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const response = await appointmentsAPI.updateStatus(appointmentId, status)
      if (response.success) {
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId 
              ? { ...apt, status }
              : apt
          )
        )
        
        fetchStats()
        
        if (showAppointmentModal) {
          setShowAppointmentModal(false)
          setSelectedAppointment(null)
        }
      }
    } catch (error) {
      console.error('Error updating appointment:', error)
    }
  }

  const filteredAppointments = appointments.filter(appointment => {
    const matchesFilter = filter === 'all' || appointment.status === filter
    const matchesSearch = searchTerm === '' || 
      appointment.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patient?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-700 bg-yellow-100'
      case 'approved': return 'text-green-700 bg-green-100'
      case 'rejected': return 'text-red-700 bg-red-100'
      case 'completed': return 'text-blue-700 bg-blue-100'
      case 'cancelled': return 'text-gray-700 bg-gray-100'
      default: return 'text-gray-700 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-4 w-4" />
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'rejected': return <XCircle className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: NEUTRAL }}>
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const Card = ({ children }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-6">
      {children}
    </div>
  )

  const ButtonPrimary = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg text-white transition duration-200 ${className}`}
      style={{ backgroundColor: PRIMARY }}
    >
      {children}
    </button>
  )
  
  const ButtonSecondary = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ${className}`}
      style={{ backgroundColor: SECONDARY, color: PRIMARY, border: `1px solid ${SECONDARY}` }}
    >
      {children}
    </button>
  )

  const ButtonOutline = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg border transition duration-200 ${className}`}
      style={{ borderColor: PRIMARY, color: PRIMARY }}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen" style={{ backgroundColor: NEUTRAL }}>
      <header className="bg-white shadow-md border-b" style={{ borderColor: SECONDARY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
                aria-label="Toggle Menu"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <h1 className="ml-4 text-xl font-extrabold" style={{ color: PRIMARY }}>
                Doctor Dashboard
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>{connected ? 'Connected' : 'Disconnected'}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.specialization}</p>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: PRIMARY }}>
                  <span className="text-white text-base font-medium">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={logout}
                className="p-2 rounded-lg text-gray-600 hover:bg-red-100 hover:text-red-600 transition"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:shadow-none transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:border-r ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`} style={{ borderColor: SECONDARY }}>
          <div className="flex items-center justify-between h-16 px-6 border-b lg:hidden">
            <h2 className="text-lg font-bold" style={{ color: PRIMARY }}>Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="mt-8 px-4">
            <div className="space-y-1">
              <a href="#" className="flex items-center px-4 py-3 text-sm font-semibold rounded-xl text-white transition duration-200" style={{ backgroundColor: PRIMARY }}>
                <Calendar className="mr-3 h-5 w-5" />
                Appointments
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-gray-700 hover:bg-gray-100 transition duration-200">
                <Users className="mr-3 h-5 w-5" />
                Patients
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-gray-700 hover:bg-gray-100 transition duration-200">
                <TrendingUp className="mr-3 h-5 w-5" />
                Analytics
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-gray-700 hover:bg-gray-100 transition duration-200">
                <User className="mr-3 h-5 w-5" />
                Profile
              </a>
            </div>
          </nav>
        </aside>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Appointments</p>
                  <p className="text-3xl font-extrabold text-gray-900 mt-1">{stats.total}</p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: SECONDARY }}>
                  <Calendar className="h-6 w-6" style={{ color: PRIMARY }} />
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Today</p>
                  <p className="text-3xl font-extrabold text-gray-900 mt-1">{stats.today}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending</p>
                  <p className="text-3xl font-extrabold text-gray-900 mt-1">{stats.pending}</p>
                </div>
                <div className="p-3 rounded-full bg-yellow-100">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <p className="text-3xl font-extrabold text-gray-900 mt-1">{stats.completed}</p>
                </div>
                <div className="p-3 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">Upcoming Appointments</h3>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-gray-500" />
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="form-select border border-gray-300 rounded-lg shadow-sm text-sm p-2 focus:ring-1 focus:outline-none focus:ring-opacity-50"
                      style={{ focusRingColor: PRIMARY }}
                    >
                      <option value="all">All Appointments</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input w-full pl-10 border border-gray-300 rounded-lg shadow-sm text-sm p-2 focus:ring-1 focus:outline-none focus:ring-opacity-50"
                    style={{ focusRingColor: PRIMARY }}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-base font-semibold text-gray-900">No appointments found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm || filter !== 'all' 
                        ? 'Try adjusting your search or filter criteria.' 
                        : 'No appointments scheduled yet for you.'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 hover:bg-gray-50 transition duration-150 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="flex items-center space-x-4 mb-3 md:mb-0">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: SECONDARY, color: PRIMARY }}>
                            {appointment.patient?.name?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-base font-semibold text-gray-900">
                              {appointment.patient?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {appointment.patient?.email}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-xs text-gray-500 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(appointment.date).toLocaleDateString()}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {appointment.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center space-x-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)} mr-2`}>
                            {getStatusIcon(appointment.status)}
                            <span className="ml-1">{appointment.status}</span>
                          </span>
                          
                          {appointment.status === 'pending' && (
                            <>
                              <ButtonSecondary
                                onClick={() => updateAppointmentStatus(appointment.id, 'approved')}
                                className="my-1"
                              >
                                Approve
                              </ButtonSecondary>
                              <ButtonOutline
                                onClick={() => updateAppointmentStatus(appointment.id, 'rejected')}
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white my-1"
                              >
                                Reject
                              </ButtonOutline>
                            </>
                          )}
                          
                          {appointment.status === 'approved' && (
                            <ButtonPrimary
                              onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                              className="my-1"
                            >
                              Mark Complete
                            </ButtonPrimary>
                          )}
                          
                          <ButtonOutline
                            onClick={() => {
                              setSelectedAppointment(appointment)
                              setShowAppointmentModal(true)
                            }}
                            className="my-1"
                          >
                            View Details
                          </ButtonOutline>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        </main>
      </div>

      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Appointment Details</h3>
              <button
                onClick={() => {
                  setShowAppointmentModal(false)
                  setSelectedAppointment(null)
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
                aria-label="Close Modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: NEUTRAL }}>
                <p className="text-sm font-semibold text-gray-500">Patient</p>
                <p className="text-base font-medium text-gray-900">{selectedAppointment.patient?.name}</p>
                <p className="text-sm text-gray-600 flex items-center mt-1">
                  <Mail className="h-4 w-4 mr-2" style={{ color: PRIMARY }}/>{selectedAppointment.patient?.email}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <Phone className="h-4 w-4 mr-2" style={{ color: PRIMARY }}/>{selectedAppointment.patient?.phone || 'N/A'}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-sm font-semibold text-gray-500">Date</p>
                  <p className="text-sm text-gray-900">{new Date(selectedAppointment.date).toLocaleDateString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <p className="text-sm font-semibold text-gray-500">Time</p>
                  <p className="text-sm text-gray-900">{selectedAppointment.time}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-500">Reason</p>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedAppointment.reason}</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gray-500">Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(selectedAppointment.status)}`}>
                  {getStatusIcon(selectedAppointment.status)}
                  <span className="ml-1">{selectedAppointment.status}</span>
                </span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-100">
              {selectedAppointment.status === 'pending' && (
                <>
                  <ButtonSecondary
                    onClick={() => updateAppointmentStatus(selectedAppointment.id, 'approved')}
                  >
                    Approve
                  </ButtonSecondary>
                  <ButtonOutline
                    onClick={() => updateAppointmentStatus(selectedAppointment.id, 'rejected')}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    Reject
                  </ButtonOutline>
                </>
              )}
              
              {selectedAppointment.status === 'approved' && (
                <ButtonPrimary
                  onClick={() => updateAppointmentStatus(selectedAppointment.id, 'completed')}
                >
                  Mark Complete
                </ButtonPrimary>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorDashboard