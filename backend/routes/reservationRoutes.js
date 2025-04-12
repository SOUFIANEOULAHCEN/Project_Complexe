const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// API Routes
router.post('/reservations', reservationController.addReservation); // Réserver un événement
router.get('/reservations', reservationController.getAllReservations); // Liste des réservations
router.get('/reservations/user/:id', reservationController.getReservationsByUser); // Liste des réservations d'un utilisateur
router.get('/reservations/event/:id', reservationController.getReservationsByEvent); // Liste des réservations pour un événement
router.delete('/reservations/:id', reservationController.deleteReservation); // Annuler une réservation

module.exports = router;
