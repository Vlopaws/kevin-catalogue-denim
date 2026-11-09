import { listerJeans } from "@/lib/db";

export const dynamic = "force-dynamic";

const euros = (n) => n.toLocaleString("fr-FR") + " €";
const couleur = { Rare: "rare", "Très rare": "tres-rare", Exceptionnel: "exceptionnel" };

export default async function Accueil() {
  const jeans = await listerJeans();
  return (
    <div className="grille">
      {jeans.map((j) => (
        <article key={j.id} className="carte">
          <img src={j.photo} alt={`${j.marque} ${j.modele}`} />
          <p className="annee">{j.annee}</p>
          <h2>{j.marque} {j.modele}</h2>
          <span className={`badge ${couleur[j.rarete]}`}>{j.rarete}</span>
          <p className="valeur">{euros(j.valeur_estimee)}</p>
        </article>
      ))}
    </div>
  );
}
