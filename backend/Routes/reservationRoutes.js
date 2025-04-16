import express from 'express';
import { 
    addReservation, 
    getAllReservations, 
    getReservationsByUser, 
    getReservationsByEvent, 
    deleteReservation 
} from '../Controller/reservationController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// API Routes
router.post('/reservations', verifyToken, addReservation); // Réserver un événement
router.get('/reservations', getAllReservations); // Liste des réservations
router.get('/reservations/user/:id', verifyToken, getReservationsByUser); // Liste des réservations d'un utilisateur
router.get('/reservations/event/:id', verifyToken, getReservationsByEvent); // Liste des réservations pour un événement
router.delete('/reservations/:id', verifyToken, deleteReservation); // Annuler une réservation

export default router;