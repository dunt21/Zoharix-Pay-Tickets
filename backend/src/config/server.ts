export const serverConfig = {
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'localhost',
  nodeEnv: process.env.NODE_ENV || 'development',
  apiVersion: process.env.API_VERSION || 'v1',
  baseUrl: process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`,
};