import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { postId, content } = await req.json();
  const userId = Number((session.user as any).id);

  await prisma.oocComment.create({
    data: {
      postId: Number(postId),
      userId,
      content,
    }
  });

  return NextResponse.json({ success: true });
}
