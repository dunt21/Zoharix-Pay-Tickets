/**
 * Additional validation utilities for Z-Events
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidMongoId = (id: string): boolean => {
  const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
  return mongoIdRegex.test(id);
};

export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const isFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date > new Date();
};

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
};

export const validateRequired = (value: any, fieldName: string): string | null => {
  if (value === null || value === undefined || value.toString().trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateLength = (value: string, min: number, max: number, fieldName: string): string | null => {
  if (value.length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  if (value.length > max) {
    return `${fieldName} must be at most ${max} characters`;
  }
  return null;
};

export const validateRange = (value: number, min: number, max: number, fieldName: string): string | null => {
  if (value < min) {
    return `${fieldName} must be at least ${min}`;
  }
  if (value > max) {
    return `${fieldName} must be at most ${max}`;
  }
  return null;
};

export const validateEnum = (value: string, allowedValues: string[], fieldName: string): string | null => {
  if (!allowedValues.includes(value)) {
    return `${fieldName} must be one of: ${allowedValues.join(', ')}`;
  }
  return null;
};

export const validateEventData = (data: any): Array<{ field: string; message: string }> => {
  const errors: Array<{ field: string; message: string }> = [];

  // Title validation
  const titleError = validateRequired(data.title, 'Title');
  if (titleError) errors.push({ field: 'title', message: titleError });

  const titleLengthError = validateLength(data.title || '', 3, 100, 'Title');
  if (titleLengthError) errors.push({ field: 'title', message: titleLengthError });

  // Description validation
  const descError = validateRequired(data.description, 'Description');
  if (descError) errors.push({ field: 'description', message: descError });

  const descLengthError = validateLength(data.description || '', 10, 1000, 'Description');
  if (descLengthError) errors.push({ field: 'description', message: descLengthError });

  // Date validation
  if (!isValidDate(data.date)) {
    errors.push({ field: 'date', message: 'Invalid date format' });
  } else if (!isFutureDate(data.date)) {
    errors.push({ field: 'date', message: 'Event date must be in the future' });
  }

  // Capacity validation
  const capacityError = validateRange(data.capacity || 0, 1, 10000, 'Capacity');
  if (capacityError) errors.push({ field: 'capacity', message: capacityError });

  // Price validation
  if (data.price < 0) {
    errors.push({ field: 'price', message: 'Price cannot be negative' });
  }

  return errors;
};

export const validateUserData = (data: any): Array<{ field: string; message: string }> => {
  const errors: Array<{ field: string; message: string }> = [];

  // Email validation
  if (!isValidEmail(data.email || '')) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }

  // Name validation
  const nameError = validateRequired(data.name, 'Name');
  if (nameError) errors.push({ field: 'name', message: nameError });

  const nameLengthError = validateLength(data.name || '', 2, 50, 'Name');
  if (nameLengthError) errors.push({ field: 'name', message: nameLengthError });

  // Password validation (only for registration)
  if (data.password && !isValidPassword(data.password)) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 8 characters with uppercase, lowercase, and number'
    });
  }

  return errors;
};