import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export const uploadToCloudinary = async (file: Buffer, filename: string, folder: string = 'portfolio/skills') => {
  return new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        public_id: filename,
        folder: folder,
        transformation: [
          { width: 400, height: 300, crop: 'fit', quality: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    ).end(file);
  });
};

export const uploadCertificateToCloudinary = async (file: Buffer, filename: string) => {
  return new Promise<any>((resolve, reject) => {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      reject(new Error('Cloudinary configuration is missing. Please check your environment variables.'));
      return;
    }

    cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        public_id: filename,
        folder: 'portfolio/certificates'
        // No transformations - preserve original quality and size
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(new Error(`Cloudinary upload failed: ${error.message || 'Unknown error'}`));
        } else if (result) {
          resolve(result);
        } else {
          reject(new Error('Cloudinary upload failed: No result returned'));
        }
      }
    ).end(file);
  });
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};
