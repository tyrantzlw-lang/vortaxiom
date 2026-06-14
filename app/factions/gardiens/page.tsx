import Link from 'next/link';

export default function GardiensPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/factions" className="text-sm text-zinc-400 hover:text-white">← Retour aux factions</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-rose-400 text-sm tracking-[3px] mb-2">ÉQUILIBRE</div>
        <h1 className="text-5xl font-semibold tracking-tighter mb-6">Les Gardiens du Flux</h1>
        
        <div className="prose prose-invert max-w-none text-zinc-300">
          <p className="text-xl text-zinc-400">
            La faction la plus ancienne. Les Gardiens veillent à l’équilibre global du Flux et à la stabilité du Plénum.
          </p>

          <h2 className="mt-12">Philosophie</h2>
          <p>
            Ils croient que chaque faction a un rôle, mais que sans régulation, le Plénum pourrait basculer dans le chaos. 
            Leur rôle est de maintenir l’harmonie entre les différentes visions.
          </p>

          <h2 className="mt-10">Axes de recherche</h2>
          <ul>
            <li>Surveillance des anomalies majeures</li>
            <li>Médiation entre factions</li>
            <li>Préservation des connaissances anciennes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
