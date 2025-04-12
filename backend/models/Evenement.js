const db = require("../config/db");

const Evenement = {
  // Récupérer tous les événements
  getAll: (callback) => {
    db.query("SELECT * FROM evenements", callback);
  },

  // Récupérer un événement par son ID
  getById: (id, callback) => {
    db.query("SELECT * FROM evenements WHERE idEvent = ?", [id], callback);
  },

  // Créer un nouvel événement
  create: (data, callback) => {
    const { nom, dateDebut, dateFin, lieu, description, organisateur, typeEvenement, idCalendar } = data;
    const sql = "INSERT INTO evenements (nom, dateDebut, dateFin, lieu, description, organisateur, typeEvenement, idCalendar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [nom, dateDebut, dateFin, lieu, description, organisateur, typeEvenement, idCalendar], callback);
  },

  // Mettre à jour un événement existant
  update: (id, data, callback) => {
    const { nom, dateDebut, dateFin, lieu, description, organisateur, typeEvenement, idCalendar } = data;
    const sql = `UPDATE evenements SET nom = ?, dateDebut = ?, dateFin = ?, lieu = ?, description = ?, organisateur = ?, typeEvenement = ?, idCalendar = ? WHERE idEvent = ?`;
    db.query(sql, [nom, dateDebut, dateFin, lieu, description, organisateur, typeEvenement, idCalendar, id], callback);
  },

  // Supprimer un événement
  delete: (id, callback) => {
    db.query("DELETE FROM evenements WHERE idEvent = ?", [id], callback);
  },

  // Recherche d'événements par nom ou description
  search: (term, callback) => {
    const sql = "SELECT * FROM evenements WHERE nom LIKE ? OR description LIKE ? ORDER BY dateDebut DESC LIMIT 10 OFFSET 0";
    db.query(sql, [`%${term}%`, `%${term}%`], callback);
  },
};  
module.exports = Evenement;
