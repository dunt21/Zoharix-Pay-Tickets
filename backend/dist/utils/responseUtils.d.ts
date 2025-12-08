import { Response } from 'express';
interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string | undefined;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
    timestamp: string;
}
interface PaginationData {
    page: number;
    limit: number;
    total: number;
    pages?: number;
}
export declare const createSuccessResponse: <T>(message: string, data?: T, pagination?: PaginationData) => ApiResponse<T>;
export declare const createErrorResponse: (message: string, error?: string, statusCode?: number) => ApiResponse;
export declare const sendSuccessResponse: <T>(res: Response, statusCode: number | undefined, message: string, data?: T, pagination?: PaginationData) => void;
export declare const sendErrorResponse: (res: Response, statusCode: number | undefined, message: string, error?: string) => void;
export declare const sendCreatedResponse: <T>(res: Response, message: string, data?: T) => void;
export declare const sendNoContentResponse: (res: Response) => void;
export declare const sendBadRequestResponse: (res: Response, message?: string, error?: string) => void;
export declare const sendUnauthorizedResponse: (res: Response, message?: string) => void;
export declare const sendForbiddenResponse: (res: Response, message?: string) => void;
export declare const sendNotFoundResponse: (res: Response, message?: string) => void;
export declare const sendConflictResponse: (res: Response, message?: string, error?: string) => void;
export declare const sendValidationErrorResponse: (res: Response, errors: Array<{
    field: string;
    message: string;
}>) => void;
export declare const sendInternalServerErrorResponse: (res: Response, message?: string, error?: string) => void;
export declare const sendLoginSuccessResponse: (res: Response, token: string, refreshToken: string, user: any) => void;
export declare const sendRegistrationSuccessResponse: (res: Response, user: any) => void;
export declare const sendEventCreatedResponse: (res: Response, event: any) => void;
export declare const sendBookingCreatedResponse: (res: Response, booking: any) => void;
export declare const sendPaymentSuccessResponse: (res: Response, payment: any) => void;
export {};
//# sourceMappingURL=responseUtils.d.ts.map