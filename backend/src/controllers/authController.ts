import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { authConfig } from '../config/auth';
import User from '../models/User';
import EmailService from '../services/EmailService';

// Instantiate EmailService
const emailService = new EmailService({
  host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  port: parseInt(process.env.SMTP_PORT || '2525'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'Account does not exist. Please sign up first.' });
      return;
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate tokens
    const token = jwt.sign({ userId: user._id }, authConfig.jwtSecret as string, { expiresIn: authConfig.jwtExpiresIn } as any);
    const refreshToken = jwt.sign({ userId: user._id }, authConfig.refreshTokenSecret as string, { expiresIn: authConfig.refreshTokenExpiresIn } as any);

    res.status(200).json({
      message: 'Login successful',
      token,
      refreshToken,
      user: { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, firstName, lastName, phone, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, authConfig.bcryptRounds);

    // Create user
    const user = new User({
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
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Placeholder: Invalidate token (implement token blacklist if needed)
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.params;

    if (!token) {
      res.status(400).json({ message: 'Token is required' });
      return;
    }

    // Verify email token
    const decoded = jwt.verify(token, authConfig.jwtSecret as string) as jwt.JwtPayload;
    await User.findByIdAndUpdate(decoded.userId, { isVerified: true });

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      res.status(400).json({ message: 'Refresh token is required' });
      return;
    }

    // Verify refresh token
    const decoded = jwt.verify(token, authConfig.refreshTokenSecret as string) as jwt.JwtPayload;
    const newToken = jwt.sign({ userId: decoded.userId }, authConfig.jwtSecret as string, { expiresIn: authConfig.jwtExpiresIn } as any);

    res.status(200).json({
      message: 'Token refreshed',
      token: newToken
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log(`⚠️ Password reset requested for NON-EXISTENT user: ${email}`);
      // Security: Don't reveal if user exists
      res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
      return;
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Save to user with expiry (1 hour)
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    console.log(`✅ Password Reset Link Generated for ${email}:`);
    console.log(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`);

    // Send email
    try {
      // Using the raw token in the URL, verified against hash in DB
      await emailService.sendPasswordResetEmail(user.email, resetToken);
      
      // For development ease (remove in production)
      const devToken = process.env.NODE_ENV === 'development' ? resetToken : undefined;
      
      res.status(200).json({ 
        message: 'If an account with that email exists, a password reset link has been sent.',
        resetToken: devToken
      });
    } catch (emailError) {
      user.set('resetPasswordToken', undefined);
      user.set('resetPasswordExpires', undefined);
      await user.save();
      throw new Error('Email sending failed');
    }

  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token, newPassword } = req.body;

    // Hash the token from the URL to compare with DB
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      res.status(400).json({ message: 'Invalid or expired password reset token' });
      return;
    }

    // Set new password
    user.password = await bcrypt.hash(newPassword, authConfig.bcryptRounds);
    user.set('resetPasswordToken', undefined);
    user.set('resetPasswordExpires', undefined);
    await user.save();

    res.status(200).json({ message: 'Password reset successful. You can now log in with your new password.' });

  } catch (error) {
    next(error);
  }
};

// Google Auth
import passport from 'passport';

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' });

export const googleAuthCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Passport middleware puts the user in req.user
    const user = req.user as any;

    if (!user) {
        res.redirect(`${process.env.FRONTEND_URL}/login?error=Google_Auth_Failed`);
        return;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, authConfig.jwtSecret as string, {
      expiresIn: authConfig.jwtExpiresIn
    } as any);

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
  } catch (error) {
    next(error);
  }
};