import "./globals.css";

export const metadata = {
  title: "Catalogue Denim",
  description: "Jeans vintage rares et de grande valeur",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <header className="entete">
          <a href="/" className="marque">CATALOGUE DENIM</a>
          <a href="/">Accueil</a>
        </header>
        <main>{children}</main>
        <footer className="pied">© 2026 - Catalogue Denim - Next.js / TiDB</footer>
      </body>
    </html>
  );
}
