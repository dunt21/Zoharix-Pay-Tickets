import { Request, Response, NextFunction } from 'express';

interface LogEntry {
  timestamp: string;
  method: string;
  url: string;
  userAgent?: string | undefined;
  ip: string;
  userId?: string | undefined;
  statusCode?: number | undefined;
  responseTime?: number | undefined;
  error?: string | undefined;
}

/**
 * Request logging middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();

  // Log request
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    userAgent: req.get('User-Agent'),
    ip: req.ip || req.connection.remoteAddress || 'unknown',
    userId: (req as any).user?._id?.toString()
  };

  console.log(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - IP: ${logEntry.ip}${logEntry.userId ? ` - User: ${logEntry.userId}` : ''}`);

  // Log response
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    logEntry.statusCode = res.statusCode;
    logEntry.responseTime = responseTime;

    console.log(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - ${res.statusCode} - ${responseTime}ms`);
  });

  // Log errors
  res.on('error', (error) => {
    logEntry.error = error.message;
    console.error(`[${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - Error: ${error.message}`);
  });

  next();
};

/**
 * Error logging middleware
 */
export const errorLogger = (error: any, req: Request, res: Response, next: NextFunction): void => {
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection.remoteAddress || 'unknown',
    userId: (req as any).user?._id?.toString(),
    error: error.message
  };

  console.error(`ERROR [${logEntry.timestamp}] ${logEntry.method} ${logEntry.url}`);
  console.error(`   Message: ${error.message}`);
  console.error(`   Stack: ${error.stack}`);
  console.error(`   IP: ${logEntry.ip}${logEntry.userId ? ` - User: ${logEntry.userId}` : ''}`);

  next(error);
};

/**
 * Security logging middleware - logs suspicious activities
 */
export const securityLogger = (req: Request, res: Response, next: NextFunction): void => {
  const suspiciousPatterns = [
    /\.\./,  // Directory traversal
    /<script/i,  // XSS attempts
    /union.*select/i,  // SQL injection
    /eval\(/i,  // Code injection
    /base64/i  // Base64 encoded attacks
  ];

  const requestData = JSON.stringify({
    body: req.body,
    query: req.query,
    params: req.params
  });

  const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(requestData));

  if (isSuspicious) {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      ip: req.ip || req.connection.remoteAddress || 'unknown',
      userId: (req as any).user?._id?.toString()
    };

    console.warn(`SECURITY ALERT [${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - IP: ${logEntry.ip}`);
    console.warn(`   Suspicious request data detected`);
  }

  next();
};

/**
 * Performance logging middleware - logs slow requests
 */
export const performanceLogger = (req: Request, res: Response, next: NextFunction): void => {
  const startTime = Date.now();
  const slowThreshold = 1000; // 1 second

  res.on('finish', () => {
    const responseTime = Date.now() - startTime;

    if (responseTime > slowThreshold) {
      const logEntry: LogEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress || 'unknown',
        userId: (req as any).user?._id?.toString(),
        statusCode: res.statusCode,
        responseTime
      };

      console.warn(`SLOW REQUEST [${logEntry.timestamp}] ${logEntry.method} ${logEntry.url} - ${responseTime}ms`);
    }
  });

  next();
};