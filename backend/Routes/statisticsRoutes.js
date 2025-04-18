import express from 'express';
import { 
  getNombreEvenementsParMois, 
  getNombreReservations, 
  getEngagementUtilisateurs, 
  exportCSV 
} from '../Controller/statisticsController.js'; 

import { verifyToken, checkRole } from "../middlewares/auth.js";
const router = express.Router();

router.use(verifyToken);

// Route pour obtenir le nombre d'événements par mois
router.get('/evenements-mois', getNombreEvenementsParMois);

// Route pour obtenir le nombre de réservations
router.get('/reservations', getNombreReservations);

// Route pour obtenir l'engagement des utilisateurs
router.get('/engagement-utilisateurs', getEngagementUtilisateurs);

// Route pour exporter en CSV (optionnel)
router.get('/export-csv', exportCSV);

export default router;