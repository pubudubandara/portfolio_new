import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthUser {
  id: string;
  username: string;
}

export async function authenticateRequest(request: NextRequest): Promise<AuthUser | null> {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as AuthUser;
    return decoded;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export function createAuthError(message: string = 'Unauthorized') {
  return NextResponse.json(
    { success: false, error: message },
    { status: 401 }
  );
}
