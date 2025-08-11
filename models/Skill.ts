import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  skills: [{
    type: String,
    required: true,
  }],
  icon: {
    type: String,
    default: 'Code',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
