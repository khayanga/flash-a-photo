import { NextRequest, NextResponse } from 'next/server';
import { db } from './db';
import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret-key';

export async function generateTokens(user: any) {
  const accessToken = sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

export async function verifyToken(token: string) {
  try {
    const decoded = verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    const decoded = verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: string };
    const user = await db.getUserById(decoded.userId);
    if (!user) {
      throw new Error('User not found');
    }
    const { accessToken } = await generateTokens(user);
    return accessToken;
  } catch (error) {
    return null;
  }
}

export async function authenticate(req: NextRequest) {
  const accessToken = req.headers.get('Authorization')?.split(' ')[1];
  if (!accessToken) {
    return null;
  }

  const decoded = await verifyToken(accessToken);
  if (!decoded) {
    return null;
  }

  const user = await db.getUserById(decoded.userId);
  return user;
}

export function validateRequest(handler: (req: NextRequest, user: any) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const user = await authenticate(req);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return handler(req, user);
  };
}

