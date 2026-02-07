import { Request, Response, NextFunction } from 'express';
import cloudinary from '../config/cloudinary';
import eventService from '../services/EventService';

export const createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const organizerId = (req as any).user?.id;
    const eventData = req.body;

    // Handle image upload if provided
    if ((req as any).file) {
      const result = await cloudinary.uploader.upload((req as any).file.path);
      eventData.imageUrl = result.secure_url;
    }

    // Create event via service
    const event = await eventService.createEvent({ ...eventData, organizer: organizerId });

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
    const { page = 1, limit = 10, search, category, location } = req.query;

    const result = await eventService.getEventsWithFilters({
      category: category as string,
      location: location as string,
      // search is not yet handled in getEventsWithFilters, but kept for future use
    }, Number(page), Number(limit));

    res.status(200).json({
      message: 'Events retrieved successfully',
      events: result.events,
      pagination: result.pagination
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

    // Update event via service
    const event = await eventService.updateEvent(eventId, organizerId, updates);

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

    // Delete event via service
    const event = await eventService.deleteEvent(eventId, organizerId);

    if (!event) {
      res.status(404).json({ message: 'Event not found or unauthorized' });
      return;
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};