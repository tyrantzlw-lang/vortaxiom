import Link from 'next/link';

export default function IdentitePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/codex" className="text-sm text-zinc-400 hover:text-white">← Retour au Codex</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="text-xs tracking-[3px] text-zinc-500 mb-3">AXIOME • ID</div>
        <h1 className="text-5xl font-semibold tracking-tighter mb-8">L’Identité du Flux</h1>

        <div className="prose prose-invert text-lg text-zinc-300 max-w-none">
          <p>
            L’identité d’un chercheur n’est pas figée. Elle se construit à travers ses actions, ses choix de faction et la trace qu’il laisse dans le Plénum.
          </p>
          <p className="mt-6">
            Plus un chercheur publie, débat et propose des modèles, plus son empreinte devient visible. Certains vont jusqu’à dire que la réputation est une forme de réalité secondaire.
          </p>
        </div>
      </div>
    </div>
  );
}
