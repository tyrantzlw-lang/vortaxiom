import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const comments = await prisma.comment.findMany({
    include: { user: true, post: true },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(comments);
}
