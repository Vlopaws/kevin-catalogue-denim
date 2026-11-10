import { listerPieces } from "@/lib/db";
import { prix, categories } from "@/lib/format";
import Photo from "./photo";

export const dynamic = "force-dynamic";

export default async function Accueil({ searchParams }) {
  const { q = "", categorie = "" } = await searchParams;
  const pieces = await listerPieces(q, categorie);
  return (
    <>
    <form className="filtres">
      <input name="q" defaultValue={q} placeholder="Rechercher un modèle, une marque, un code..." />
      <select name="categorie" defaultValue={categorie}>
        <option value="">Jeans et vestes</option>
        {Object.entries(categories).map(([v, nom]) => <option key={v} value={v}>{nom}</option>)}
      </select>
      <button>Filtrer</button>
    </form>
    {pieces.length === 0 && <p>Aucune pièce ne correspond.</p>}
    <div className="grille">
      {pieces.map((p) => (
        <a key={p.id} href={`/piece/${p.id}`} className="carte">
          <Photo src={p.image_url} alt={p.name} />
          <p className="annee">{p.era_label}</p>
          <h2>{p.name}</h2>
          <span className="badge">{categories[p.category] || p.category}</span>
          <p className="valeur">{prix(p)}</p>
        </a>
      ))}
    </div>
    </>
  );
}
