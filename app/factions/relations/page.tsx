'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const factions = [
  { slug: 'chronautes', name: 'Chronautes', color: 'text-amber-400' },
  { slug: 'chiralistes', name: 'Chiralistes', color: 'text-purple-400' },
  { slug: 'vortexiens', name: 'Vortexiens', color: 'text-sky-400' },
  { slug: 'plenistes', name: 'Plénistes', color: 'text-emerald-400' },
  { slug: 'gardiens', name: 'Gardiens du Flux', color: 'text-rose-400' },
];

interface Relation {
  faction_a: string;
  faction_b: string;
  standing: number;
}

export default function FactionRelations() {
  const [relations, setRelations] = useState<Relation[]>([]);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const loadRelations = async () => {
    try {
      const res = await fetch('/api/faction-relations');
      const data = await res.json();
      setRelations(data);
    } catch (e) {
      console.error('Erreur chargement relations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRelations();
  }, []);

  const getStandingLabel = (value: number) => {
    if (value > 60) return { label: 'Alliance forte', color: 'text-emerald-400' };
    if (value > 20) return { label: 'Coopération', color: 'text-emerald-300' };
    if (value > -20) return { label: 'Neutre', color: 'text-zinc-400' };
    if (value > -50) return { label: 'Tensions', color: 'text-amber-400' };
    return { label: 'Hostilité', color: 'text-red-400' };
  };

  const getFactionInfo = (slug: string) => factions.find(f => f.slug === slug);

  const influenceRelation = async (a: string, b: string, delta: number) => {
    const key = `${a}-${b}`;
    setSelectedAction(key);

    try {
      const res = await fetch('/api/faction-relations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faction_a: a, faction_b: b, delta }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Relations mises à jour (+${data.reputationGained} réputation)`);
        await loadRelations();
      } else {
        setMessage(data.error || 'Action impossible');
      }
    } catch (e) {
      setMessage('Erreur de connexion');
    }

    setTimeout(() => {
      setSelectedAction(null);
      setMessage('');
    }, 1600);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0a] text-zinc-200 flex items-center justify-center">Chargement des relations...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center gap-4">
          <Link href="/factions" className="text-sm text-zinc-400 hover:text-white">← Factions</Link>
          <div className="text-xl font-medium tracking-wider">RELATIONS INTER-FACTIONS</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="max-w-2xl mb-10">
          <div className="text-emerald-500 text-xs tracking-[3px] mb-2">OBSERVATOIRE POLITIQUE — INSTITUT SOLVISTA</div>
          <h1 className="text-5xl font-semibold tracking-tighter">Relations entre Factions</h1>
          <p className="text-zinc-400 mt-4 text-lg">
            L'équilibre entre les cinq factions est dynamique. Vos actions peuvent renforcer ou fragiliser ces liens.
          </p>
        </div>

        {message && (
          <div className="mb-8 p-4 border border-emerald-800 bg-emerald-950/30 text-emerald-400 rounded-xl text-sm">
            {message}
          </div>
        )}

        <div className="space-y-4">
          {relations.length === 0 && (
            <div className="text-zinc-500">Aucune relation enregistrée.</div>
          )}

          {relations.map((rel, index) => {
            const fa = getFactionInfo(rel.faction_a);
            const fb = getFactionInfo(rel.faction_b);
            const standing = getStandingLabel(rel.standing);
            const key = `${rel.faction_a}-${rel.faction_b}`;

            return (
              <div key={index} className="border border-zinc-800 rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 text-lg">
                  <span className={`font-medium ${fa?.color}`}>{fa?.name}</span>
                  <span className="text-zinc-500">↔</span>
                  <span className={`font-medium ${fb?.color}`}>{fb?.name}</span>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className={`font-mono text-3xl tracking-tighter ${standing.color}`}>
                      {rel.standing}
                    </div>
                    <div className="text-xs text-zinc-500">{standing.label}</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => influenceRelation(rel.faction_a, rel.faction_b, 12)}
                      disabled={selectedAction === key}
                      className="px-4 py-2 text-xs border border-emerald-800 hover:bg-emerald-950 rounded-xl disabled:opacity-50 transition"
                    >
                      Soutenir
                    </button>
                    <button
                      onClick={() => influenceRelation(rel.faction_a, rel.faction_b, -12)}
                      disabled={selectedAction === key}
                      className="px-4 py-2 text-xs border border-red-800 hover:bg-red-950 rounded-xl disabled:opacity-50 transition"
                    >
                      Opposer
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-xs text-zinc-500 max-w-md">
          Ces relations influencent les bonus de réputation lors de publications et les événements futurs. Votre affiliation actuelle modifie l'impact de vos actions.
        </div>
      </div>
    </div>
  );
}
