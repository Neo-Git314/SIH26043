import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    name: {
      type: String,
      required: [true, 'University name is required'],
      trim: true,
    },
    location: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    disciplines: {
      type: [String],
      default: [],
    },
    researchKeywords: {
      type: [String],
      default: [],
    },
    incubationFacility: {
      type: Boolean,
      default: false,
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const University = mongoose.model('University', universitySchema);

export default University;
