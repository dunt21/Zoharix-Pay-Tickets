import { Request, Response, NextFunction } from 'express';
import Event from '../models/Event';
import Booking from '../models/Booking';
import Payment from '../models/Payment';
import User from '../models/User';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    let stats;

    if (user.role === 'organizer' || user.role === 'admin') {
      // Organizer/Admin dashboard
      const totalEvents = await Event.countDocuments({ organizer: userId });
      const totalBookings = await Booking.countDocuments({
        event: { $in: await Event.find({ organizer: userId }).distinct('_id') }
      });
      const totalRevenue = await Payment.aggregate([
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
        recentEvents: await Event.find({ organizer: userId }).sort({ createdAt: -1 }).limit(5)
      };
    } else {
      // User dashboard
      const totalBookings = await Booking.countDocuments({ user: userId });
      const totalSpent = await Payment.aggregate([
        { $match: { user: userId, status: 'succeeded' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);

      stats = {
        totalBookings,
        totalSpent: totalSpent[0]?.total || 0,
        upcomingBookings: await Booking.find({ user: userId, status: 'confirmed' })
          .populate('event', 'title date location')
          .sort({ 'event.date': 1 })
          .limit(5)
      };
    }

    res.status(200).json({
      message: 'Dashboard stats retrieved successfully',
      stats
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const user = await User.findById(userId);

    if (!user || (user.role !== 'organizer' && user.role !== 'admin')) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    // Monthly revenue for the last 12 months
    const monthlyRevenue = await Payment.aggregate([
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
  } catch (error) {
    next(error);
  }
};