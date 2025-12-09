"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPaymentSuccessResponse = exports.sendBookingCreatedResponse = exports.sendEventCreatedResponse = exports.sendRegistrationSuccessResponse = exports.sendLoginSuccessResponse = exports.sendInternalServerErrorResponse = exports.sendValidationErrorResponse = exports.sendConflictResponse = exports.sendNotFoundResponse = exports.sendForbiddenResponse = exports.sendUnauthorizedResponse = exports.sendBadRequestResponse = exports.sendNoContentResponse = exports.sendCreatedResponse = exports.sendErrorResponse = exports.sendSuccessResponse = exports.createErrorResponse = exports.createSuccessResponse = void 0;
const createSuccessResponse = (message, data, pagination) => {
    const response = {
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
exports.createSuccessResponse = createSuccessResponse;
const createErrorResponse = (message, error, statusCode) => {
    return {
        success: false,
        message,
        error,
        timestamp: new Date().toISOString()
    };
};
exports.createErrorResponse = createErrorResponse;
const sendSuccessResponse = (res, statusCode = 200, message, data, pagination) => {
    const response = (0, exports.createSuccessResponse)(message, data, pagination);
    res.status(statusCode).json(response);
};
exports.sendSuccessResponse = sendSuccessResponse;
const sendErrorResponse = (res, statusCode = 500, message, error) => {
    const response = (0, exports.createErrorResponse)(message, error);
    res.status(statusCode).json(response);
};
exports.sendErrorResponse = sendErrorResponse;
const sendCreatedResponse = (res, message, data) => {
    (0, exports.sendSuccessResponse)(res, 201, message, data);
};
exports.sendCreatedResponse = sendCreatedResponse;
const sendNoContentResponse = (res) => {
    res.status(204).send();
};
exports.sendNoContentResponse = sendNoContentResponse;
const sendBadRequestResponse = (res, message = 'Bad Request', error) => {
    (0, exports.sendErrorResponse)(res, 400, message, error);
};
exports.sendBadRequestResponse = sendBadRequestResponse;
const sendUnauthorizedResponse = (res, message = 'Unauthorized') => {
    (0, exports.sendErrorResponse)(res, 401, message);
};
exports.sendUnauthorizedResponse = sendUnauthorizedResponse;
const sendForbiddenResponse = (res, message = 'Forbidden') => {
    (0, exports.sendErrorResponse)(res, 403, message);
};
exports.sendForbiddenResponse = sendForbiddenResponse;
const sendNotFoundResponse = (res, message = 'Not Found') => {
    (0, exports.sendErrorResponse)(res, 404, message);
};
exports.sendNotFoundResponse = sendNotFoundResponse;
const sendConflictResponse = (res, message = 'Conflict', error) => {
    (0, exports.sendErrorResponse)(res, 409, message, error);
};
exports.sendConflictResponse = sendConflictResponse;
const sendValidationErrorResponse = (res, errors) => {
    (0, exports.sendErrorResponse)(res, 400, 'Validation failed', JSON.stringify(errors));
};
exports.sendValidationErrorResponse = sendValidationErrorResponse;
const sendInternalServerErrorResponse = (res, message = 'Internal Server Error', error) => {
    (0, exports.sendErrorResponse)(res, 500, message, error);
};
exports.sendInternalServerErrorResponse = sendInternalServerErrorResponse;
const sendLoginSuccessResponse = (res, token, refreshToken, user) => {
    (0, exports.sendSuccessResponse)(res, 200, 'Login successful', {
        token,
        refreshToken,
        user
    });
};
exports.sendLoginSuccessResponse = sendLoginSuccessResponse;
const sendRegistrationSuccessResponse = (res, user) => {
    (0, exports.sendCreatedResponse)(res, 'User created successfully', { user });
};
exports.sendRegistrationSuccessResponse = sendRegistrationSuccessResponse;
const sendEventCreatedResponse = (res, event) => {
    (0, exports.sendCreatedResponse)(res, 'Event created successfully', { event });
};
exports.sendEventCreatedResponse = sendEventCreatedResponse;
const sendBookingCreatedResponse = (res, booking) => {
    (0, exports.sendCreatedResponse)(res, 'Ticket booked successfully', { booking });
};
exports.sendBookingCreatedResponse = sendBookingCreatedResponse;
const sendPaymentSuccessResponse = (res, payment) => {
    (0, exports.sendSuccessResponse)(res, 200, 'Payment processed successfully', { payment });
};
exports.sendPaymentSuccessResponse = sendPaymentSuccessResponse;
//# sourceMappingURL=responseUtils.js.map