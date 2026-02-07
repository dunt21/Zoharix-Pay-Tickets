"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceLogger = exports.securityLogger = exports.errorLogger = exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    const startTime = Date.now();
    const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        userAgent: req.get('User-Agent'),
        ip: req.ip || req.connection.remoteAddress || 'unknown',
        userId: req.user?._id?.toString()
    };
    console.log(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - IP: ${logEntry.ip}${logEntry.userId ? ` - User: ${logEntry.userId}` : ''}`);
    res.on('finish', () => {
        const responseTime = Date.now() - startTime;
        logEntry.statusCode = res.statusCode;
        logEntry.responseTime = responseTime;
        console.log(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - ${res.statusCode} - ${responseTime}ms`);
    });
    res.on('error', (error) => {
        logEntry.error = error.message;
        console.error(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - Error: ${error.message}`);
    });
    next();
};
exports.requestLogger = requestLogger;
const errorLogger = (error, req, res, next) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress || 'unknown',
        userId: req.user?._id?.toString(),
        error: error.message
    };
    console.error(`ERROR [${logEntry.timestamp}] ${logEntry.method} ${logEntry.url}`);
    console.error(`   Message: ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
    console.error(`   IP: ${logEntry.ip}${logEntry.userId ? ` - User: ${logEntry.userId}` : ''}`);
    next(error);
};
exports.errorLogger = errorLogger;
const securityLogger = (req, res, next) => {
    const suspiciousPatterns = [
        /\.\./,
        /<script/i,
        /union.*select/i,
        /eval\(/i,
        /base64/i
    ];
    const requestData = JSON.stringify({
        body: req.body,
        query: req.query,
        params: req.params
    });
    const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(requestData));
    if (isSuspicious) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            ip: req.ip || req.connection.remoteAddress || 'unknown',
            userId: req.user?._id?.toString()
        };
        console.warn(`SECURITY ALERT [${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - IP: ${logEntry.ip}`);
        console.warn(`   Suspicious request data detected`);
    }
    next();
};
exports.securityLogger = securityLogger;
const performanceLogger = (req, res, next) => {
    const startTime = Date.now();
    const slowThreshold = 1000;
    res.on('finish', () => {
        const responseTime = Date.now() - startTime;
        if (responseTime > slowThreshold) {
            const logEntry = {
                timestamp: new Date().toISOString(),
                method: req.method,
                url: req.originalUrl,
                ip: req.ip || req.connection.remoteAddress || 'unknown',
                userId: req.user?._id?.toString(),
                statusCode: res.statusCode,
                responseTime
            };
            console.warn(`SLOW REQUEST [${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - ${responseTime}ms`);
        }
    });
    next();
};
exports.performanceLogger = performanceLogger;
//# sourceMappingURL=loggingMiddleware.js.map