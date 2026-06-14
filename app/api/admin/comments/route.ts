import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  }

  const comments = await prisma.comment.findMany({
    include: { 
      user: { select: { name: true } },
      post: { select: { title: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  const formatted = comments.map(c => ({
    id: c.id,
    content: c.content,
    created_at: c.createdAt,
    author: c.user?.name || 'Anonyme',
    post_title: c.post?.title || 'Post supprimé'
  }));

  return NextResponse.json(formatted);
}
