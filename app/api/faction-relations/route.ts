import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const relations = await prisma.factionRelation.findMany({
    orderBy: { standing: 'desc' }
  });
  return NextResponse.json(relations);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { faction_a, faction_b, delta } = await req.json();
  const userId = Number((session.user as any).id);

  if (!faction_a || !faction_b || typeof delta !== 'number') {
    return NextResponse.json({ error: 'Paramètres invalides' }, { status: 400 });
  }

  // Trouver ou créer la relation
  const relation = await prisma.factionRelation.upsert({
    where: {
      factionA_factionB: {
        factionA: faction_a,
        factionB: faction_b
      }
    },
    update: {
      standing: { increment: delta }
    },
    create: {
      factionA: faction_a,
      factionB: faction_b,
      standing: delta
    }
  });

  // Gain de réputation pour le joueur
  const reputationGain = Math.abs(delta) / 2;
  await prisma.profile.update({
    where: { userId },
    data: { reputation: { increment: Math.floor(reputationGain) } }
  });

  return NextResponse.json({ 
    success: true, 
    newStanding: relation.standing,
    reputationGained: Math.floor(reputationGain)
  });
}
