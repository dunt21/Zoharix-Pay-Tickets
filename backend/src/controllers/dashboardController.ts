import { Request, Response, NextFunction } from 'express';
import dashboardService from '../services/DashboardService';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const stats = await dashboardService.getDashboardStats(userId);

    res.status(200).json({
      message: 'Dashboard stats retrieved successfully',
      stats
    });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    const analytics = await dashboardService.getAnalytics(userId);

    res.status(200).json({
      message: 'Analytics data retrieved successfully',
      analytics
    });
  } catch (error) {
    next(error);
  }
};