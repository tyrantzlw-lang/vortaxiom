'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getTitle, getProgress } from '@/lib/reputation';
import { FACTION_BONUSES } from '@/lib/faction-bonuses';

const FACTIONS = [
  { slug: 'chronautes', name: 'Chronautes', color: 'text-amber-400' },
  { slug: 'chiralistes', name: 'Chiralistes', color: 'text-purple-400' },
  { slug: 'vortexiens', name: 'Vortexiens', color: 'text-sky-400' },
  { slug: 'plenistes', name: 'Plénistes', color: 'text-emerald-400' },
  { slug: 'gardiens', name: 'Gardiens du Flux', color: 'text-rose-400' },
];

interface MyReport {
  id: number;
  title: string;
  created_at: string;
}

interface MySimulation {
  id: number;
  chi: number;
  coherence: number;
  vortex_count: number;
  stability: string;
  notes: string | null;
  created_at: string;
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [localRep, setLocalRep] = useState<number | null>(null);
  const [affiliation, setAffiliation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [myReports, setMyReports] = useState<MyReport[]>([]);
  const [mySimulations, setMySimulations] = useState<MySimulation[]>([]);

  useEffect(() => {
    if (session?.user) {
      const savedFaction = (session.user as any).affiliation;
      if (savedFaction) setAffiliation(savedFaction);
    }
  }, [session]);

  // Charger les contributions personnelles
  useEffect(() => {
    if (session?.user) {
      fetch('/api/my-reports').then(r => r.json()).then(setMyReports).catch(() => {});
      fetch('/api/my-simulations').then(r => r.json()).then(setMySimulations).catch(() => {});
    }
  }, [session]);

  if (status === 'loading') {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">Chargement...</div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-center px-6">
        <div>
          <p className="mb-6 text-zinc-400">Vous devez être connecté pour accéder à votre profil.</p>
          <Link href="/login" className="underline">Se connecter</Link>
        </div>
      </div>
    );
  }

  const baseRep = (session.user as any)?.reputation ?? 10;
  const reputation = localRep !== null ? localRep : baseRep;
  const title = getTitle(reputation);
  const progress = getProgress(reputation);
  const nextTitle = progress.next ? getTitle(progress.next) : null;

  const currentFaction = FACTIONS.find(f => f.slug === affiliation);
  const bonus = affiliation ? FACTION_BONUSES[affiliation as keyof typeof FACTION_BONUSES] : null;

  const joinFaction = async (factionSlug: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/faction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faction: factionSlug }),
      });
      if (res.ok) {
        setAffiliation(factionSlug);
        await update();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = (session.user as any)?.role === 'admin';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="text-4xl font-semibold tracking-tight">{session.user?.name || 'Chercheur'}</div>
              {isAdmin && (
                <div className="px-3 py-1 text-xs bg-red-950 text-red-400 rounded-full font-mono tracking-wider">ADMIN</div>
              )}
            </div>
            <div className="text-zinc-400 mt-1">{session.user?.email}</div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-mono tracking-tighter">{reputation}</div>
            <div className="text-xs text-zinc-500 -mt-1">RÉPUTATION</div>
          </div>
        </div>

        {/* Titre et progression */}
        <div className="mb-12">
          <div className="text-sm text-zinc-500 mb-1">TITRE ACTUEL</div>
          <div className="text-2xl font-medium tracking-tight mb-4">{title.name}</div>
          
          <div className="max-w-md">
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-white transition-all" 
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-zinc-500">
              <div>{title.name}</div>
              {nextTitle && <div>→ {nextTitle.name}</div>}
            </div>
          </div>
        </div>

        {/* Faction */}
        <div className="mb-12">
          <div className="text-sm text-zinc-500 mb-3">FACTION</div>
          {currentFaction ? (
            <div className="border border-zinc-800 p-6 rounded-xl">
              <div className={`text-xl font-medium ${currentFaction.color}`}>
                {currentFaction.name}
              </div>
              {bonus && (
                <div className="mt-3 text-sm text-zinc-400">
                  Bonus : <span className="text-emerald-400">{bonus.description}</span>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="text-zinc-400 mb-4">Vous n&apos;avez pas encore rejoint de faction.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {FACTIONS.map(faction => (
                  <button
                    key={faction.slug}
                    onClick={() => joinFaction(faction.slug)}
                    disabled={isLoading}
                    className="border border-zinc-800 hover:border-zinc-600 p-4 rounded-xl text-left transition-colors disabled:opacity-50"
                  >
                    <div className={faction.color}>{faction.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contributions personnelles */}
        <div className="mb-12">
          <div className="text-sm text-zinc-500 mb-4">VOS CONTRIBUTIONS</div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Rapports publiés */}
            <div className="border border-zinc-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-emerald-400">Rapports publiés</div>
                <Link href="/rapports" className="text-xs text-zinc-500 hover:text-white">→ Publier</Link>
              </div>
              {myReports.length > 0 ? (
                <div className="space-y-3 text-sm">
                  {myReports.map(r => (
                    <div key={r.id} className="border-l-2 border-emerald-900 pl-3">
                      <div className="font-medium">{r.title}</div>
                      <div className="text-xs text-zinc-500">{new Date(r.created_at).toLocaleDateString('fr-FR')}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-zinc-500">Aucun rapport publié pour l’instant.</div>
              )}
            </div>

            {/* Simulations sauvegardées */}
            <div className="border border-zinc-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-emerald-400">Simulations archivées</div>
                <Link href="/lab/plenum" className="text-xs text-zinc-500 hover:text-white">→ Simulateur</Link>
              </div>
              {mySimulations.length > 0 ? (
                <div className="space-y-3 text-sm">
                  {mySimulations.map(s => (
                    <div key={s.id} className="border-l-2 border-sky-900 pl-3">
                      <div>χ{s.chi.toFixed(2)} • {s.stability} • {s.vortex_count} vortex</div>
                      {s.notes && <div className="text-xs text-zinc-500 italic mt-0.5">« {s.notes} »</div>}
                      <div className="text-xs text-zinc-500">{new Date(s.created_at).toLocaleDateString('fr-FR')}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-zinc-500">Aucune simulation sauvegardée.</div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-8 border-t border-zinc-800 flex gap-6 text-sm">
          <Link href="/forum" className="text-zinc-400 hover:text-white">← Retour au Forum</Link>
          <Link href="/rapports" className="text-zinc-400 hover:text-white">Voir tous les rapports</Link>
        </div>
      </div>
    </div>
  );
}
