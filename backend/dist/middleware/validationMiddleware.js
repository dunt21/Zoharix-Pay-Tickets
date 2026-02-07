"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePayment = exports.validateTicketBooking = exports.validatePagination = exports.validateUserId = exports.validateEventId = exports.validateEventCreation = exports.validateLogin = exports.validateSignup = exports.handleValidationErrors = exports.logSchemaValidation = void 0;
const logSchemaValidation = (req, res, next) => {
    const { body } = req;
    const route = req.originalUrl;
    if (route.includes('/auth/signup') && body) {
        if (body.firstName && body.lastName && !body.name) {
            console.log('Schema validation: Signup using firstName/lastName fields correctly');
        }
        else if (body.name) {
            console.warn('Schema mismatch: Signup still using single name field instead of firstName/lastName');
        }
    }
    if (route.includes('/events') && body?.location) {
        if (typeof body.location === 'string') {
            console.log('Schema validation: Event location is string as expected');
        }
        else if (typeof body.location === 'object') {
            console.warn('Schema mismatch: Event location is object instead of string');
        }
    }
    if (route.includes('/bookings') && body) {
        if (body.type === 'service' && body.service && !body.event) {
            console.log('Schema validation: Service booking correctly structured');
        }
        else if (body.type === 'event' && body.event && !body.service) {
            console.log('Schema validation: Event booking correctly structured');
        }
        else {
            console.warn('Schema mismatch: Booking type and references do not match');
        }
    }
    next();
};
exports.logSchemaValidation = logSchemaValidation;
const validators = {
    isEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    isMongoId: (id) => {
        const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
        return mongoIdRegex.test(id);
    },
    isNotEmpty: (value) => {
        return value !== null && value !== undefined && value.toString().trim().length > 0;
    },
    isLength: (value, min, max) => {
        const len = value.length;
        if (max !== undefined) {
            return len >= min && len <= max;
        }
        return len >= min;
    },
    isPositiveNumber: (value) => {
        const num = Number(value);
        return !isNaN(num) && num >= 0;
    },
    isFutureDate: (dateString) => {
        const date = new Date(dateString);
        return date > new Date();
    }
};
const handleValidationErrors = (req, res, next) => {
    const errors = req.validationErrors || [];
    if (errors.length > 0) {
        res.status(400).json({
            message: 'Validation failed',
            errors
        });
        return;
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
const validateSignup = (req, res, next) => {
    const errors = [];
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
    req.validationErrors = errors;
    next();
};
exports.validateSignup = validateSignup;
const validateLogin = (req, res, next) => {
    const errors = [];
    const { email, password } = req.body;
    if (!validators.isNotEmpty(email) || !validators.isEmail(email)) {
        errors.push({ field: 'email', message: 'Please provide a valid email' });
    }
    if (!validators.isNotEmpty(password)) {
        errors.push({ field: 'password', message: 'Password is required' });
    }
    req.validationErrors = errors;
    next();
};
exports.validateLogin = validateLogin;
const validateEventCreation = (req, res, next) => {
    const errors = [];
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
    req.validationErrors = errors;
    next();
};
exports.validateEventCreation = validateEventCreation;
const validateEventId = (req, res, next) => {
    const errors = [];
    const { eventId } = req.params;
    if (!eventId || !validators.isMongoId(eventId)) {
        errors.push({ field: 'eventId', message: 'Invalid event ID' });
    }
    req.validationErrors = errors;
    next();
};
exports.validateEventId = validateEventId;
const validateUserId = (req, res, next) => {
    const errors = [];
    const { userId } = req.params;
    if (!userId || !validators.isMongoId(userId)) {
        errors.push({ field: 'userId', message: 'Invalid user ID' });
    }
    req.validationErrors = errors;
    next();
};
exports.validateUserId = validateUserId;
const validatePagination = (req, res, next) => {
    const errors = [];
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
    req.validationErrors = errors;
    next();
};
exports.validatePagination = validatePagination;
const validateTicketBooking = (req, res, next) => {
    const errors = [];
    const { eventId, quantity } = req.body;
    if (!validators.isMongoId(eventId)) {
        errors.push({ field: 'eventId', message: 'Invalid event ID' });
    }
    if (!validators.isPositiveNumber(quantity) || quantity < 1 || quantity > 10) {
        errors.push({ field: 'quantity', message: 'Quantity must be between 1 and 10' });
    }
    req.validationErrors = errors;
    next();
};
exports.validateTicketBooking = validateTicketBooking;
const validatePayment = (req, res, next) => {
    const errors = [];
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
    req.validationErrors = errors;
    next();
};
exports.validatePayment = validatePayment;
//# sourceMappingURL=validationMiddleware.js.map