import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateRequest } from '@/lib/auth';

export const GET = async (req: NextRequest) => {
  const creators = await db.getAllCreators();
  return NextResponse.json(creators);
};

export const POST = validateRequest(async (req: NextRequest, user: any) => {
  if (user.role !== 'creator') {
    return NextResponse.json({ error: 'Only creators can create a profile' }, { status: 403 });
  }

  const { specialty, bio, rate } = await req.json();

  if (!specialty || !bio || !rate) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const existingCreator = await db.getCreatorByUserId(user.id);
  if (existingCreator) {
    return NextResponse.json({ error: 'Creator profile already exists' }, { status: 409 });
  }

  const newCreator = await db.createCreator({ userId: user.id, specialty, bio, rate });
  return NextResponse.json(newCreator);
});

