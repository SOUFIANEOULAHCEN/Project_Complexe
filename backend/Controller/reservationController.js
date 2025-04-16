import * as Reservation from '../models/reservationModel.js';

export const addReservation = async (req, res) => {
    try {
        const { dateReservation, idUtilisateur, idEvenement } = req.body;

        if (!dateReservation || !idUtilisateur || !idEvenement) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }

        const result = await Reservation.createReservation(dateReservation, idUtilisateur, idEvenement);
        return res.status(201).json({ message: 'Réservation ajoutée avec succès', data: result });
    } catch (err) {
        console.error("Erreur lors de la création de la réservation:", err);
        return res.status(500).json({ message: 'Erreur lors de la création de la réservation', error: err });
    }
};

export const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.getAllReservations();
        return res.status(200).json(reservations);
    } catch (err) {
        console.error("Erreur lors de la récupération des réservations:", err);
        return res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error: err });
    }
};

export const getReservationsByUser = async (req, res) => {
    try {
        const idUtilisateur = req.params.id;
        const reservations = await Reservation.getReservationsByUser(idUtilisateur);
        return res.status(200).json(reservations);
    } catch (err) {
        console.error("Erreur lors de la récupération des réservations de l'utilisateur:", err);
        return res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error: err });
    }
};

export const getReservationsByEvent = async (req, res) => {
    try {
        const idEvenement = req.params.id;
        const reservations = await Reservation.getReservationsByEvent(idEvenement);
        return res.status(200).json(reservations);
    } catch (err) {
        console.error("Erreur lors de la récupération des réservations pour l'événement:", err);
        return res.status(500).json({ message: 'Erreur lors de la récupération des réservations', error: err });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Reservation.deleteReservation(id);
        return res.status(200).json({ message: 'Réservation supprimée avec succès', data: result });
    } catch (err) {
        console.error("Erreur lors de la suppression de la réservation:", err);
        return res.status(500).json({ message: 'Erreur lors de la suppression de la réservation', error: err });
    }
};