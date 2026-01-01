"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateProfile = exports.getProfile = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../config/auth");
const User_1 = __importDefault(require("../models/User"));
const getProfile = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const user = await User_1.default.findById(userId).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({
            message: 'Profile retrieved successfully',
            user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const { firstName, lastName, phone, location, age, gender, interests, profileImage } = req.body;
        const updates = {};
        if (firstName)
            updates.firstName = firstName;
        if (lastName)
            updates.lastName = lastName;
        if (phone)
            updates.phone = phone;
        if (location)
            updates.location = location;
        if (age)
            updates.age = age;
        if (gender)
            updates.gender = gender;
        if (interests)
            updates.interests = interests;
        if (profileImage)
            updates.profileImage = profileImage;
        const user = await User_1.default.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({
            message: 'Profile updated successfully',
            user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfile = updateProfile;
const changePassword = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const { currentPassword, newPassword } = req.body;
        const user = await User_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const isValid = await bcryptjs_1.default.compare(currentPassword, user.password);
        if (!isValid) {
            res.status(400).json({ message: 'Current password is incorrect' });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, auth_1.authConfig.bcryptRounds);
        await User_1.default.findByIdAndUpdate(userId, { password: hashedPassword });
        res.status(200).json({ message: 'Password changed successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=userController.js.map