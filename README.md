# Catalogue Denim

Petit site vitrine de jeans vintage rares : grille de cartes, recherche, filtre par rareté, fiche de détail.
Next.js (App Router, JavaScript) + `mysql2` sur TiDB Cloud (base `catalogue_denim`).

## En local

1. `npm install`
2. Créer `.env.local` (ignoré par git) :

   ```
   TIDB_HOST=gateway01.eu-central-1.prod.aws.tidbcloud.com
   TIDB_PORT=4000
   TIDB_USER=...
   TIDB_PASSWORD=...
   TIDB_DATABASE=catalogue_denim
   ```

3. `npm run db:init` crée la table `jeans` et six exemples (ne fait rien si elle existe).
4. `npm run dev`, puis http://localhost:3000

## Fichiers

- `lib/db.js` : connexion TLS et les deux requêtes (liste filtrée, un jean).
- `app/page.js` : grille, recherche, filtre. `app/jean/[id]/page.js` : fiche.
- `sql/schema.sql` : table et exemples. Les visuels provisoires sont dans `public/jeans/` ;
  la colonne `photo` accepte aussi une URL d'image complète.

## Déploiement sur Vercel

1. Sur https://vercel.com/new, importer le dépôt GitHub `Vlopaws/kevin-catalogue-denim`
   (Vercel détecte Next.js, rien à régler).
2. Dans Settings > Environment Variables, ajouter les cinq variables `TIDB_*` ci-dessus.
3. Déployer. Chaque push sur `main` redéploie ensuite tout seul.

Si la page renvoie une erreur de connexion, vérifier dans TiDB Cloud que l'accès public du
cluster accepte les connexions venant de Vercel (adresses IP non fixes).
