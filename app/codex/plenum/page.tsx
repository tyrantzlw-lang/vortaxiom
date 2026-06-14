import Link from 'next/link';

export default function PlenumPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/codex" className="text-sm text-zinc-400 hover:text-white">← Codex</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="text-xs tracking-[3px] text-emerald-500 mb-2">AXIOME I</div>
        <h1 className="text-6xl font-semibold tracking-tighter">Le Plénum</h1>
        <div className="text-xl text-zinc-400 mt-2">Le Vide Vivant</div>

        <div className="prose prose-invert max-w-none mt-12 text-lg leading-relaxed space-y-6 text-zinc-300">
          <p>Le Plénum désigne le substrat fondamental de l’Univers. Il ne s’agit pas d’une substance matérielle au sens classique, mais d’un milieu dynamique traversé en permanence par des fluctuations, des torsions et des écoulements.</p>

          <p>Le Plénum possède trois propriétés fondamentales :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Il est continu.</li>
            <li>Il est élastique.</li>
            <li>Il conserve localement l’information de ses déformations.</li>
          </ul>

          <p>Dans le paradigme VORTEX, le vide n’est donc pas une absence. Il est une activité.</p>

          <div className="border-l-2 border-zinc-700 pl-6 text-sm text-zinc-400 italic mt-8">
            « Le vide n’est jamais vide. Il constitue un milieu fluctuant, continu et élastique. »
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 text-xs text-zinc-500">
          Entrée verrouillée • Version fondatrice 0.8
        </div>
      </div>
    </div>
  );
}
