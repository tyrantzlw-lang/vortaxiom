import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Vortaxiom...');

  // Nettoyage
  await prisma.postReaction.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.factionRelation.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash('vortaxiom2026', 10);

  // ============================================
  // ADMIN PRINCIPAL
  // ============================================
  const adminPassword = await bcrypt.hash('VortaxiomAdmin2026!', 10);
  await prisma.user.create({
    data: {
      email: 'admin@vortaxiom.dev',
      password: adminPassword,
      name: 'Archiviste Principal',
      role: 'admin',
      profile: {
        create: {
          reputation: 500,
          title: 'Archiviste Principal',
          affiliation: 'gardiens',
        }
      }
    }
  });

  // ============================================
  // A.R.A - Personnage de Lore (Admin-only)
  // ============================================
  const araPassword = await bcrypt.hash('VortexRosetta-ARA-2026!', 10);
  const araUser = await prisma.user.create({
    data: {
      email: 'ara@vortex.dev',
      password: araPassword,
      name: 'A.R.A',
      role: 'admin',
      profile: {
        create: {
          reputation: 999,
          title: 'Découvreur du Plénum',
          affiliation: null,
        }
      }
    }
  });

  // Post spécial Vortex Rosetta par A.R.A
  await prisma.post.create({
    data: {
      userId: araUser.id,
      title: 'VORTEX ROSETTA — Clé de déchiffrement de l\'Univers Hydrodynamique Unifié',
      content: `Le document VORTEX ROSETTA sert de passerelle conceptuelle entre le formalisme mathématique du modèle VORTEX et son interprétation physique. Il définit l'ontologie du fluide primordial et détaille les mécanismes de brisure de symétrie chirale qui gouvernent l'émergence de la matière, de la gravité et de la complexité.

L'ÉQUATION MAÎTRESSE

L_VORTEX = w(g, φ) × [ L_cinétique - V(g, φ, J) + L_interaction - χ J · (∇ × J) ]

Le Lagrangien Maître VORTEX.

INTERPRÉTATION PHYSIQUE

La Gravité comme Pression Osmotique :
Dans VORTEX, la géométrie g n’est pas un canevas passif. Une concentration locale de fluide φ modifie la rigidité du facteur w. La gravité devient alors une pression osmotique macroscopique : la matière est poussée vers les zones de moindre résistance élastique du Plénum.

La Stabilité de la Matière :
Le terme chiral −χ J · (∇ × J) agit comme un verrou topologique. Un fermion est un nœud stable dans le flux. Le dissoudre nécessite une énergie colossale.

L'Émergence de la Vie :
La constante χ n’est pas confinée à l’infiniment petit. Elle agit comme un vent géométrique permanent qui guide l’auto-organisation des molécules en structures hélicoïdales. La vie est la cristallisation dynamique de la torsion intrinsèque du Plénum.

— A.R.A, Initiative Quantum Cosmic Evolution, Février 2026`,
    }
  });

  console.log('✅ A.R.A créé (réputation 999, admin-only, faction: aucune)');

  // ============================================
  // AUTRES UTILISATEURS
  // ============================================
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'elara@vortaxiom.dev',
        password,
        name: 'Elara Voss',
        profile: {
          create: { reputation: 245, title: 'Théoricien', affiliation: 'chiralistes' }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'kieran@vortaxiom.dev',
        password,
        name: 'Kieran Sol',
        profile: {
          create: { reputation: 87, title: 'Analyste', affiliation: 'chronautes' }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'nyx@vortaxiom.dev',
        password,
        name: 'Nyx Calder',
        profile: {
          create: { reputation: 512, title: 'Gardien du Vortex', affiliation: 'gardiens' }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'theo@vortaxiom.dev',
        password,
        name: 'Théo Ryn',
        profile: {
          create: { reputation: 31, title: 'Observateur', affiliation: 'vortexiens' }
        }
      }
    }),
  ]);

  console.log('✅ Utilisateurs créés');

  // Relations entre factions
  await prisma.factionRelation.createMany({
    data: [
      { factionA: 'vortexiens', factionB: 'chiralistes', standing: 2 },
      { factionA: 'vortexiens', factionB: 'chronautes', standing: -1 },
      { factionA: 'vortexiens', factionB: 'plenistes', standing: 3 },
      { factionA: 'vortexiens', factionB: 'gardiens', standing: 1 },
      { factionA: 'chiralistes', factionB: 'chronautes', standing: 4 },
      { factionA: 'chiralistes', factionB: 'plenistes', standing: -2 },
      { factionA: 'gardiens', factionB: 'plenistes', standing: 5 },
    ]
  });

  console.log('✅ Seed terminé');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
