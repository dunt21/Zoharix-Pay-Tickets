import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { authConfig } from '../config/auth';
import User from '../models/User';

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Assume req.user is set by auth middleware
    const userId = (req as any).user?.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      message: 'Profile retrieved successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { firstName, lastName, phone, location, age, gender, interests, profileImage } = req.body;

    // Construct update object with allowed fields
    const updates: any = {};
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (phone) updates.phone = phone;
    if (location) updates.location = location;
    if (age) updates.age = age;
    if (gender) updates.gender = gender;
    if (interests) updates.interests = interests;
    if (profileImage) updates.profileImage = profileImage;

    // Update user
    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const { currentPassword, newPassword } = req.body;

    // Find user and verify current password
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      res.status(400).json({ message: 'Current password is incorrect' });
      return;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, authConfig.bcryptRounds);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};