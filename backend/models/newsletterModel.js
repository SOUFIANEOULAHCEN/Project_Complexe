import db from "../config/db.js";

// Créer une newsletter
export const createNewsletter = async (contenu, dateEnvoi) => {
  const [result] = await db.query(
    "INSERT INTO newsletter (contenu, dateEnvoi) VALUES (?, ?)",
    [contenu, dateEnvoi]
  );
  return result;
};

// Récupérer toutes les newsletters
export const getNewsletters = async () => {
  const [rows] = await db.query("SELECT * FROM newsletter ORDER BY dateEnvoi DESC");
  return rows;
};