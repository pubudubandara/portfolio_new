import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { authenticateRequest, createAuthError } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await authenticateRequest(request);
    if (!user) {
      return createAuthError();
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `certificate-${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

    // Upload to Cloudinary
    const result = await uploadToCloudinary(buffer, fileName, 'portfolio/certificates');

    return NextResponse.json({
      success: true,
      data: {
        imageUrl: result.secure_url,
        cloudinaryId: result.public_id,
      }
    });

  } catch (error) {
    console.error('Error uploading certificate image:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to upload image'
    }, { status: 500 });
  }
}
