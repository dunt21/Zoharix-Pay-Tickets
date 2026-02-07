import { Response } from 'express';

/**
 * Standardized API response utilities for Z-Events
 */

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string | undefined;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  timestamp: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages?: number;
}

export const createSuccessResponse = <T>(
  message: string,
  data?: T,
  pagination?: PaginationData
): ApiResponse<T> => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    timestamp: new Date().toISOString()
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (pagination) {
    response.pagination = {
      ...pagination,
      pages: pagination.pages || Math.ceil(pagination.total / pagination.limit)
    };
  }

  return response;
};

export const createErrorResponse = (
  message: string,
  error?: string,
  statusCode?: number
): ApiResponse => {
  return {
    success: false,
    message,
    error,
    timestamp: new Date().toISOString()
  };
};

export const sendSuccessResponse = <T>(
  res: Response,
  statusCode: number = 200,
  message: string,
  data?: T,
  pagination?: PaginationData
): void => {
  const response = createSuccessResponse(message, data, pagination);
  res.status(statusCode).json(response);
};

export const sendErrorResponse = (
  res: Response,
  statusCode: number = 500,
  message: string,
  error?: string
): void => {
  const response = createErrorResponse(message, error);
  res.status(statusCode).json(response);
};

export const sendCreatedResponse = <T>(
  res: Response,
  message: string,
  data?: T
): void => {
  sendSuccessResponse(res, 201, message, data);
};

export const sendNoContentResponse = (res: Response): void => {
  res.status(204).send();
};

export const sendBadRequestResponse = (
  res: Response,
  message: string = 'Bad Request',
  error?: string
): void => {
  sendErrorResponse(res, 400, message, error);
};

export const sendUnauthorizedResponse = (
  res: Response,
  message: string = 'Unauthorized'
): void => {
  sendErrorResponse(res, 401, message);
};

export const sendForbiddenResponse = (
  res: Response,
  message: string = 'Forbidden'
): void => {
  sendErrorResponse(res, 403, message);
};

export const sendNotFoundResponse = (
  res: Response,
  message: string = 'Not Found'
): void => {
  sendErrorResponse(res, 404, message);
};

export const sendConflictResponse = (
  res: Response,
  message: string = 'Conflict',
  error?: string
): void => {
  sendErrorResponse(res, 409, message, error);
};

export const sendValidationErrorResponse = (
  res: Response,
  errors: Array<{ field: string; message: string }>
): void => {
  sendErrorResponse(res, 400, 'Validation failed', JSON.stringify(errors));
};

export const sendInternalServerErrorResponse = (
  res: Response,
  message: string = 'Internal Server Error',
  error?: string
): void => {
  sendErrorResponse(res, 500, message, error);
};

// Utility functions for common responses
export const sendLoginSuccessResponse = (
  res: Response,
  token: string,
  refreshToken: string,
  user: any
): void => {
  sendSuccessResponse(res, 200, 'Login successful', {
    token,
    refreshToken,
    user
  });
};

export const sendRegistrationSuccessResponse = (
  res: Response,
  user: any
): void => {
  sendCreatedResponse(res, 'User created successfully', { user });
};

export const sendEventCreatedResponse = (
  res: Response,
  event: any
): void => {
  sendCreatedResponse(res, 'Event created successfully', { event });
};

export const sendBookingCreatedResponse = (
  res: Response,
  booking: any
): void => {
  sendCreatedResponse(res, 'Ticket booked successfully', { booking });
};

export const sendPaymentSuccessResponse = (
  res: Response,
  payment: any
): void => {
  sendSuccessResponse(res, 200, 'Payment processed successfully', { payment });
};