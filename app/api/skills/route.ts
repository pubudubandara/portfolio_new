import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Skill from '@/models/Skill';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import { authenticateRequest, createAuthError } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, data: skills });
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
    const skill = await Skill.create(body);
    return NextResponse.json({ success: true, data: skill }, { status: 201 });
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
    
    const skill = await Skill.findByIdAndUpdate(_id, updateData, { new: true });
    if (!skill) {
      return NextResponse.json({ success: false, error: 'Skill not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: skill });
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

    const skill = await Skill.findById(id);
    if (!skill) {
      return NextResponse.json({ success: false, error: 'Skill not found' }, { status: 404 });
    }

    // Delete image from Cloudinary
    if (skill.cloudinaryId) {
      try {
        await deleteFromCloudinary(skill.cloudinaryId);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }

    await Skill.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
