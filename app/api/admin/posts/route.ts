import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  }

  const posts = await prisma.post.findMany({
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
    take: 50
  });

  const formatted = posts.map(p => ({
    id: p.id,
    title: p.title,
    content: p.content,
    created_at: p.createdAt,
    author: p.user?.name || 'Anonyme'
  }));

  return NextResponse.json(formatted);
}
