import { createContext, useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client";
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const SocketContext = createContext()

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated && user) {
      const newSocket = io('http://localhost:5000', {
        auth: {
          token: localStorage.getItem('token'),
          userId: user.id,
          role: user.role
        }
      })

      newSocket.on('connect', () => {
        console.log('Connected to server')
        setConnected(true)
        toast.success('Real-time connection established')
      })

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server')
        setConnected(false)
        toast.error('Real-time connection lost')
      })

      // Listen for appointment updates
      newSocket.on('appointmentUpdate', (data) => {
        toast.success(`Appointment ${data.status}: ${data.message}`)
      })

      // Listen for new appointments (for doctors)
      newSocket.on('newAppointment', (data) => {
        if (user.role === 'doctor') {
          toast.success('New appointment request received')
        }
      })

      // Listen for appointment status changes (for patients)
      newSocket.on('appointmentStatusChange', (data) => {
        if (user.role === 'patient') {
          toast.success(`Your appointment has been ${data.status}`)
        }
      })

      setSocket(newSocket)

      return () => {
        newSocket.close()
        setSocket(null)
        setConnected(false)
      }
    }
  }, [isAuthenticated, user])

  const emitAppointmentUpdate = (appointmentData) => {
    if (socket && connected) {
      socket.emit('appointmentUpdate', appointmentData)
    }
  }

  const emitAppointmentStatusChange = (appointmentData) => {
    if (socket && connected) {
      socket.emit('appointmentStatusChange', appointmentData)
    }
  }

  const value = {
    socket,
    connected,
    emitAppointmentUpdate,
    emitAppointmentStatusChange,
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}