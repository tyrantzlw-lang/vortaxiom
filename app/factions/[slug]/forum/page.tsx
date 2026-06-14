'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ReactionBar from '@/app/components/ReactionBar';

interface FactionPost {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
}

interface Comment {
  id: number;
  content: string;
  author: string;
  created_at: string;
}

const FACTION_NAMES: Record<string, string> = {
  chronautes: 'Chronautes',
  chiralistes: 'Chiralistes',
  vortexiens: 'Vortexiens',
  plenistes: 'Plénistes',
  gardiens: 'Gardiens du Flux',
};

export default function FactionForum() {
  const params = useParams<{ slug: string }>();
  const faction = params.slug;
  const { data: session } = useSession();

  const [posts, setPosts] = useState<FactionPost[]>([]);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [commentContent, setCommentContent] = useState<Record<number, string>>({});
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const factionName = FACTION_NAMES[faction] || faction;
  const userFaction = (session?.user as any)?.affiliation;
  const canPost = userFaction === faction;

  const loadPosts = async () => {
    try {
      const res = await fetch(`/api/faction-post?faction=${faction}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (e) {
      console.error('Erreur chargement posts faction');
    }
  };

  const loadComments = async (postId: number) => {
    try {
      const res = await fetch(`/api/faction-comment?post_id=${postId}`);
      if (res.ok) {
        const data = await res.json();
        setComments(prev => ({ ...prev, [postId]: data }));
      }
    } catch (e) {
      console.error('Erreur chargement commentaires');
    }
  };

  useEffect(() => {
    if (faction) loadPosts();
  }, [faction]);

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setIsLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/faction-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faction, title, content }),
      });

      const data = await res.json();

      if (res.ok) {
        setTitle('');
        setContent('');
        setShowForm(false);
        setMessage(`Message publié (+${data.reputationGained} réputation)`);
        await loadPosts();
      } else {
        setMessage(data.error || 'Erreur');
      }
    } catch (error) {
      setMessage('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const submitComment = async (postId: number) => {
    const commentText = commentContent[postId];
    if (!commentText) return;

    try {
      const res = await fetch('/api/faction-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, content: commentText }),
      });

      if (res.ok) {
        setCommentContent(prev => ({ ...prev, [postId]: '' }));
        await loadComments(postId);
      }
    } catch (error) {
      console.error('Erreur commentaire');
    }
  };

  const toggleComments = (postId: number) => {
    if (!comments[postId]) {
      loadComments(postId);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/factions/${faction}`} className="text-sm text-zinc-400 hover:text-white">← {factionName}</Link>
            <div className="text-xl font-medium tracking-wider">FORUM — {factionName.toUpperCase()}</div>
          </div>
          <div className="text-xs text-zinc-500">Espace dédié à la faction</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="max-w-2xl mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">Forum des {factionName}</h1>
          <p className="text-zinc-400 mt-2">
            Discussions internes et échanges théoriques réservés aux membres de la faction.
          </p>
        </div>

        {message && (
          <div className="mb-8 p-4 border border-emerald-800 bg-emerald-950/30 text-emerald-400 text-sm rounded-xl">
            {message}
          </div>
        )}

        {/* Bouton de publication */}
        {session && (
          <div className="mb-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-white text-black rounded-xl text-sm tracking-wider hover:bg-zinc-200 transition"
            >
              {showForm ? 'Annuler' : 'Publier un message'}
            </button>
            {!canPost && (
              <span className="ml-4 text-xs text-zinc-500">Vous devez rejoindre cette faction pour poster</span>
            )}
          </div>
        )}

        {/* Formulaire de post */}
        {showForm && canPost && (
          <form onSubmit={submitPost} className="mb-12 border border-zinc-800 rounded-2xl p-8 bg-zinc-950">
            <div className="space-y-6">
              <div>
                <label className="block text-xs tracking-[2px] text-zinc-500 mb-2">TITRE</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-zinc-600"
                  placeholder="Sujet de discussion..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs tracking-[2px] text-zinc-500 mb-2">MESSAGE</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-4 text-sm font-mono leading-relaxed focus:outline-none focus:border-zinc-600 resize-y"
                  placeholder="Votre contribution..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 rounded-xl text-sm tracking-wider transition"
              >
                {isLoading ? 'Publication...' : 'Publier dans le forum de la faction (+8 réputation)'}
              </button>
            </div>
          </form>
        )}

        {/* Liste des posts */}
        <div className="space-y-8">
          {posts.length === 0 && (
            <div className="text-zinc-500 italic">Aucun message pour l’instant dans ce forum.</div>
          )}

          {posts.map((post) => (
            <div key={post.id} className="border border-zinc-800 rounded-2xl p-8">
              <div className="mb-4">
                <div className="font-medium text-xl tracking-tight">{post.title}</div>
                <div className="text-sm text-zinc-500 mt-1">
                  {post.author} • {new Date(post.created_at).toLocaleDateString('fr-FR')}
                </div>
              </div>

              <div className="text-zinc-300 leading-relaxed whitespace-pre-wrap mb-6">
                {post.content}
              </div>

              {/* Section commentaires */}
              <div className="border-t border-zinc-800 pt-6">
                <ReactionBar postId={post.id} />
                <button
                
                  onClick={() => toggleComments(post.id)}
                  className="text-xs text-emerald-400 hover:underline mb-4"
                >
                  {comments[post.id] ? 'Masquer les commentaires' : 'Afficher les commentaires'}
                </button>

                {comments[post.id] && (
                  <div className="space-y-4 mb-6">
                    {comments[post.id].length === 0 && (
                      <div className="text-sm text-zinc-500 italic">Aucun commentaire pour l’instant.</div>
                    )}
                    {comments[post.id].map((comment) => (
                      <div key={comment.id} className="pl-4 border-l border-zinc-700">
                        <div className="text-sm text-zinc-300">{comment.content}</div>
                        <div className="text-xs text-zinc-500 mt-1">
                          {comment.author} • {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Formulaire de commentaire */}
                {session && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={commentContent[post.id] || ''}
                      onChange={(e) => setCommentContent(prev => ({ ...prev, [post.id]: e.target.value }))}
                      placeholder="Répondre..."
                      className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-zinc-600"
                    />
                    <button
                      onClick={() => submitComment(post.id)}
                      className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm transition"
                    >
                      Répondre
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
