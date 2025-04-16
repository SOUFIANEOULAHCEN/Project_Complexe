import actualiteModel from '../models/actualiteModel.js';

const actualiteController = {
  // Create an actualité
  createActualite: async (req, res) => {
    try {
      const { titre, contenu, datePublication } = req.body;

      // Check that all fields are provided
      if (!titre || !contenu || !datePublication) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Ensure datePublication is in valid format (YYYY-MM-DD)
      const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegEx.test(datePublication)) {
        return res.status(400).json({ message: 'Invalid publication date. Expected format: YYYY-MM-DD' });
      }

      const results = await actualiteModel.createActualite(titre, contenu, datePublication);
      res.status(201).json({ message: 'Actualité created successfully', data: results });
    } catch (err) {
      res.status(500).json({ message: 'Error creating actualité', error: err });
    }
  },

  // Retrieve all actualités
  getAllActualites: async (req, res) => {
    try {
      const results = await actualiteModel.getAllActualites();
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving actualités', error: err });
    }
  },

  // Retrieve an actualité by ID
  getActualiteById: async (req, res) => {
    try {
      const id = req.params.id;
      const results = await actualiteModel.getActualiteById(id);
      if (results.length === 0) {
        res.status(404).json({ message: 'Actualité not found' });
      } else {
        res.status(200).json({ data: results[0] });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving actualité', error: err });
    }
  },

  // Update an actualité
  updateActualite: async (req, res) => {
    try {
      const { titre, contenu, datePublication } = req.body;
      const id = req.params.id;

      if (!titre || !contenu || !datePublication) {
        return res.status(400).json({ message: 'All fields are required for update' });
      }

      const results = await actualiteModel.updateActualite(id, titre, contenu, datePublication);
      res.status(200).json({ message: 'Actualité updated successfully', data: results });
    } catch (err) {
      res.status(500).json({ message: 'Error updating actualité', error: err });
    }
  },

  // Delete an actualité
  deleteActualite: async (req, res) => {
    try {
      const id = req.params.id;
      await actualiteModel.deleteActualite(id);
      res.status(200).json({ message: 'Actualité deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting actualité', error: err });
    }
  }
};

export default actualiteController;