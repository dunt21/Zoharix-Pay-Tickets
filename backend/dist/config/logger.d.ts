export declare const loggerConfig: {
    level: string;
    format: string;
    enableFileLogging: boolean;
    logFilePath: string;
    enableConsoleLogging: boolean;
    maxFileSize: number;
    maxFiles: number;
};
export declare const logLevels: {
    readonly error: 0;
    readonly warn: 1;
    readonly info: 2;
    readonly debug: 3;
};
export type LogLevel = keyof typeof logLevels;
//# sourceMappingURL=logger.d.ts.map