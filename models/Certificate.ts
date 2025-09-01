import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  organization: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  date: {
    type: String, // Format: "MM/YYYY"
    required: true
  },
  order: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);