"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalytics = exports.getDashboardStats = void 0;
const Event_1 = __importDefault(require("../models/Event"));
const Booking_1 = __importDefault(require("../models/Booking"));
const Payment_1 = __importDefault(require("../models/Payment"));
const User_1 = __importDefault(require("../models/User"));
const getDashboardStats = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const user = await User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        let stats;
        if (user.role === 'organizer' || user.role === 'admin') {
            const totalEvents = await Event_1.default.countDocuments({ organizer: userId });
            const totalBookings = await Booking_1.default.countDocuments({
                event: { $in: await Event_1.default.find({ organizer: userId }).distinct('_id') }
            });
            const totalRevenue = await Payment_1.default.aggregate([
                {
                    $lookup: {
                        from: 'bookings',
                        localField: 'booking',
                        foreignField: '_id',
                        as: 'booking'
                    }
                },
                {
                    $lookup: {
                        from: 'events',
                        localField: 'booking.event',
                        foreignField: '_id',
                        as: 'event'
                    }
                },
                {
                    $match: {
                        'event.organizer': userId,
                        status: 'succeeded'
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$amount' }
                    }
                }
            ]);
            stats = {
                totalEvents,
                totalBookings,
                totalRevenue: totalRevenue[0]?.total || 0,
                recentEvents: await Event_1.default.find({ organizer: userId }).sort({ createdAt: -1 }).limit(5)
            };
        }
        else {
            const totalBookings = await Booking_1.default.countDocuments({ user: userId });
            const totalSpent = await Payment_1.default.aggregate([
                { $match: { user: userId, status: 'succeeded' } },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]);
            stats = {
                totalBookings,
                totalSpent: totalSpent[0]?.total || 0,
                upcomingBookings: await Booking_1.default.find({ user: userId, status: 'confirmed' })
                    .populate('event', 'title date location')
                    .sort({ 'event.date': 1 })
                    .limit(5)
            };
        }
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
        const user = await User_1.default.findById(userId);
        if (!user || (user.role !== 'organizer' && user.role !== 'admin')) {
            res.status(403).json({ message: 'Access denied' });
            return;
        }
        const monthlyRevenue = await Payment_1.default.aggregate([
            {
                $lookup: {
                    from: 'bookings',
                    localField: 'booking',
                    foreignField: '_id',
                    as: 'booking'
                }
            },
            {
                $lookup: {
                    from: 'events',
                    localField: 'booking.event',
                    foreignField: '_id',
                    as: 'event'
                }
            },
            {
                $match: {
                    'event.organizer': userId,
                    status: 'succeeded',
                    createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    revenue: { $sum: '$amount' },
                    bookings: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);
        res.status(200).json({
            message: 'Analytics retrieved successfully',
            analytics: {
                monthlyRevenue
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAnalytics = getAnalytics;
//# sourceMappingURL=dashboardController.js.map