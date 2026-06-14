import Link from 'next/link';

export default function VortexPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/codex" className="text-sm text-zinc-400 hover:text-white">← Codex</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="text-xs tracking-[3px] text-emerald-500 mb-2">AXIOME III</div>
        <h1 className="text-6xl font-semibold tracking-tighter">Les Vortex</h1>
        <div className="text-xl text-zinc-400 mt-2">Les particules comme structures hydrodynamiques</div>

        <div className="prose prose-invert max-w-none mt-12 text-lg leading-relaxed space-y-6 text-zinc-300">
          <p>Dans le Codex VORTEX, les particules élémentaires sont interprétées comme des vortex topologiques auto-entretenus.</p>

          <p>Un vortex est une région où le flux du Plénum s’enroule sur lui-même de manière stable. Cette stabilité donne naissance à l’illusion d’un objet permanent.</p>

          <p>Plus un vortex est cohérent, plus il résiste à la dissipation. La masse devient alors une mesure de résistance dynamique à la modification du flux.</p>

          <div className="bg-zinc-950 border border-zinc-800 p-6 font-mono text-sm mt-8">
            Masse = Résistance dynamique à la modification du flux
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 text-xs text-zinc-500">
          Entrée verrouillée • Version fondatrice 0.8
        </div>
      </div>
    </div>
  );
}
