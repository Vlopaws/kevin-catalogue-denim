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

export async function listerJeans(recherche = "", rarete = "") {
  const [lignes] = await pool.query(
    `SELECT * FROM jeans
     WHERE LOWER(CONCAT(marque, ' ', modele)) LIKE LOWER(?) AND (? = '' OR rarete = ?)
     ORDER BY valeur_estimee DESC`,
    [`%${recherche}%`, rarete, rarete]
  );
  return lignes;
}

export async function trouverJean(id) {
  const [lignes] = await pool.query("SELECT * FROM jeans WHERE id = ?", [id]);
  return lignes[0];
}
