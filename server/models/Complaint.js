import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String, trim: true },
    },
    district: {
      type: String,
      trim: true,
      index: true,
    },
    mediaUrls: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: 'uncategorized',
      trim: true,
      index: true,
    },
    categoryConfidence: {
      type: Number,
      default: 0,
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'assigned', 'in_progress', 'resolved', 'duplicate'],
      default: 'pending',
      index: true,
    },
    needsReview: {
      type: Boolean,
      default: false,
    },
    duplicateOf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complaint',
      default: null,
    },
    embedding: {
      type: [Number],
      default: [],
    },
    imageAnalysis: {
      caption: { type: String, default: '' },
      tags: { type: [String], default: [] },
      relevanceScore: { type: Number, default: 0 },
    },
    suggestedUniversities: [
      {
        universityId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'University',
          required: true,
        },
        score: {
          type: Number,
          default: 1.0,
        },
      },
    ],
    assignedUniversity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

// Compound index for filtered queries and analytics
complaintSchema.index({ status: 1, category: 1, district: 1 });
complaintSchema.index({ createdAt: -1 });

const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;
