
import db from '../config/db';  


const Commentaire = {
  // Ajouter un commentaire
  create: (contenu, idUtilisateur, idEvenement, note) => {
    const query = 'INSERT INTO commentaire (contenu, idUtilisateur, idEvenement, note) VALUES (?, ?, ?, ?)';
    return db.query(query, [contenu, idUtilisateur, idEvenement, note]);
  },

  // Récupérer les commentaires par événement
  getByEvent: (idEvenement) => {
    const query = 'SELECT * FROM commentaire WHERE idEvenement = ?';
    return db.query(query, [idEvenement]);
  },

  // Supprimer un commentaire par id
  delete: (idCommentaire) => {
    const query = 'DELETE FROM commentaire WHERE idCommentaire = ?';
    return db.query(query, [idCommentaire]);
  }
};

export default Commentaire;
