import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function GET() {
  const factions = await prisma.factionPost.findMany({
    distinct: ['faction'],
    select: { faction: true }
  });

  return NextResponse.json(factions.map(f => f.faction));
}
