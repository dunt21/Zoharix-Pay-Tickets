import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error('Cloudinary configuration is incomplete. Please check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.');
}

if (cloudName === 'your_cloud_name' || apiKey === 'your_api_key' || apiSecret === 'your_api_secret') {
  console.warn('Cloudinary credentials appear to be placeholders. Please set valid Cloudinary credentials in .env');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export const cloudinaryConfig = {
  cloudName,
  apiKey,
  apiSecret,
  uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || 'default',
  folder: process.env.CLOUDINARY_FOLDER || 'Z-Events',
};

export default cloudinary;