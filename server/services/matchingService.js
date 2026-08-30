import Complaint from '../models/Complaint.js';
import University from '../models/University.js';

/**
 * Match universities to a complaint based on discipline/category matching.
 * @param {string|mongoose.Types.ObjectId} complaintId
 * @returns {Promise<Document|null>} Updated complaint document
 */
export const matchUniversities = async (complaintId) => {
  try {
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      throw new Error(`Complaint not found with id: ${complaintId}`);
    }

    if (!complaint.category || complaint.category === 'uncategorized') {
      complaint.suggestedUniversities = [];
      await complaint.save();
      return complaint;
    }

    // Escape special regex characters in the complaint category
    const escapedCategory = complaint.category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const categoryRegex = new RegExp(`^${escapedCategory}$`, 'i');

    // Find universities that have the complaint's category in their disciplines
    const matchingUniversities = await University.find({
      disciplines: { $regex: categoryRegex },
    }).limit(3);

    // Populate suggestedUniversities array with top matches and score 1.0
    complaint.suggestedUniversities = matchingUniversities.map((univ) => ({
      universityId: univ._id,
      score: 1.0,
    }));

    await complaint.save();
    return complaint;
  } catch (error) {
    console.error('Error in matchUniversities service:', error);
    throw error;
  }
};

export default {
  matchUniversities,
};
