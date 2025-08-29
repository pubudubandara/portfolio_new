import mongoose from 'mongoose';

const ContributionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Open Source', 'Community', 'Research', 'Documentation', 'Bug Fix', 'Feature', 'Other'],
  },
  tech: [{
    type: String,
    required: true,
  }],
  github: {
    type: String,
  },
  demo: {
    type: String,
  },
  pullRequestUrl: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ['Merged', 'Pending', 'Closed', 'Draft'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Contribution || mongoose.model('Contribution', ContributionSchema);
