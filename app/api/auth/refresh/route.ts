import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'Refresh token not found' }, { status: 401 });
  }

  const newAccessToken = await refreshAccessToken(refreshToken);

  if (!newAccessToken) {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
  }

  return NextResponse.json({ accessToken: newAccessToken });
}

