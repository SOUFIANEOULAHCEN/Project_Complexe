const Atelier = require('../models/atelierModel');

const atelierController = {
  createAtelier: (req, res) => {
    const { nom, dateDebut, dateFin, organisateur, idCalendar } = req.body;
    Atelier.createAtelier(nom, dateDebut, dateFin, organisateur, idCalendar, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Erreur lors de la création de l'atelier", error: err });
      } else {
        res.status(201).json({ message: "Atelier créé avec succès", data: results });
      }
    });
  },

  getAllAteliers: (req, res) => {
    Atelier.getAllAteliers((err, results) => {
      if (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des ateliers", error: err });
      } else {
        res.status(200).json(results);
      }
    });
  },

  getAtelierById: (req, res) => {
    const id = req.params.id;
    Atelier.getAtelierById(id, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'atelier", error: err });
      } else {
        res.status(200).json(results[0]);
      }
    });
  },

  updateAtelier: (req, res) => {
    const id = req.params.id;
    const { nom, dateDebut, dateFin, organisateur, idCalendar } = req.body;
    Atelier.updateAtelier(id, nom, dateDebut, dateFin, organisateur, idCalendar, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'atelier", error: err });
      } else {
        res.status(200).json({ message: "Atelier mis à jour avec succès" });
      }
    });
  },

  deleteAtelier: (req, res) => {
    const id = req.params.id;
    Atelier.deleteAtelier(id, (err, results) => {
      if (err) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'atelier", error: err });
      } else {
        res.status(200).json({ message: "Atelier supprimé avec succès" });
      }
    });
  }
};

module.exports = atelierController;
