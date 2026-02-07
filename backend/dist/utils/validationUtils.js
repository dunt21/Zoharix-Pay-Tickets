"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserData = exports.validateEventData = exports.validateEnum = exports.validateRange = exports.validateLength = exports.validateRequired = exports.sanitizeString = exports.isFutureDate = exports.isValidDate = exports.isValidMongoId = exports.isValidURL = exports.isValidPhoneNumber = exports.isValidPassword = exports.isValidEmail = void 0;
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
exports.isValidEmail = isValidEmail;
const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};
exports.isValidPassword = isValidPassword;
const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
};
exports.isValidPhoneNumber = isValidPhoneNumber;
const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
};
exports.isValidURL = isValidURL;
const isValidMongoId = (id) => {
    const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
    return mongoIdRegex.test(id);
};
exports.isValidMongoId = isValidMongoId;
const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};
exports.isValidDate = isValidDate;
const isFutureDate = (dateString) => {
    const date = new Date(dateString);
    return date > new Date();
};
exports.isFutureDate = isFutureDate;
const sanitizeString = (str) => {
    return str.trim().replace(/[<>]/g, '');
};
exports.sanitizeString = sanitizeString;
const validateRequired = (value, fieldName) => {
    if (value === null || value === undefined || value.toString().trim() === '') {
        return `${fieldName} is required`;
    }
    return null;
};
exports.validateRequired = validateRequired;
const validateLength = (value, min, max, fieldName) => {
    if (value.length < min) {
        return `${fieldName} must be at least ${min} characters`;
    }
    if (value.length > max) {
        return `${fieldName} must be at most ${max} characters`;
    }
    return null;
};
exports.validateLength = validateLength;
const validateRange = (value, min, max, fieldName) => {
    if (value < min) {
        return `${fieldName} must be at least ${min}`;
    }
    if (value > max) {
        return `${fieldName} must be at most ${max}`;
    }
    return null;
};
exports.validateRange = validateRange;
const validateEnum = (value, allowedValues, fieldName) => {
    if (!allowedValues.includes(value)) {
        return `${fieldName} must be one of: ${allowedValues.join(', ')}`;
    }
    return null;
};
exports.validateEnum = validateEnum;
const validateEventData = (data) => {
    const errors = [];
    const titleError = (0, exports.validateRequired)(data.title, 'Title');
    if (titleError)
        errors.push({ field: 'title', message: titleError });
    const titleLengthError = (0, exports.validateLength)(data.title || '', 3, 100, 'Title');
    if (titleLengthError)
        errors.push({ field: 'title', message: titleLengthError });
    const descError = (0, exports.validateRequired)(data.description, 'Description');
    if (descError)
        errors.push({ field: 'description', message: descError });
    const descLengthError = (0, exports.validateLength)(data.description || '', 10, 1000, 'Description');
    if (descLengthError)
        errors.push({ field: 'description', message: descLengthError });
    if (!(0, exports.isValidDate)(data.date)) {
        errors.push({ field: 'date', message: 'Invalid date format' });
    }
    else if (!(0, exports.isFutureDate)(data.date)) {
        errors.push({ field: 'date', message: 'Event date must be in the future' });
    }
    const capacityError = (0, exports.validateRange)(data.capacity || 0, 1, 10000, 'Capacity');
    if (capacityError)
        errors.push({ field: 'capacity', message: capacityError });
    if (data.price < 0) {
        errors.push({ field: 'price', message: 'Price cannot be negative' });
    }
    return errors;
};
exports.validateEventData = validateEventData;
const validateUserData = (data) => {
    const errors = [];
    if (!(0, exports.isValidEmail)(data.email || '')) {
        errors.push({ field: 'email', message: 'Invalid email format' });
    }
    const nameError = (0, exports.validateRequired)(data.name, 'Name');
    if (nameError)
        errors.push({ field: 'name', message: nameError });
    const nameLengthError = (0, exports.validateLength)(data.name || '', 2, 50, 'Name');
    if (nameLengthError)
        errors.push({ field: 'name', message: nameLengthError });
    if (data.password && !(0, exports.isValidPassword)(data.password)) {
        errors.push({
            field: 'password',
            message: 'Password must be at least 8 characters with uppercase, lowercase, and number'
        });
    }
    return errors;
};
exports.validateUserData = validateUserData;
//# sourceMappingURL=validationUtils.js.map