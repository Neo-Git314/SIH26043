import Complaint from '../models/Complaint.js';
import IndustryPartner from '../models/IndustryPartner.js';
import Project from '../models/Project.js';
import University from '../models/University.js';

// @desc    Get aggregated analytics summary
// @route   GET /api/analytics/summary
// @access  Private (Admin only)
export const getSummary = async (req, res) => {
  try {
    const [
      totalComplaints,
      byCategory,
      byStatus,
      byDistrict,
      totalUniversitiesParticipating,
      totalIndustryPartnersEngaged,
      totalProjectsCompleted,
    ] = await Promise.all([
      // 1. Total complaints count
      Complaint.countDocuments(),

      // 2. Complaints grouped by category
      Complaint.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            category: '$_id',
            count: 1,
            _id: 0,
          },
        },
        {
          $sort: { count: -1 },
        },
      ]),

      // 3. Complaints grouped by status
      Complaint.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            status: '$_id',
            count: 1,
            _id: 0,
          },
        },
        {
          $sort: { count: -1 },
        },
      ]),

      // 4. Complaints grouped by district
      Complaint.aggregate([
        {
          $match: {
            district: { $exists: true, $ne: null, $nin: ['', null] },
          },
        },
        {
          $group: {
            _id: '$district',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            district: '$_id',
            count: 1,
            _id: 0,
          },
        },
        {
          $sort: { count: -1 },
        },
      ]),

      // 5. Total participating universities
      University.countDocuments().catch(() => 0),

      // 6. Distinct engaged industry partners
      Project.distinct('industryPartnerId', {
        industryPartnerId: { $ne: null },
      })
        .then((res) => (Array.isArray(res) ? res.length : 0))
        .catch(() => 0),

      // 7. Total completed projects
      Project.countDocuments({ status: 'completed' }).catch(() => 0),
    ]);

    return res.status(200).json({
      totalComplaints: totalComplaints || 0,
      byCategory: byCategory || [],
      byStatus: byStatus || [],
      byDistrict: byDistrict || [],
      totalUniversitiesParticipating: totalUniversitiesParticipating || 0,
      totalIndustryPartnersEngaged: totalIndustryPartnersEngaged || 0,
      totalProjectsCompleted: totalProjectsCompleted || 0,
    });
  } catch (error) {
    console.error('Error fetching analytics summary:', error);
    return res.status(500).json({
      message: 'Server error while generating analytics summary',
      error: error.message,
    });
  }
};

// @desc    Get daily complaint submission trends for last 30 days
// @route   GET /api/analytics/trends
// @access  Private (Admin only)
export const getTrends = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const trends = await Complaint.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          date: '$_id',
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    return res.status(200).json(trends || []);
  } catch (error) {
    console.error('Error fetching analytics trends:', error);
    return res.status(500).json({
      message: 'Server error while generating analytics trends',
      error: error.message,
    });
  }
};
