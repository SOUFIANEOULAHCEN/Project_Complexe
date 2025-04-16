import db from '../config/db.js';

export const createReservation = async (dateReservation, idUtilisateur, idEvenement) => {
    try {
        const query = 'INSERT INTO reservation (dateReservation, idUtilisateur, idEvenement) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [dateReservation, idUtilisateur, idEvenement]);
        return result;
    } catch (err) {
        console.error("Erreur lors de la création de la réservation:", err);
        throw err;
    }
};

export const getAllReservations = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM reservation');
        return rows;
    } catch (err) {
        console.error("Erreur lors de la récupération des réservations:", err);
        throw err;
    }
};

export const getReservationsByUser = async (idUtilisateur) => {
    try {
        const [rows] = await db.query('SELECT * FROM reservation WHERE idUtilisateur = ?', [idUtilisateur]);
        return rows;
    } catch (err) {
        console.error("Erreur lors de la récupération des réservations de l'utilisateur:", err);
        throw err;
    }
};

export const getReservationsByEvent = async (idEvenement) => {
    try {
        const [rows] = await db.query('SELECT * FROM reservation WHERE idEvenement = ?', [idEvenement]);
        return rows;
    } catch (err) {
        console.error("Erreur lors de la récupération des réservations pour l'événement:", err);
        throw err;
    }
};

export const deleteReservation = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM reservation WHERE idReservation = ?', [id]);
        return result;
    } catch (err) {
        console.error("Erreur lors de la suppression de la réservation:", err);
        throw err;
    }
};