import axios from 'axios'
import toast from 'react-hot-toast'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
      toast.error('Session expired. Please login again.')
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  verifyToken: () => api.get('/auth/verify'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
}

// Doctors API
export const doctorsAPI = {
  getAll: (params) => api.get('/doctors', { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  update: (id, data) => api.put(`/doctors/${id}`, data),
  updateAvailability: (id, availability) => api.put(`/doctors/${id}/availability`, { availability }),
}

// Patients API
export const patientsAPI = {
  getById: (id) => api.get(`/patients/${id}`),
  update: (id, data) => api.put(`/patients/${id}`, data),
  getMedicalHistory: (id) => api.get(`/patients/${id}/history`),
}

// Appointments API
export const appointmentsAPI = {
  create: (appointmentData) => api.post('/appointments', appointmentData),
  getAll: (params) => api.get('/appointments', { params }),
  getById: (id) => api.get(`/appointments/${id}`),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  updateStatus: (id, status) => api.put(`/appointments/${id}/status`, { status }),
  getByDoctor: (doctorId, params) => api.get(`/appointments/doctor/${doctorId}`, { params }),
  getByPatient: (patientId, params) => api.get(`/appointments/patient/${patientId}`, { params }),
  cancel: (id) => api.put(`/appointments/${id}/cancel`),
}

// Services API
export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(`/services/${id}`),
}

// Feedback API
export const feedbackAPI = {
  create: (feedbackData) => api.post('/feedback', feedbackData),
  getAll: (params) => api.get('/feedback', { params }),
  getByDoctor: (doctorId) => api.get(`/feedback/doctor/${doctorId}`),
}

// Contact API
export const contactAPI = {
  send: (contactData) => api.post('/contact', contactData),
}

export default api