import db from '../config/db.js';

export const createAtelier = (nom, dateDebut, dateFin, organisateur, idCalendar, callback) => {
  const sql = 'INSERT INTO atelier (nom, dateDebut, dateFin, organisateur, idCalendar) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nom, dateDebut, dateFin, organisateur, idCalendar], callback);
};

export const getAllAteliers = (callback) => {
  const sql = 'SELECT * FROM atelier';
  db.query(sql, callback);
};

export const getAtelierById = (id, callback) => {
  const sql = 'SELECT * FROM atelier WHERE idAtelier = ?';
  db.query(sql, [id], callback);
};

export const updateAtelier = (id, nom, dateDebut, dateFin, organisateur, idCalendar, callback) => {
  const sql = 'UPDATE atelier SET nom = ?, dateDebut = ?, dateFin = ?, organisateur = ?, idCalendar = ? WHERE idAtelier = ?';
  db.query(sql, [nom, dateDebut, dateFin, organisateur, idCalendar, id], callback);
};

export const deleteAtelier = (id, callback) => {
  const sql = 'DELETE FROM atelier WHERE idAtelier = ?';
  db.query(sql, [id], callback);
};