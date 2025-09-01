import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Certificate from '@/models/Certificate';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import { authenticateRequest, createAuthError } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const certificates = await Certificate.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, data: certificates });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await authenticateRequest(request);
    if (!user) {
      return createAuthError();
    }

    await connectDB();
    const body = await request.json();
    const certificate = await Certificate.create(body);
    return NextResponse.json({ success: true, data: certificate }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Authenticate user
    const user = await authenticateRequest(request);
    if (!user) {
      return createAuthError();
    }

    await connectDB();
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    const certificate = await Certificate.findByIdAndUpdate(_id, updateData, { new: true });
    if (!certificate) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: certificate });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Authenticate user
    const user = await authenticateRequest(request);
    if (!user) {
      return createAuthError();
    }

    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }
    
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }

    // Delete image from Cloudinary if it exists
    if (certificate.cloudinaryId) {
      try {
        await deleteFromCloudinary(certificate.cloudinaryId);
      } catch (error) {
        console.error('Failed to delete image from Cloudinary:', error);
        // Continue with certificate deletion even if image deletion fails
      }
    }
    
    await Certificate.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Certificate deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
  }
}