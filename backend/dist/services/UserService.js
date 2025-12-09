"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../config/auth");
class UserService {
    async getUserById(userId) {
        try {
            const user = await User_1.default.findById(userId).select('-password');
            if (!user)
                return null;
            return {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                profileImage: user.profileImage,
                phone: user.phone
            };
        }
        catch (error) {
            console.error('Failed to get user by ID:', error);
            throw new Error('Failed to retrieve user');
        }
    }
    async getUserByEmail(email) {
        try {
            return await User_1.default.findOne({ email });
        }
        catch (error) {
            console.error('Failed to get user by email:', error);
            throw new Error('Failed to retrieve user');
        }
    }
    async updateUserProfile(userId, updates) {
        try {
            const allowedUpdates = [
                'firstName', 'lastName', 'profileImage', 'phone'
            ];
            const filteredUpdates = {};
            Object.keys(updates).forEach(key => {
                if (allowedUpdates.includes(key)) {
                    filteredUpdates[key] = updates[key];
                }
            });
            const user = await User_1.default.findByIdAndUpdate(userId, filteredUpdates, { new: true, runValidators: true }).select('-password');
            if (!user) {
                throw new Error('User not found');
            }
            return {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
                profileImage: user.profileImage,
                phone: user.phone
            };
        }
        catch (error) {
            console.error('Failed to update user profile:', error);
            throw new Error('Failed to update profile');
        }
    }
    async changePassword(userId, currentPassword, newPassword) {
        try {
            const user = await User_1.default.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            const isValid = await bcryptjs_1.default.compare(currentPassword, user.password);
            if (!isValid) {
                throw new Error('Current password is incorrect');
            }
            const hashedPassword = await bcryptjs_1.default.hash(newPassword, auth_1.authConfig.bcryptRounds);
            await User_1.default.findByIdAndUpdate(userId, { password: hashedPassword });
        }
        catch (error) {
            console.error('Failed to change password:', error);
            throw new Error('Failed to change password');
        }
    }
    async generatePasswordResetToken(email) {
        try {
            const user = await this.getUserByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            const resetToken = jsonwebtoken_1.default.sign({ userId: user._id, type: 'password_reset' }, auth_1.authConfig.jwtSecret, { expiresIn: '1h' });
            return resetToken;
        }
        catch (error) {
            console.error('Failed to generate password reset token:', error);
            throw new Error('Failed to generate reset token');
        }
    }
    async resetPassword(token, newPassword) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, auth_1.authConfig.jwtSecret);
            if (decoded.type !== 'password_reset') {
                throw new Error('Invalid token type');
            }
            const hashedPassword = await bcryptjs_1.default.hash(newPassword, auth_1.authConfig.bcryptRounds);
            await User_1.default.findByIdAndUpdate(decoded.userId, { password: hashedPassword });
        }
        catch (error) {
            console.error('Failed to reset password:', error);
            throw new Error('Failed to reset password');
        }
    }
    async verifyEmail(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, auth_1.authConfig.jwtSecret);
            await User_1.default.findByIdAndUpdate(decoded.userId, { isVerified: true });
        }
        catch (error) {
            console.error('Failed to verify email:', error);
            throw new Error('Failed to verify email');
        }
    }
    async generateEmailVerificationToken(userId) {
        try {
            const token = jsonwebtoken_1.default.sign({ userId, type: 'email_verification' }, auth_1.authConfig.jwtSecret, { expiresIn: '24h' });
            return token;
        }
        catch (error) {
            console.error('Failed to generate email verification token:', error);
            throw new Error('Failed to generate verification token');
        }
    }
    async getUserStats(userId) {
        try {
            return {
                totalBookings: 0,
                totalSpent: 0,
                eventsOrganized: 0,
                memberSince: new Date()
            };
        }
        catch (error) {
            console.error('Failed to get user stats:', error);
            throw new Error('Failed to retrieve user statistics');
        }
    }
    async deactivateAccount(userId) {
        try {
            await User_1.default.findByIdAndUpdate(userId, {
                isActive: false,
                deactivatedAt: new Date()
            });
        }
        catch (error) {
            console.error('Failed to deactivate account:', error);
            throw new Error('Failed to deactivate account');
        }
    }
    async reactivateAccount(userId) {
        try {
            await User_1.default.findByIdAndUpdate(userId, {
                isActive: true,
                deactivatedAt: null
            });
        }
        catch (error) {
            console.error('Failed to reactivate account:', error);
            throw new Error('Failed to reactivate account');
        }
    }
    async deleteAccount(userId) {
        try {
            await User_1.default.findByIdAndDelete(userId);
        }
        catch (error) {
            console.error('Failed to delete account:', error);
            throw new Error('Failed to delete account');
        }
    }
    async getUsersByRole(role, page = 1, limit = 10) {
        try {
            const users = await User_1.default.find({ role })
                .select('-password')
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip((page - 1) * limit);
            const total = await User_1.default.countDocuments({ role });
            return {
                users,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            };
        }
        catch (error) {
            console.error('Failed to get users by role:', error);
            throw new Error('Failed to retrieve users');
        }
    }
    async updateUserRole(userId, newRole, adminUserId) {
        try {
            const allowedRoles = ['user', 'organizer', 'admin'];
            if (!allowedRoles.includes(newRole)) {
                throw new Error('Invalid role');
            }
            await User_1.default.findByIdAndUpdate(userId, { role: newRole });
        }
        catch (error) {
            console.error('Failed to update user role:', error);
            throw new Error('Failed to update user role');
        }
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map