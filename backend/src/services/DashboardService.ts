import Event from '../models/Event';
import Booking from '../models/Booking';
import User from '../models/User';
import Payment from '../models/Payment';
import mongoose from 'mongoose';

class DashboardService {
    async getDashboardStats(userId: string): Promise<any> {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        if (user.role === 'organizer' || user.role === 'admin') {
            const eventIds = await Event.find({ organizer: userId }).distinct('_id');
            const totalBookings = await Booking.countDocuments({ event: { $in: eventIds } });

            const totalRevenueResult = await Payment.aggregate([
                {
                    $match: {
                        user: new mongoose.Types.ObjectId(userId),
                        status: 'succeeded',
                        type: { $in: ['booking', 'topup'] }
                    }
                },
                { $group: { _id: null, total: { $sum: '$amount' } } }
            ]);

            const recentBookings = await Booking.find({ event: { $in: eventIds } })
                .populate('user', 'firstName lastName')
                .populate('event', 'title')
                .sort({ createdAt: -1 })
                .limit(5);

            const recentEvents = await Event.find({ organizer: userId }).sort({ createdAt: -1 }).limit(5);

            const activity = [
                ...recentBookings.map(b => ({
                    id: b._id,
                    type: 'booking',
                    title: 'New Ticket Sold',
                    user: `${(b.user as any).firstName} ${(b.user as any).lastName}`,
                    event: (b.event as any).title,
                    time: b.createdAt
                })),
                ...recentEvents.map(e => ({
                    id: e._id,
                    type: 'event',
                    title: 'Event Created',
                    user: 'You',
                    event: e.title,
                    time: e.createdAt
                }))
            ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

            return {
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    proPlanActive: true
                },
                revenue: {
                    total: `₵${(totalRevenueResult[0]?.total || 0).toLocaleString()}`,
                    trend: '+18.5%',
                    chartData: [20, 45, 30, 65, 50, 85, 100]
                },
                metrics: {
                    profileViews: { value: '1.2k', label: 'Profile Views', trend: '+5%' },
                    ticketsSold: { value: totalBookings.toString(), label: 'Tickets Sold', trend: '+18%' },
                    avgRating: { value: '4.9', label: 'Avg Rating', trend: '+0.2' },
                    newClients: { value: '156', label: 'New Clients', trend: '+12%' }
                },
                recentActivity: activity,
                upcomingTasks: [
                    { id: 1, title: 'Complete Profile', meta: 'Add bank details', tag: 'Urgent', isUrgent: true },
                    { id: 2, title: 'Review Ticket Sales', meta: 'Neon Nights Festival', tag: 'Pending', isUrgent: false }
                ],
                aiInsight: {
                    text: "Your interactions peak on Fridays at 6PM. Consider scheduling new event announcements then for maximum reach.",
                    type: "peak_time"
                }
            };
        } else {
            const totalBookings = await Booking.countDocuments({ user: userId });
            const upcomingBookings = await Booking.find({ user: userId, status: 'confirmed' })
                .populate('event', 'title date location')
                .sort({ 'event.date': 1 })
                .limit(5);

            return {
                totalBookings,
                upcomingBookings
            };
        }
    }

    async getAnalytics(userId: string): Promise<any> {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const eventIds = await Event.find({ organizer: userId }).distinct('_id');

        const topEvents = await Booking.aggregate([
            { $match: { event: { $in: eventIds }, status: 'confirmed' } },
            { $group: { _id: '$event', revenue: { $sum: '$totalAmount' }, ticketsSold: { $sum: 1 } } },
            { $sort: { revenue: -1 } },
            { $limit: 3 },
            { $lookup: { from: 'events', localField: '_id', foreignField: '_id', as: 'eventInfo' } },
            { $unwind: '$eventInfo' },
            { $project: { name: '$eventInfo.title', revenue: 1, ticketsSold: 1 } }
        ]);

        const revenueBySource = [
            { name: 'Events', value: 70, color: '#4ade80' },
            { name: 'Services', value: 20, color: '#8b5cf6' },
            { name: 'Other', value: 10, color: '#f472b6' }
        ];

        const audienceInterests = await Event.aggregate([
            { $match: { organizer: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
            { $project: { subject: '$_id', A: '$count', fullMark: 15 } }
        ]);

        return { topEvents, revenueBySource, audienceInterests };
    }
}

export default new DashboardService();
