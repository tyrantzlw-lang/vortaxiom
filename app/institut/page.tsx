export default function InstitutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200">
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center">
          <a href="/" className="text-sm text-zinc-400 hover:text-white">← Retour</a>
          <div className="ml-6 text-xl font-medium tracking-wider">INSTITUT SOLVISTA</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[3px] text-emerald-500 mb-2">ZONE SCIENTIFIQUE</div>
          <h1 className="text-5xl font-semibold tracking-tighter mb-6">Institut Solvista</h1>
          <p className="text-lg text-zinc-400">
            Centre de recherche et de publication du projet Vortaxiom. 
            Rapports, simulations et modèles théoriques y sont consignés.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            { title: "Publications", count: "142" },
            { title: "Simulations validées", count: "38" },
            { title: "Chercheurs actifs", count: "67" },
          ].map((stat, i) => (
            <div key={i} className="border border-zinc-800 p-8">
              <div className="text-4xl font-mono tracking-tighter">{stat.count}</div>
              <div className="text-sm text-zinc-400 mt-1">{stat.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
