import Complaint from '../models/Complaint.js';
import { uploadBuffer, isCloudinaryConfigured } from '../services/cloudinaryService.js';
import mongoose from 'mongoose';

/**
 * Helper to parse location from request body
 */
const parseLocation = (body) => {
  let location = { lat: undefined, lng: undefined, address: '' };

  if (body.location) {
    if (typeof body.location === 'string') {
      try {
        location = JSON.parse(body.location);
      } catch (e) {
        console.error('[CONTROLLER] Failed to parse location JSON string:', e.message);
      }
    } else if (typeof body.location === 'object') {
      location = body.location;
    }
  } else {
    // Check if flat fields or multipart/form-data structured fields are sent
    const lat = body['location[lat]'] || body.lat || body.latitude;
    const lng = body['location[lng]'] || body.lng || body.longitude;
    const address = body['location[address]'] || body.address;

    if (lat !== undefined) location.lat = Number(lat);
    if (lng !== undefined) location.lng = Number(lng);
    if (address !== undefined) location.address = String(address).trim();
  }

  return location;
};

/**
 * POST /api/complaints
 * Create a new complaint (Citizen only)
 */
export const createComplaint = async (req, res) => {
  try {
    const { title, description, district, category, urgency } = req.body;
    const submittedBy = req.user.id;

    // Basic Input Validation
    if (!title || !description || !district) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and district are required fields.',
      });
    }

    const location = parseLocation(req.body);

    const mediaUrls = [];

    // Check if files are uploaded
    if (req.files && req.files.length > 0) {
      console.log(`[CONTROLLER] Received ${req.files.length} images for upload.`);
      
      if (!isCloudinaryConfigured()) {
        console.warn('[CONTROLLER WARNING] Images uploaded but Cloudinary is not configured. Saving complaint without images.');
      } else {
        // Upload images in parallel
        const uploadPromises = req.files.map(async (file) => {
          try {
            const result = await uploadBuffer(file.buffer);
            return result.secure_url;
          } catch (uploadErr) {
            console.error(`[CONTROLLER ERROR] Failed to upload file "${file.originalname}":`, uploadErr.message);
            // We throw the error to be handled in the catch block or return standard message
            throw new Error(`Cloudinary upload failed for ${file.originalname}: ${uploadErr.message}`);
          }
        });

        try {
          const urls = await Promise.all(uploadPromises);
          mediaUrls.push(...urls);
        } catch (err) {
          return res.status(500).json({
            success: false,
            message: 'Image upload failed. Complaint was not created.',
            error: err.message,
          });
        }
      }
    }

    // Create the complaint document
    const newComplaint = new Complaint({
      submittedBy,
      title,
      description,
      location,
      district,
      mediaUrls,
      category: category || 'uncategorized',
      urgency: urgency || 'medium',
    });

    await newComplaint.save();

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      data: newComplaint,
    });
  } catch (error) {
    console.error('[CONTROLLER ERROR] createComplaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit complaint',
      error: error.message,
    });
  }
};

/**
 * GET /api/complaints
 * List complaints (Admin/University lists all with filters/pagination, Citizen lists their own via submittedBy=me)
 */
export const getComplaints = async (req, res) => {
  try {
    const { submittedBy, status, category, district, page = 1, limit = 10 } = req.query;

    const query = {};

    // 1. Check if Citizen is fetching their own complaints
    if (submittedBy === 'me') {
      query.submittedBy = req.user.id;
    } else {
      // 2. Otherwise, check if user is authorized to list all complaints (Admin/University)
      if (req.user.role !== 'admin' && req.user.role !== 'university') {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: You do not have permission to view all complaints. Use "?submittedBy=me" to view your own.',
        });
      }

      // Apply Admin/University filters
      if (status) query.status = status;
      if (category) query.category = category;
      if (district) query.district = district;
    }

    // Parse pagination variables
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const skipNum = (pageNum - 1) * limitNum;

    // Fetch complaints and total count
    const [complaints, total] = await Promise.all([
      Complaint.find(query)
        .sort({ createdAt: -1 })
        .skip(skipNum)
        .limit(limitNum),
      Complaint.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      pagination: {
        totalItems: total,
        totalPages,
        currentPage: pageNum,
        limit: limitNum,
      },
      data: complaints,
    });
  } catch (error) {
    console.error('[CONTROLLER ERROR] getComplaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve complaints',
      error: error.message,
    });
  }
};

/**
 * GET /api/complaints/:id
 * Fetch a single complaint by ID (Authenticated)
 */
export const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid complaint ID format.',
      });
    }

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: `Complaint not found with ID: ${id}`,
      });
    }

    // Authorization: Citizens can only see their own complaints
    if (req.user.role === 'citizen' && complaint.submittedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: Citizens can only view their own complaints.',
      });
    }

    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    console.error('[CONTROLLER ERROR] getComplaintById error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve complaint details',
      error: error.message,
    });
  }
};

/**
 * PATCH /api/complaints/:id/status
 * Update complaint status (Admin only)
 */
export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid complaint ID format.',
      });
    }

    // Validate if status is provided
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required in request body.',
      });
    }

    // Validate againstallowed enum values
    const allowedStatuses = ['pending', 'reviewed', 'assigned', 'in_progress', 'resolved', 'duplicate'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status "${status}". Allowed values: ${allowedStatuses.join(', ')}`,
      });
    }

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: `Complaint not found with ID: ${id}`,
      });
    }

    complaint.status = status;
    await complaint.save();

    res.status(200).json({
      success: true,
      message: `Complaint status updated to "${status}" successfully.`,
      data: complaint,
    });
  } catch (error) {
    console.error('[CONTROLLER ERROR] updateComplaintStatus error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update complaint status',
      error: error.message,
    });
  }
};
