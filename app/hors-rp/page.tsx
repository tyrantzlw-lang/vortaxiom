'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

export default function HorsRPPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [openPostId, setOpenPostId] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadPosts = async () => {
    const res = await fetch('/api/ooc');
    const data = await res.json();
    setPosts(data);
  };

  const loadComments = async (postId: number) => {
    const res = await fetch(`/api/ooc-comment?post_id=${postId}`);
    const data = await res.json();
    setComments(prev => ({ ...prev, [postId]: data }));
  };

  const togglePost = async (postId: number) => {
    if (openPostId === postId) {
      setOpenPostId(null);
    } else {
      setOpenPostId(postId);
      if (!comments[postId]) await loadComments(postId);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/ooc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        setTitle('');
        setContent('');
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
      const res = await fetch('/api/ooc-comment', {
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-zinc-400 hover:text-white">← Retour</Link>
            <div>
              <div className="text-xl font-medium tracking-wider">HORS RP</div>
              <div className="text-[10px] text-zinc-500 -mt-1">Discussions méta &amp; techniques</div>
            </div>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 text-sm border border-zinc-700 hover:bg-zinc-900 rounded-lg transition-colors">
            {showForm ? 'Fermer' : 'Nouveau sujet'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold tracking-tighter mb-3">Espace Hors RP</h1>
          <p className="text-zinc-400 max-w-md">Discussions en dehors du jeu : règles, technique, organisation, questions méta.</p>
        </div>

        {showForm && (
          <div className="mb-10 border border-zinc-800 p-8 rounded-xl">
            <form onSubmit={submitPost} className="space-y-4">
              <input type="text" placeholder="Titre du sujet" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3" required />
              <textarea placeholder="Votre message..." value={content} onChange={(e) => setContent(e.target.value)} rows={6} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 resize-y" required />
              <button type="submit" disabled={isLoading} className="px-6 py-2.5 bg-white text-black font-medium rounded-lg">Publier</button>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border border-zinc-800 rounded-xl overflow-hidden">
              <div onClick={() => togglePost(post.id)} className="p-6 cursor-pointer hover:bg-zinc-950 transition-colors">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-xl tracking-tight pr-4">{post.title}</h3>
                  <div className="text-xs text-zinc-500 text-right shrink-0">
                    par {post.name}<br />{new Date(post.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>

              {openPostId === post.id && (
                <div className="border-t border-zinc-800 p-6 bg-zinc-950">
                  <p className="text-zinc-300 whitespace-pre-line mb-8">{post.content}</p>

                  <div className="space-y-4 mb-6">
                    {(comments[post.id] || []).map((comment) => (
                      <div key={comment.id} className="pl-4 border-l border-zinc-700">
                        <div className="text-sm text-zinc-400 mb-1">{comment.name} • {new Date(comment.created_at).toLocaleDateString('fr-FR')}</div>
                        <p className="text-zinc-300">{comment.content}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input type="text" placeholder="Écrire un commentaire..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 text-sm" />
                    <button onClick={() => submitComment(post.id)} disabled={isLoading || !newComment.trim()} className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg disabled:opacity-50">Envoyer</button>
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
