import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Ensure dotenv config is loaded in case this service is loaded before main entry configuration
dotenv.config();

// Helper to check if credentials are provided
export const isCloudinaryConfigured = () => {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

// Configure the Cloudinary SDK
if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('[CLOUDINARY] Cloudinary configured successfully.');
} else {
  console.warn(
    '[CLOUDINARY WARNING] Cloudinary credentials are missing in environment variables. Image uploads will be disabled.'
  );
}

/**
 * Uploads a file buffer to Cloudinary using upload_stream.
 * 
 * @param {Buffer} buffer - The file buffer provided by multer
 * @param {string} folder - The folder name in Cloudinary where the asset should be stored
 * @returns {Promise<object>} - Resolves to the Cloudinary upload response object (containing secure_url, public_id, etc.)
 */
export const uploadBuffer = (buffer, folder = 'complaints') => {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured()) {
      return reject(
        new Error(
          'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in the .env file.'
        )
      );
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          console.error('[CLOUDINARY ERROR] Upload stream failed:', error.message);
          return reject(error);
        }
        resolve(result);
      }
    );

    // End stream and write buffer to upload
    stream.end(buffer);
  });
};
