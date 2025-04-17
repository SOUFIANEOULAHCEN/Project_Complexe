import express from 'express';
import { getAllTalents } from '../Controller/talentController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.use(verifyToken);

// Get all talents
router.get('/', getAllTalents);

export default router;