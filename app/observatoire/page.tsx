'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Report {
  id: number;
  title: string;
  name: string;
  created_at: string;
}

interface Simulation {
  id: number;
  vortex_count: number;
  stability: string;
  author: string | null;
  created_at: string;
}

export default function ObservatoirePage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [reportsRes, simsRes] = await Promise.all([
          fetch('/api/reports'),
          fetch('/api/plenum-simulation'),
        ]);

        const [reportsData, simsData] = await Promise.all([
          reportsRes.json(),
          simsRes.json(),
        ]);

        setReports(reportsData.slice(0, 5));
        setSimulations(simsData.slice(0, 6));
      } catch (e) {
        console.error('Erreur chargement observatoire');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white">← Retour</Link>
          <div className="ml-6 text-xl font-medium tracking-wider">OBSERVATOIRE DU PLÉNUM</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="max-w-2xl mb-12">
          <div className="text-xs tracking-[3px] text-amber-500 mb-2">ZONE ARG • ÉVÉNEMENTS ÉMERGENTS</div>
          <h1 className="text-5xl font-semibold tracking-tighter mb-4">Observatoire du Plénum</h1>
          <p className="text-zinc-400">
            Surveillance en temps réel des fluctuations du Plénum, des publications récentes et des simulations actives.
          </p>
        </div>

        {/* Alerte live */}
        <div className="border border-zinc-800 p-8 rounded-2xl mb-12 bg-zinc-950">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <div className="text-sm text-red-400 font-mono tracking-wider">ALERTE ACTIVE — SECTEUR VK-12</div>
          </div>
          <div className="text-xl">Fluctuation majeure détectée dans le secteur VK-12.</div>
          <div className="text-sm text-zinc-400 mt-2">
            Les factions sont invitées à proposer une interprétation avant le cycle 47.
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Publications récentes */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm tracking-[2px] text-zinc-500">DERNIERS RAPPORTS</div>
              <Link href="/rapports" className="text-xs text-emerald-400 hover:underline">Voir tout →</Link>
            </div>

            {loading ? (
              <div className="text-zinc-500">Chargement...</div>
            ) : reports.length === 0 ? (
              <div className="border border-zinc-800 rounded-2xl p-8 text-zinc-400">Aucun rapport publié.</div>
            ) : (
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="border border-zinc-800 rounded-2xl p-6">
                    <div className="font-medium">{report.title}</div>
                    <div className="text-sm text-zinc-500 mt-2">
                      {report.name} • {new Date(report.created_at).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Simulations récentes */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm tracking-[2px] text-zinc-500">SIMULATIONS RÉCENTES</div>
              <Link href="/lab/plenum" className="text-xs text-emerald-400 hover:underline">Simulateur →</Link>
            </div>

            {loading ? (
              <div className="text-zinc-500">Chargement...</div>
            ) : simulations.length === 0 ? (
              <div className="border border-zinc-800 rounded-2xl p-8 text-zinc-400">Aucune simulation enregistrée.</div>
            ) : (
              <div className="space-y-4">
                {simulations.map((sim) => (
                  <div key={sim.id} className="border border-zinc-800 rounded-2xl p-6 flex justify-between items-center">
                    <div>
                      <div className="font-mono text-emerald-400">
                        {sim.vortex_count} vortex — {sim.stability}
                      </div>
                      <div className="text-sm text-zinc-500 mt-1">
                        {sim.author || 'Anonyme'} • {new Date(sim.created_at).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <div className="text-xs px-3 py-1 rounded-full border border-zinc-700">
                      {sim.stability}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-zinc-500">
          Données mises à jour en temps réel depuis les contributions des chercheurs.
        </div>
      </div>
    </div>
  );
}
