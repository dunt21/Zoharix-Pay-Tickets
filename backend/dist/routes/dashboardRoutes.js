"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboardController_1 = require("../controllers/dashboardController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authenticateToken);
router.get('/stats', dashboardController_1.getDashboardStats);
router.get('/analytics', roleMiddleware_1.requireOrganizerOrAdmin, dashboardController_1.getAnalytics);
exports.default = router;
//# sourceMappingURL=dashboardRoutes.js.map