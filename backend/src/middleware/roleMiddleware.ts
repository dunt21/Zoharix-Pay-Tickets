import { Request, Response, NextFunction } from 'express';

// Define role hierarchy (higher index = more permissions)
const ROLE_HIERARCHY = {
  user: 0,
  organizer: 1,
  admin: 2
} as const;

type Role = keyof typeof ROLE_HIERARCHY;

/**
 * Middleware to check if user has required role
 * @param requiredRole - The minimum role required
 */
export const requireRole = (requiredRole: Role) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const userRole = req.user.role as Role;
      const userLevel = ROLE_HIERARCHY[userRole];
      const requiredLevel = ROLE_HIERARCHY[requiredRole];

      if (userLevel < requiredLevel) {
        res.status(403).json({
          message: `Access denied. Required role: ${requiredRole}, your role: ${userRole}`
        });
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Middleware to check if user has one of the allowed roles
 * @param allowedRoles - Array of roles that are allowed
 */
export const requireOneOfRoles = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const userRole = req.user.role as Role;

      if (!allowedRoles.includes(userRole)) {
        res.status(403).json({
          message: `Access denied. Allowed roles: ${allowedRoles.join(', ')}, your role: ${userRole}`
        });
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Middleware to check if user is admin
 */
export const requireAdmin = requireRole('admin');

/**
 * Middleware to check if user is organizer or admin
 */
export const requireOrganizerOrAdmin = requireOneOfRoles(['organizer', 'admin']);

/**
 * Middleware to check if user is organizer
 */
export const requireOrganizer = requireRole('organizer');

/**
 * Middleware to check if user owns the resource or is admin
 * Assumes req.user.id and req.params.userId or similar
 */
export const requireOwnershipOrAdmin = (userIdParam: string = 'userId') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Authentication required' });
        return;
      }

      const userRole = req.user.role as Role;
      const userId = req.user._id.toString();
      const resourceUserId = req.params[userIdParam];

      // Admin can access everything
      if (userRole === 'admin') {
        next();
        return;
      }

      // User can only access their own resources
      if (userId !== resourceUserId) {
        res.status(403).json({ message: 'Access denied. You can only access your own resources' });
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};