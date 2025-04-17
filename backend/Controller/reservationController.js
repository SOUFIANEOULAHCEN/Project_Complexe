// controllers/reservationController.js
import Reservation from '../models/reservationModel.js';

// Get all reservations
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.getAllReservations();
    res.status(200).json(reservations); // <-- returns array from DB
  } catch (error) {
    console.error('Error in getAllReservations controller:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations' });
  }
};

// Get reservation by ID
export const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.getReservationById(id);
    
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    
    res.status(200).json(reservation);
  } catch (error) {
    console.error('Error in getReservationById controller:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la réservation' });
  }
};

// Get reservations by user ID
export const getReservationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Reservation.getReservationsByUserId(userId);
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error in getReservationsByUserId controller:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des réservations de l\'utilisateur' });
  }
};

// Create a new reservation
export const createReservation = async (req, res) => {
  try {
    const { dateReservation, idUtilisateur, idEvenement } = req.body;
    
    // Validate required fields
    if (!dateReservation || !idUtilisateur || !idEvenement) {
      return res.status(400).json({ 
        message: 'Veuillez fournir la date, l\'utilisateur et l\'événement' 
      });
    }
    
    const newReservation = await Reservation.createReservation({
      dateReservation,
      idUtilisateur,
      idEvenement
    });
    
    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error in createReservation controller:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la réservation' });
  }
};

// Delete a reservation
export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await Reservation.deleteReservation(id);
    
    if (!success) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    
    res.status(200).json({ message: 'Réservation supprimée avec succès' });
  } catch (error) {
    console.error('Error in deleteReservation controller:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la réservation' });
  }
};