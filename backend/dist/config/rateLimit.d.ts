export declare const rateLimitConfig: {
    general: {
        windowMs: number;
        max: number;
        message: string;
        standardHeaders: boolean;
        legacyHeaders: boolean;
    };
    auth: {
        windowMs: number;
        max: number;
        message: string;
        standardHeaders: boolean;
        legacyHeaders: boolean;
    };
    payment: {
        windowMs: number;
        max: number;
        message: string;
        standardHeaders: boolean;
        legacyHeaders: boolean;
    };
    skip: (req: any, res: any) => boolean;
};
//# sourceMappingURL=rateLimit.d.ts.map