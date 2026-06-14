import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { getReactionImpact } from '@/lib/reputation';

const REACTION_OPTIONS = [
  "Excellent", "Pertinent", "Intéressant", "Acceptable",
  "Mediocre", "Inacceptable", "Outrage", "Rejet"
] as const;

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { post_id, content, type } = await req.json();
  const reactorId = (session.user as any).id;

  let reactionContent = content;
  if (type && REACTION_OPTIONS.includes(type)) {
    reactionContent = type;
  }

  if (!post_id || !reactionContent || reactionContent.length > 120) {
    return NextResponse.json({ error: 'Contenu invalide (max 120 caractères)' }, { status: 400 });
  }

  const postIdNum = parseInt(post_id);

  // Créer la réaction
  await prisma.postReaction.create({
    data: {
      postId: postIdNum,
      userId: parseInt(reactorId),
      content: reactionContent,
    },
  });

  // Appliquer l'impact de réputation sur l'auteur du post
  const post = await prisma.post.findUnique({
    where: { id: postIdNum },
    select: { userId: true },
  });

  if (post && post.userId) {
    const impact = getReactionImpact(reactionContent);
    if (impact !== 0) {
      await prisma.profile.upsert({
        where: { userId: post.userId },
        update: {
          reputation: { increment: impact },
        },
        create: {
          userId: post.userId,
          reputation: impact,
        },
      });
    }
  }

  return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('post_id');

  if (!postId) return NextResponse.json({ error: 'post_id requis' }, { status: 400 });

  const reactions = await prisma.postReaction.findMany({
    where: { postId: parseInt(postId) },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
    take: 20,
  });

  return NextResponse.json(reactions);
}
