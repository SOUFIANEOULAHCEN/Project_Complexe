import * as Atelier from '../models/atelierModel.js';

export const createAtelier = async (req, res) => {
  try {
    const { nom, dateDebut, dateFin, organisateur, idCalendar } = req.body;
    
    // Validate input data
    if (!nom || !dateDebut || !dateFin || !organisateur) {
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log('Received data:', req.body); // Log incoming data

    const results = await Atelier.createAtelier(nom, dateDebut, dateFin, organisateur, idCalendar);
    res.status(201).json({ message: "Atelier créé avec succès", data: results });
  } catch (err) {
    console.error('Error creating atelier:', err);
    res.status(500).json({ message: "Erreur lors de la création de l'atelier", error: err.message });
  }
};

export const getAllAteliers = async (req, res) => {
  try {
    const ateliers = await Atelier.getAllAteliers();
    res.status(200).json(ateliers);
  } catch (error) {
    console.error('Error fetching ateliers:', error);
    res.status(500).json({ message: "Erreur lors de la récupération des ateliers", error: error.message });
  }
};

export const getAtelierById = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await Atelier.getAtelierById(id);
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: "Atelier non trouvé" });
    }
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'atelier", error: err.message });
  }
};

export const updateAtelier = async (req, res) => {
  try {
    const id = req.params.id;
    const { nom, dateDebut, dateFin, organisateur, idCalendar } = req.body;
    await Atelier.updateAtelier(id, nom, dateDebut, dateFin, organisateur, idCalendar);
    res.status(200).json({ message: "Atelier mis à jour avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'atelier", error: err.message });
  }
};

export const deleteAtelier = async (req, res) => {
  try {
    const { id } = req.params;

    // Log the ID of the atelier being deleted
    console.log('Deleting atelier with ID:', id);

    const results = await Atelier.deleteAtelier(id);
    if (results.affectedRows > 0) {
      res.status(200).json({ message: "Atelier supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Atelier non trouvé" });
    }
  } catch (err) {
    console.error('Error deleting atelier:', err);
    res.status(500).json({ message: "Erreur lors de la suppression de l'atelier", error: err.message });
  }
};