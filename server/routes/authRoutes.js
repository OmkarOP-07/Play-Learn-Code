import express from 'express';
import {
  register,
  login,
  getProfile,
  sendOTPEmail,
  verifyOTPEmail
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/send-otp', sendOTPEmail);
router.post('/verify-otp', verifyOTPEmail);
router.get('/profile', protect, getProfile);

export default router; 