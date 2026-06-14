import Navbar from './components/Navbar';

export default function VortaxiomHome() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <Navbar />

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-8 pt-24 pb-20 text-center">
        <div className="inline-block px-3 py-1 rounded-full border border-zinc-800 text-xs tracking-[2px] mb-6 text-zinc-400">
          PROJET DE SCIENCE-FICTION SPÉCULATIVE
        </div>

        <h1 className="text-7xl font-semibold tracking-tighter mb-4">
          Le Plénum n’est pas vide.<br />Il est en mouvement.
        </h1>

        <p className="max-w-xl mx-auto text-xl text-zinc-400 mb-10">
          Une plateforme communautaire dédiée à l’exploration d’une cosmologie 
          où la réalité émerge d’écoulements dynamiques.
        </p>

        <div className="flex gap-4 justify-center">
          <a 
            href="/codex" 
            className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors"
          >
            Entrer dans le Codex
          </a>
          <a 
            href="/forum" 
            className="px-8 py-3 border border-zinc-700 hover:bg-zinc-900 rounded-lg transition-colors"
          >
            Rejoindre les débats
          </a>
        </div>
      </div>

      {/* Sections principales */}
      <div className="max-w-7xl mx-auto px-8 pb-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Bibliothèque Centrale", desc: "Le Codex Vortaxiom, axiomes et chronologie", href: "/codex" },
          { title: "Les Cinq Factions", desc: "Chronautes, Chiralistes, Vortexiens, Plénistes et Gardiens", href: "/factions" },
          { title: "Forum du Flux", desc: "Débats entre les différentes écoles", href: "/forum" },
          { title: "Espace Hors RP", desc: "Discussions méta, règles et technique", href: "/hors-rp" },
          { title: "Publications", desc: "Rapports et contributions des chercheurs", href: "/rapports" },
          { title: "Profil", desc: "Réputation, faction et progression", href: "/profil" },
          { title: "À propos", desc: "Contexte, règles et avertissement fictionnel", href: "/a-propos" },
        ].map((section, i) => (
          <a 
            key={i} 
            href={section.href}
            className="group border border-zinc-800 hover:border-zinc-700 p-8 rounded-2xl transition-all block"
          >
            <div className="font-medium text-lg mb-3 group-hover:text-white">{section.title}</div>
            <div className="text-sm text-zinc-400">{section.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
