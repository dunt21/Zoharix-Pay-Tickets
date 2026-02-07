"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const jwtSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
if (!jwtSecret || jwtSecret === 'your-super-secret-jwt-key-change-this-in-production') {
    console.warn('JWT_SECRET is not set or using default placeholder. Please set a secure secret in .env');
}
if (!refreshTokenSecret || refreshTokenSecret === 'your-refresh-token-secret-change-this-in-production') {
    console.warn('REFRESH_TOKEN_SECRET is not set or using default placeholder. Please set a secure secret in .env');
}
exports.authConfig = {
    jwtSecret: jwtSecret || 'your-super-secret-jwt-key',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12'),
    refreshTokenSecret: refreshTokenSecret || 'your-refresh-token-secret',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
};
//# sourceMappingURL=auth.js.map