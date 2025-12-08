export declare const isValidEmail: (email: string) => boolean;
export declare const isValidPassword: (password: string) => boolean;
export declare const isValidPhoneNumber: (phone: string) => boolean;
export declare const isValidURL: (url: string) => boolean;
export declare const isValidMongoId: (id: string) => boolean;
export declare const isValidDate: (dateString: string) => boolean;
export declare const isFutureDate: (dateString: string) => boolean;
export declare const sanitizeString: (str: string) => string;
export declare const validateRequired: (value: any, fieldName: string) => string | null;
export declare const validateLength: (value: string, min: number, max: number, fieldName: string) => string | null;
export declare const validateRange: (value: number, min: number, max: number, fieldName: string) => string | null;
export declare const validateEnum: (value: string, allowedValues: string[], fieldName: string) => string | null;
export declare const validateEventData: (data: any) => Array<{
    field: string;
    message: string;
}>;
export declare const validateUserData: (data: any) => Array<{
    field: string;
    message: string;
}>;
//# sourceMappingURL=validationUtils.d.ts.map