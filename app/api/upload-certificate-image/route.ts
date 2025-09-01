import { NextRequest, NextResponse } from 'next/server';
import { uploadCertificateToCloudinary } from '@/lib/cloudinary';
import { authenticateRequest, createAuthError } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Temporarily disable authentication for testing
    // const user = await authenticateRequest(request);
    // if (!user) {
    //   return createAuthError();
    // }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'File must be an image' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'File size must be less than 10MB' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `certificate-${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

    // Upload to Cloudinary
    const result = await uploadCertificateToCloudinary(buffer, fileName);

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
      error: error instanceof Error ? error.message : 'Failed to upload image'
    }, { status: 500 });
  }
}
