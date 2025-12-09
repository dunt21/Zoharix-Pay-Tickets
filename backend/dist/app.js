"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const database_1 = __importDefault(require("./config/database"));
const server_1 = require("./config/server");
const cors_2 = require("./config/cors");
const rateLimit_1 = require("./config/rateLimit");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
const dashboardRoutes_1 = __importDefault(require("./routes/dashboardRoutes"));
(0, database_1.default)();
const app = (0, express_1.default)();
app.set('trust proxy', 1);
app.use((0, cors_1.default)(cors_2.corsOptions));
app.use('/api/', (0, express_rate_limit_1.default)(rateLimit_1.rateLimitConfig.general));
app.use('/api/auth/', (0, express_rate_limit_1.default)(rateLimit_1.rateLimitConfig.auth));
app.use('/api/payment/', (0, express_rate_limit_1.default)(rateLimit_1.rateLimitConfig.payment));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        environment: server_1.serverConfig.nodeEnv,
        version: server_1.serverConfig.apiVersion
    });
});
app.use(`/api/${server_1.serverConfig.apiVersion}/auth`, authRoutes_1.default);
app.use(`/api/${server_1.serverConfig.apiVersion}/events`, eventRoutes_1.default);
app.use(`/api/${server_1.serverConfig.apiVersion}/users`, userRoutes_1.default);
app.use(`/api/${server_1.serverConfig.apiVersion}/tickets`, ticketRoutes_1.default);
app.use(`/api/${server_1.serverConfig.apiVersion}/payments`, paymentRoutes_1.default);
app.use(`/api/${server_1.serverConfig.apiVersion}/dashboard`, dashboardRoutes_1.default);
app.get(`/api/${server_1.serverConfig.apiVersion}`, (req, res) => {
    res.status(200).json({
        message: 'API is working',
        version: server_1.serverConfig.apiVersion
    });
});
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl,
        method: req.method
    });
});
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        ...(server_1.serverConfig.nodeEnv === 'development' && { stack: err.stack })
    });
});
const server = app.listen(server_1.serverConfig.port, () => {
    console.log(` Server running on ${server_1.serverConfig.baseUrl}`);
    console.log(` Environment: ${server_1.serverConfig.nodeEnv}`);
    console.log(` API Version: ${server_1.serverConfig.apiVersion}`);
});
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
exports.default = app;
//# sourceMappingURL=app.js.map