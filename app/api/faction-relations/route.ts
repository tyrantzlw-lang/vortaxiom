import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const relations = await prisma.factionRelation.findMany();
  return NextResponse.json(relations);
}
