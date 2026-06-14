import Link from 'next/link';

export default function PlenistesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/factions" className="text-sm text-zinc-400 hover:text-white">← Retour aux factions</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-emerald-400 text-sm tracking-[3px] mb-2">LE PLÉNUM</div>
        <h1 className="text-5xl font-semibold tracking-tighter mb-6">Les Plénistes</h1>
        
        <div className="prose prose-invert max-w-none text-zinc-300">
          <p className="text-xl text-zinc-400">
            Les Plénistes sont les spécialistes du Plénum lui-même — l’espace dynamique dans lequel tout émerge.
          </p>

          <h2 className="mt-12">Philosophie</h2>
          <p>
            Pour les Plénistes, le Plénum n’est pas un vide : c’est un milieu dense, structuré et en constant mouvement. 
            Ils cherchent à comprendre les lois d’écoulement qui régissent la réalité.
          </p>

          <h2 className="mt-10">Axes de recherche</h2>
          <ul>
            <li>Modélisation des flux du Plénum</li>
            <li>Gravité quantique et courbure du milieu</li>
            <li>Simulation de grands écoulements</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
