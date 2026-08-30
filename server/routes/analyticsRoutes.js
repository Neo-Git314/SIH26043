import express from 'express';
import { getSummary, getTrends } from '../controllers/analyticsController.js';
import auth from '../middleware/auth.js';
import requireRole from '../middleware/requireRole.js';

const router = express.Router();

// Apply auth and admin role check to all analytics routes
router.use(auth, requireRole(['admin']));

// GET /api/analytics/summary - Get aggregated dashboard metrics
router.get('/summary', getSummary);

// GET /api/analytics/trends - Get 30-day submission time-series trends
router.get('/trends', getTrends);

export default router;
