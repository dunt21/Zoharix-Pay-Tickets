"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitConfig = void 0;
exports.rateLimitConfig = {
    general: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
        max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
        message: 'Too many requests from this IP, please try again later.',
        standardHeaders: true,
        legacyHeaders: false,
    },
    auth: {
        windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS || '300000'),
        max: parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS || '5'),
        message: 'Too many authentication attempts, please try again later.',
        standardHeaders: true,
        legacyHeaders: false,
    },
    payment: {
        windowMs: parseInt(process.env.PAYMENT_RATE_LIMIT_WINDOW_MS || '600000'),
        max: parseInt(process.env.PAYMENT_RATE_LIMIT_MAX_REQUESTS || '3'),
        message: 'Too many payment attempts, please try again later.',
        standardHeaders: true,
        legacyHeaders: false,
    },
    skip: (req, res) => {
        const skipIps = process.env.RATE_LIMIT_SKIP_IPS
            ? process.env.RATE_LIMIT_SKIP_IPS.split(',')
            : [];
        return skipIps.includes(req.ip);
    },
};
//# sourceMappingURL=rateLimit.js.map