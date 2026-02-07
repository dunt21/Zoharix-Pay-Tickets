import { Router } from 'express';
import { bookTicket, getUserTickets, cancelBooking } from '../controllers/ticketController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validateTicketBooking, handleValidationErrors } from '../middleware/validationMiddleware';

const router = Router();

// Apply authentication to all ticket routes
router.use(authenticateToken);

/**
 * @swagger
 * components:
 *   schemas:
 *     TicketBooking:
 *       type: object
 *       required:
 *         - eventId
 *         - tickets
 *       properties:
 *         eventId:
 *           type: string
 *         tickets:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - type
 *               - quantity
 *             properties:
 *               type:
 *                 type: string
 *               quantity:
 *                 type: number
 */

/**
 * @swagger
 * /api/v1/tickets/book:
 *   post:
 *     summary: Book tickets for an event
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketBooking'
 *     responses:
 *       201:
 *         description: Tickets booked successfully
 *       400:
 *         description: Invalid booking data
 */
router.post('/book', validateTicketBooking, handleValidationErrors, bookTicket);

/**
 * @swagger
 * /api/v1/tickets:
 *   get:
 *     summary: Get all bookings for current user
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings retrieved successfully
 */
router.get('/', getUserTickets);

/**
 * @swagger
 * /api/v1/tickets/{bookingId}/cancel:
 *   delete:
 *     summary: Cancel a booking
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 */
router.delete('/:bookingId/cancel', cancelBooking);

export default router;