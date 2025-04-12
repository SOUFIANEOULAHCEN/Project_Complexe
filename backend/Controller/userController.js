import { findUserById, updateUser } from '../models/User.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    // Ne pas renvoyer le mot de passe
    const { password, ...userProfile } = user;
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { nom, email } = req.body;
    const userId = req.user.id;

    await updateUser(userId, { nom, email });
    
    const updatedUser = await findUserById(userId);
    const { password, ...userProfile } = updatedUser;
    
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
}; 