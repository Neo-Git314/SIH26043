import multer from 'multer';

// Use memory storage so we get files as buffers for direct Cloudinary upload
const storage = multer.memoryStorage();

// File filter to restrict uploads to images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only image files are allowed!'), false);
  }
};

// Configure multer with memory storage, size limits, and count limits
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB per file
    files: 5,                   // Maximum 5 files
  },
  fileFilter,
});

/**
 * Middleware wrapper to handle multer errors gracefully and return
 * client-friendly error messages instead of throwing a 500 error or crashing the app.
 */
export const uploadImages = (req, res, next) => {
  const uploadMultiple = upload.array('images', 5);

  uploadMultiple(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      let message = err.message;
      if (err.code === 'LIMIT_FILE_SIZE') {
        message = 'File size too large. Maximum size allowed is 10MB per file.';
      } else if (err.code === 'LIMIT_FILE_COUNT') {
        message = 'Too many files uploaded. Maximum is 5 images.';
      }
      return res.status(400).json({
        success: false,
        message: `File upload limit exceeded: ${message}`,
      });
    } else if (err) {
      // General error (e.g. from fileFilter)
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    next();
  });
};
