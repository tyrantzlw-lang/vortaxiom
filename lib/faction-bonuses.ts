export const FACTION_BONUSES: Record<string, { bonus: number; description: string }> = {
  chronautes: {
    bonus: 5,
    description: "Bonus temporel : +5 réputation par action liée au Temps",
  },
  chiralistes: {
    bonus: 5,
    description: "Bonus chiral : +5 réputation par action liée à la Chiralité",
  },
  vortexiens: {
    bonus: 8,
    description: "Bonus vortex : +8 réputation par action d'exploration",
  },
  plenistes: {
    bonus: 6,
    description: "Bonus plénum : +6 réputation par contribution théorique",
  },
  gardiens: {
    bonus: 10,
    description: "Bonus gardien : +10 réputation par action de médiation",
  },
};

export function getFactionBonus(faction: string | null): number {
  if (!faction) return 0;
  return FACTION_BONUSES[faction]?.bonus || 0;
}