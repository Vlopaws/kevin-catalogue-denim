import { notFound } from "next/navigation";
import { trouverJean } from "@/lib/db";
import { euros, couleur } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Fiche({ params }) {
  const { id } = await params;
  const j = /^\d+$/.test(id) && (await trouverJean(Number(id)));
  if (!j) notFound();
  return (
    <article className="fiche">
      <img src={j.photo} alt={`${j.marque} ${j.modele}`} />
      <div>
        <p className="annee">{j.annee}</p>
        <h1>{j.marque} {j.modele}</h1>
        <span className={`badge ${couleur[j.rarete]}`}>{j.rarete}</span>
        <p className="valeur">Valeur estimée : {euros(j.valeur_estimee)}</p>
        <p>{j.description}</p>
        <a href="/" className="retour">← Retour au catalogue</a>
      </div>
    </article>
  );
}
