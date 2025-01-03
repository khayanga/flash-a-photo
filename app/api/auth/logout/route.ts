import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  cookies().delete('sessionId');
  return NextResponse.json({ message: 'Logged out successfully' });
}

