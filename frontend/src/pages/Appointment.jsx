import { useState } from 'react'
import { Calendar, Clock, User, FileText, CheckCircle, Phone, Mail, MapPin } from 'lucide-react'

const Appointment = () => {
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const doctors = [
    { id: '1', name: 'Dr. Sarah Johnson', specialization: 'Cardiologist' },
    { id: '2', name: 'Dr. Michael Chen', specialization: 'Neurologist' },
    { id: '3', name: 'Dr. Emily Rodriguez', specialization: 'Pediatrician' }
  ]

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setFormData({ doctorId: '', date: '', time: '', reason: '' })
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#EDF6F9] to-[#83C5BE]/20 px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 md:p-12 text-center border-t-4 border-[#006D77]">
          <div className="bg-[#83C5BE]/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-[#006D77]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#006D77] mb-4">
            Appointment Confirmed!
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your appointment has been successfully booked. We'll send you a confirmation email with all the details shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-[#006D77] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#005761] transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EDF6F9] to-white py-8 md:py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#006D77] mb-3 md:mb-4">
            Book Your Appointment
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Schedule a consultation with our experienced healthcare professionals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Info Cards */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {/* Why Choose Us Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#83C5BE]">
              <h3 className="text-lg md:text-xl font-bold text-[#006D77] mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#006D77] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-700">Expert Medical Staff</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#006D77] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-700">24/7 Emergency Care</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#006D77] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-700">Modern Facilities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-[#006D77] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base text-gray-700">Flexible Scheduling</span>
                </li>
              </ul>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-[#006D77] to-[#005761] rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg md:text-xl font-bold mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="text-sm md:text-base">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="text-sm md:text-base">info@medcare.com</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base">123 Medical Center Dr, City, State 12345</span>
                </div>
              </div>
            </div>

            {/* Hours Card - Hidden on mobile */}
            <div className="hidden md:block bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#83C5BE]">
              <h3 className="text-lg md:text-xl font-bold text-[#006D77] mb-4">Office Hours</h3>
              <div className="space-y-2 text-sm md:text-base">
                <div className="flex justify-between">
                  <span className="text-gray-700">Monday - Friday</span>
                  <span className="font-semibold text-[#006D77]">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Saturday</span>
                  <span className="font-semibold text-[#006D77]">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Sunday</span>
                  <span className="font-semibold text-[#006D77]">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 lg:p-10 border-t-4 border-[#006D77]">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Doctor Selection */}
                <div>
                  <label className="block text-sm font-semibold text-[#006D77] mb-2">
                    <User className="inline w-4 h-4 mr-2" />
                    Select Doctor *
                  </label>
                  <select
                    value={formData.doctorId}
                    onChange={(e) => setFormData(prev => ({ ...prev, doctorId: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#006D77] focus:ring-2 focus:ring-[#83C5BE]/30 transition-all duration-200 text-sm md:text-base"
                    required
                  >
                    <option value="">Choose a doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date and Time Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#006D77] mb-2">
                      <Calendar className="inline w-4 h-4 mr-2" />
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#006D77] focus:ring-2 focus:ring-[#83C5BE]/30 transition-all duration-200 text-sm md:text-base"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#006D77] mb-2">
                      <Clock className="inline w-4 h-4 mr-2" />
                      Preferred Time *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#006D77] focus:ring-2 focus:ring-[#83C5BE]/30 transition-all duration-200 text-sm md:text-base"
                      required
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-sm font-semibold text-[#006D77] mb-2">
                    <FileText className="inline w-4 h-4 mr-2" />
                    Reason for Visit *
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#006D77] focus:ring-2 focus:ring-[#83C5BE]/30 transition-all duration-200 resize-none text-sm md:text-base"
                    rows={5}
                    placeholder="Please describe your symptoms or reason for appointment..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#006D77] to-[#005761] text-white py-3 md:py-4 px-6 rounded-lg font-semibold text-base md:text-lg hover:from-[#005761] hover:to-[#004a52] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Booking...
                    </div>
                  ) : (
                    'Book Appointment'
                  )}
                </button>

                <p className="text-xs md:text-sm text-gray-500 text-center">
                  By booking an appointment, you agree to our terms of service and privacy policy
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment