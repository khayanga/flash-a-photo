import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateTokens } from '@/lib/auth';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }

  const user = await db.getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const { accessToken, refreshToken } = await generateTokens(user);

  const response = NextResponse.json({ 
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    accessToken
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return response;
}

