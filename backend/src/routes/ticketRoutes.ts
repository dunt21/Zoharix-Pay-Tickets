import { Router } from 'express';
import { bookTicket, getUserTickets, cancelBooking } from '../controllers/ticketController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validateTicketBooking, handleValidationErrors } from '../middleware/validationMiddleware';

const router = Router();

// Apply authentication to all ticket routes
router.use(authenticateToken);

// POST /api/v1/tickets/book
router.post('/book', validateTicketBooking, handleValidationErrors, bookTicket);

// GET /api/v1/tickets
router.get('/', getUserTickets);

// DELETE /api/v1/tickets/:bookingId/cancel
router.delete('/:bookingId/cancel', cancelBooking);

export default router;