export default function AProposPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center">
          <a href="/" className="text-sm text-zinc-400 hover:text-white">← Retour</a>
          <div className="ml-6 text-xl font-medium tracking-wider">À PROPOS — VORTAXIOM</div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[3px] text-zinc-500 mb-2">INFORMATIONS</div>
          <h1 className="text-5xl font-semibold tracking-tighter mb-6">Vortaxiom</h1>
          
          <div className="prose prose-invert text-zinc-300 space-y-6">
            <p>
              <strong>Vortaxiom</strong> est une plateforme communautaire de science-fiction spéculative 
              hard SF. Elle propose un cadre cosmologique cohérent (le Plénum, les Vortex, la Chiralité χ) 
              dans lequel les participants peuvent explorer, débattre et créer collectivement.
            </p>

            <p>
              Le projet s’inspire des traditions de la hard science-fiction (Asimov, Egan, Reynolds, 
              Baxter) tout en proposant un modèle physique original et rigoureux.
            </p>

            <div className="my-8 border-l-2 border-zinc-700 pl-6 text-sm text-zinc-400">
              <strong>Avertissement fictionnel</strong><br />
              Tout le contenu de ce site est purement fictif. Il s’agit d’un exercice de worldbuilding 
              collaboratif. Aucune affirmation scientifique réelle n’est faite ici. 
              Les modèles présentés (Plénum, Flux, Chiralité, etc.) sont des constructions narratives 
              imaginaires.
            </div>

            <h2 className="text-2xl font-semibold tracking-tight mt-10 mb-4">Fonctionnalités actuelles</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Codex centralisé (axiomes et concepts fondateurs)</li>
              <li>Cinq factions avec bonus et identités distinctes</li>
              <li>Forum cross-faction avec système de commentaires</li>
              <li>Espace Hors RP (discussions méta)</li>
              <li>Système de publications et rapports</li>
              <li>Réputation et progression personnelle</li>
              <li>Simulateur interactif du Plénum</li>
            </ul>

            <p className="text-xs text-zinc-500 mt-12">
              Projet en développement continu • Dernière mise à jour : juin 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
