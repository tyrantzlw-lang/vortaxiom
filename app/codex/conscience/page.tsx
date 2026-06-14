import Link from 'next/link';

export default function ConsciencePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/codex" className="text-sm text-zinc-400 hover:text-white">← Retour au Codex</Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="text-xs tracking-[3px] text-zinc-500 mb-3">AXIOME • CONS</div>
        <h1 className="text-5xl font-semibold tracking-tighter mb-8">La Conscience</h1>

        <div className="prose prose-invert text-lg text-zinc-300 max-w-none">
          <p>
            La Conscience n’est pas un phénomène émergent secondaire. Elle est une propriété fondamentale du Plénum 
            lorsque celui-ci atteint un certain degré de complexité chirale.
          </p>

          <p className="mt-6">
            Les Chiralistes soutiennent que la conscience apparaît lorsque la chiralité locale dépasse un seuil critique. 
            Les Chronautes, eux, affirment que la conscience est ce qui permet au Temps de « s’observer lui-même ».
          </p>

          <h2 className="mt-12 text-2xl">Implications</h2>
          <ul>
            <li>La conscience peut influencer les flux du Plénum</li>
            <li>Les Vortex peuvent altérer la perception consciente</li>
            <li>Il existe peut-être des formes de conscience non-biologiques</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
