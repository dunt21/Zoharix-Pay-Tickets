export const rateLimitConfig = {
  // General API rate limiting
  general: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  },

  // Authentication endpoints (more restrictive)
  auth: {
    windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS || '300000'), // 5 minutes
    max: parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS || '5'), // limit each IP to 5 auth requests per windowMs
    message: 'Too many authentication attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  },

  // Payment endpoints (very restrictive)
  payment: {
    windowMs: parseInt(process.env.PAYMENT_RATE_LIMIT_WINDOW_MS || '600000'), // 10 minutes
    max: parseInt(process.env.PAYMENT_RATE_LIMIT_MAX_REQUESTS || '3'), // limit each IP to 3 payment requests per windowMs
    message: 'Too many payment attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  },

  // Skip rate limiting for these IPs (comma-separated)
  skip: (req: any, res: any) => {
    const skipIps = process.env.RATE_LIMIT_SKIP_IPS
      ? process.env.RATE_LIMIT_SKIP_IPS.split(',')
      : [];
    return skipIps.includes(req.ip);
  },
};