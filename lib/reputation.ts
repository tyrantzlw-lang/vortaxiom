// Système de réputation Vortaxiom

export type Title = {
  name: string;
  minRep: number;
  description: string;
};

export const TITLES: Title[] = [
  { name: "Étudiant du Flux", minRep: 0, description: "Nouveau chercheur" },
  { name: "Observateur", minRep: 25, description: "Commence à suivre les vortex" },
  { name: "Analyste", minRep: 50, description: "Capable d'interpréter les données du Plénum" },
  { name: "Théoricien", minRep: 100, description: "Contribue activement aux modèles" },
  { name: "Architecte du Flux", minRep: 200, description: "Influence significative sur les factions" },
  { name: "Maître du Plénum", minRep: 350, description: "Référence dans la communauté" },
  { name: "Gardien du Vortex", minRep: 500, description: "Légende vivante de Vortaxiom" },
];

export function getTitle(reputation: number): Title {
  return [...TITLES].reverse().find(t => reputation >= t.minRep) || TITLES[0];
}

export function getNextTitle(reputation: number): Title | null {
  const current = getTitle(reputation);
  const next = TITLES.find(t => t.minRep > current.minRep);
  return next || null;
}

export function getProgress(reputation: number): { current: number; next: number | null; percentage: number } {
  const currentTitle = getTitle(reputation);
  const nextTitle = getNextTitle(reputation);
  
  if (!nextTitle) {
    return { current: reputation, next: null, percentage: 100 };
  }
  
  const range = nextTitle.minRep - currentTitle.minRep;
  const progress = reputation - currentTitle.minRep;
  const percentage = Math.min(Math.floor((progress / range) * 100), 100);
  
  return {
    current: reputation,
    next: nextTitle.minRep,
    percentage
  };
}

// === Système d'impact des réactions ===

const REACTION_IMPACT: Record<string, number> = {
  "Excellent": 3,
  "Pertinent": 2,
  "Intéressant": 1,
  "Acceptable": 0,
  "Médiocre": -1,
  "Inacceptable": -3,
  "Outrage": -8,
  "Rejet": -5,
};

export function getReactionImpact(reactionType: string): number {
  return REACTION_IMPACT[reactionType] ?? 0;
}

export async function applyReactionImpact(
  prisma: any,
  userId: number,
  reactionType: string
) {
  const impact = getReactionImpact(reactionType);
  if (impact === 0) return;

  await prisma.profile.update({
    where: { userId },
    data: {
      reputation: {
        increment: impact,
      },
    },
  });
}
