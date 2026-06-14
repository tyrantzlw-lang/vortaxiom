import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const { report_id, content } = await req.json();
  const userId = (session.user as any).id;

  await prisma.reportComment.create({
    data: {
      reportId: parseInt(report_id),
      userId: parseInt(userId),
      content,
    },
  });
  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reportId = searchParams.get('report_id');
  if (!reportId) return NextResponse.json({ error: 'report_id requis' }, { status: 400 });

  const comments = await prisma.reportComment.findMany({
    where: { reportId: parseInt(reportId) },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json(comments);
}
