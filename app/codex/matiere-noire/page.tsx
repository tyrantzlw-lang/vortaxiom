import Link from 'next/link';

export default function MatiereNoirePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/codex" className="text-sm text-zinc-400 hover:text-white">← Retour au Codex</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="text-xs tracking-[3px] text-zinc-500 mb-3">AXIOME • MN</div>
        <h1 className="text-5xl font-semibold tracking-tighter mb-8">La Matière Noire</h1>

        <div className="prose prose-invert text-lg text-zinc-300 max-w-none">
          <p>
            La Matière Noire n’est pas de la matière au sens classique. Ce sont des Vortex de très faible amplitude 
            qui n’interagissent que gravitationnellement avec le Plénum visible.
          </p>
          <p className="mt-6">
            Les Vortexiens considèrent ces structures comme des « ombres de Vortex » — des écoulements si lents 
            qu’ils paraissent statiques à notre échelle.
          </p>
        </div>
      </div>
    </div>
  );
}
