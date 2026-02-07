import crypto from 'crypto';

/**
 * Cryptographic utilities for Z-Events
 */

export const generateRandomString = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

export const generateRandomToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('base64url');
};

export const hashString = (data: string, algorithm: string = 'sha256'): string => {
  return crypto.createHash(algorithm).update(data).digest('hex');
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  // Note: In production, use bcrypt or argon2
  // This is a simplified implementation
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const parts = hashedPassword.split(':');
  if (parts.length !== 2) return false;

  const [salt, hash] = parts;
  if (!salt || !hash) return false;

  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === verifyHash;
};

export const encryptData = (data: string, key: string): string => {
  const algorithm = 'aes-256-cbc';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
};

export const decryptData = (encryptedData: string, key: string): string => {
  const algorithm = 'aes-256-cbc';
  const parts = encryptedData.split(':');
  if (parts.length !== 2) throw new Error('Invalid encrypted data format');

  const ivHex = parts[0];
  const encrypted = parts[1];

  if (!ivHex || !encrypted) throw new Error('Invalid encrypted data format');

  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export const generateAPIKey = (): string => {
  return `ze_${generateRandomString(32)}`;
};

export const generateSecureId = (prefix: string = 'id'): string => {
  const timestamp = Date.now().toString(36);
  const random = generateRandomString(8);
  return `${prefix}_${timestamp}_${random}`;
};

export const createHMAC = (data: string, secret: string): string => {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
};

export const verifyHMAC = (data: string, secret: string, hmac: string): boolean => {
  const expectedHMAC = createHMAC(data, secret);
  return crypto.timingSafeEqual(
    Buffer.from(expectedHMAC, 'hex'),
    Buffer.from(hmac, 'hex')
  );
};

export const generateOTP = (length: number = 6): string => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
};

export const hashSensitiveData = (data: string): string => {
  // One-way hash for sensitive data that doesn't need to be decrypted
  return crypto.createHash('sha256').update(data + process.env.SALT || 'default_salt').digest('hex');
};

export const maskEmail = (email: string): string => {
  const parts = email.split('@');
  if (parts.length !== 2) return email; // Invalid email format

  const [local, domain] = parts;
  if (!local || !domain) return email;

  if (local.length <= 2) {
    return `${local.charAt(0)}*@${domain}`;
  }

  const maskedLocal = local.charAt(0) + '*'.repeat(local.length - 2) + local.charAt(local.length - 1);
  return `${maskedLocal}@${domain}`;
};

export const maskPhoneNumber = (phone: string): string => {
  // Mask all but last 4 digits
  const cleaned = phone.replace(/\D/g, '');
  const masked = '*'.repeat(cleaned.length - 4) + cleaned.slice(-4);
  return masked;
};