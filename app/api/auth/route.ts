import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    // Simple authentication - In production, use proper hashing
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (username === adminUsername && password === adminPassword) {
      // In a real app, you would generate a JWT token here
      const response = NextResponse.json({ 
        success: true, 
        message: 'Authentication successful',
        token: 'admin-authenticated' // Simple token for demo
      });
      
      // Set a cookie for session management
      response.cookies.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600 // 1 hour
      });
      
      return response;
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid credentials' 
      }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get('admin-auth');
  
  if (authCookie?.value === 'authenticated') {
    return NextResponse.json({ success: true, authenticated: true });
  } else {
    return NextResponse.json({ success: false, authenticated: false }, { status: 401 });
  }
}
