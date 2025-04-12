const db = require('../config/db'); // Assurez-vous que la connexion à la base de données est correctement configurée.

const actualiteModel = {
  // Créer une actualité
  createActualite: (titre, contenu, datePublication, callback) => {
    const query = 'INSERT INTO portailactualites (titre, contenu, datePublication) VALUES (?, ?, ?)';
    db.query(query, [titre, contenu, datePublication], callback);
  },

  // Récupérer toutes les actualités
  getAllActualites: (callback) => {
    const query = 'SELECT * FROM portailactualites';
    db.query(query, callback);
  },

  // Récupérer une actualité par ID
  getActualiteById: (id, callback) => {
    const query = 'SELECT * FROM portailactualites WHERE idPortail = ?';
    db.query(query, [id], callback);
  },

  // Mettre à jour une actualité
  updateActualite: (id, titre, contenu, datePublication, callback) => {
    const query = 'UPDATE portailactualites SET titre = ?, contenu = ?, datePublication = ? WHERE idPortail = ?';
    db.query(query, [titre, contenu, datePublication, id], callback);
  },

  // Supprimer une actualité
  deleteActualite: (id, callback) => {
    const query = 'DELETE FROM portailactualites WHERE idPortail = ?';
    db.query(query, [id], callback);
  }
};

module.exports = actualiteModel;
