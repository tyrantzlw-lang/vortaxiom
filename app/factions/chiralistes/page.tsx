import Link from 'next/link';

export default function ChiralistesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/factions" className="text-sm text-zinc-400 hover:text-white">← Retour aux factions</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-purple-400 text-sm tracking-[3px] mb-2">LA CHIRALITÉ</div>
        <h1 className="text-5xl font-semibold tracking-tighter mb-6">Les Chiralistes</h1>
        
        <div className="prose prose-invert max-w-none text-zinc-300">
          <p className="text-xl text-zinc-400">
            Les Chiralistes explorent l’asymétrie fondamentale de la réalité à travers le concept de Chiralité (χ).
          </p>

          <h2 className="mt-12">Philosophie</h2>
          <p>
            Pour eux, l’univers possède une « main » préférée. La Chiralité n’est pas un simple phénomène physique, 
            mais la signature d’une brisure de symétrie originelle qui a permis l’émergence de la complexité.
          </p>

          <h2 className="mt-10">Axes de recherche</h2>
          <ul>
            <li>Cartographie des régions à forte chiralité</li>
            <li>Liens entre chiralité et émergence de la conscience</li>
            <li>Techniques de « retournement chiral »</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
