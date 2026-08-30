import express from 'express';
import {
  getUniversities,
  createUniversity,
  getUniversityChallenges,
  acceptComplaint,
} from '../controllers/universityController.js';
import auth from '../middleware/auth.js';
import requireRole from '../middleware/requireRole.js';

const router = express.Router();

// GET /api/universities - List all universities
router.get('/', getUniversities);

// POST /api/universities - Create university profile (Admin only)
router.post('/', auth, requireRole(['admin']), createUniversity);

// GET /api/universities/:id/challenges - List unassigned matched complaints
router.get('/:id/challenges', getUniversityChallenges);

// POST /api/universities/:id/accept/:complaintId - Accept complaint and propose project (University only)
router.post('/:id/accept/:complaintId', auth, requireRole(['university']), acceptComplaint);

export default router;
