CREATE TABLE IF NOT EXISTS jeans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  marque VARCHAR(80) NOT NULL,
  modele VARCHAR(120) NOT NULL,
  annee SMALLINT NOT NULL,
  rarete ENUM('Rare', 'Très rare', 'Exceptionnel') NOT NULL,
  valeur_estimee INT NOT NULL,
  photo VARCHAR(255) NOT NULL,
  description TEXT
);

INSERT INTO jeans (marque, modele, annee, rarete, valeur_estimee, photo, description) VALUES
('Levi''s', '501XX selvedge', 1947, 'Exceptionnel', 25000, '/jeans/brut.svg', 'Toile selvedge, rivets cachés, étiquette cuir à deux chevaux. Modèle d''après-guerre très recherché.'),
('Levi''s', '501 « Big E »', 1966, 'Très rare', 4500, '/jeans/clair.svg', 'Onglet rouge au E majuscule, délavage naturel, ourlet chaîné d''origine.'),
('Lee', '101 Rider', 1952, 'Très rare', 3800, '/jeans/brut.svg', 'Toile lourde, fermeture à boutons, ceinture en V caractéristique du Rider.'),
('Wrangler', '11MW Blue Bell', 1950, 'Rare', 2200, '/jeans/noir.svg', 'Première série 11MW, broderie W sur les poches arrière.'),
('Levi''s', 'XX « Nevada »', 1880, 'Exceptionnel', 80000, '/jeans/clair.svg', 'Exemplaire minier du XIXe siècle, boucle de ceinture arrière et un seul passant.'),
('Lee', 'Cowboy 101B', 1937, 'Exceptionnel', 15000, '/jeans/noir.svg', 'Premier jean Lee à fermeture éclair, sangle arrière et poches renforcées.');
