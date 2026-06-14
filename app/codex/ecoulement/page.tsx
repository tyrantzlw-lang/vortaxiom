import Link from 'next/link';

export default function EcoulementPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/codex" className="text-sm text-zinc-400 hover:text-white">← Retour au Codex</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="text-xs tracking-[3px] text-zinc-500 mb-3">AXIOME • ÉC</div>
        <h1 className="text-5xl font-semibold tracking-tighter mb-8">Le Principe d’Écoulement</h1>

        <div className="prose prose-invert text-lg text-zinc-300 max-w-none">
          <p>
            Rien n’est immobile dans le Plénum. Tout est flux, transformation et circulation.
          </p>
          <p className="mt-6">
            Le Principe d’Écoulement affirme que la stabilité apparente n’est qu’une illusion d’échelle. 
            Ce que nous percevons comme des structures fixes sont en réalité des équilibres dynamiques temporaires.
          </p>

          <h2 className="mt-12">Conséquences</h2>
          <ul>
            <li>La gravité est une forme de relaxation du flux</li>
            <li>Le Temps émerge de la direction préférentielle des écoulements</li>
            <li>Les Vortex sont des turbulences dans ces flux</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
