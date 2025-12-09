"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToTimezone = exports.getTimezoneOffset = exports.formatRelativeTime = exports.parseDate = exports.getEndOfMonth = exports.getStartOfMonth = exports.getEndOfWeek = exports.getStartOfWeek = exports.getEndOfDay = exports.getStartOfDay = exports.addMinutes = exports.addHours = exports.addDays = exports.getDaysDifference = exports.isWithinDays = exports.isTomorrow = exports.isToday = exports.isPastDate = exports.isFutureDate = exports.formatTime = exports.formatDateShort = exports.formatDate = void 0;
const formatDate = (date, options) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(date);
};
exports.formatDate = formatDate;
const formatDateShort = (date) => {
    return (0, exports.formatDate)(date, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};
exports.formatDateShort = formatDateShort;
const formatTime = (date) => {
    return (0, exports.formatDate)(date, {
        hour: '2-digit',
        minute: '2-digit'
    });
};
exports.formatTime = formatTime;
const isFutureDate = (date) => {
    return date > new Date();
};
exports.isFutureDate = isFutureDate;
const isPastDate = (date) => {
    return date < new Date();
};
exports.isPastDate = isPastDate;
const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
};
exports.isToday = isToday;
const isTomorrow = (date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.toDateString() === tomorrow.toDateString();
};
exports.isTomorrow = isTomorrow;
const isWithinDays = (date, days) => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    return date <= futureDate && date >= now;
};
exports.isWithinDays = isWithinDays;
const getDaysDifference = (date1, date2) => {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
exports.getDaysDifference = getDaysDifference;
const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
exports.addDays = addDays;
const addHours = (date, hours) => {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
};
exports.addHours = addHours;
const addMinutes = (date, minutes) => {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
};
exports.addMinutes = addMinutes;
const getStartOfDay = (date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    return start;
};
exports.getStartOfDay = getStartOfDay;
const getEndOfDay = (date) => {
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return end;
};
exports.getEndOfDay = getEndOfDay;
const getStartOfWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day;
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    return start;
};
exports.getStartOfWeek = getStartOfWeek;
const getEndOfWeek = (date) => {
    const end = new Date(date);
    const day = end.getDay();
    const diff = end.getDate() + (6 - day);
    end.setDate(diff);
    end.setHours(23, 59, 59, 999);
    return end;
};
exports.getEndOfWeek = getEndOfWeek;
const getStartOfMonth = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    return start;
};
exports.getStartOfMonth = getStartOfMonth;
const getEndOfMonth = (date) => {
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
    return end;
};
exports.getEndOfMonth = getEndOfMonth;
const parseDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
};
exports.parseDate = parseDate;
const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60)
        return 'just now';
    if (diffInSeconds < 3600)
        return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return (0, exports.formatDateShort)(date);
};
exports.formatRelativeTime = formatRelativeTime;
const getTimezoneOffset = () => {
    const offset = new Date().getTimezoneOffset();
    const hours = Math.abs(Math.floor(offset / 60));
    const minutes = Math.abs(offset % 60);
    const sign = offset > 0 ? '-' : '+';
    return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
exports.getTimezoneOffset = getTimezoneOffset;
const convertToTimezone = (date, timezone) => {
    return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
};
exports.convertToTimezone = convertToTimezone;
//# sourceMappingURL=dateUtils.js.map