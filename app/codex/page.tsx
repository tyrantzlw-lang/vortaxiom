import Link from 'next/link';

const codexEntries = [
  { slug: 'plenum', title: 'I — Le Plénum', subtitle: 'Le Vide Vivant', status: 'Fondateur' },
  { slug: 'ecoulement', title: 'II — Le Principe d’Écoulement', subtitle: 'Rien n’est immobile', status: 'Fondateur' },
  { slug: 'vortex', title: 'III — Les Vortex', subtitle: 'Structures hydrodynamiques', status: 'Fondateur' },
  { slug: 'chiralite', title: 'IV — La Chiralité', subtitle: 'La Vrille Cosmique (χ)', status: 'Fondateur' },
  { slug: 'temps', title: 'V — Le Temps', subtitle: 'Transformation locale', status: 'Fondateur' },
  { slug: 'gravite', title: 'VI — La Gravité', subtitle: 'Relaxation du Plénum', status: 'Fondateur' },
  { slug: 'conscience', title: 'VII — La Conscience', subtitle: 'L’Auto-observation du Plénum', status: 'Nouveau' },
  { slug: 'identite', title: 'VIII — L’Identité du Flux', subtitle: 'La trace du chercheur', status: 'Nouveau' },
  { slug: 'matiere-noire', title: 'IX — La Matière Noire', subtitle: 'Les Vortex Invisibles', status: 'En rédaction' },
  { slug: 'energie-noire', title: 'X — L’Énergie Noire', subtitle: 'La Pression du Vide', status: 'En rédaction' },
];

export default function CodexIndex() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="max-w-2xl mb-12">
          <div className="text-xs tracking-[3px] text-zinc-500 mb-2">ARCHIVES FONDATRICES</div>
          <h1 className="text-5xl font-semibold tracking-tighter mb-4">Le Codex Vortaxiom</h1>
          <p className="text-lg text-zinc-400">
            La cosmologie spéculative du Plénum. Ici sont consignés les axiomes, 
            les modèles et les observations qui fondent notre compréhension du Flux.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {codexEntries.map((entry, i) => (
            <Link 
              key={i} 
              href={`/codex/${entry.slug}`}
              className="group border border-zinc-800 hover:border-zinc-700 p-6 rounded-xl transition-all block"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-mono text-sm text-zinc-500">{entry.title}</div>
                <div className="text-xs px-2 py-0.5 rounded bg-zinc-900 text-zinc-400">{entry.status}</div>
              </div>
              <div className="text-xl group-hover:text-white transition-colors">{entry.subtitle}</div>
            </Link>
          ))}
        </div>

        <div className="text-xs text-zinc-500">
          Version 0.95 • 10 entrées • Mise à jour continue
        </div>
      </div>
    </div>
  );
}
