// models/Reservation.js
import db from "../config/db.js";

class Reservation {
  // Get all reservations
  static async getAllReservations() {
    try {
      const [rows] = await db.query(`
        SELECT * FROM reservation
        ORDER BY dateReservation DESC
      `);
      return rows;
    } catch (error) {
      console.error("Error in getAllReservations:", error);
      throw error;
    }
  }

  // Get reservation by ID
  static async getReservationById(id) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM reservation WHERE idReservation = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error in getReservationById:", error);
      throw error;
    }
  }

  // Get reservations by user ID
  static async getReservationsByUserId(userId) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM reservation WHERE idUtilisateur = ? ORDER BY dateReservation DESC",
        [userId]
      );
      return rows;
    } catch (error) {
      console.error("Error in getReservationsByUserId:", error);
      throw error;
    }
  }

  // Create a new reservation
  static async createReservation(reservationData) {
    try {
      const { dateReservation, idUtilisateur, idEvenement } = reservationData;

      const [result] = await pool.query(
        `INSERT INTO reservation 
         (dateReservation, idUtilisateur, idEvenement) 
         VALUES (?, ?, ?)`,
        [dateReservation, idUtilisateur, idEvenement]
      );

      return { idReservation: result.insertId, ...reservationData };
    } catch (error) {
      console.error("Error in createReservation:", error);
      throw error;
    }
  }

  // Delete a reservation
  static async deleteReservation(id) {
    try {
      const [result] = await pool.query(
        "DELETE FROM reservation WHERE idReservation = ?",
        [id]
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error in deleteReservation:", error);
      throw error;
    }
  }
}

export default Reservation;
