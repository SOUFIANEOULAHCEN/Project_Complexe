const express = require('express');
const router = express.Router();
const actualiteController = require('../controllers/actualiteController');

// CRUD Actualité
router.post('/actualites', actualiteController.createActualite); // Créer une actualité (Admin ou Talent)
router.get('/actualites', actualiteController.getAllActualites); // Lister toutes les actualités
router.get('/actualites/:id', actualiteController.getActualiteById); // Consulter une actualité
router.put('/actualites/:id', actualiteController.updateActualite); // Modifier une actualité
router.delete('/actualites/:id', actualiteController.deleteActualite); // Supprimer une actualité

module.exports = router;
