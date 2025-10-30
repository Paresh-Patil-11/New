import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { 
    getDoctors, 
    getDoctorById, 
    updateDoctorProfile, 
    deleteDoctor, 
    updateAvailability,
    getAllAvailableSlots 
} from '../controllers/doctorController.js';

const router = express.Router();

// Public routes
router.get('/', getDoctors);
router.get('/:id', getDoctorById);

// Private/Protected routes
router.use(protect);
router.put('/:id/profile', authorize('doctor', 'admin'), updateDoctorProfile);
router.put('/:id/availability', authorize('doctor'), updateAvailability);
router.get('/:id/slots', getAllAvailableSlots); // Doctor or Patient can view slots
router.delete('/:id', authorize('admin'), deleteDoctor);

export default router;