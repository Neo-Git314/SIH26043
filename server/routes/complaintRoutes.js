import express from 'express';
import {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaintStatus,
} from '../controllers/complaintController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { uploadImages } from '../middleware/upload.js';

const router = express.Router();

// Citizens can submit complaints with optional images
router.post(
  '/',
  authenticate,
  authorize(['citizen']),
  uploadImages,
  createComplaint
);

// Retrieve all complaints (Admin/University lists all, Citizen lists own with submittedBy=me query param)
router.get(
  '/',
  authenticate,
  getComplaints
);

// Retrieve a single complaint by ID (Authenticated; Citizen must be the owner)
router.get(
  '/:id',
  authenticate,
  getComplaintById
);

// Admins can update the status of a complaint
router.patch(
  '/:id/status',
  authenticate,
  authorize(['admin']),
  updateComplaintStatus
);

export default router;
