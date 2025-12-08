"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../config/auth");
const User_1 = __importDefault(require("../models/User"));
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Access token is required' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, auth_1.authConfig.jwtSecret);
        const user = await User_1.default.findById(decoded.userId).select('-password');
        if (!user) {
            res.status(401).json({ message: 'User not found' });
            return;
        }
        if (!user.isVerified) {
            res.status(403).json({ message: 'Please verify your email first' });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({ message: 'Token expired' });
            return;
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        next(error);
    }
};
exports.authenticateToken = authenticateToken;
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, auth_1.authConfig.jwtSecret);
            const user = await User_1.default.findById(decoded.userId).select('-password');
            if (user) {
                req.user = user;
            }
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=authMiddleware.js.map