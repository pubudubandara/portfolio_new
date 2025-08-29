import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { authenticateRequest, createAuthError } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Authenticate user (allow creation only if no admin exists or if authenticated)
    const user = await authenticateRequest(request);
    await connectDB();
    
    const body = await request.json();
    const { username, password } = body;

    // Validation
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this username already exists' },
        { status: 409 }
      );
    }

    // Check if this is the first user being created
    const userCount = await User.countDocuments();
    if (userCount > 0 && !user) {
      return createAuthError('Only authenticated users can create additional admin accounts');
    }

    // Create new user
    const newUser = new User({
      username,
      password,
      role: 'admin'
    });

    await newUser.save();

    // Return user data (without password)
    const userData = {
      id: newUser._id,
      username: newUser.username,
      role: newUser.role,
      createdAt: newUser.createdAt,
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Admin user created successfully',
        user: userData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('User creation error:', error);
    
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { success: false, error: 'User with this username already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const userCount = await User.countDocuments();
    const hasAdmin = userCount > 0;

    return NextResponse.json({
      success: true,
      hasAdmin,
      userCount,
    });
  } catch (error) {
    console.error('User check error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
