// Authentication middleware
export { authenticateToken, optionalAuth } from './authMiddleware';

// Role-based authorization middleware
export {
  requireRole,
  requireOneOfRoles,
  requireAdmin,
  requireOrganizerOrAdmin,
  requireOrganizer,
  requireOwnershipOrAdmin
} from './roleMiddleware';

// Validation middleware
export {
  handleValidationErrors,
  validateSignup,
  validateLogin,
  validateEventCreation,
  validateEventId,
  validateUserId,
  validatePagination,
  validateTicketBooking,
  validatePayment
} from './validationMiddleware';

// Upload middleware
export {
  uploadSingle,
  uploadMultiple,
  uploadFields,
  handleUploadError
} from './uploadMiddleware';

// Logging middleware
export {
  requestLogger,
  errorLogger,
  securityLogger,
  performanceLogger
} from './loggingMiddleware';