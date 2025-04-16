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

router.post('/ateliers', verifyToken, checkRole(['admin', 'superadmin']), createAtelier);
router.get('/ateliers', verifyToken, getAllAteliers);
router.get('/ateliers/:id', verifyToken, getAtelierById);
router.put('/ateliers/:id', verifyToken, checkRole(['admin', 'superadmin']), updateAtelier);
router.delete('/ateliers/:id', verifyToken, checkRole(['admin', 'superadmin']), deleteAtelier);

export default router;
