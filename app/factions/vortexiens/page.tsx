import Link from 'next/link';

export default function VortexiensPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/factions" className="text-sm text-zinc-400 hover:text-white">← Retour aux factions</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-sky-400 text-sm tracking-[3px] mb-2">LES VORTEX</div>
        <h1 className="text-5xl font-semibold tracking-tighter mb-6">Les Vortexiens</h1>
        
        <div className="prose prose-invert max-w-none text-zinc-300">
          <p className="text-xl text-zinc-400">
            Les Vortexiens sont les explorateurs des structures non-euclidiennes et des points de singularité du Plénum.
          </p>

          <h2 className="mt-12">Philosophie</h2>
          <p>
            Ils considèrent que les Vortex sont les « organes » du Plénum — des zones où la réalité se plie, se tord et parfois se déchire.
            Leur but est de cartographier ces zones et d’en comprendre les lois.
          </p>

          <h2 className="mt-10">Axes de recherche</h2>
          <ul>
            <li>Stabilité et évolution des Vortex</li>
            <li>Effets sur la perception et la mémoire</li>
            <li>Possibilité de « navigation vortexienne »</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
