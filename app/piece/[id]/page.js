import { notFound } from "next/navigation";
import { trouverPiece } from "@/lib/db";
import { prix, typePrix, categories } from "@/lib/format";
import Photo from "../../photo";

export const dynamic = "force-dynamic";

const liste = (texte) => (texte || "").split("|").map((s) => s.trim()).filter(Boolean);

export default async function Fiche({ params }) {
  const { id } = await params;
  const p = await trouverPiece(id);
  if (!p) notFound();
  return (
    <article className="fiche">
      <Photo src={p.image_url} alt={p.name} />
      <div>
        <p className="annee">{p.era_label} - {p.brand}</p>
        <h1>{p.name}</h1>
        <span className="badge">{categories[p.category] || p.category}</span>
        <p className="valeur">
          {prix(p)}
          {p.price_type && <small> - {typePrix[p.price_type] || p.price_type}{p.price_date && `, ${p.price_date}`}</small>}
        </p>
        {p.price_note_fr && <p className="note">{p.price_note_fr}</p>}
        <p>{p.description_fr}</p>
        {p.rarity_reason_fr && <><h3>Pourquoi c'est rare</h3><p>{p.rarity_reason_fr}</p></>}
        {p.key_features && (
          <><h3>Signes distinctifs</h3><ul>{liste(p.key_features).map((f) => <li key={f}>{f}</li>)}</ul></>
        )}
        {p.image_source_page && (
          <p className="credit">
            Photo : <a href={p.image_source_page} target="_blank" rel="noreferrer">{new URL(p.image_source_page).hostname}</a>
            {!p.image_matches_exact_item && " (pièce comparable, pas l'exemplaire exact)"}
          </p>
        )}
        {p.sources && (
          <p className="credit">
            Sources : {liste(p.sources).map((s, i) => (
              <span key={s}>{i > 0 && ", "}<a href={s} target="_blank" rel="noreferrer">{new URL(s).hostname}</a></span>
            ))}
          </p>
        )}
        <a href="/" className="retour">← Retour au catalogue</a>
      </div>
    </article>
  );
}
