import mongoose from 'mongoose';

const industryPartnerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Industry partner name is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['startup', 'MSME', 'CSR', 'research_lab'],
      default: 'startup',
    },
    sectorFocus: {
      type: [String],
      default: [],
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

const IndustryPartner = mongoose.model('IndustryPartner', industryPartnerSchema);

export default IndustryPartner;
