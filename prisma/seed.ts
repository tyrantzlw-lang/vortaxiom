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

  // Utilisateurs
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

  // Posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        userId: users[0].id,
        title: 'Sur la chiralité du flux temporel',
        content: 'Si le temps possède une chiralité intrinsèque, alors les vortex ne sont pas des anomalies mais des nœuds de symétrie brisée.',
      }
    }),
    prisma.post.create({
      data: {
        userId: users[2].id,
        title: 'Le Plénum est-il conscient ?',
        content: 'Mes dernières simulations montrent une corrélation étrange entre les fluctuations de densité et les patterns de décision collective.',
      }
    }),
    prisma.post.create({
      data: {
        userId: users[1].id,
        title: 'Paradoxe de la boucle de Calder',
        content: 'Si on envoie une information vers le passé via un vortex stable, mais que cette information est ce qui a causé le vortex...',
      }
    }),
  ]);

  console.log('✅ Posts créés');

  // Réactions
  await Promise.all([
    prisma.postReaction.create({ data: { postId: posts[0].id, userId: users[2].id, content: 'Excellent' } }),
    prisma.postReaction.create({ data: { postId: posts[0].id, userId: users[3].id, content: 'Pertinent' } }),
    prisma.postReaction.create({ data: { postId: posts[1].id, userId: users[0].id, content: 'Outrage' } }),
    prisma.postReaction.create({ data: { postId: posts[2].id, userId: users[2].id, content: 'Intéressant' } }),
    prisma.postReaction.create({ data: { postId: posts[2].id, userId: users[3].id, content: 'Rejet' } }),
  ]);

  console.log('✅ Réactions créées');

  // Relations entre factions
  await prisma.factionRelation.createMany({
    data: [
      { factionA: 'chronautes', factionB: 'chiralistes', standing: 35 },
      { factionA: 'chronautes', factionB: 'vortexiens', standing: -25 },
      { factionA: 'chronautes', factionB: 'plenistes', standing: 10 },
      { factionA: 'chronautes', factionB: 'gardiens', standing: 45 },
      { factionA: 'chiralistes', factionB: 'vortexiens', standing: 60 },
      { factionA: 'chiralistes', factionB: 'plenistes', standing: -40 },
      { factionA: 'chiralistes', factionB: 'gardiens', standing: 20 },
      { factionA: 'vortexiens', factionB: 'plenistes', standing: 25 },
      { factionA: 'vortexiens', factionB: 'gardiens', standing: -55 },
      { factionA: 'plenistes', factionB: 'gardiens', standing: 70 },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Relations entre factions créées');
  console.log('✅ Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
