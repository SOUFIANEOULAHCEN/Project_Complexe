import db from '../config/db.js';

class Event {
  static async getAllEvents() {
    try {
      const [rows] = await db.query('SELECT * FROM evenements ORDER BY dateDebut DESC');
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

export default Event;