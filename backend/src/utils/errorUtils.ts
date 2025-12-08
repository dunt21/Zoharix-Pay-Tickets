import { Response } from 'express';

/**
 * Error handling utilities for Z-Events
 */

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  public errors: Array<{ field: string; message: string }>;

  constructor(errors: Array<{ field: string; message: string }>) {
    super('Validation failed', 400);
    this.errors = errors;
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409);
  }
}

export const handleError = (error: any, res: Response): void => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error.name === 'ValidationError') {
    // Mongoose validation error
    statusCode = 400;
    message = 'Validation failed';
  } else if (error.name === 'CastError') {
    // Mongoose cast error
    statusCode = 400;
    message = 'Invalid data format';
  } else if (error.code === 11000) {
    // MongoDB duplicate key error
    statusCode = 409;
    message = 'Duplicate entry';
  }

  // Log error
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    statusCode
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    timestamp: new Date().toISOString()
  });
};

export const asyncHandler = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const createErrorResponse = (message: string, statusCode: number = 500) => {
  return {
    success: false,
    message,
    statusCode,
    timestamp: new Date().toISOString()
  };
};