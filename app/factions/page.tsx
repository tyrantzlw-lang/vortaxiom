import Link from 'next/link';

const factions = [
  {
    slug: 'chronautes',
    name: 'Les Chronautes',
    description: 'Spécialistes de la temporalité et des paradoxes du Temps.',
    color: 'text-amber-400',
    focus: 'Le Temps',
  },
  {
    slug: 'chiralistes',
    name: 'Les Chiralistes',
    description: 'Étude de la Chiralité (χ) et de l\'asymétrie fondamentale de la réalité.',
    color: 'text-purple-400',
    focus: 'La Chiralité',
  },
  {
    slug: 'vortexiens',
    name: 'Les Vortexiens',
    description: 'Explorateurs des Vortex et des structures non-euclidiennes.',
    color: 'text-sky-400',
    focus: 'Les Vortex',
  },
  {
    slug: 'plenistes',
    name: 'Les Plénistes',
    description: 'Chercheurs du Plénum et de la gravité quantique.',
    color: 'text-emerald-400',
    focus: 'Le Plénum',
  },
  {
    slug: 'gardiens',
    name: 'Les Gardiens du Flux',
    description: 'Faction la plus ancienne, gardienne de l\'équilibre du Flux.',
    color: 'text-rose-400',
    focus: 'Équilibre général',
  },
];

const relations = [
  { 
    faction1: 'Chronautes', 
    faction2: 'Vortexiens', 
    type: 'alliance', 
    description: 'Partage de données sur les vortex temporels. Forte coopération.' 
  },
  { 
    faction1: 'Chiralistes', 
    faction2: 'Plénistes', 
    type: 'tension', 
    description: 'Désaccord fondamental sur la nature de l\'asymétrie du Plénum.' 
  },
  { 
    faction1: 'Gardiens du Flux', 
    faction2: 'Chronautes', 
    type: 'neutral', 
    description: 'Respect mutuel mais vigilance concernant les manipulations temporelles.' 
  },
  { 
    faction1: 'Vortexiens', 
    faction2: 'Gardiens du Flux', 
    type: 'alliance', 
    description: 'Les Gardiens protègent les découvertes vortexiennes les plus dangereuses.' 
  },
];

export default function FactionsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-5xl mx-auto px-8 h-16 flex items-center">
          <Link href="/" className="text-sm text-zinc-400 hover:text-white">← Retour</Link>
          <div className="ml-6 text-xl font-medium tracking-wider">LES FACTIONS</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="max-w-2xl mb-12">
          <h1 className="text-4xl font-semibold tracking-tight mb-4">Les Cinq Factions</h1>
          <p className="text-zinc-400">
            Chaque faction représente une approche philosophique et scientifique différente de la cosmologie du Plénum.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {factions.map((faction) => (
            <div key={faction.slug} className="group border border-zinc-800 hover:border-zinc-700 p-8 rounded-xl transition-all">
              <Link href={`/factions/${faction.slug}`}>
                <div className={`text-sm tracking-[3px] mb-3 ${faction.color}`}>
                  {faction.focus.toUpperCase()}
                </div>
                <h2 className="text-2xl font-medium mb-3 group-hover:text-white transition-colors">
                  {faction.name}
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                  {faction.description}
                </p>
              </Link>

              <div className="mt-6 flex gap-4 text-sm">
                <Link 
                  href={`/factions/${faction.slug}`}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Détails →
                </Link>
                <Link 
                  href={`/factions/${faction.slug}/forum`}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  Forum de la faction →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Relations Inter-Factions */}
        <div className="mt-20">
          <div className="max-w-2xl mb-10">
            <div className="text-emerald-500 text-xs tracking-[3px] mb-2">DYNAMIQUES POLITIQUES</div>
            <h2 className="text-3xl font-semibold tracking-tight">Relations entre Factions</h2>
            <p className="text-zinc-400 mt-3">
              Les cinq écoles entretiennent des relations complexes, oscillant entre alliances stratégiques, tensions théoriques et neutralité prudente.
            </p>
          </div>

          <div className="space-y-4">
            {relations.map((rel, index) => (
              <div key={index} className="border border-zinc-800 rounded-2xl p-8 flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:w-1/3">
                  <div className="flex items-center gap-3 text-lg">
                    <span>{rel.faction1}</span>
                    <span className="text-zinc-500">↔</span>
                    <span>{rel.faction2}</span>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className={`inline-block px-3 py-0.5 text-xs rounded-full mb-3 tracking-wider
                    ${rel.type === 'alliance' ? 'bg-emerald-950 text-emerald-400' : 
                      rel.type === 'tension' ? 'bg-red-950 text-red-400' : 'bg-zinc-800 text-zinc-400'}`}>
                    {rel.type === 'alliance' ? 'ALLIANCE' : rel.type === 'tension' ? 'TENSION' : 'NEUTRALITÉ'}
                  </div>
                  <p className="text-zinc-400 leading-relaxed">{rel.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-xs text-zinc-500">
            Ces relations évoluent selon les actions des chercheurs et les événements du Plénum.
          </div>
        </div>
      </div>
    </div>
  );
}
