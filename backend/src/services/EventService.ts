import Event from '../models/Event';
import Booking from '../models/Booking';
import User from '../models/User';

interface EventSearchFilters {
  category?: string;
  location?: string;
  dateFrom?: Date;
  dateTo?: Date;
  priceMin?: number;
  priceMax?: number;
  organizer?: string;
}

interface EventStats {
  totalEvents: number;
  totalBookings: number;
  totalRevenue: number;
  averageTicketsPerEvent: number;
}

class EventService {
  async getEventsWithFilters(filters: EventSearchFilters, page: number = 1, limit: number = 10): Promise<PaginatedEvents> {
    try {
      const query: any = {};

      if (filters.category) query.category = filters.category;
      if (filters.location) query.location = { $regex: filters.location, $options: 'i' };
      if (filters.organizer) query.organizer = filters.organizer;

      if (filters.dateFrom || filters.dateTo) {
        query.date = {};
        if (filters.dateFrom) query.date.$gte = filters.dateFrom;
        if (filters.dateTo) query.date.$lte = filters.dateTo;
      }

      if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
        query.price = {};
        if (filters.priceMin !== undefined) query.price.$gte = filters.priceMin;
        if (filters.priceMax !== undefined) query.price.$lte = filters.priceMax;
      }

      const events = await Event.find(query)
        .populate('organizer', 'firstName lastName email')
        .sort({ date: 1 })
        .limit(limit)
        .skip((page - 1) * limit);

      const total = await Event.countDocuments(query);

      return {
        events,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Failed to get events with filters:', error);
      throw new Error('Failed to retrieve events');
    }
  }

  async getEventAnalytics(eventId: string): Promise<any> {
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        throw new Error('Event not found');
      }

      const bookings = await Booking.find({ event: eventId })
        .populate('user', 'firstName lastName email')
        .sort({ createdAt: -1 });

      const totalBookings = bookings.length;
      const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
      const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

      // Ticket type breakdown
      const ticketBreakdown = event.ticketTypes.map(ticketType => {
        const bookingsForType = bookings.filter(booking =>
          booking.tickets && booking.tickets.some(ticket => ticket.type === ticketType.name)
        );

        const quantitySold = bookingsForType.reduce((sum, booking) => {
          const ticket = booking.tickets && booking.tickets.find(t => t.type === ticketType.name);
          return sum + (ticket ? ticket.quantity : 0);
        }, 0);

        return {
          type: ticketType.name,
          price: ticketType.price,
          quantity: ticketType.quantity,
          sold: quantitySold,
          remaining: ticketType.quantity - quantitySold,
          revenue: quantitySold * ticketType.price
        };
      });

      return {
        event: {
          id: event._id,
          title: event.title,
          date: event.date,
          totalTickets: event.ticketTypes.reduce((sum, type) => sum + type.quantity, 0)
        },
        analytics: {
          totalBookings,
          confirmedBookings,
          totalRevenue,
          ticketBreakdown
        },
        recentBookings: bookings.slice(0, 10)
      };
    } catch (error) {
      console.error('Failed to get event analytics:', error);
      throw new Error('Failed to retrieve event analytics');
    }
  }

  async checkEventAvailability(eventId: string, ticketType: string, quantity: number): Promise<boolean> {
    try {
      const event = await Event.findById(eventId);
      if (!event) {
        return false;
      }

      const ticketTypeData = event.ticketTypes.find(t => t.name === ticketType);
      if (!ticketTypeData) {
        return false;
      }

      // Check ticket type capacity
      const soldTickets = await Booking.aggregate([
        { $match: { event: event._id, status: { $in: ['confirmed', 'pending'] } } },
        { $unwind: '$tickets' },
        { $match: { 'tickets.type': ticketType } },
        { $group: { _id: null, total: { $sum: '$tickets.quantity' } } }
      ]);

      const totalSold = soldTickets[0]?.total || 0;
      return (totalSold + quantity) <= ticketTypeData.quantity;
    } catch (error) {
      console.error('Failed to check event availability:', error);
      return false;
    }
  }

  async getOrganizerStats(organizerId: string): Promise<EventStats> {
    try {
      const events = await Event.find({ organizer: organizerId });
      const eventIds = events.map(e => e._id);

      const bookings = await Booking.find({
        event: { $in: eventIds },
        status: 'confirmed'
      });

      const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
      const totalBookings = bookings.length;
      const totalEvents = events.length;
      const averageTicketsPerEvent = totalEvents > 0 ? totalBookings / totalEvents : 0;

      return {
        totalEvents,
        totalBookings,
        totalRevenue,
        averageTicketsPerEvent
      };
    } catch (error) {
      console.error('Failed to get organizer stats:', error);
      throw new Error('Failed to retrieve organizer statistics');
    }
  }

  async getUpcomingEvents(limit: number = 10): Promise<any[]> {
    try {
      const now = new Date();
      const events = await Event.find({
        date: { $gte: now },
        status: 'published'
      })
        .populate('organizer', 'firstName lastName')
        .sort({ date: 1 })
        .limit(limit);

      return events;
    } catch (error) {
      console.error('Failed to get upcoming events:', error);
      throw new Error('Failed to retrieve upcoming events');
    }
  }

  async updateEventStatus(eventId: string, status: 'draft' | 'published' | 'cancelled' | 'completed'): Promise<void> {
    try {
      await Event.findByIdAndUpdate(eventId, { status });

      if (status === 'cancelled') {
        // Cancel all related bookings
        await Booking.updateMany(
          { event: eventId, status: 'confirmed' },
          { status: 'cancelled' }
        );
      }
    } catch (error) {
      console.error('Failed to update event status:', error);
      throw new Error('Failed to update event status');
    }
  }

  async getEventsByLocation(location: string, radius: number = 50): Promise<any[]> {
    // TODO: Implement geospatial search
    // This would require adding location coordinates to the Event model
    console.log(`Getting events near ${location} within ${radius}km radius`);
    return [];
  }

  async getTrendingEvents(limit: number = 10): Promise<any[]> {
    try {
      // Get events with most bookings in the last 30 days
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      const trendingEvents = await Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: thirtyDaysAgo },
            status: 'confirmed'
          }
        },
        {
          $group: {
            _id: '$event',
            bookingCount: { $sum: 1 }
          }
        },
        { $sort: { bookingCount: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: 'events',
            localField: '_id',
            foreignField: '_id',
            as: 'event'
          }
        },
        { $unwind: '$event' },
        {
          $lookup: {
            from: 'users',
            localField: 'event.organizer',
            foreignField: '_id',
            as: 'organizer'
          }
        },
        { $unwind: '$organizer' }
      ]);

      return trendingEvents.map(item => ({
        ...item.event,
        organizer: { firstName: item.organizer.firstName, lastName: item.organizer.lastName },
        trendingScore: item.bookingCount
      }));
    } catch (error) {
      console.error('Failed to get trending events:', error);
      throw new Error('Failed to retrieve trending events');
    }
  }
}

export default EventService;