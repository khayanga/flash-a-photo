import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateRequest } from '@/lib/auth';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const creator = await db.getCreatorByUserId(params.id);
  if (!creator) {
    return NextResponse.json({ error: 'Creator not found' }, { status: 404 });
  }
  return NextResponse.json(creator);
};

export const PUT = validateRequest(async (req: NextRequest, user: any) => {
  const { id } = req.nextUrl.pathname.split('/').pop()!;
  const creator = await db.getCreatorByUserId(id);
  
  if (!creator) {
    return NextResponse.json({ error: 'Creator not found' }, { status: 404 });
  }

  if (user.id !== creator.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const updates = await req.json();
  const updatedCreator = await db.updateCreator(creator.id, updates);
  return NextResponse.json(updatedCreator);
});

