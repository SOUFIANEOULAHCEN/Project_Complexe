import express from 'express';
import { verifyToken, checkRole } from '../middlewares/auth.js';
import { 
  getUserProfile, 
  updateUserProfile, 
  deleteUserProfile, 
  getAllUsersList, 
  changePassword, 
  updateProfileImage,
  registerUser
} from '../Controller/userController.js';

const userRoutes = express.Router();

// Routes protégées pour tous les utilisateurs
userRoutes.get('/profile', verifyToken, getUserProfile);
userRoutes.put('/profile', verifyToken, updateUserProfile);
userRoutes.delete('/profile', verifyToken, deleteUserProfile);
userRoutes.put('/change-password', verifyToken, changePassword);
userRoutes.put('/profile/image', verifyToken, updateProfileImage);

// Routes admin
userRoutes.get('/users', verifyToken, checkRole(['admin', 'superadmin']), getAllUsersList);
userRoutes.post('/register', verifyToken, checkRole(['admin', 'superadmin']), registerUser);

export default userRoutes; 