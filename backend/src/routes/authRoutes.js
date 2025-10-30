import express from 'express';
import { register, login, verifyToken, logout } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', protect, verifyToken);
router.post('/logout', protect, logout);

export default router;