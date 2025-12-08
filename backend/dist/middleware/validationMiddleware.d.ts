import { Request, Response, NextFunction } from 'express';
export declare const handleValidationErrors: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateSignup: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateLogin: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateEventCreation: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateEventId: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateUserId: (req: Request, res: Response, next: NextFunction) => void;
export declare const validatePagination: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateTicketBooking: (req: Request, res: Response, next: NextFunction) => void;
export declare const validatePayment: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validationMiddleware.d.ts.map