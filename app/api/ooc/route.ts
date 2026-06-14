import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { title, content } = await req.json();
  const userId = Number((session.user as any).id);

  if (!title || !content) {
    return NextResponse.json({ error: 'Titre et contenu requis' }, { status: 400 });
  }

  await prisma.oocPost.create({
    data: { userId, title, content }
  });

  return NextResponse.json({ success: true });
}
