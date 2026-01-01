import { Router } from 'express';
import { createPaymentIntent, confirmPayment, getPaymentHistory } from '../controllers/paymentController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validatePayment, handleValidationErrors } from '../middleware/validationMiddleware';

const router = Router();

// Apply authentication to all payment routes
router.use(authenticateToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentIntent:
 *       type: object
 *       required:
 *         - bookingId
 *         - amount
 *       properties:
 *         bookingId:
 *           type: string
 *         amount:
 *           type: number
 *         currency:
 *           type: string
 *           default: usd
 */

/**
 * @swagger
 * /api/v1/payments/create-intent:
 *   post:
 *     summary: Create a Stripe payment intent
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentIntent'
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 */
router.post('/create-intent', validatePayment, handleValidationErrors, createPaymentIntent);

/**
 * @swagger
 * /api/v1/payments/confirm:
 *   post:
 *     summary: Confirm a payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentIntentId
 *             properties:
 *               paymentIntentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment confirmed successfully
 */
router.post('/confirm', confirmPayment);

/**
 * @swagger
 * /api/v1/payments/history:
 *   get:
 *     summary: Get payment history and balance for current user
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment history and balance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                 payments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       type:
 *                         type: string
 *                         enum: [booking, topup, withdrawal]
 *                       status:
 *                         type: string
 *                       createdAt:
 *                         type: string
 */
router.get('/history', getPaymentHistory);

/**
 * @swagger
 * /api/v1/payments/export:
 *   get:
 *     summary: Export payment history (CSV)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment history exported successfully
 */
router.get('/export', getPaymentHistory);

export default router;