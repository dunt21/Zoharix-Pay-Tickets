import { Request, Response, NextFunction } from 'express';
import Booking from '../models/Booking';
import Event from '../models/Event';

// Helper function to calculate total amount
const calculateTotal = (event: any, ticketType: string, quantity: number): number => {
  const ticket = event.ticketTypes.find((t: any) => t.name === ticketType);
  if (!ticket) return 0;
  return ticket.price * quantity;
};

export const bookTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { eventId, ticketType, quantity } = req.body;

    // Check event availability
    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    // Generate booking reference
    const bookingReference = `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Create booking
    const booking = new Booking({
      user: userId,
      event: eventId,
      tickets: [{ type: ticketType, quantity, price: calculateTotal(event, ticketType, quantity) / quantity }],
      totalAmount: calculateTotal(event, ticketType, quantity),
      bookingReference
    });
    await booking.save();

    res.status(201).json({
      message: 'Ticket booked successfully',
      booking
    });
  } catch (error) {
    next(error);
  }
};

export const getUserTickets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;

    // Get user bookings
    const bookings = await Booking.find({ user: userId })
      .populate('event', 'title date location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'User tickets retrieved successfully',
      bookings
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { bookingId } = req.params;
    const userId = (req as any).user?.id;

    if (!bookingId) {
      res.status(400).json({ message: 'Booking ID is required' });
      return;
    }

    // Find and cancel booking
    const booking = await Booking.findOne({ _id: bookingId, user: userId });
    if (!booking) {
      res.status(404).json({ message: 'Booking not found' });
      return;
    }

    // Check cancellation policy
    if (booking.status !== 'confirmed') {
      res.status(400).json({ message: 'Cannot cancel this booking' });
      return;
    }

    // Process refund if applicable (placeholder - would integrate with payment processor)
    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    next(error);
  }
};