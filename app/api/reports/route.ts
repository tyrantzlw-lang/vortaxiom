import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET() {
  const reports = await prisma.report.findMany({
    include: {
      user: {
        select: { name: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: 30
  });

  const formatted = reports.map(r => ({
    id: r.id,
    title: r.title,
    content: r.content,
    name: r.user?.name || 'Anonyme',
    created_at: r.createdAt.toISOString()
  }));

  return NextResponse.json(formatted);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { title, content } = await req.json();
  const userId = Number((session.user as any).id);

  await prisma.report.create({
    data: { userId, title, content }
  });

  return NextResponse.json({ success: true });
}
