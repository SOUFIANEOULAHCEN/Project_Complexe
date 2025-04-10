const Reservation = require('../models/reservationModel');

const reservationController = {
    // Ajouter une réservation
    addReservation: (req, res) => {
        const { dateReservation, idUtilisateur, idEvenement } = req.body;

        // Vérification des champs nécessaires
        if (!dateReservation || !idUtilisateur || !idEvenement) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        // Appel à la méthode du modèle pour ajouter une réservation
        Reservation.createReservation(dateReservation, idUtilisateur, idEvenement, (err, results) => {
            if (err) {
                console.error("Erreur lors de la création de la réservation:", err);
                res.status(500).json({ message: 'Erreur lors de la création de la réservation', error: err });
            } else {
                res.status(201).json({ message: 'Réservation ajoutée avec succès', data: results });
            }
        });
    },

    // Obtenir toutes les réservations
    getAllReservations: (req, res) => {
        Reservation.getAllReservations((err, results) => {
            if (err) {
                console.error("Erreur lors de la récupération des réservations:", err);
                res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    // Obtenir les réservations d'un utilisateur
    getReservationsByUser: (req, res) => {
        const idUtilisateur = req.params.id;
        Reservation.getReservationsByUser(idUtilisateur, (err, results) => {
            if (err) {
                console.error("Erreur lors de la récupération des réservations de l'utilisateur:", err);
                res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    // Obtenir les réservations pour un événement
    getReservationsByEvent: (req, res) => {
        const idEvenement = req.params.id;
        Reservation.getReservationsByEvent(idEvenement, (err, results) => {
            if (err) {
                console.error("Erreur lors de la récupération des réservations pour l'événement:", err);
                res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    // Supprimer une réservation
    deleteReservation: (req, res) => {
        const id = req.params.id;
        Reservation.deleteReservation(id, (err, results) => {
            if (err) {
                console.error("Erreur lors de la suppression de la réservation:", err);
                res.status(500).json({ message: 'Erreur lors de la suppression de la réservation', error: err });
            } else {
                res.status(200).json({ message: 'Réservation supprimée avec succès' });
            }
        });
    }
};

module.exports = reservationController;
