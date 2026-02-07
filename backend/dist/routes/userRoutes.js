"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authenticateToken);
router.get('/profile', userController_1.getProfile);
router.put('/profile', userController_1.updateProfile);
router.put('/change-password', userController_1.changePassword);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map