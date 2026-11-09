import { listerJeans } from "@/lib/db";

export const dynamic = "force-dynamic";

const euros = (n) => n.toLocaleString("fr-FR") + " €";
const couleur = { Rare: "rare", "Très rare": "tres-rare", Exceptionnel: "exceptionnel" };

export default async function Accueil({ searchParams }) {
  const { q = "", rarete = "" } = await searchParams;
  const jeans = await listerJeans(q, rarete);
  return (
    <>
    <form className="filtres">
      <input name="q" defaultValue={q} placeholder="Rechercher une marque, un modèle..." />
      <select name="rarete" defaultValue={rarete}>
        <option value="">Toutes les raretés</option>
        {Object.keys(couleur).map((r) => <option key={r}>{r}</option>)}
      </select>
      <button>Filtrer</button>
    </form>
    {jeans.length === 0 && <p>Aucun jean ne correspond.</p>}
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
    </>
  );
}
