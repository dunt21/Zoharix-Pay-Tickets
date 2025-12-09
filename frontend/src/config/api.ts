export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  VERIFY_EMAIL: '/auth/verify',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Users
  PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
  CHANGE_PASSWORD: '/users/change-password',
  
  // Events
  EVENTS: '/events',
  CREATE_EVENT: '/events',
  UPDATE_EVENT: (id: string) => `/events/${id}`,
  DELETE_EVENT: (id: string) => `/events/${id}`,
  
  // Tickets
  BOOK_TICKET: '/tickets/book',
  MY_TICKETS: '/tickets/my-tickets',
  
  // Payments
  CREATE_PAYMENT: '/payments/create',
  PAYMENT_STATUS: (id: string) => `/payments/${id}`,
  
  // Dashboard
  DASHBOARD_STATS: '/dashboard/stats',
  ANALYTICS: '/dashboard/analytics',
};
