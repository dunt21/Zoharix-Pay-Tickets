import { Request, Response, NextFunction } from 'express';
import cloudinary from '../config/cloudinary';
import Event from '../models/Event';

export const createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const organizerId = (req as any).user?.id;
    const eventData = req.body;

    // Handle image upload if provided
    if ((req as any).file) {
      const result = await cloudinary.uploader.upload((req as any).file.path);
      eventData.imageUrl = result.secure_url;
    }

    // Create event
    const event = new Event({ ...eventData, organizer: organizerId });
    await event.save();

    res.status(201).json({
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 10, search } = req.query;

    // Query events
    let query: any = {};
    if (search) query = { title: { $regex: search, $options: 'i' } };
    const events = await Event.find(query)
      .populate('organizer', 'firstName lastName email')
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.status(200).json({
      message: 'Events retrieved successfully',
      events,
      pagination: { page, limit, total: await Event.countDocuments(query) }
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { eventId } = req.params;
    const organizerId = (req as any).user?.id;
    const updates = req.body;

    if (!eventId) {
      res.status(400).json({ message: 'Event ID is required' });
      return;
    }

    // Handle image update
    if ((req as any).file) {
      const result = await cloudinary.uploader.upload((req as any).file.path);
      updates.imageUrl = result.secure_url;
    }

    // Update event (ensure organizer owns it)
    const event = await Event.findOneAndUpdate(
      { _id: eventId, organizer: organizerId },
      updates,
      { new: true }
    );

    if (!event) {
      res.status(404).json({ message: 'Event not found or unauthorized' });
      return;
    }

    res.status(200).json({
      message: 'Event updated successfully',
      event
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { eventId } = req.params;
    const organizerId = (req as any).user?.id;

    if (!eventId) {
      res.status(400).json({ message: 'Event ID is required' });
      return;
    }

    // Delete event
    const event = await Event.findOneAndDelete({ _id: eventId, organizer: organizerId });

    if (!event) {
      res.status(404).json({ message: 'Event not found or unauthorized' });
      return;
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};