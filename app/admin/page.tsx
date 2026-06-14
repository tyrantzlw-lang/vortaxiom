'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
  reputation: number | null;
  affiliation: string | null;
  title: string | null;
}

interface AdminPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author: string;
}

interface AdminComment {
  id: number;
  content: string;
  created_at: string;
  author: string;
  post_title: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const isAdmin = (session?.user as any)?.role === 'admin';

  const loadData = async () => {
    if (!isAdmin) return;

    try {
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/posts'),
        fetch('/api/admin/comments'),
      ]);

      const [usersData, postsData, commentsData] = await Promise.all([
        usersRes.json(),
        postsRes.json(),
        commentsRes.json(),
      ]);

      setUsers(usersData);
      setPosts(postsData);
      setComments(commentsData);
    } catch (e) {
      console.error('Erreur chargement admin');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [isAdmin]);

  const deletePost = async (id: number) => {
    if (!confirm('Supprimer ce post et tous ses commentaires ?')) return;

    const res = await fetch(`/api/admin/posts?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMessage('Post supprimé');
      loadData();
    } else {
      setMessage('Erreur lors de la suppression');
    }
  };

  const deleteComment = async (id: number) => {
    if (!confirm('Supprimer ce commentaire ?')) return;

    const res = await fetch(`/api/admin/comments?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMessage('Commentaire supprimé');
      loadData();
    } else {
      setMessage('Erreur lors de la suppression');
    }
  };

  if (status === 'loading') {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">Chargement...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⛔</div>
          <h1 className="text-2xl font-semibold mb-2">Accès refusé</h1>
          <p className="text-zinc-400">Cette section est réservée aux administrateurs.</p>
          <Link href="/" className="text-sm text-zinc-500 hover:text-white mt-4 inline-block">← Retour à l'accueil</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="px-3 py-1 text-xs bg-red-950 text-red-400 rounded-full font-mono tracking-wider">ADMIN</div>
          <h1 className="text-5xl font-semibold tracking-tighter">Panneau d'administration</h1>
        </div>

        <div className="text-zinc-400 mb-10">
          Connecté en tant que {(session?.user as any)?.name}
        </div>

        {message && (
          <div className="mb-8 p-4 border border-emerald-800 bg-emerald-950/30 text-emerald-400 text-sm rounded-xl">
            {message}
          </div>
        )}

        {/* Section Utilisateurs */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium mb-6">Utilisateurs</h2>
          
          {loading ? (
            <div className="text-zinc-500">Chargement...</div>
          ) : (
            <div className="border border-zinc-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-zinc-950 text-zinc-400">
                  <tr>
                    <th className="text-left px-6 py-4">Utilisateur</th>
                    <th className="text-left px-6 py-4">Rôle</th>
                    <th className="text-left px-6 py-4">Réputation</th>
                    <th className="text-left px-6 py-4">Faction</th>
                    <th className="text-left px-6 py-4">Titre</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="border-t border-zinc-800 hover:bg-zinc-950">
                      <td className="px-6 py-4">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-zinc-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        {user.role === 'admin' ? (
                          <span className="px-2 py-0.5 text-xs bg-red-950 text-red-400 rounded">ADMIN</span>
                        ) : (
                          <span className="text-zinc-400">user</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono">{user.reputation ?? 10}</td>
                      <td className="px-6 py-4 text-zinc-400">{user.affiliation || '—'}</td>
                      <td className="px-6 py-4 text-zinc-400">{user.title || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Section Modération - Posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium mb-6">Modération — Posts du Forum ({posts.length})</h2>
          
          <div className="border border-zinc-800 rounded-2xl overflow-hidden">
            {posts.length === 0 ? (
              <div className="p-8 text-zinc-400">Aucun post pour le moment.</div>
            ) : (
              <div className="divide-y divide-zinc-800">
                {posts.map((post) => (
                  <div key={post.id} className="p-6 flex justify-between items-start hover:bg-zinc-950">
                    <div className="flex-1 pr-6">
                      <div className="font-medium text-lg">{post.title}</div>
                      <div className="text-sm text-zinc-500 mt-1">
                        {post.author} • {new Date(post.created_at).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="text-sm text-zinc-400 mt-3 line-clamp-2">{post.content}</div>
                    </div>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="px-4 py-2 text-xs border border-red-900 text-red-400 hover:bg-red-950 rounded-lg transition"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section Modération - Commentaires */}
        <div>
          <h2 className="text-2xl font-medium mb-6">Modération — Commentaires ({comments.length})</h2>
          
          <div className="border border-zinc-800 rounded-2xl overflow-hidden">
            {comments.length === 0 ? (
              <div className="p-8 text-zinc-400">Aucun commentaire pour le moment.</div>
            ) : (
              <div className="divide-y divide-zinc-800">
                {comments.map((comment) => (
                  <div key={comment.id} className="p-6 flex justify-between items-start hover:bg-zinc-950">
                    <div className="flex-1 pr-6">
                      <div className="text-sm text-emerald-400 mb-1">Sur : {comment.post_title}</div>
                      <div className="text-sm text-zinc-300">{comment.content}</div>
                      <div className="text-xs text-zinc-500 mt-2">
                        {comment.author} • {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="px-4 py-2 text-xs border border-red-900 text-red-400 hover:bg-red-950 rounded-lg transition"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
