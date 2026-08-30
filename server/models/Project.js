import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    complaintId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Complaint',
      required: [true, 'Complaint ID is required'],
    },
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
      required: [true, 'University ID is required'],
    },
    team: [
      {
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          enum: ['student', 'faculty_mentor'],
          required: true,
        },
      },
    ],
    industryPartnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'IndustryPartner',
      default: null,
    },
    status: {
      type: String,
      enum: ['proposed', 'approved', 'in_progress', 'testing', 'completed'],
      default: 'proposed',
    },
    milestones: [
      {
        title: {
          type: String,
          required: true,
        },
        dueDate: {
          type: Date,
        },
        status: {
          type: String,
          enum: ['pending', 'done'],
          default: 'pending',
        },
      },
    ],
    proposalDoc: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
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

const Project = mongoose.model('Project', projectSchema);

export default Project;
