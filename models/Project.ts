import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tech: [{
    type: String,
    required: true,
  }],
  contribution: {
    type: String,
    default: '',
  },
  github: {
    type: String,
  },
  demo: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
