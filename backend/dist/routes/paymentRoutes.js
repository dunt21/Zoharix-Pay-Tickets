"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authenticateToken);
router.post('/create-intent', validationMiddleware_1.validatePayment, validationMiddleware_1.handleValidationErrors, paymentController_1.createPaymentIntent);
router.post('/confirm', paymentController_1.confirmPayment);
router.get('/history', paymentController_1.getPaymentHistory);
exports.default = router;
//# sourceMappingURL=paymentRoutes.js.map