import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateRequest } from '@/lib/auth';

export const PUT = validateRequest(async (req: NextRequest, user: any) => {
  const { id } = req.nextUrl.pathname.split('/').pop()!;
  const { status } = await req.json();

  if (!status) {
    return NextResponse.json({ error: 'Missing status' }, { status: 400 });
  }

  const booking = await db.updateBooking(id, { status });
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  if (user.role === 'creator' && booking.creatorId !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  if (user.role === 'client' && booking.clientId !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  return NextResponse.json(booking);
});

