// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb';
// import User from '@/models/User';

// export async function POST(request: NextRequest) {
//   try {
//     await connectDB();
    
//     const body = await request.json();
//     const { username, password } = body;

//     // Validation
//     if (!username || !password) {
//       return NextResponse.json(
//         { success: false, error: 'Username and password are required' },
//         { status: 400 }
//       );
//     }

//     if (password.length < 6) {
//       return NextResponse.json(
//         { success: false, error: 'Password must be at least 6 characters long' },
//         { status: 400 }
//       );
//     }

//     // Check if any admin user already exists
//     const userCount = await User.countDocuments();
//     if (userCount > 0) {
//       return NextResponse.json(
//         { success: false, error: 'Admin user already exists. Only one admin allowed.' },
//         { status: 403 }
//       );
//     }

//     // Create new admin user
//     const user = new User({
//       username,
//       password,
//       role: 'admin'
//     });

//     await user.save();

//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Admin user created successfully',
//         user: {
//           username: user.username,
//           role: user.role,
//         },
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Admin creation error:', error);
    
//     if (error instanceof Error && error.message.includes('duplicate key')) {
//       return NextResponse.json(
//         { success: false, error: 'Username already exists' },
//         { status: 409 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// // Check if admin exists
// export async function GET() {
//   try {
//     await connectDB();
    
//     const userCount = await User.countDocuments();
//     const hasAdmin = userCount > 0;

//     return NextResponse.json({
//       success: true,
//       hasAdmin,
//       message: hasAdmin ? 'Admin user exists' : 'No admin user found',
//     });
//   } catch (error) {
//     console.error('Admin check error:', error);
//     return NextResponse.json(
//       { success: false, error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
