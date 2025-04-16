// routes/reservationRoutes.js
import express from 'express';
import { 
  getAllReservations,
  getReservationById,
  getReservationsByUserId,
  createReservation,
  deleteReservation
} from '../Controller/reservationController.js';
// import { verifyToken } from '../middlewares/authMiddleware.js';
import { verifyToken, checkRole } from '../middlewares/auth.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Get all reservations
router.get('/', getAllReservations);

// Get reservation by ID
router.get('/:id', getReservationById);

// Get reservations by user ID
router.get('/user/:userId', getReservationsByUserId);

// Create a new reservation
router.post('/', createReservation);

// Delete a reservation
router.delete('/:id', deleteReservation);

export default router;