import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contributions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      title,
      description,
      organization,
      type,
      tech,
      github,
      demo,
      pullRequestUrl,
      status
    } = body;

    // Validation
    if (!title || !description || !organization || !type) {
      return NextResponse.json(
        { success: false, error: 'Title, description, organization, and type are required' },
        { status: 400 }
      );
    }


    await contribution.save();

    return NextResponse.json(
      { success: true, contribution },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating contribution:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create contribution' },
      { status: 500 }
    );
  }
}
