# Diagramme UML de la base `catalogue_denim`

Diagramme de classes des tables `DENIM`, `MODELE` et `COTE`, relevé sur la base TiDB
(`SHOW CREATE TABLE`, 10/11/2026).

![Diagramme de classes](uml.png)

Version vectorielle : [uml.svg](uml.svg).

Version texte (Mermaid, affichée par GitHub) :

```mermaid
classDiagram
  direction LR
  class DENIM {
    +int ID_DENIM «PK»
    +varchar(100) MARQUE
    +varchar(100) MATIERE
    +varchar(100) PAYS_ORIGINE
  }
  class MODELE {
    +int ID_MODELE «PK»
    +varchar(100) NOM_MODELE
    +varchar(50) COUPE
    +varchar(50) ANNEE_OU_EPOQUE
    +varchar(20) CODE_TAMPON_BOUTON
    +int ID_DENIM «FK»
  }
  class COTE {
    +int ID_COTE «PK»
    +decimal(8,2) PRIX_MIN
    +decimal(8,2) PRIX_MAX
    +decimal(8,2) PRIX_MOYEN
    +date DATE_MAJ
    +varchar(50) SOURCE_PLATEFORME
    +int ID_MODELE «FK»
  }
  DENIM "1" -- "0..*" MODELE : décline
  MODELE "1" -- "0..*" COTE : est coté
```

## Lecture

- Un **DENIM** (une marque et sa toile : matière, pays d'origine) se décline en zéro ou
  plusieurs **MODELE**. Chaque modèle appartient à un seul denim : clé étrangère
  `MODELE.ID_DENIM` (`FK_MODELE`), obligatoire (`NOT NULL`).
- Un **MODELE** a zéro ou plusieurs **COTE** (prix minimum, maximum et moyen relevés à une
  date sur une plateforme). Chaque cote porte sur un seul modèle : clé étrangère
  `COTE.ID_MODELE` (`FK_COTE`), obligatoire.
- Les clés primaires (`ID_*`) sont des entiers non auto-incrémentés : l'application fournit
  l'identifiant. Les autres colonnes acceptent `NULL` (multiplicité `[0..1]` sur le dessin).
