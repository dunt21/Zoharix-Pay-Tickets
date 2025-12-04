import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// Import configurations
import connectDB from './config/database';
import { serverConfig } from './config/server';
import { corsOptions } from './config/cors';
import { rateLimitConfig } from './config/rateLimit';

// Connect to database
connectDB();

// Create Express app
const app = express();

// Trust proxy for rate limiting behind reverse proxy
app.set('trust proxy', 1);

// CORS middleware
app.use(cors(corsOptions));

// Rate limiting
app.use('/api/', rateLimit(rateLimitConfig.general));

// Auth rate limiting
app.use('/api/auth/', rateLimit(rateLimitConfig.auth));

// Payment rate limiting
app.use('/api/payment/', rateLimit(rateLimitConfig.payment));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: serverConfig.nodeEnv,
    version: serverConfig.apiVersion
  });
});

// API routes prefix
app.use(`/api/${serverConfig.apiVersion}`, (req, res) => {
  res.status(200).json({
    message: 'API is working',
    version: serverConfig.apiVersion
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(serverConfig.nodeEnv === 'development' && { stack: err.stack })
  });
});

// Start server
const server = app.listen(serverConfig.port, () => {
  console.log(` Server running on ${serverConfig.baseUrl}`);
  console.log(` Environment: ${serverConfig.nodeEnv}`);
  console.log(` API Version: ${serverConfig.apiVersion}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;