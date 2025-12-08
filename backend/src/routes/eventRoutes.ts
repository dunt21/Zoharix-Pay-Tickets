import { Router } from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/eventController';
import { authenticateToken, optionalAuth } from '../middleware/authMiddleware';
import { requireOrganizer } from '../middleware/roleMiddleware';
import { validateEventCreation, validateEventId, validatePagination, handleValidationErrors } from '../middleware/validationMiddleware';
import { uploadSingle, handleUploadError } from '../middleware/uploadMiddleware';

const router = Router();

// GET /api/v1/events - Public with optional auth
router.get('/', optionalAuth, validatePagination, handleValidationErrors, getEvents);

// POST /api/v1/events - Create event (organizer only)
router.post('/', authenticateToken, requireOrganizer, uploadSingle, handleUploadError, validateEventCreation, handleValidationErrors, createEvent);

// PUT /api/v1/events/:eventId - Update event (organizer only)
router.put('/:eventId', authenticateToken, requireOrganizer, validateEventId, handleValidationErrors, uploadSingle, handleUploadError, updateEvent);

// DELETE /api/v1/events/:eventId - Delete event (organizer only)
router.delete('/:eventId', authenticateToken, requireOrganizer, validateEventId, handleValidationErrors, deleteEvent);

export default router;