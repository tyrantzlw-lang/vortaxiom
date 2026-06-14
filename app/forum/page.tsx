'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Post {
  id: number;
  title: string;
  content: string;
  name: string;
  created_at: string;
}

interface Comment {
  id: number;
  content: string;
  name: string;
  created_at: string;
}

interface Reaction {
  id: number;
  content: string;
  name: string;
  created_at: string;
}

const REACTION_OPTIONS = [
  "Excellent", "Pertinent", "Intéressant", "Acceptable",
  "Médiocre", "Inacceptable", "Outrage", "Rejet"
];

export default function ForumPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [openPostId, setOpenPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [reactions, setReactions] = useState<Record<number, Reaction[]>>({});
  const [likes, setLikes] = useState<Record<number, { count: number; likedByUser: boolean }>>({});
  const [newComment, setNewComment] = useState('');
  const [newReaction, setNewReaction] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);

  const loadPosts = async () => {
    const res = await fetch('/api/post');
    if (res.ok) setPosts(await res.json());
  };

  const loadComments = async (postId: number) => {
    const res = await fetch(`/api/comment?post_id=${postId}`);
    if (res.ok) {
      const data = await res.json();
      setComments(prev => ({ ...prev, [postId]: data }));
    }
  };

  const loadReactions = async (postId: number) => {
    const res = await fetch(`/api/reaction?post_id=${postId}`);
    if (res.ok) {
      const data = await res.json();
      setReactions(prev => ({ ...prev, [postId]: data }));
    }
  };

  const loadLikes = async (postId: number) => {
    const userId = (session?.user as any)?.id;
    const res = await fetch(`/api/like?post_id=${postId}${userId ? `&user_id=${userId}` : ''}`);
    if (res.ok) {
      const data = await res.json();
      setLikes(prev => ({ ...prev, [postId]: data }));
    }
  };

  const togglePost = async (postId: number) => {
    if (openPostId === postId) {
      setOpenPostId(null);
    } else {
      setOpenPostId(postId);
      if (!comments[postId]) await loadComments(postId);
      if (!reactions[postId]) await loadReactions(postId);
      if (!likes[postId]) await loadLikes(postId);
    }
  };

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      if (res.ok) {
        setNewPost({ title: '', content: '' });
        setShowForm(false);
        await loadPosts();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitComment = async (postId: number) => {
    if (!newComment.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, content: newComment }),
      });
      if (res.ok) {
        setNewComment('');
        await loadComments(postId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitReaction = async (postId: number) => {
    if (!newReaction.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/reaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, content: newReaction }),
      });
      if (res.ok) {
        setNewReaction('');
        await loadReactions(postId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitQuickReaction = async (postId: number, type: string) => {
    if (!session) {
      alert("Connectez-vous pour réagir");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/reaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, type }),
      });
      if (res.ok) {
        await loadReactions(postId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLike = async (postId: number) => {
    if (!session) {
      alert("Connectez-vous pour liker");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId }),
      });
      if (res.ok) {
        await loadLikes(postId);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-zinc-400 hover:text-white">← Retour</Link>
            <div className="text-xl font-medium tracking-wider">FORUM DU FLUX</div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 text-sm border border-zinc-700 hover:bg-zinc-900 rounded-lg transition-colors"
          >
            {showForm ? 'Fermer' : 'Nouveau post'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold tracking-tighter mb-3">Débats du Plénum</h1>
          <p className="text-zinc-400">Échangez sur la cosmologie, les factions et les théories.</p>
        </div>

        {showForm && (
          <div className="mb-10 border border-zinc-800 rounded-xl p-6">
            <form onSubmit={submitPost} className="space-y-4">
              <input
                type="text"
                placeholder="Titre du post"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-lg"
                required
              />
              <textarea
                placeholder="Votre contribution..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 h-40 resize-y"
                required
              />
              <button type="submit" disabled={isLoading} className="px-6 py-2.5 bg-white text-black font-medium rounded-lg">
                {isLoading ? 'Publication...' : 'Publier'}
              </button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border border-zinc-800 rounded-xl overflow-hidden">
              <div 
                onClick={() => togglePost(post.id)}
                className="p-6 cursor-pointer hover:bg-zinc-950 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-xl tracking-tight pr-4">{post.title}</h3>
                  <div className="text-xs text-zinc-500 text-right shrink-0">
                    par {post.name}<br />
                    {new Date(post.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>

              {openPostId === post.id && (
                <div className="border-t border-zinc-800 p-6 bg-zinc-950">
                  <p className="text-zinc-300 whitespace-pre-line mb-8">{post.content}</p>

                  {/* Likes + Réactions */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <button
                        onClick={() => toggleLike(post.id)}
                        disabled={isLoading || !session}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition ${
                          likes[post.id]?.likedByUser 
                            ? 'bg-emerald-600 text-white' 
                            : 'border border-zinc-700 hover:bg-zinc-800'
                        }`}
                      >
                        ❤️ {likes[post.id]?.count || 0}
                      </button>
                    </div>

                    {/* Boutons réactions rapides */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {REACTION_OPTIONS.map((option) => (
                        <button
                          key={option}
                          onClick={() => submitQuickReaction(post.id, option)}
                          disabled={isLoading || !session}
                          className="px-3 py-1 text-xs border border-zinc-700 hover:bg-zinc-800 rounded-full transition-colors disabled:opacity-50"
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {/* Réaction texte libre */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ou une réaction personnalisée (max 120 caractères)..."
                        value={newReaction}
                        onChange={(e) => setNewReaction(e.target.value)}
                        className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-1.5 text-sm"
                        maxLength={120}
                      />
                      <button
                        onClick={() => submitReaction(post.id)}
                        disabled={isLoading || !newReaction.trim()}
                        className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded-full disabled:opacity-50"
                      >
                        Envoyer
                      </button>
                    </div>
                  </div>

                  {/* Affichage des réactions */}
                  {(reactions[post.id] || []).length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {(reactions[post.id] || []).map((reaction) => (
                        <div key={reaction.id} className="bg-zinc-900 border border-zinc-700 px-3 py-1 rounded-full text-sm">
                          <span className="text-zinc-400">{reaction.name}:</span> {reaction.content}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Commentaires */}
                  <div className="space-y-4 mb-6">
                    {(comments[post.id] || []).map((comment) => (
                      <div key={comment.id} className="pl-4 border-l border-zinc-700">
                        <div className="text-sm text-zinc-400 mb-1">
                          {comment.name} • {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                        </div>
                        <p className="text-zinc-300">{comment.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Formulaire commentaire long */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Écrire un commentaire..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm"
                    />
                    <button
                      onClick={() => submitComment(post.id)}
                      disabled={isLoading || !newComment.trim()}
                      className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg disabled:opacity-50"
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
