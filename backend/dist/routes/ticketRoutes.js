"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = require("../controllers/ticketController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authenticateToken);
router.post('/book', validationMiddleware_1.validateTicketBooking, validationMiddleware_1.handleValidationErrors, ticketController_1.bookTicket);
router.get('/', ticketController_1.getUserTickets);
router.delete('/:bookingId/cancel', ticketController_1.cancelBooking);
exports.default = router;
//# sourceMappingURL=ticketRoutes.js.map