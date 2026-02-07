"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const router = (0, express_1.Router)();
router.post('/signup', validationMiddleware_1.validateSignup, validationMiddleware_1.handleValidationErrors, authController_1.signup);
router.post('/login', validationMiddleware_1.validateLogin, validationMiddleware_1.handleValidationErrors, authController_1.login);
router.post('/logout', authController_1.logout);
router.get('/verify/:token', authController_1.verifyEmail);
router.post('/refresh', authController_1.refreshToken);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map