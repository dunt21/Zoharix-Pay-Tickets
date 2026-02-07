import { Response } from 'express';
export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode?: number, isOperational?: boolean);
}
export declare class ValidationError extends AppError {
    errors: Array<{
        field: string;
        message: string;
    }>;
    constructor(errors: Array<{
        field: string;
        message: string;
    }>);
}
export declare class AuthenticationError extends AppError {
    constructor(message?: string);
}
export declare class AuthorizationError extends AppError {
    constructor(message?: string);
}
export declare class NotFoundError extends AppError {
    constructor(resource?: string);
}
export declare class ConflictError extends AppError {
    constructor(message?: string);
}
export declare const handleError: (error: any, res: Response) => void;
export declare const asyncHandler: (fn: Function) => (req: any, res: any, next: any) => void;
export declare const createErrorResponse: (message: string, statusCode?: number) => {
    success: boolean;
    message: string;
    statusCode: number;
    timestamp: string;
};
//# sourceMappingURL=errorUtils.d.ts.map