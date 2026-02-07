import { Request, Response, NextFunction } from 'express';
export declare const createPaymentIntent: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const confirmPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getPaymentHistory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=paymentController.d.ts.map