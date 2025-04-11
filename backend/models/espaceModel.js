const db = require('../config/db'); // Assure-toi que ton fichier db.js est bien configuré avec mysql2

const Espace = {
  createEspace: (nom, dateDebut, dateFin, organisateur, idCalendar, callback) => {
    const sql = 'INSERT INTO espaces (nom, dateDebut, dateFin, organisateur, idCalendar) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nom, dateDebut, dateFin, organisateur, idCalendar], callback);
  },

  getAllEspaces: (callback) => {
    const sql = 'SELECT * FROM espaces';
    db.query(sql, callback);
  },

  getEspaceById: (id, callback) => {
    const sql = 'SELECT * FROM espaces WHERE idEspace = ?';
    db.query(sql, [id], callback);
  },

  updateEspace: (id, nom, dateDebut, dateFin, organisateur, idCalendar, callback) => {
    const sql = 'UPDATE espaces SET nom = ?, dateDebut = ?, dateFin = ?, organisateur = ?, idCalendar = ? WHERE idEspace = ?';
    db.query(sql, [nom, dateDebut, dateFin, organisateur, idCalendar, id], callback);
  },

  deleteEspace: (id, callback) => {
    const sql = 'DELETE FROM espaces WHERE idEspace = ?';
    db.query(sql, [id], callback);
  }
};

module.exports = Espace;
