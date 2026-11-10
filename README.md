# Catalogue Denim

Petit site vitrine de jeans et vestes en denim vintage rares : grille de cartes, recherche,
filtre jean ou veste, fiche de détail avec prix, rareté et sources.
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

3. `npm run dev`, puis http://localhost:3000

## Données

Le site lit la table `denim_item` (une ligne par pièce : nom, marque, époque, prix et devise,
description, rareté, `image_url` et `image_source_page`). Les photos restent hébergées sur
leur site d'origine, cité sur chaque fiche avec les sources ; une image de remplacement
s'affiche si la photo manque ou si son site en refuse l'affichage.

La base contient aussi le modèle relationnel `DENIM` / `MODELE` / `COTE`, décrit par le
diagramme UML : [docs/uml.md](docs/uml.md).

## Fichiers

- `lib/db.js` : connexion TLS et les deux requêtes (liste filtrée, une pièce).
- `app/page.js` : grille, recherche, filtre. `app/piece/[id]/page.js` : fiche.
- `app/photo.js` : image avec remplacement. `lib/format.js` : prix et libellés.

## Déploiement sur Vercel

1. Sur https://vercel.com/new, importer le dépôt GitHub `Vlopaws/kevin-catalogue-denim`
   (Vercel détecte Next.js, rien à régler).
2. Dans Settings > Environment Variables, ajouter les cinq variables `TIDB_*` ci-dessus.
3. Déployer. Chaque push sur `main` redéploie ensuite tout seul.

Si la page renvoie une erreur de connexion, vérifier dans TiDB Cloud que l'accès public du
cluster accepte les connexions venant de Vercel (adresses IP non fixes).
