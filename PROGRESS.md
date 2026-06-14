# Avancées récentes - Vortaxiom

## 14 juin 2026

### Migration base de données
- Passage complet de SQLite + better-sqlite3 → **Neon PostgreSQL + Prisma**
- Configuration `prisma/schema.prisma` pour Neon
- Exécution des migrations Prisma

### Seed de la base
- Ajout de `tsx` en devDependency
- Exécution de `npm run db:seed`
- Données initiales créées :
  - 4 utilisateurs (Elara, Kieran, Nyx, Théo) avec profils et factions
  - 3 posts (chiralité, Plénum, paradoxe)
  - Réactions et commentaires

### Git & GitHub
- Initialisation du dépôt Git
- Commit initial ("Initial commit - Vortaxiom")
- Push sur `https://github.com/tyrantzlw-lang/vortaxiom`
- Configuration d'une clé SSH dédiée (`id_ed25519_vortaxiom`)
- Remote configuré en SSH pour les futurs pushes

### Outils & Infrastructure
- Mise à jour de **Hermes Agent** vers la dernière version
- Clé SSH deploy ajoutée sur GitHub

---

**Prochaines étapes suggérées :**
- Déploiement (Vercel / Netlify)
- Configuration de l'authentification NextAuth avec Neon
- Ajout du système de réputation / factions avancé
- Interface forum + Hors-RP

Dernière mise à jour : 14 juin 2026