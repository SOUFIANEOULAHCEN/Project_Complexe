const Espace = require('../models/espaceModel');

const espaceController = {
  createEspace: (req, res) => {
    const { nom, dateDebut, dateFin, organisateur, idCalendar } = req.body;
    Espace.createEspace(nom, dateDebut, dateFin, organisateur, idCalendar, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'espace', error: err });
      } else {
        res.status(201).json({ message: 'Espace créé avec succès', data: results });
      }
    });
  },

  getAllEspaces: (req, res) => {
    Espace.getAllEspaces((err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des espaces', error: err });
      } else {
        res.status(200).json(results);
      }
    });
  },

  getEspaceById: (req, res) => {
    const id = req.params.id;
    Espace.getEspaceById(id, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'espace', error: err });
      } else {
        res.status(200).json(results[0]); // results[0] car c'est un seul espace
      }
    });
  },

  updateEspace: (req, res) => {
    const id = req.params.id;
    const { nom, dateDebut, dateFin, organisateur, idCalendar } = req.body;
    Espace.updateEspace(id, nom, dateDebut, dateFin, organisateur, idCalendar, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'espace', error: err });
      } else {
        res.status(200).json({ message: 'Espace mis à jour avec succès' });
      }
    });
  },

  deleteEspace: (req, res) => {
    const id = req.params.id;
    Espace.deleteEspace(id, (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'espace', error: err });
      } else {
        res.status(200).json({ message: 'Espace supprimé avec succès' });
      }
    });
  }
};

module.exports = espaceController;
