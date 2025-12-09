"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventController_1 = require("../controllers/eventController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const router = (0, express_1.Router)();
router.get('/', authMiddleware_1.optionalAuth, validationMiddleware_1.validatePagination, validationMiddleware_1.handleValidationErrors, eventController_1.getEvents);
router.post('/', authMiddleware_1.authenticateToken, roleMiddleware_1.requireOrganizer, uploadMiddleware_1.uploadSingle, uploadMiddleware_1.handleUploadError, validationMiddleware_1.validateEventCreation, validationMiddleware_1.handleValidationErrors, eventController_1.createEvent);
router.put('/:eventId', authMiddleware_1.authenticateToken, roleMiddleware_1.requireOrganizer, validationMiddleware_1.validateEventId, validationMiddleware_1.handleValidationErrors, uploadMiddleware_1.uploadSingle, uploadMiddleware_1.handleUploadError, eventController_1.updateEvent);
router.delete('/:eventId', authMiddleware_1.authenticateToken, roleMiddleware_1.requireOrganizer, validationMiddleware_1.validateEventId, validationMiddleware_1.handleValidationErrors, eventController_1.deleteEvent);
exports.default = router;
//# sourceMappingURL=eventRoutes.js.map