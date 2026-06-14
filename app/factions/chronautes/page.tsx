import Link from 'next/link';

export default function ChronautesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/factions" className="text-sm text-zinc-400 hover:text-white">← Retour aux factions</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-amber-400 text-sm tracking-[3px] mb-2">LE TEMPS</div>
        <h1 className="text-5xl font-semibold tracking-tighter mb-6">Les Chronautes</h1>
        
        <div className="prose prose-invert max-w-none text-zinc-300">
          <p className="text-xl text-zinc-400">
            Les Chronautes sont les gardiens de la temporalité. Ils étudient les flux temporels, les paradoxes et les structures causales du Plénum.
          </p>

          <h2 className="mt-12">Philosophie</h2>
          <p>
            Pour les Chronautes, le Temps n’est pas une dimension parmi d’autres : c’est le médium dans lequel le Plénum respire. 
            Ils rejettent la linéarité classique et considèrent que le passé, le présent et le futur coexistent dans des états superposés.
          </p>

          <h2 className="mt-10">Axes de recherche</h2>
          <ul>
            <li>Cartographie des lignes temporelles stables</li>
            <li>Paradoxes de bootstrap et causalité rétrograde</li>
            <li>Effets de la Chiralité sur la flèche du temps</li>
          </ul>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 text-sm text-zinc-500">
          Rejoindre cette faction nécessite une réputation minimale de 50.
        </div>
      </div>
    </div>
  );
}
