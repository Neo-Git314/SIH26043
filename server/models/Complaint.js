import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const complaintSchema = new Schema(
  {
    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'submittedBy (User ID) is required'],
    },
    title: {
      type: String,
      required: [true, 'Complaint title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Complaint description is required'],
      trim: true,
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String, trim: true },
    },
    district: {
      type: String,
      required: [true, 'District is required'],
      trim: true,
    },
    mediaUrls: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: 'uncategorized',
      trim: true,
    },
    categoryConfidence: {
      type: Number,
      default: 0,
    },
    urgency: {
      type: String,
      enum: {
        values: ['low', 'medium', 'high'],
        message: '{VALUE} is not a valid urgency level',
      },
      default: 'medium',
    },
    status: {
      type: String,
      enum: {
        values: [
          'pending',
          'reviewed',
          'assigned',
          'in_progress',
          'resolved',
          'duplicate',
        ],
        message: '{VALUE} is not a valid complaint status',
      },
      default: 'pending',
    },
    needsReview: {
      type: Boolean,
      default: false,
    },
    duplicateOf: {
      type: Schema.Types.ObjectId,
      ref: 'Complaint',
      default: null,
    },
    embedding: {
      type: [Number],
      default: [],
    },
    imageAnalysis: {
      caption: { type: String, trim: true },
      tags: { type: [String], default: [] },
      relevanceScore: { type: Number },
    },
    suggestedUniversities: [
      {
        universityId: { type: Schema.Types.ObjectId, ref: 'University' },
        score: { type: Number },
      },
    ],
    assignedUniversity: {
      type: Schema.Types.ObjectId,
      ref: 'University',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for optimized query execution and filtering
complaintSchema.index({ category: 1 });
complaintSchema.index({ status: 1 });
complaintSchema.index({ district: 1 });
complaintSchema.index({ createdAt: -1 });

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
