import { Router } from 'express';
import { login, signup, logout, verifyEmail, refreshToken } from '../controllers/authController';
import { validateLogin, validateSignup, handleValidationErrors } from '../middleware/validationMiddleware';

const router = Router();

// POST /api/v1/auth/login
router.post('/login', validateLogin, handleValidationErrors, login);

// POST /api/v1/auth/signup
router.post('/signup', validateSignup, handleValidationErrors, signup);

// POST /api/v1/auth/logout
router.post('/logout', logout);

// GET /api/v1/auth/verify/:token
router.get('/verify/:token', verifyEmail);

// POST /api/v1/auth/refresh
router.post('/refresh', refreshToken);

export default router;