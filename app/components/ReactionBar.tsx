'use client';

import { useState, useEffect } from 'react';

interface Reaction {
  id: number;
  content: string;
  user: { name: string };
  createdAt: string;
}

interface ReactionBarProps {
  postId: number;
  onReactionAdded?: () => void;
}

const REACTION_OPTIONS = [
  "Excellent", "Pertinent", "Intéressant", "Acceptable",
  "Médiocre", "Inacceptable", "Outrage", "Rejet"
] as const;

export default function ReactionBar({ postId, onReactionAdded }: ReactionBarProps) {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [showSelector, setShowSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchReactions = async () => {
    try {
      const res = await fetch(`/api/reaction?post_id=${postId}`);
      if (res.ok) {
        const data = await res.json();
        setReactions(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchReactions();
  }, [postId]);

  const handleReact = async (type: string) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/reaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: postId, type }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erreur');
        return;
      }

      setShowSelector(false);
      await fetchReactions();
      onReactionAdded?.();
    } catch (e) {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  // Grouper les réactions par type
  const grouped = reactions.reduce((acc, r) => {
    acc[r.content] = (acc[r.content] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="mt-3">
      {/* Affichage des réactions existantes */}
      {Object.keys(grouped).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {Object.entries(grouped).map(([type, count]) => (
            <div
              key={type}
              className="px-3 py-1 text-sm rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-1.5"
            >
              <span>{type}</span>
              <span className="text-xs text-zinc-500">×{count}</span>
            </div>
          ))}
        </div>
      )}

      {/* Bouton pour réagir */}
      <button
        onClick={() => setShowSelector(!showSelector)}
        disabled={loading}
        className="text-sm px-4 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition"
      >
        {loading ? '...' : 'Réagir'}
      </button>

      {/* Sélecteur de réactions */}
      {showSelector && (
        <div className="mt-2 p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex flex-wrap gap-2">
          {REACTION_OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleReact(option)}
              className="px-3 py-1 text-sm rounded-full bg-zinc-900 hover:bg-emerald-900/30 border border-zinc-700 hover:border-emerald-700 text-zinc-300 hover:text-emerald-400 transition"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}
