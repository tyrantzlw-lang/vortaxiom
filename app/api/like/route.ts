import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { post_id } = await req.json();
  const userId = (session.user as any).id;

  if (!post_id) {
    return NextResponse.json({ error: 'post_id requis' }, { status: 400 });
  }

  // Vérifier si l'utilisateur a déjà liké
  const existing = await prisma.postLike.findUnique({
    where: {
      postId_userId: {
        postId: parseInt(post_id),
        userId: parseInt(userId),
      },
    },
  });

  if (existing) {
    // Unlike
    await prisma.postLike.delete({
      where: {
        postId_userId: {
          postId: parseInt(post_id),
          userId: parseInt(userId),
        },
      },
    });
    return NextResponse.json({ success: true, liked: false });
  } else {
    // Like
    await prisma.postLike.create({
      data: {
        postId: parseInt(post_id),
        userId: parseInt(userId),
      },
    });
    return NextResponse.json({ success: true, liked: true });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('post_id');
  const userId = searchParams.get('user_id');

  if (!postId) {
    return NextResponse.json({ error: 'post_id requis' }, { status: 400 });
  }

  const postIdInt = parseInt(postId);
  const likes = await prisma.postLike.count({
    where: { postId: postIdInt },
  });

  let likedByUser = false;
  if (userId) {
    const like = await prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId: postIdInt,
          userId: parseInt(userId),
        },
      },
    });
    likedByUser = !!like;
  }

  return NextResponse.json({
    likes,
    likedByUser,
  });
}
