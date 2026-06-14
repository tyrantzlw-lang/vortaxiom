import Link from 'next/link';

export default function EnergieNoirePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/codex" className="text-sm text-zinc-400 hover:text-white">← Retour au Codex</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="text-xs tracking-[3px] text-zinc-500 mb-3">AXIOME • EN</div>
        <h1 className="text-5xl font-semibold tracking-tighter mb-8">L’Énergie Noire</h1>

        <div className="prose prose-invert text-lg text-zinc-300 max-w-none">
          <p>
            L’Énergie Noire est la pression expansive du Plénum lui-même lorsqu’il n’est pas contraint par des structures chirales.
          </p>
          <p className="mt-6">
            Selon les Plénistes, l’accélération de l’expansion de l’Univers est simplement la manifestation 
            de la tendance naturelle du Plénum à se diluer quand aucune conscience ne le « retient ».
          </p>
        </div>
      </div>
    </div>
  );
}
