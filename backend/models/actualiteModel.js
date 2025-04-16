import db from '../config/db.js'; // Ensure the database connection is correctly configured.

const actualiteModel = {
  // Create an actualité
  createActualite: async (titre, contenu, datePublication) => {
    const query = 'INSERT INTO portailactualites (titre, contenu, datePublication) VALUES (?, ?, ?)';
    const [results] = await db.query(query, [titre, contenu, datePublication]);
    return results;
  },

  // Retrieve all actualités
  getAllActualites: async () => {
    const query = 'SELECT * FROM portailactualites';
    const [results] = await db.query(query);
    return results;
  },

  // Retrieve an actualité by ID
  getActualiteById: async (id) => {
    const query = 'SELECT * FROM portailactualites WHERE idPortail = ?';
    const [results] = await db.query(query, [id]);
    return results;
  },

  // Update an actualité
  updateActualite: async (id, titre, contenu, datePublication) => {
    const query = 'UPDATE portailactualites SET titre = ?, contenu = ?, datePublication = ? WHERE idPortail = ?';
    const [results] = await db.query(query, [titre, contenu, datePublication, id]);
    return results;
  },

  // Delete an actualité
  deleteActualite: async (id) => {
    const query = 'DELETE FROM portailactualites WHERE idPortail = ?';
    const [results] = await db.query(query, [id]);
    return results;
  }
};

export default actualiteModel;