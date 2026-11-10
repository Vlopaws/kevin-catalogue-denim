import mysql from "mysql2/promise";

// TiDB Cloud exige TLS ; les identifiants viennent de l'environnement (.env.local ou Vercel).
const pool = mysql.createPool({
  host: process.env.TIDB_HOST,
  port: Number(process.env.TIDB_PORT || 4000),
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true },
  connectionLimit: 3,
});

export async function listerPieces(recherche = "", categorie = "") {
  const [lignes] = await pool.query(
    `SELECT * FROM denim_item
     WHERE LOWER(CONCAT(name, ' ', brand, ' ', IFNULL(model_code, ''))) LIKE LOWER(?)
       AND (? = '' OR category = ?)
     ORDER BY year_start`,
    [`%${recherche}%`, categorie, categorie]
  );
  return lignes;
}

export async function trouverPiece(id) {
  const [lignes] = await pool.query("SELECT * FROM denim_item WHERE id = ?", [id]);
  return lignes[0];
}
