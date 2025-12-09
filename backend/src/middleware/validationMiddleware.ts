// Schema validation logging middleware
import { Request, Response, NextFunction } from 'express';

// Simple console logging for schema validation
export const logSchemaValidation = (req: Request, res: Response, next: NextFunction) => {
  const { body } = req;
  const route = req.originalUrl;

  // Log potential schema mismatches
  if (route.includes('/auth/signup') && body) {
    if (body.firstName && body.lastName && !body.name) {
      console.log('Schema validation: Signup using firstName/lastName fields correctly');
    } else if (body.name) {
      console.warn('Schema mismatch: Signup still using single name field instead of firstName/lastName');
    }
  }

  if (route.includes('/events') && body?.location) {
    if (typeof body.location === 'string') {
      console.log('Schema validation: Event location is string as expected');
    } else if (typeof body.location === 'object') {
      console.warn('Schema mismatch: Event location is object instead of string');
    }
  }

  if (route.includes('/bookings') && body) {
    if (body.type === 'service' && body.service && !body.event) {
      console.log('Schema validation: Service booking correctly structured');
    } else if (body.type === 'event' && body.event && !body.service) {
      console.log('Schema validation: Event booking correctly structured');
    } else {
      console.warn('Schema mismatch: Booking type and references do not match');
    }
  }

  next();
};

interface ValidationError {
  field: string;
  message: string;
}

/**
 * Simple validation helper functions
 */
const validators = {
  isEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isMongoId: (id: string): boolean => {
    const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
    return mongoIdRegex.test(id);
  },

  isNotEmpty: (value: any): boolean => {
    return value !== null && value !== undefined && value.toString().trim().length > 0;
  },

  isLength: (value: string, min: number, max?: number): boolean => {
    const len = value.length;
    if (max !== undefined) {
      return len >= min && len <= max;
    }
    return len >= min;
  },

  isPositiveNumber: (value: any): boolean => {
    const num = Number(value);
    return !isNaN(num) && num >= 0;
  },

  isFutureDate: (dateString: string): boolean => {
    const date = new Date(dateString);
    return date > new Date();
  }
};

/**
 * Middleware to handle validation errors
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = (req as any).validationErrors || [];
  if (errors.length > 0) {
    res.status(400).json({
      message: 'Validation failed',
      errors
    });
    return;
  }
  next();
};

/**
 * Validation middleware for user registration
 */
export const validateSignup = (req: Request, res: Response, next: NextFunction): void => {
  const errors: ValidationError[] = [];
  const { email, password, firstName, lastName } = req.body;

  if (!validators.isNotEmpty(email) || !validators.isEmail(email)) {
    errors.push({ field: 'email', message: 'Please provide a valid email' });
  }

  if (!validators.isNotEmpty(password) || !validators.isLength(password, 6)) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters long' });
  }

  if (!validators.isNotEmpty(firstName) || !validators.isLength(firstName, 2, 50)) {
    errors.push({ field: 'firstName', message: 'First name must be between 2 and 50 characters' });
  }

  if (!validators.isNotEmpty(lastName) || !validators.isLength(lastName, 2, 50)) {
    errors.push({ field: 'lastName', message: 'Last name must be between 2 and 50 characters' });
  }

  (req as any).validationErrors = errors;
  next();
};

/**
 * Validation middleware for user login
 */
export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const errors: ValidationError[] = [];
  const { email, password } = req.body;

  if (!validators.isNotEmpty(email) || !validators.isEmail(email)) {
    errors.push({ field: 'email', message: 'Please provide a valid email' });
  }

  if (!validators.isNotEmpty(password)) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  (req as any).validationErrors = errors;
  next();
};

/**
 * Validation middleware for event creation
 */
export const validateEventCreation = (req: Request, res: Response, next: NextFunction): void => {
  const errors: ValidationError[] = [];
  const { title, description, date, location, capacity, price, category } = req.body;

  if (!validators.isNotEmpty(title) || !validators.isLength(title, 3, 100)) {
    errors.push({ field: 'title', message: 'Title must be between 3 and 100 characters' });
  }

  if (!validators.isNotEmpty(description) || !validators.isLength(description, 10, 1000)) {
    errors.push({ field: 'description', message: 'Description must be between 10 and 1000 characters' });
  }

  if (!validators.isNotEmpty(date) || !validators.isFutureDate(date)) {
    errors.push({ field: 'date', message: 'Please provide a valid future date' });
  }

  if (!validators.isNotEmpty(location) || !validators.isLength(location, 3, 200)) {
    errors.push({ field: 'location', message: 'Location must be between 3 and 200 characters' });
  }

  if (!validators.isPositiveNumber(capacity) || capacity < 1 || capacity > 10000) {
    errors.push({ field: 'capacity', message: 'Capacity must be between 1 and 10000' });
  }

  if (!validators.isPositiveNumber(price)) {
    errors.push({ field: 'price', message: 'Price must be a positive number' });
  }

  if (category && !validators.isLength(category, 2, 50)) {
    errors.push({ field: 'category', message: 'Category must be between 2 and 50 characters' });
  }

  (req as any).validationErrors = errors;
  next();
};

/**
 * Validation middleware for event ID parameter
 */
export const validateEventId = (req: Request, res: Response, next: NextFunction): void => {
  const errors: ValidationError[] = [];
  const { eventId } = req.params;

  if (!eventId || !validators.isMongoId(eventId)) {
    errors.push({ field: 'eventId', message: 'Invalid event ID' });
  }

  (req as any).validationErrors = errors;
  next();
};

/**
 * Validation middleware for user ID parameter
 */
export const validateUserId = (req: Request, res: Response, next: NextFunction): void => {
  const errors: ValidationError[] = [];
  const { userId } = req.params;

  if (!userId || !validators.isMongoId(userId)) {
    errors.push({ field: 'userId', message: 'Invalid user ID' });
  }

  (req as any).validationErrors = errors;
  next();
};

/**
 * Validation middleware for pagination query parameters
 */
export const validatePagination = (req: Request, res: Response, next: NextFunction): void => {
  const errors: ValidationError[] = [];
  const { page, limit, search } = req.query;

  if (page && (isNaN(Number(page)) || Number(page) < 1)) {
    errors.push({ field: 'page', message: 'Page must be a positive integer' });
  }

  if (limit && (isNaN(Number(limit)) || Number(limit) < 1 || Number(limit) > 100)) {
    errors.push({ field: 'limit', message: 'Limit must be between 1 and 100' });
  }

  if (search && typeof search === 'string' && !validators.isLength(search, 1, 100)) {
    errors.push({ field: 'search', message: 'Search query must be between 1 and 100 characters' });
  }

  (req as any).validationErrors = errors;
  next();
};

/**
 * Validation middleware for ticket booking
 */
export const validateTicketBooking = (req: Request, res: Response, next: NextFunction): void => {
  const errors: ValidationError[] = [];
  const { eventId, quantity } = req.body;

  if (!validators.isMongoId(eventId)) {
    errors.push({ field: 'eventId', message: 'Invalid event ID' });
  }

  if (!validators.isPositiveNumber(quantity) || quantity < 1 || quantity > 10) {
    errors.push({ field: 'quantity', message: 'Quantity must be between 1 and 10' });
  }

  (req as any).validationErrors = errors;
  next();
};

/**
 * Validation middleware for payment processing
 */
export const validatePayment = (req: Request, res: Response, next: NextFunction): void => {
  const errors: ValidationError[] = [];
  const { amount, currency, bookingId } = req.body;

  if (!validators.isPositiveNumber(amount) || amount < 0.01) {
    errors.push({ field: 'amount', message: 'Amount must be greater than 0' });
  }

  if (currency && !['USD', 'EUR', 'GBP'].includes(currency)) {
    errors.push({ field: 'currency', message: 'Currency must be USD, EUR, or GBP' });
  }

  if (!validators.isMongoId(bookingId)) {
    errors.push({ field: 'bookingId', message: 'Invalid booking ID' });
  }

  (req as any).validationErrors = errors;
  next();
};