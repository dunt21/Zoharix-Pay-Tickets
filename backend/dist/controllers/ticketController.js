"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.getUserTickets = exports.bookTicket = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const Event_1 = __importDefault(require("../models/Event"));
const calculateTotal = (event, ticketType, quantity) => {
    const ticket = event.ticketTypes.find((t) => t.name === ticketType);
    if (!ticket)
        return 0;
    return ticket.price * quantity;
};
const bookTicket = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const { eventId, ticketType, quantity } = req.body;
        const event = await Event_1.default.findById(eventId);
        if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
        }
        const bookingReference = `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
        const booking = new Booking_1.default({
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
    }
    catch (error) {
        next(error);
    }
};
exports.bookTicket = bookTicket;
const getUserTickets = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const bookings = await Booking_1.default.find({ user: userId })
            .populate('event', 'title date location')
            .sort({ createdAt: -1 });
        res.status(200).json({
            message: 'User tickets retrieved successfully',
            bookings
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserTickets = getUserTickets;
const cancelBooking = async (req, res, next) => {
    try {
        const { bookingId } = req.params;
        const userId = req.user?.id;
        if (!bookingId) {
            res.status(400).json({ message: 'Booking ID is required' });
            return;
        }
        const booking = await Booking_1.default.findOne({ _id: bookingId, user: userId });
        if (!booking) {
            res.status(404).json({ message: 'Booking not found' });
            return;
        }
        if (booking.status !== 'confirmed') {
            res.status(400).json({ message: 'Cannot cancel this booking' });
            return;
        }
        booking.status = 'cancelled';
        await booking.save();
        res.status(200).json({ message: 'Booking cancelled successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.cancelBooking = cancelBooking;
//# sourceMappingURL=ticketController.js.map