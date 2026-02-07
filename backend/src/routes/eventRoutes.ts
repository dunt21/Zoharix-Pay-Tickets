import { Router } from 'express';
import { createEvent, getEvents, updateEvent, deleteEvent } from '../controllers/eventController';
import { authenticateToken, optionalAuth } from '../middleware/authMiddleware';
import { requireOrganizer } from '../middleware/roleMiddleware';
import { validateEventCreation, validateEventId, validatePagination, handleValidationErrors } from '../middleware/validationMiddleware';
import { uploadSingle, handleUploadError } from '../middleware/uploadMiddleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     TicketType:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - quantity
 *       properties:
 *         name:
 *           type: string
 *         price:
 *           type: number
 *         quantity:
 *           type: number
 *     Event:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - date
 *         - location
 *         - category
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         location:
 *           type: string
 *         category:
 *           type: string
 *         imageUrl:
 *           type: string
 *         ticketTypes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TicketType'
 *         status:
 *           type: string
 *           enum: [draft, published, cancelled, completed]
 *         tags:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of events retrieved successfully
 */
router.get('/', optionalAuth, validatePagination, handleValidationErrors, getEvents);

/**
 * @swagger
 * /api/v1/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *               ticketTypes:
 *                 type: string
 *                 description: JSON string of ticket types array
 *     responses:
 *       201:
 *         description: Event created successfully
 *       403:
 *         description: Not authorized (requires organizer role)
 */
router.post('/', authenticateToken, requireOrganizer, uploadSingle, handleUploadError, validateEventCreation, handleValidationErrors, createEvent);

/**
 * @swagger
 * /api/v1/events/{eventId}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               status:
 *                 type: string
 *                 enum: [draft, published, cancelled, completed]
 *               ticketTypes:
 *                 type: string
 *                 description: JSON string of ticket types array
 *     responses:
 *       200:
 *         description: Event updated successfully
 */
router.put('/:eventId', authenticateToken, requireOrganizer, validateEventId, handleValidationErrors, uploadSingle, handleUploadError, updateEvent);

/**
 * @swagger
 * /api/v1/events/{eventId}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Event deleted successfully
 */
router.delete('/:eventId', authenticateToken, requireOrganizer, validateEventId, handleValidationErrors, deleteEvent);

export default router;