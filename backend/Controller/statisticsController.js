import db from "../config/db.js"; 
import { parse } from 'json2csv';

// Nombre d'événements par mois

export const getNombreEvenementsParMois = async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT MONTH(dateDebut) AS mois, COUNT(*) AS nombre_evenements
        FROM evenements
        GROUP BY MONTH(dateDebut)
        ORDER BY MONTH(dateDebut);
      `);
      res.status(200).json(rows);
    } catch (err) {
      console.error("Erreur récupération événements par mois :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  };

// Nombre de réservations
export const getNombreReservations = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT COUNT(*) AS nombre_reservations FROM reservation;");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Erreur récupération réservations :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Engagement des utilisateurs (par exemple, nombre de commentaires)
export const getEngagementUtilisateurs = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT idUtilisateur, COUNT(*) AS nombre_commentaires
      FROM commentaire
      GROUP BY idUtilisateur;
    `);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Erreur récupération engagement utilisateurs :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Export CSV (optionnel)
export const exportCSV = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT idUtilisateur, COUNT(*) AS nombre_commentaires
      FROM commentaire
      GROUP BY idUtilisateur;
    `);
    
    const csv = parse(rows); // Convertir les données en format CSV
    res.header('Content-Type', 'text/csv');
    res.attachment('engagement_utilisateurs.csv');
    res.send(csv);
  } catch (err) {
    console.error("Erreur lors de l'exportation en CSV :", err);
    res.status(500).json({ error: "Erreur serveur lors de l'exportation CSV" });
  }
};