import db from '../config/db.js';

class Talent {
  static async getAllTalents() {
    try {
      const [rows] = await db.query(
        "SELECT * FROM personne WHERE typeUser = 'talent' ORDER BY id DESC"
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

export default Talent;