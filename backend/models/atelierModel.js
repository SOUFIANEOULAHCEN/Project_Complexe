const db = require('../config/db'); // Connexion MySQL

const Atelier = {
  createAtelier: (nom, dateDebut, dateFin, organisateur, idCalendar, callback) => {
    const sql = 'INSERT INTO atelier (nom, dateDebut, dateFin, organisateur, idCalendar) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nom, dateDebut, dateFin, organisateur, idCalendar], callback);
  },

  getAllAteliers: (callback) => {
    const sql = 'SELECT * FROM atelier';
    db.query(sql, callback);
  },

  getAtelierById: (id, callback) => {
    const sql = 'SELECT * FROM atelier WHERE idAtelier = ?';
    db.query(sql, [id], callback);
  },

  updateAtelier: (id, nom, dateDebut, dateFin, organisateur, idCalendar, callback) => {
    const sql = 'UPDATE atelier SET nom = ?, dateDebut = ?, dateFin = ?, organisateur = ?, idCalendar = ? WHERE idAtelier = ?';
    db.query(sql, [nom, dateDebut, dateFin, organisateur, idCalendar, id], callback);
  },

  deleteAtelier: (id, callback) => {
    const sql = 'DELETE FROM atelier WHERE idAtelier = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Atelier;
