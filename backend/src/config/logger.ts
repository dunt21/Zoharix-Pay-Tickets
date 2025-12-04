export const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info',
  format: process.env.LOG_FORMAT || 'json',
  enableFileLogging: process.env.ENABLE_FILE_LOGGING === 'true' || false,
  logFilePath: process.env.LOG_FILE_PATH || 'logs/app.log',
  enableConsoleLogging: process.env.ENABLE_CONSOLE_LOGGING !== 'false', // Default true
  maxFileSize: parseInt(process.env.LOG_MAX_FILE_SIZE || '10485760'), // 10MB default
  maxFiles: parseInt(process.env.LOG_MAX_FILES || '5'),
};

export const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
} as const;

export type LogLevel = keyof typeof logLevels;