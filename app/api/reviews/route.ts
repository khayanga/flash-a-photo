import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateRequest } from '@/lib/auth';

export const POST = validateRequest(async (req: NextRequest, user: any) => {
  const { creatorId, rating, comment } = await req.json();

  if (!creatorId || !rating || !comment) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const newReview = await db.createReview({
    creatorId,
    clientId: user.id,
    rating,
    comment
  });

  return NextResponse.json(newReview);
});

export const GET = async (req: NextRequest) => {
  const { creatorId } = req.nextUrl.searchParams;

  if (!creatorId) {
    return NextResponse.json({ error: 'Missing creatorId' }, { status: 400 });
  }

  const reviews = await db.getReviewsByCreatorId(creatorId);
  return NextResponse.json(reviews);
};

