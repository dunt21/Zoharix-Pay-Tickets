import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { authConfig } from '../config/auth';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'organizer' | 'admin';
  isVerified: boolean;
  profileImage?: string | undefined;
  phone?: string | undefined;
}

interface PasswordResetToken {
  userId: string;
  token: string;
  expiresAt: Date;
}

class UserService {
  async getUserById(userId: string): Promise<UserProfile | null> {
    try {
      const user = await User.findById(userId).select('-password');
      if (!user) return null;

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        profileImage: user.profileImage,
        phone: user.phone
      };
    } catch (error) {
      console.error('Failed to get user by ID:', error);
      throw new Error('Failed to retrieve user');
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.error('Failed to get user by email:', error);
      throw new Error('Failed to retrieve user');
    }
  }

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const allowedUpdates = [
        'name', 'profileImage', 'phone'
      ];

      const filteredUpdates: any = {};
      Object.keys(updates).forEach(key => {
        if (allowedUpdates.includes(key)) {
          filteredUpdates[key] = updates[key as keyof UserProfile];
        }
      });

      const user = await User.findByIdAndUpdate(
        userId,
        filteredUpdates,
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        throw new Error('User not found');
      }

      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        profileImage: user.profileImage,
        phone: user.phone
      };
    } catch (error) {
      console.error('Failed to update user profile:', error);
      throw new Error('Failed to update profile');
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Verify current password
      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        throw new Error('Current password is incorrect');
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, authConfig.bcryptRounds);

      // Update password
      await User.findByIdAndUpdate(userId, { password: hashedPassword });
    } catch (error) {
      console.error('Failed to change password:', error);
      throw new Error('Failed to change password');
    }
  }

  async generatePasswordResetToken(email: string): Promise<string> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      // Generate reset token
      const resetToken = jwt.sign(
        { userId: user._id, type: 'password_reset' },
        authConfig.jwtSecret as string,
        { expiresIn: '1h' }
      );

      // TODO: Store reset token in database with expiration
      // For now, just return the token
      return resetToken;
    } catch (error) {
      console.error('Failed to generate password reset token:', error);
      throw new Error('Failed to generate reset token');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      // Verify token
      const decoded = jwt.verify(token, authConfig.jwtSecret as string) as any;

      if (decoded.type !== 'password_reset') {
        throw new Error('Invalid token type');
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, authConfig.bcryptRounds);

      // Update password
      await User.findByIdAndUpdate(decoded.userId, { password: hashedPassword });
    } catch (error) {
      console.error('Failed to reset password:', error);
      throw new Error('Failed to reset password');
    }
  }

  async verifyEmail(token: string): Promise<void> {
    try {
      const decoded = jwt.verify(token, authConfig.jwtSecret as string) as jwt.JwtPayload;
      await User.findByIdAndUpdate(decoded.userId, { isVerified: true });
    } catch (error) {
      console.error('Failed to verify email:', error);
      throw new Error('Failed to verify email');
    }
  }

  async generateEmailVerificationToken(userId: string): Promise<string> {
    try {
      const token = jwt.sign(
        { userId, type: 'email_verification' },
        authConfig.jwtSecret as string,
        { expiresIn: '24h' }
      );
      return token;
    } catch (error) {
      console.error('Failed to generate email verification token:', error);
      throw new Error('Failed to generate verification token');
    }
  }

  async getUserStats(userId: string): Promise<any> {
    try {
      // TODO: Implement user statistics
      // This would aggregate data from bookings, events, payments, etc.
      return {
        totalBookings: 0,
        totalSpent: 0,
        eventsOrganized: 0,
        memberSince: new Date()
      };
    } catch (error) {
      console.error('Failed to get user stats:', error);
      throw new Error('Failed to retrieve user statistics');
    }
  }

  async deactivateAccount(userId: string): Promise<void> {
    try {
      await User.findByIdAndUpdate(userId, {
        isActive: false,
        deactivatedAt: new Date()
      });
    } catch (error) {
      console.error('Failed to deactivate account:', error);
      throw new Error('Failed to deactivate account');
    }
  }

  async reactivateAccount(userId: string): Promise<void> {
    try {
      await User.findByIdAndUpdate(userId, {
        isActive: true,
        deactivatedAt: null
      });
    } catch (error) {
      console.error('Failed to reactivate account:', error);
      throw new Error('Failed to reactivate account');
    }
  }

  async deleteAccount(userId: string): Promise<void> {
    try {
      // TODO: Implement soft delete or complete removal
      // Consider GDPR compliance and data retention policies
      await User.findByIdAndDelete(userId);
    } catch (error) {
      console.error('Failed to delete account:', error);
      throw new Error('Failed to delete account');
    }
  }

  async getUsersByRole(role: string, page: number = 1, limit: number = 10): Promise<any> {
    try {
      const users = await User.find({ role })
        .select('-password')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip((page - 1) * limit);

      const total = await User.countDocuments({ role });

      return {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Failed to get users by role:', error);
      throw new Error('Failed to retrieve users');
    }
  }

  async updateUserRole(userId: string, newRole: string, adminUserId: string): Promise<void> {
    try {
      // TODO: Add authorization check to ensure only admins can change roles
      const allowedRoles = ['user', 'organizer', 'admin'];

      if (!allowedRoles.includes(newRole)) {
        throw new Error('Invalid role');
      }

      await User.findByIdAndUpdate(userId, { role: newRole });
    } catch (error) {
      console.error('Failed to update user role:', error);
      throw new Error('Failed to update user role');
    }
  }
}

export default UserService;