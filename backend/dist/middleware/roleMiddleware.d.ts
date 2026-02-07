import { Request, Response, NextFunction } from 'express';
declare const ROLE_HIERARCHY: {
    readonly user: 0;
    readonly organizer: 1;
    readonly admin: 2;
};
type Role = keyof typeof ROLE_HIERARCHY;
export declare const requireRole: (requiredRole: Role) => (req: Request, res: Response, next: NextFunction) => void;
export declare const requireOneOfRoles: (allowedRoles: Role[]) => (req: Request, res: Response, next: NextFunction) => void;
export declare const requireAdmin: (req: Request, res: Response, next: NextFunction) => void;
export declare const requireOrganizerOrAdmin: (req: Request, res: Response, next: NextFunction) => void;
export declare const requireOrganizer: (req: Request, res: Response, next: NextFunction) => void;
export declare const requireOwnershipOrAdmin: (userIdParam?: string) => (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=roleMiddleware.d.ts.map