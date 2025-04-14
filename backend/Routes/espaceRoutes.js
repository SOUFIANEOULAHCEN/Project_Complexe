import express from 'express';
import { 
    createEspace, 
    getAllEspaces, 
    getEspaceById, 
    updateEspace, 
    deleteEspace 
} from '../Controller/espaceController.js';
import { verifyToken, checkRole } from '../middlewares/auth.js';

const router = express.Router();

// CRUD Espace
router.post('/espaces', verifyToken, checkRole(['admin', 'superadmin']), createEspace); // Ajouter un espace (Admin)
router.get('/espaces', getAllEspaces); // Lister tous les espaces (public)
router.get('/espaces/:id', getEspaceById); // Consulter un espace
router.put('/espaces/:id', verifyToken, checkRole(['admin', 'superadmin']), updateEspace); // Modifier un espace (Admin)
router.delete('/espaces/:id', verifyToken, checkRole(['admin', 'superadmin']), deleteEspace); // Supprimer un espace (Admin ou SuperAdmin)

export default router;