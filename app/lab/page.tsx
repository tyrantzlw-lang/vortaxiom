import Link from 'next/link';

export default function LabPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white">← Retour</Link>
          <div className="ml-6 text-xl font-medium tracking-wider">LABORATOIRES — OUTILS DE RECHERCHE</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16">
        <h1 className="text-5xl font-semibold tracking-tighter mb-8">Outils de Simulation</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/lab/plenum" className="group border border-zinc-800 hover:border-emerald-900 p-8 rounded-2xl block transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="font-medium text-2xl">Simulateur de Plénum</div>
              <div className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-400">Disponible</div>
            </div>
            <div className="text-sm text-zinc-400">χ • Cohérence • Turbulence • Densité</div>
            <div className="mt-8 text-xs text-emerald-400 group-hover:underline">Lancer la simulation →</div>
          </Link>

          <div className="border border-zinc-800 p-8 rounded-2xl opacity-60">
            <div className="flex justify-between items-start mb-4">
              <div className="font-medium text-2xl">Simulateur Atomique</div>
              <div className="text-xs px-3 py-1 rounded-full bg-zinc-900 text-zinc-400">En développement</div>
            </div>
            <div className="text-sm text-zinc-400">Z • χ • B</div>
          </div>

          <div className="border border-zinc-800 p-8 rounded-2xl opacity-60">
            <div className="flex justify-between items-start mb-4">
              <div className="font-medium text-2xl">Simulateur VK</div>
              <div className="text-xs px-3 py-1 rounded-full bg-zinc-900 text-zinc-400">En développement</div>
            </div>
            <div className="text-sm text-zinc-400">Singularités et instabilités</div>
          </div>
        </div>
      </div>
    </div>
  );
}
