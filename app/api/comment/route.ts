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

  if (!postId || !content) {
    return NextResponse.json({ error: 'postId et content requis' }, { status: 400 });
  }

  await prisma.comment.create({
    data: {
      postId: Number(postId),
      userId,
      content,
    }
  });

  // Bonus réputation pour commentaire
  await prisma.profile.update({
    where: { userId },
    data: { reputation: { increment: 2 } }
  });

  return NextResponse.json({ success: true });
}
