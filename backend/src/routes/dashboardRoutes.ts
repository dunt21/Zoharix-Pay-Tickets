import { Router } from 'express';
import { getDashboardStats, getAnalytics } from '../controllers/dashboardController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireOrganizerOrAdmin } from '../middleware/roleMiddleware';

const router = Router();

// Apply authentication to all dashboard routes
router.use(authenticateToken);

// GET /api/v1/dashboard/stats
router.get('/stats', getDashboardStats);

// GET /api/v1/dashboard/analytics
router.get('/analytics', requireOrganizerOrAdmin, getAnalytics);

export default router;