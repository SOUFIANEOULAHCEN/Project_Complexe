import db from '../config/db.js';

export const createEspace = async (nom, dateDebut, dateFin, organisateur, idCalendar) => {
    const sql = 'INSERT INTO espaces (nom, dateDebut, dateFin, organisateur, idCalendar) VALUES (?, ?, ?, ?, ?)';
    const [results] = await db.execute(sql, [nom, dateDebut, dateFin, organisateur, idCalendar]);
    return results;
};

export const getAllEspaces = async () => {
    const sql = 'SELECT * FROM espaces';
    const [results] = await db.execute(sql);
    return results;
};

export const getEspaceById = async (id) => {
    const sql = 'SELECT * FROM espaces WHERE idEspace = ?';
    const [results] = await db.execute(sql, [id]);
    return results;
};

export const updateEspace = async (id, nom, dateDebut, dateFin, organisateur, idCalendar) => {
    const sql = 'UPDATE espaces SET nom = ?, dateDebut = ?, dateFin = ?, organisateur = ?, idCalendar = ? WHERE idEspace = ?';
    const [results] = await db.execute(sql, [nom, dateDebut, dateFin, organisateur, idCalendar, id]);
    return results;
};

export const deleteEspace = async (id) => {
    const sql = 'DELETE FROM espaces WHERE idEspace = ?';
    const [results] = await db.execute(sql, [id]);
    return results;
};