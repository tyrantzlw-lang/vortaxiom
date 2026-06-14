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

  // Créer le post + mise à jour réputation en transaction
  await prisma.$transaction(async (tx) => {
    await tx.post.create({
      data: {
        userId,
        title,
        content,
      }
    });

    // Système de réputation (récupère l'affiliation depuis le profil)
    const profile = await tx.profile.findUnique({
      where: { userId },
      select: { affiliation: true }
    });

    const baseGain = 5;
    const factionBonus = profile?.affiliation ? 3 : 0;
    const totalGain = baseGain + factionBonus;

    await tx.profile.upsert({
      where: { userId },
      update: {
        reputation: { increment: totalGain }
      },
      create: {
        userId,
        reputation: 10 + totalGain,
        title: 'Étudiant du Flux'
      }
    });
  });

  return NextResponse.json({ success: true });
}
