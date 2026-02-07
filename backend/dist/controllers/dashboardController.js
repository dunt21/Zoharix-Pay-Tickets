"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = exports.getDashboardStats = void 0;
const DashboardService_1 = __importDefault(require("../services/DashboardService"));
const getDashboardStats = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const stats = await DashboardService_1.default.getDashboardStats(userId);
        res.status(200).json({
            message: 'Dashboard stats retrieved successfully',
            stats
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getDashboardStats = getDashboardStats;
const getAnalytics = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const analytics = await DashboardService_1.default.getAnalytics(userId);
        res.status(200).json({
            message: 'Analytics data retrieved successfully',
            analytics
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAnalytics = getAnalytics;
//# sourceMappingURL=dashboardController.js.map