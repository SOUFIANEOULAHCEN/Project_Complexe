const express = require('express');
const router = express.Router();
const atelierController = require('../controllers/atelierController');

// CRUD Atelier
router.post('/ateliers', atelierController.createAtelier); // Ajouter un atelier (Admin)
router.get('/ateliers', atelierController.getAllAteliers); // Lister tous les ateliers (public)
router.get('/ateliers/:id', atelierController.getAtelierById); // Consulter un atelier
router.put('/ateliers/:id', atelierController.updateAtelier); // Modifier un atelier (Admin)
router.delete('/ateliers/:id', atelierController.deleteAtelier); // Supprimer un atelier (Admin ou SuperAdmin)

module.exports = router;
