import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const userId = Number((session.user as any).id);

  const profile = await prisma.profile.findUnique({
    where: { userId }
  });

  return NextResponse.json({ reputation: profile?.reputation ?? 10 });
}
