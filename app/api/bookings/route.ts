import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateRequest } from '@/lib/auth';

export const POST = validateRequest(async (req: NextRequest, user: any) => {
  const { creatorId, date, time } = await req.json();

  if (!creatorId || !date || !time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const newBooking = await db.createBooking({
    creatorId,
    clientId: user.id,
    date,
    time,
    status: 'pending'
  });

  return NextResponse.json(newBooking);
});

export const GET = validateRequest(async (req: NextRequest, user: any) => {
  let bookings;
  if (user.role === 'creator') {
    const creator = await db.getCreatorByUserId(user.id);
    if (!creator) {
      return NextResponse.json({ error: 'Creator profile not found' }, { status: 404 });
    }
    bookings = await db.getBookingsByCreatorId(creator.id);
  } else {
    bookings = await db.getBookingsByClientId(user.id);
  }
  return NextResponse.json(bookings);
});

