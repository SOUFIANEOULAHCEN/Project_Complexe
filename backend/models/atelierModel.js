import db from '../config/db.js';

export const createAtelier = async (nom, dateDebut, dateFin, organisateur, idCalendar) => {
  const sql = 'INSERT INTO atelier (nom, dateDebut, dateFin, organisateur, idCalendar) VALUES (?, ?, ?, ?, ?)';
  const [results] = await db.execute(sql, [nom, dateDebut, dateFin, organisateur, idCalendar]);
  return results;
};

export const getAllAteliers = async () => {
  const sql = 'SELECT * FROM atelier';
  const [results] = await db.execute(sql);
  return results;
};

export const getAtelierById = async (id) => {
  const sql = 'SELECT * FROM atelier WHERE idAtelier = ?';
  const [results] = await db.execute(sql, [id]);
  return results;
};

export const updateAtelier = async (id, nom, dateDebut, dateFin, organisateur, idCalendar) => {
  const sql = 'UPDATE atelier SET nom = ?, dateDebut = ?, dateFin = ?, organisateur = ?, idCalendar = ? WHERE idAtelier = ?';
  const [results] = await db.execute(sql, [nom, dateDebut, dateFin, organisateur, idCalendar, id]);
  return results;
};

export const deleteAtelier = async (id) => {
  const sql = 'DELETE FROM atelier WHERE idAtelier = ?';
  const [results] = await db.execute(sql, [id]);
  return results;
};