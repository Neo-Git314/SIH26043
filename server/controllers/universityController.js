import Complaint from '../models/Complaint.js';
import Project from '../models/Project.js';
import University from '../models/University.js';

// @desc    Get all universities
// @route   GET /api/universities
// @access  Public / Authenticated
export const getUniversities = async (req, res) => {
  try {
    const universities = await University.find().populate('userId', 'name email role');
    return res.status(200).json(universities);
  } catch (error) {
    console.error('Error fetching universities:', error);
    return res.status(500).json({
      message: 'Server error while fetching universities',
      error: error.message,
    });
  }
};

// @desc    Create a university profile
// @route   POST /api/universities
// @access  Private (Admin only)
export const createUniversity = async (req, res) => {
  try {
    const {
      userId,
      name,
      location,
      disciplines,
      researchKeywords,
      incubationFacility,
      contactEmail,
    } = req.body;

    if (!userId || !name || !contactEmail) {
      return res.status(400).json({
        message: 'userId, name, and contactEmail are required fields',
      });
    }

    const university = await University.create({
      userId,
      name: name.trim(),
      location,
      disciplines: Array.isArray(disciplines) ? disciplines : [],
      researchKeywords: Array.isArray(researchKeywords) ? researchKeywords : [],
      incubationFacility: Boolean(incubationFacility),
      contactEmail: contactEmail.trim(),
    });

    return res.status(201).json(university);
  } catch (error) {
    console.error('Error creating university:', error);
    return res.status(500).json({
      message: 'Server error while creating university profile',
      error: error.message,
    });
  }
};

// @desc    Get matched challenges/complaints for a university
// @route   GET /api/universities/:id/challenges
// @access  Public / Authenticated
export const getUniversityChallenges = async (req, res) => {
  try {
    const { id } = req.params;

    const complaints = await Complaint.find({
      'suggestedUniversities.universityId': id,
      status: { $nin: ['duplicate', 'assigned'] },
    }).populate('submittedBy', 'name email');

    return res.status(200).json(complaints);
  } catch (error) {
    console.error('Error fetching university challenges:', error);
    return res.status(500).json({
      message: 'Server error while fetching university challenges',
      error: error.message,
    });
  }
};

// @desc    Accept a complaint and create a proposed project
// @route   POST /api/universities/:id/accept/:complaintId
// @access  Private (University)
export const acceptComplaint = async (req, res) => {
  try {
    const { id: universityId, complaintId } = req.params;

    // Check if university exists
    const university = await University.findById(universityId);
    if (!university) {
      return res.status(404).json({
        message: 'University not found',
      });
    }

    // Check if complaint exists
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({
        message: 'Complaint not found',
      });
    }

    if (complaint.status === 'assigned') {
      return res.status(400).json({
        message: 'Complaint is already assigned to a university',
      });
    }

    if (complaint.status === 'duplicate') {
      return res.status(400).json({
        message: 'Cannot accept a duplicate complaint',
      });
    }

    // Update complaint
    complaint.status = 'assigned';
    complaint.assignedUniversity = university._id;
    await complaint.save();

    // Create a new Project document with status 'proposed'
    const project = await Project.create({
      complaintId: complaint._id,
      universityId: university._id,
      status: 'proposed',
      team: [],
      milestones: [],
    });

    return res.status(201).json({
      message: 'Complaint assigned and project proposed successfully',
      project,
      complaint,
    });
  } catch (error) {
    console.error('Error accepting complaint:', error);
    return res.status(500).json({
      message: 'Server error while accepting complaint',
      error: error.message,
    });
  }
};
