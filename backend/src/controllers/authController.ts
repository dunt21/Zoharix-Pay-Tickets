import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth';
import User from '../models/User';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
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
      user: { id: user._id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, authConfig.bcryptRounds);

    // Create user
    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      user: { id: user._id, email: user.email, name: user.name }
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