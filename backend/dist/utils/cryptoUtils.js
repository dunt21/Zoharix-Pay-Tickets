"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskPhoneNumber = exports.maskEmail = exports.hashSensitiveData = exports.generateOTP = exports.verifyHMAC = exports.createHMAC = exports.generateSecureId = exports.generateAPIKey = exports.decryptData = exports.encryptData = exports.verifyPassword = exports.hashPassword = exports.hashString = exports.generateRandomToken = exports.generateRandomString = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateRandomString = (length = 32) => {
    return crypto_1.default.randomBytes(length).toString('hex');
};
exports.generateRandomString = generateRandomString;
const generateRandomToken = (length = 32) => {
    return crypto_1.default.randomBytes(length).toString('base64url');
};
exports.generateRandomToken = generateRandomToken;
const hashString = (data, algorithm = 'sha256') => {
    return crypto_1.default.createHash(algorithm).update(data).digest('hex');
};
exports.hashString = hashString;
const hashPassword = async (password) => {
    const saltRounds = 12;
    const salt = crypto_1.default.randomBytes(16).toString('hex');
    const hash = crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
};
exports.hashPassword = hashPassword;
const verifyPassword = async (password, hashedPassword) => {
    const parts = hashedPassword.split(':');
    if (parts.length !== 2)
        return false;
    const [salt, hash] = parts;
    if (!salt || !hash)
        return false;
    const verifyHash = crypto_1.default.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
};
exports.verifyPassword = verifyPassword;
const encryptData = (data, key) => {
    const algorithm = 'aes-256-cbc';
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};
exports.encryptData = encryptData;
const decryptData = (encryptedData, key) => {
    const algorithm = 'aes-256-cbc';
    const parts = encryptedData.split(':');
    if (parts.length !== 2)
        throw new Error('Invalid encrypted data format');
    const ivHex = parts[0];
    const encrypted = parts[1];
    if (!ivHex || !encrypted)
        throw new Error('Invalid encrypted data format');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
exports.decryptData = decryptData;
const generateAPIKey = () => {
    return `ze_${(0, exports.generateRandomString)(32)}`;
};
exports.generateAPIKey = generateAPIKey;
const generateSecureId = (prefix = 'id') => {
    const timestamp = Date.now().toString(36);
    const random = (0, exports.generateRandomString)(8);
    return `${prefix}_${timestamp}_${random}`;
};
exports.generateSecureId = generateSecureId;
const createHMAC = (data, secret) => {
    return crypto_1.default.createHmac('sha256', secret).update(data).digest('hex');
};
exports.createHMAC = createHMAC;
const verifyHMAC = (data, secret, hmac) => {
    const expectedHMAC = (0, exports.createHMAC)(data, secret);
    return crypto_1.default.timingSafeEqual(Buffer.from(expectedHMAC, 'hex'), Buffer.from(hmac, 'hex'));
};
exports.verifyHMAC = verifyHMAC;
const generateOTP = (length = 6) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
};
exports.generateOTP = generateOTP;
const hashSensitiveData = (data) => {
    return crypto_1.default.createHash('sha256').update(data + process.env.SALT || 'default_salt').digest('hex');
};
exports.hashSensitiveData = hashSensitiveData;
const maskEmail = (email) => {
    const parts = email.split('@');
    if (parts.length !== 2)
        return email;
    const [local, domain] = parts;
    if (!local || !domain)
        return email;
    if (local.length <= 2) {
        return `${local.charAt(0)}*@${domain}`;
    }
    const maskedLocal = local.charAt(0) + '*'.repeat(local.length - 2) + local.charAt(local.length - 1);
    return `${maskedLocal}@${domain}`;
};
exports.maskEmail = maskEmail;
const maskPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const masked = '*'.repeat(cleaned.length - 4) + cleaned.slice(-4);
    return masked;
};
exports.maskPhoneNumber = maskPhoneNumber;
//# sourceMappingURL=cryptoUtils.js.map