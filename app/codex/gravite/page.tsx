import Link from 'next/link';

export default function GravitePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/codex" className="text-sm text-zinc-400 hover:text-white">← Codex</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="text-xs tracking-[3px] text-emerald-500 mb-2">AXIOME VI</div>
        <h1 className="text-6xl font-semibold tracking-tighter">La Gravité</h1>
        <div className="text-xl text-zinc-400 mt-2">La Relaxation du Plénum</div>

        <div className="prose prose-invert max-w-none mt-12 text-lg leading-relaxed space-y-6 text-zinc-300">
          <p>La gravité n’est pas interprétée comme une force fondamentale. Elle apparaît comme une conséquence collective de la géométrie du flux.</p>

          <p>Une concentration locale de vortex modifie l’élasticité du Plénum. Les structures voisines migrent alors naturellement vers les régions de moindre tension dynamique.</p>

          <p>La gravité devient une relaxation géométrique du vide.</p>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 text-xs text-zinc-500">
          Entrée verrouillée • Version fondatrice 0.8
        </div>
      </div>
    </div>
  );
}
