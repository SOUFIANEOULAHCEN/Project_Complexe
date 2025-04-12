import express from 'express';
import { verifyToken, checkRole } from '../middlewares/auth.js';
import { getUserProfile, updateUserProfile } from '../Controller/userController.js';

const userRoutes = express.Router();

// Routes protégées
userRoutes.get('/profile', verifyToken, getUserProfile);
userRoutes.put('/profile', verifyToken, updateUserProfile);

// Routes admin
userRoutes.get('/users', verifyToken, checkRole(['admin', 'superadmin']), (req, res) => {
  // Liste des utilisateurs pour les admins
});

export default userRoutes; 