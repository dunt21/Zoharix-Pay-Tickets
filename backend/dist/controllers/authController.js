"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.verifyEmail = exports.logout = exports.signup = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../config/auth");
const User_1 = __importDefault(require("../models/User"));
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, auth_1.authConfig.jwtSecret, { expiresIn: auth_1.authConfig.jwtExpiresIn });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id }, auth_1.authConfig.refreshTokenSecret, { expiresIn: auth_1.authConfig.refreshTokenExpiresIn });
        res.status(200).json({
            message: 'Login successful',
            token,
            refreshToken,
            user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const signup = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, phone, role } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, auth_1.authConfig.bcryptRounds);
        const user = new User_1.default({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
            role: role || 'user'
        });
        await user.save();
        res.status(201).json({
            message: 'User created successfully',
            user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.signup = signup;
const logout = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.params;
        if (!token) {
            res.status(400).json({ message: 'Token is required' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, auth_1.authConfig.jwtSecret);
        await User_1.default.findByIdAndUpdate(decoded.userId, { isVerified: true });
        res.status(200).json({ message: 'Email verified successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyEmail = verifyEmail;
const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken: token } = req.body;
        if (!token) {
            res.status(400).json({ message: 'Refresh token is required' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, auth_1.authConfig.refreshTokenSecret);
        const newToken = jsonwebtoken_1.default.sign({ userId: decoded.userId }, auth_1.authConfig.jwtSecret, { expiresIn: auth_1.authConfig.jwtExpiresIn });
        res.status(200).json({
            message: 'Token refreshed',
            token: newToken
        });
    }
    catch (error) {
        next(error);
    }
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=authController.js.map