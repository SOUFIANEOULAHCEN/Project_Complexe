// import express from 'express';
// import { createAtelier, getAllAteliers, getAtelierById, updateAtelier, deleteAtelier } from '../Controller/atelierController.js';

// const router = express.Router();

// // CRUD Atelier
// router.post('/ateliers', createAtelier); // Ajouter un atelier (Admin)
// router.get('/ateliers', getAllAteliers); // Lister tous les ateliers (public)
// router.get('/ateliers/:id', getAtelierById); // Consulter un atelier
// router.put('/ateliers/:id', updateAtelier); // Modifier un atelier (Admin)
// router.delete('/ateliers/:id', deleteAtelier); // Supprimer un atelier (Admin ou SuperAdmin)

// export default router;


import express from 'express';
import { 
    createAtelier, 
    getAllAteliers, 
    getAtelierById, 
    updateAtelier, 
    deleteAtelier 
} from '../Controller/atelierController.js';
import { verifyToken, checkRole } from '../middlewares/auth.js';

const router = express.Router();

// CRUD Atelier
router.post('/ateliers', verifyToken, checkRole(['admin', 'superadmin']), createAtelier); // Ajouter un atelier (Admin)
router.get('/ateliers', getAllAteliers); // Lister tous les ateliers (public)
router.get('/ateliers/:id', getAtelierById); // Consulter un atelier
router.put('/ateliers/:id', verifyToken, checkRole(['admin', 'superadmin']), updateAtelier); // Modifier un atelier (Admin)
router.delete('/ateliers/:id', verifyToken, checkRole(['admin', 'superadmin']), deleteAtelier); // Supprimer un atelier (Admin ou SuperAdmin)

export default router;
