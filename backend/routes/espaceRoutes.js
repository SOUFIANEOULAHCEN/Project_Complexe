const express = require('express');
const router = express.Router();
const espaceController = require('../controllers/espaceController');

// CRUD Espace
router.post('/espaces', espaceController.createEspace); // Ajouter un espace (Admin)
router.get('/espaces', espaceController.getAllEspaces); // Lister tous les espaces (public)
router.get('/espaces/:id', espaceController.getEspaceById); // Consulter un espace
router.put('/espaces/:id', espaceController.updateEspace); // Modifier un espace (Admin)
router.delete('/espaces/:id', espaceController.deleteEspace); // Supprimer un espace (Admin ou SuperAdmin)

module.exports = router;
