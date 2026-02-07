"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEvents = exports.createEvent = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const EventService_1 = __importDefault(require("../services/EventService"));
const createEvent = async (req, res, next) => {
    try {
        const organizerId = req.user?.id;
        const eventData = req.body;
        if (req.file) {
            const result = await cloudinary_1.default.uploader.upload(req.file.path);
            eventData.imageUrl = result.secure_url;
        }
        const event = await EventService_1.default.createEvent({ ...eventData, organizer: organizerId });
        res.status(201).json({
            message: 'Event created successfully',
            event
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createEvent = createEvent;
const getEvents = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, search, category, location } = req.query;
        const result = await EventService_1.default.getEventsWithFilters({
            category: category,
            location: location,
        }, Number(page), Number(limit));
        res.status(200).json({
            message: 'Events retrieved successfully',
            events: result.events,
            pagination: result.pagination
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getEvents = getEvents;
const updateEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const organizerId = req.user?.id;
        const updates = req.body;
        if (!eventId) {
            res.status(400).json({ message: 'Event ID is required' });
            return;
        }
        if (req.file) {
            const result = await cloudinary_1.default.uploader.upload(req.file.path);
            updates.imageUrl = result.secure_url;
        }
        const event = await EventService_1.default.updateEvent(eventId, organizerId, updates);
        if (!event) {
            res.status(404).json({ message: 'Event not found or unauthorized' });
            return;
        }
        res.status(200).json({
            message: 'Event updated successfully',
            event
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateEvent = updateEvent;
const deleteEvent = async (req, res, next) => {
    try {
        const { eventId } = req.params;
        const organizerId = req.user?.id;
        if (!eventId) {
            res.status(400).json({ message: 'Event ID is required' });
            return;
        }
        const event = await EventService_1.default.deleteEvent(eventId, organizerId);
        if (!event) {
            res.status(404).json({ message: 'Event not found or unauthorized' });
            return;
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=eventController.js.map