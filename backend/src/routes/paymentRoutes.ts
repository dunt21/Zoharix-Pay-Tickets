import { Router } from 'express';
import { createPaymentIntent, confirmPayment, getPaymentHistory } from '../controllers/paymentController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validatePayment, handleValidationErrors } from '../middleware/validationMiddleware';

const router = Router();

// Apply authentication to all payment routes
router.use(authenticateToken);

// POST /api/v1/payments/create-intent
router.post('/create-intent', validatePayment, handleValidationErrors, createPaymentIntent);

// POST /api/v1/payments/confirm
router.post('/confirm', confirmPayment);

// GET /api/v1/payments/history
router.get('/history', getPaymentHistory);

export default router;