const db = require('../config/db');

const Reservation = {

    createReservation: (dateReservation, idUtilisateur, idEvenement, callback) => {
        const query = 'INSERT INTO reservation (dateReservation, idUtilisateur, idEvenement) VALUES (?, ?, ?)';
        db.query(query, [dateReservation, idUtilisateur, idEvenement], (err, results) => {
            if (err) {
                console.error("Erreur dans la requête SQL :", err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    getAllReservations: (callback) => {
        const query = 'SELECT * FROM reservation';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);                
            } else {
                callback(null, results);
            }
        }); 
    },


    getReservationsByUser: (idUtilisateur, callback) => {
        const query = 'SELECT * FROM reservation WHERE idUtilisateur = ?';
        db.query(query, [idUtilisateur], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getReservationsByEvent: (idEvenement, callback) => {
        const query = 'SELECT * FROM reservation WHERE idEvenement = ?';
        db.query(query, [idEvenement], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    deleteReservation: (id, callback) => {
        const query = 'DELETE FROM reservation WHERE idReservation = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
};

module.exports = Reservation;
