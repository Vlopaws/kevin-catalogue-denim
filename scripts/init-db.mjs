// Crée la table jeans et ses exemples : npm run db:init
import { readFileSync } from "node:fs";
import mysql from "mysql2/promise";

const connexion = await mysql.createConnection({
  host: process.env.TIDB_HOST,
  port: Number(process.env.TIDB_PORT || 4000),
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true },
  multipleStatements: true,
});

const [[{ n }]] = await connexion.query(
  "SELECT COUNT(*) AS n FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'jeans'"
);
if (n) {
  console.log("La table jeans existe déjà : rien à faire.");
} else {
  await connexion.query(readFileSync(new URL("../sql/schema.sql", import.meta.url), "utf8"));
  console.log("Table jeans créée avec ses exemples.");
}
await connexion.end();
