import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  const userId = session?.user ? Number((session.user as any).id) : null;

  const data = await req.json();

  await prisma.plenumSimulation.create({
    data: {
      userId,
      chi: data.chi,
      coherence: data.coherence,
      turbulence: data.turbulence,
      density: data.density,
      vortexCount: data.vortexCount,
      anomalyRisk: data.anomalyRisk,
      resonance: data.resonance,
      stability: data.stability,
      notes: data.notes || null,
    }
  });

  return NextResponse.json({ success: true });
}
