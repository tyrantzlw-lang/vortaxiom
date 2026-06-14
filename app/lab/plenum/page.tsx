'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Simulation {
  id: number;
  chi: number;
  coherence: number;
  turbulence: number;
  density: number;
  vortex_count: number;
  anomaly_risk: number;
  resonance: number;
  stability: string;
  notes: string | null;
  author: string | null;
  created_at: string;
}

export default function PlenumSimulator() {
  const { data: session } = useSession();
  const [chi, setChi] = useState(0.42);
  const [coherence, setCoherence] = useState(0.75);
  const [turbulence, setTurbulence] = useState(0.28);
  const [density, setDensity] = useState(0.61);

  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const vortexCount = Math.floor(3 + coherence * 7 + (1 - turbulence) * 4);
  const anomalyRisk = Math.min(95, Math.floor(turbulence * 80 + (1 - coherence) * 30));
  const resonance = (chi * 0.6 + density * 0.4).toFixed(2);

  const getStability = () => {
    const score = coherence * 0.6 + (1 - turbulence) * 0.3 + density * 0.1;
    if (score > 0.75) return { label: 'Stable', color: 'text-emerald-400' };
    if (score > 0.5) return { label: 'Métastable', color: 'text-amber-400' };
    return { label: 'Instable', color: 'text-red-400' };
  };

  const stability = getStability();

  const loadSimulations = async () => {
    try {
      const res = await fetch('/api/plenum-simulation');
      if (res.ok) {
        const data = await res.json();
        setSimulations(data);
      }
    } catch (e) {
      console.error('Erreur chargement simulations');
    }
  };

  useEffect(() => {
    loadSimulations();
  }, []);

  const saveSimulation = async () => {
    if (!session) {
      setMessage('Connectez-vous pour sauvegarder une simulation.');
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/plenum-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chi, coherence, turbulence, density,
          vortex_count: vortexCount,
          anomaly_risk: anomalyRisk,
          resonance: parseFloat(resonance),
          stability: stability.label,
          notes: notes.trim() || null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Simulation enregistrée (+${data.reputationGained} réputation)`);
        setNotes('');
        await loadSimulations();
      } else {
        setMessage(data.error || 'Erreur lors de la sauvegarde');
      }
    } catch (error) {
      setMessage('Erreur de connexion');
    } finally {
      setIsSaving(false);
    }
  };

  const loadSimulation = (sim: Simulation) => {
    setChi(sim.chi);
    setCoherence(sim.coherence);
    setTurbulence(sim.turbulence);
    setDensity(sim.density);
    setNotes(sim.notes || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateRandomSimulation = () => {
    const randomChi = parseFloat((Math.random() * 0.95 + 0.05).toFixed(2));
    const randomCoherence = parseFloat((Math.random() * 0.9 + 0.1).toFixed(2));
    const randomTurbulence = parseFloat((Math.random() * 0.85).toFixed(2));
    const randomDensity = parseFloat((Math.random() * 0.9 + 0.1).toFixed(2));

    setChi(randomChi);
    setCoherence(randomCoherence);
    setTurbulence(randomTurbulence);
    setDensity(randomDensity);
    setNotes('');
    setMessage('Simulation aléatoire générée.');
    setTimeout(() => setMessage(''), 2000);
  };

  // Couleur dynamique selon la stabilité
  const getFlowColor = () => {
    if (stability.label === 'Stable') return 'rgba(52, 211, 153, 0.15)'; // emerald
    if (stability.label === 'Métastable') return 'rgba(251, 191, 36, 0.15)'; // amber
    return 'rgba(248, 113, 113, 0.15)'; // red
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/lab" className="text-sm text-zinc-400 hover:text-white">← Laboratoires</Link>
            <div className="text-xl font-medium tracking-wider">SIMULATEUR DE PLÉNUM</div>
          </div>
          <div className="text-xs text-zinc-500">Version 1.4 — Amélioration visuelle</div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="max-w-2xl mb-10">
          <div className="text-emerald-500 text-xs tracking-[3px] mb-2">OUTIL DE RECHERCHE — INSTITUT SOLVISTA</div>
          <h1 className="text-5xl font-semibold tracking-tighter">Simulateur de Plénum</h1>
          <p className="text-zinc-400 mt-3 text-lg">
            Modélisation des écoulements du Plénum et formation de structures vortex.
          </p>
        </div>

        {message && (
          <div className="mb-8 p-4 border border-emerald-800 bg-emerald-950/30 text-emerald-400 text-sm rounded-xl">
            {message}
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Paramètres */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <div>Constante de vrille <span className="font-mono text-zinc-400">χ</span></div>
                <div className="font-mono text-emerald-400">{chi.toFixed(2)}</div>
              </div>
              <input type="range" min="0" max="1" step="0.01" value={chi} onChange={(e) => setChi(parseFloat(e.target.value))} className="w-full accent-white" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <div>Cohérence du flux</div>
                <div className="font-mono text-emerald-400">{coherence.toFixed(2)}</div>
              </div>
              <input type="range" min="0" max="1" step="0.01" value={coherence} onChange={(e) => setCoherence(parseFloat(e.target.value))} className="w-full accent-white" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <div>Turbulence</div>
                <div className="font-mono text-emerald-400">{turbulence.toFixed(2)}</div>
              </div>
              <input type="range" min="0" max="1" step="0.01" value={turbulence} onChange={(e) => setTurbulence(parseFloat(e.target.value))} className="w-full accent-white" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <div>Densité du Plénum</div>
                <div className="font-mono text-emerald-400">{density.toFixed(2)}</div>
              </div>
              <input type="range" min="0" max="1" step="0.01" value={density} onChange={(e) => setDensity(parseFloat(e.target.value))} className="w-full accent-white" />
            </div>

            <div className="pt-6 border-t border-zinc-800 space-y-3">
              <button onClick={generateRandomSimulation} className="w-full px-6 py-3 border border-zinc-700 hover:bg-zinc-900 rounded-xl text-sm tracking-wider transition">
                🎲 Générer une simulation aléatoire
              </button>

              <label className="block text-xs tracking-[2px] text-zinc-500 mb-2">NOTES DE RECHERCHE (optionnel)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Observations, hypothèses, anomalies détectées..." className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm h-24 resize-y focus:outline-none focus:border-zinc-600" />

              <button onClick={saveSimulation} disabled={isSaving} className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700 rounded-xl text-sm tracking-wider transition">
                {isSaving ? 'Sauvegarde en cours...' : session ? 'Enregistrer la simulation (+3 réputation)' : 'Connexion requise pour sauvegarder'}
              </button>
            </div>
          </div>

          {/* Visualisation améliorée */}
          <div className="lg:col-span-3">
            <div className="border border-zinc-800 bg-zinc-950 rounded-2xl p-8 h-full flex flex-col relative overflow-hidden">
              <div className="text-xs text-zinc-500 mb-4 tracking-wider">VISUALISATION DU FLUX</div>
              
              <div className="flex-1 flex items-center justify-center relative">
                <div className="relative w-80 h-80">
                  {/* Fond dynamique avec glow */}
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-500"
                    style={{
                      width: `${200 + density * 120}px`,
                      height: `${200 + density * 120}px`,
                      background: getFlowColor(),
                    }}
                  />

                  {/* Cercle central */}
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40"
                    style={{ 
                      width: `${120 + density * 80}px`, 
                      height: `${120 + density * 80}px`,
                      transition: 'all 0.3s ease'
                    }}
                  />
                  
                  {/* Vortex animés */}
                  {Array.from({ length: vortexCount }).map((_, i) => {
                    const size = 30 + (i % 3) * 18;
                    const rotationSpeed = 8 + (i % 4) * 3;
                    const direction = i % 2 === 0 ? 1 : -1;
                    
                    return (
                      <div 
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-400/60"
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          opacity: 0.35 + coherence * 0.55,
                          animation: `spin ${rotationSpeed}s linear infinite`,
                          animationDirection: direction === 1 ? 'normal' : 'reverse',
                          transform: `translate(-50%, -50%) rotate(${i * 27}deg)`,
                        }}
                      />
                    );
                  })}

                  {/* Anomalies */}
                  {anomalyRisk > 55 && (
                    <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center text-sm mt-auto pt-8 border-t border-zinc-800">
                <div>
                  <div className="text-xs text-zinc-500">VORTEX</div>
                  <div className="font-mono text-2xl tracking-tighter text-emerald-400">{vortexCount}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">RÉSONANCE</div>
                  <div className="font-mono text-2xl tracking-tighter text-emerald-400">{resonance}</div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500">STABILITÉ</div>
                  <div className={`font-mono text-2xl tracking-tighter ${stability.color}`}>{stability.label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historique */}
        <div className="mt-16">
          <div className="text-xs tracking-[3px] text-zinc-500 mb-6">ARCHIVES DES SIMULATIONS ({simulations.length})</div>
          
          {simulations.length === 0 && <div className="text-zinc-500 italic">Aucune simulation sauvegardée pour l'instant.</div>}

          <div className="grid md:grid-cols-2 gap-4">
            {simulations.map((sim) => (
              <div key={sim.id} onClick={() => loadSimulation(sim)} className="border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 cursor-pointer transition group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-mono text-emerald-400 text-sm">χ{sim.chi.toFixed(2)} • C{sim.coherence.toFixed(2)}</div>
                    <div className="text-xs text-zinc-500 mt-1">{sim.author || 'Anonyme'} • {new Date(sim.created_at).toLocaleDateString('fr-FR')}</div>
                  </div>
                  <div className={`px-3 py-1 text-xs rounded-full border ${sim.stability === 'Stable' ? 'border-emerald-800 text-emerald-400' : sim.stability === 'Métastable' ? 'border-amber-800 text-amber-400' : 'border-red-800 text-red-400'}`}>
                    {sim.stability}
                  </div>
                </div>
                <div className="text-sm text-zinc-400">{sim.vortex_count} vortex • Risque {sim.anomaly_risk}% • Résonance {sim.resonance}</div>
                {sim.notes && <div className="mt-4 pt-4 border-t border-zinc-800 text-xs text-zinc-500 line-clamp-2">{sim.notes}</div>}
                <div className="mt-4 text-xs text-emerald-400 group-hover:underline">Charger cette simulation →</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800 text-xs text-zinc-400">
          Cette simulation est purement narrative et spéculative.
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
