import { Router } from 'express';
import { getProfile, updateProfile, changePassword } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Apply authentication to all user routes
router.use(authenticateToken);

// GET /api/v1/users/profile
router.get('/profile', getProfile);

// PUT /api/v1/users/profile
router.put('/profile', updateProfile);

// PUT /api/v1/users/change-password
router.put('/change-password', changePassword);

export default router;