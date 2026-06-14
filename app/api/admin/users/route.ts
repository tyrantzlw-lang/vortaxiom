import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET() {
  const session = await getServerSession();
  
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    include: { profile: true },
    orderBy: { createdAt: 'desc' }
  });
  
  return NextResponse.json(users);
}
