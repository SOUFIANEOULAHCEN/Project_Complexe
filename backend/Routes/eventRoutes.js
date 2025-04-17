import express from 'express';
import { getAllEvents } from '../Controller/eventController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.use(verifyToken);

// Get all events
router.get('/', getAllEvents);

export default router;