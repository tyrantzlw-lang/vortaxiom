import Link from 'next/link';

export default function ChiralitePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/codex" className="text-sm text-zinc-400 hover:text-white">← Codex</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="text-xs tracking-[3px] text-emerald-500 mb-2">AXIOME IV</div>
        <h1 className="text-6xl font-semibold tracking-tighter">La Chiralité</h1>
        <div className="text-xl text-zinc-400 mt-2">La Vrille Cosmique — χ</div>

        <div className="prose prose-invert max-w-none mt-12 text-lg leading-relaxed space-y-6 text-zinc-300">
          <p>Le Plénum possède une asymétrie fondamentale. Cette torsion globale est appelée <strong>χ</strong> — la constante de vrille.</p>

          <p>La chiralité introduit une préférence géométrique dans l’organisation des flux. Elle pourrait expliquer, dans l’univers fictionnel VORTEX :</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>L’asymétrie matière / antimatière</li>
            <li>Certaines orientations de spin</li>
            <li>L’émergence spontanée de structures hélicoïdales</li>
            <li>L’apparition de motifs auto-organisés complexes</li>
          </ul>

          <p>Dans cette cosmologie spéculative, la réalité ne serait donc pas parfaitement symétrique. Elle serait légèrement inclinée.</p>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 text-xs text-zinc-500">
          Entrée verrouillée • Version fondatrice 0.8
        </div>
      </div>
    </div>
  );
}
