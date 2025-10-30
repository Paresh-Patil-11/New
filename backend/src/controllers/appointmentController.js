import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// Patient creates a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;

    // Check if the appointment slot is already booked
    const existingAppointment = await Appointment.findOne({
      where: { doctorId, date, time, status: { [Op.ne]: 'cancelled' } }
    });

    if (existingAppointment) {
      return res.status(400).json({ success: false, message: 'This slot is already booked or pending.' });
    }

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      date,
      time,
      reason,
      status: 'pending' 
    });

    res.status(201).json({ success: true, data: appointment, message: 'Appointment created and pending approval.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin gets all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: Patient, attributes: ['id', 'age', 'gender'] },
        { model: Doctor, attributes: ['id', 'specialization'] }
      ]
    });
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Doctor/Admin updates appointment status (approved, rejected, completed)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status, notes, prescription } = req.body;

    const [rowsUpdated, [updatedAppointment]] = await Appointment.update(
      { status, notes, prescription },
      { 
        where: { id: req.params.id }, 
        returning: true 
      }
    );

    if (rowsUpdated === 0) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.json({ success: true, data: updatedAppointment, message: `Appointment status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get appointments for a specific patient
export const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { patientId: req.params.id },
      include: [{ model: Doctor, attributes: ['id', 'specialization', 'consultationFee'] }]
    });
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get appointments for a specific doctor
export const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { doctorId: req.params.id },
      include: [{ model: Patient, attributes: ['id', 'age', 'gender'] }]
    });
    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};