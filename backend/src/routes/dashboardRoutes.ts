import { Router } from 'express';
import { getDashboardStats, getAnalytics } from '../controllers/dashboardController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireOrganizerOrAdmin } from '../middleware/roleMiddleware';

const router = Router();

// Apply authentication to all dashboard routes
router.use(authenticateToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     StatTile:
 *       type: object
 *       properties:
 *         value:
 *           type: string
 *         label:
 *           type: string
 *         trend:
 *           type: string
 *     RecentActivity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         type:
 *           type: string
 *           enum: [Booking, Service, Event, Payout]
 *         title:
 *           type: string
 *         user:
 *           type: string
 *         time:
 *           type: string
 *         status:
 *           type: string
 *         amount:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics for current user
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     proPlanActive:
 *                       type: boolean
 *                 revenue:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: string
 *                     trend:
 *                       type: string
 *                     chartData:
 *                       type: array
 *                       items:
 *                         type: number
 *                 metrics:
 *                   type: object
 *                   properties:
 *                     profileViews:
 *                       $ref: '#/components/schemas/StatTile'
 *                     ticketsSold:
 *                       $ref: '#/components/schemas/StatTile'
 *                     avgRating:
 *                       $ref: '#/components/schemas/StatTile'
 *                     newClients:
 *                       $ref: '#/components/schemas/StatTile'
 *                 recentActivity:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RecentActivity'
 *                 upcomingTasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       title:
 *                         type: string
 *                       meta:
 *                         type: string
 *                       tag:
 *                         type: string
 *                       isUrgent:
 *                         type: boolean
 *                 aiInsight:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     type:
 *                       type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/stats', getDashboardStats);

/**
 * @swagger
 * /api/v1/dashboard/analytics:
 *   get:
 *     summary: Get detailed business analytics (Organizer/Admin only)
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 overview:
 *                   type: object
 *                   properties:
 *                     netRevenue:
 *                       type: string
 *                     monthlyRevenue:
 *                       type: array
 *                       items:
 *                         type: number
 *                     topEvents:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           rank:
 *                             type: number
 *                           title:
 *                             type: string
 *                           date:
 *                             type: string
 *                           sold:
 *                             type: number
 *                           revenue:
 *                             type: string
 *                 audience:
 *                   type: object
 *                   properties:
 *                     demographics:
 *                       type: object
 *                       properties:
 *                         age:
 *                           type: object
 *                         gender:
 *                           type: object
 *                     interests:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           category:
 *                             type: string
 *                           percentage:
 *                             type: number
 *                 revenue:
 *                   type: object
 *                   properties:
 *                     goals:
 *                       type: object
 *                       properties:
 *                         current:
 *                           type: number
 *                         goal:
 *                           type: number
 *                         percentage:
 *                           type: number
 *                     sources:
 *                       type: object
 *                     nextPayout:
 *                       type: object
 *                 events:
 *                   type: object
 *                   properties:
 *                     ticketBreakdown:
 *                       type: array
 *                     funnel:
 *                       type: object
 *                     peakTimes:
 *                       type: array
 *       403:
 *         description: Access denied (Organizer/Admin only)
 */
router.get('/analytics', requireOrganizerOrAdmin, getAnalytics);

export default router;