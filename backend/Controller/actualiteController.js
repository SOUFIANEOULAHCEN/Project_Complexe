const actualiteModel = require('../models/actualiteModel');

const actualiteController = {
  // Créer une actualité
  createActualite: (req, res) => {
    const { titre, contenu, datePublication } = req.body;

    // Vérifier que tous les champs sont fournis
    if (!titre || !contenu || !datePublication) {
      return res.status(400).json({ message: 'Tous les champs sont nécessaires' });
    }

    // S'assurer que datePublication est au format valide (YYYY-MM-DD)
    const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegEx.test(datePublication)) {
      return res.status(400).json({ message: 'Date de publication invalide. Format attendu: YYYY-MM-DD' });
    }

    actualiteModel.createActualite(titre, contenu, datePublication, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'actualité', error: err });
      } else {
        res.status(201).json({ message: 'Actualité créée avec succès', data: results });
      }
    });
  },

  // Récupérer toutes les actualités
  getAllActualites: (req, res) => {
    actualiteModel.getAllActualites((err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des actualités', error: err });
      } else {
        res.status(200).json({ data: results });
      }
    });
  },

  // Récupérer une actualité par ID
  getActualiteById: (req, res) => {
    const id = req.params.id;
    actualiteModel.getActualiteById(id, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'actualité', error: err });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'Actualité non trouvée' });
      } else {
        res.status(200).json({ data: results[0] });
      }
    });
  },

  // Modifier une actualité
  updateActualite: (req, res) => {
    const { titre, contenu, datePublication } = req.body;
    const id = req.params.id;

    if (!titre || !contenu || !datePublication) {
      return res.status(400).json({ message: 'Tous les champs sont nécessaires pour la mise à jour' });
    }

    actualiteModel.updateActualite(id, titre, contenu, datePublication, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'actualité', error: err });
      } else {
        res.status(200).json({ message: 'Actualité mise à jour avec succès', data: results });
      }
    });
  },

  // Supprimer une actualité
  deleteActualite: (req, res) => {
    const id = req.params.id;

    actualiteModel.deleteActualite(id, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'actualité', error: err });
      } else {
        res.status(200).json({ message: 'Actualité supprimée avec succès' });
      }
    });
  }
};

module.exports = actualiteController;