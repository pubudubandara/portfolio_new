require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');

// Certificate Schema (inline for the script)
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
    type: String,
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

const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);

const certificates = [
  {
    name: 'Ballerina Coding Challenge',
    organization: 'WS02 & IEEE',
    date: '09/2024',
    imageUrl: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Ballerina+Coding+Challenge',
    cloudinaryId: 'placeholder-ballerina',
    order: 1
  },
  {
    name: 'Moraxtreme 9.0 - Coding Competition',
    organization: 'AEEE',
    date: '10/2024',
    imageUrl: 'https://via.placeholder.com/400x300/059669/FFFFFF?text=Moraxtreme+9.0',
    cloudinaryId: 'placeholder-moraxtreme',
    order: 2
  },
  {
    name: 'SpiritX — Development Competition',
    organization: 'Moraspirit',
    date: '01/2025',
    imageUrl: 'https://via.placeholder.com/400x300/DC2626/FFFFFF?text=SpiritX',
    cloudinaryId: 'placeholder-spiritx',
    order: 3
  },
  {
    name: 'Docker-Learning Course',
    organization: 'KodeKloud',
    date: '02/2025',
    imageUrl: 'https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Docker+Course',
    cloudinaryId: 'placeholder-docker',
    order: 4
  }
];

async function addCertificates() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    for (const cert of certificates) {
      const existingCert = await Certificate.findOne({
        name: cert.name,
        organization: cert.organization
      });

      if (!existingCert) {
        await Certificate.create(cert);
        console.log(`✅ Added: ${cert.name}`);
      } else {
        console.log(`⚠️  Already exists: ${cert.name}`);
      }
    }

    console.log('🎉 All certificates processed successfully!');
  } catch (error) {
    console.error('❌ Error adding certificates:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

addCertificates();
