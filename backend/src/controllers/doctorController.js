import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import { sequelize } from '../config/database.js';

// Get all doctors, including user details
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    res.json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
      where: { id: req.params.id },
      include: [{ model: User, attributes: ['id', 'name', 'email', 'phone'] }]
    });

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update doctor's specialization, fee, etc.
export const updateDoctorProfile = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, phone, ...doctorFields } = req.body;
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    
    // 1. Update User info (Name, Phone)
    await User.update({ name, phone }, { where: { id: doctor.userId }, transaction });
    
    // 2. Update Doctor info
    await doctor.update(doctorFields, { transaction });
    
    await transaction.commit();
    res.json({ success: true, message: 'Doctor profile updated' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ success: false, message: error.message });
  }
};

// Doctor updates their availability (Availability field is JSONB)
export const updateAvailability = async (req, res) => {
    try {
        const { availability } = req.body;
        
        const [rowsUpdated, [updatedDoctor]] = await Doctor.update(
            { availability },
            { 
                where: { id: req.params.id }, 
                returning: true 
            }
        );

        if (rowsUpdated === 0) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
        
        res.json({ 
            success: true, 
            data: updatedDoctor, 
            message: 'Availability updated successfully' 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get doctor's availability slots (for scheduling)
export const getAllAvailableSlots = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id, {
        attributes: ['availability']
    });

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    
    // Availability is a JSONB field, sent directly
    res.json({ success: true, data: doctor.availability });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin deletes a doctor (CASCADE delete will handle associated user)
export const deleteDoctor = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    
    // Deleting the associated User record will trigger CASCADE delete for the Doctor record
    const deleted = await User.destroy({ 
        where: { id: doctor.userId }, 
        transaction 
    });

    if (deleted === 0) {
        await transaction.rollback();
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    await transaction.commit();
    res.json({ success: true, message: 'Doctor and associated user deleted successfully' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ success: false, message: error.message });
  }
};