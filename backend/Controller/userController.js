import { findUserById, updateUser, deleteUser, getAllUsers, updateUserPassword, createUser } from '../models/User.js';

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
    const { id, nom, email, status } = req.body;
    const currentUser = req.user;

    // Vérifier que l'utilisateur existe
    const userToUpdate = await findUserById(id);
    if (!userToUpdate) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier que l'utilisateur n'est pas un admin
    if (userToUpdate.typeUser === 'admin' || userToUpdate.typeUser === 'superadmin') {
      return res.status(403).json({ message: "Vous ne pouvez pas modifier un administrateur" });
    }

    // Mettre à jour uniquement les champs autorisés
    const updateData = {};
    if (nom) updateData.nom = nom;
    if (email) updateData.email = email;
    if (status) updateData.status = status;

    await updateUser(id, updateData);
    
    const updatedUser = await findUserById(id);
    const { password, ...userProfile } = updatedUser;
    
    res.json(userProfile);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.body.id; // Utiliser l'ID de l'utilisateur à supprimer
    const currentUser = req.user; // L'utilisateur connecté (admin)

    // Vérifier que l'utilisateur à supprimer n'est pas un admin
    const userToDelete = await findUserById(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (userToDelete.typeUser === 'admin' || userToDelete.typeUser === 'superadmin') {
      return res.status(403).json({ message: "Vous ne pouvez pas supprimer un administrateur" });
    }

    await deleteUser(userId);
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

export const getAllUsersList = async (req, res) => {
  try {
    const users = await getAllUsers();
    // Ne pas renvoyer les mots de passe
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPasswords);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Vérifier l'ancien mot de passe
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Ici, vous devriez vérifier si currentPassword correspond au mot de passe actuel
    // Cette vérification dépend de votre système d'authentification
    // const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Mot de passe actuel incorrect" });
    // }

    await updateUserPassword(userId, newPassword);
    res.json({ message: "Mot de passe mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du changement de mot de passe" });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { image } = req.body;

    await updateUser(userId, { image });
    const updatedUser = await findUserById(userId);
    const { password, ...userProfile } = updatedUser;
    
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'image" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { nom, email, password, status } = req.body;

    // Vérification des champs requis
    if (!nom || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Créer l'utilisateur avec le type 'user'
    const newUser = await createUser({
      nom,
      email,
      password,
      typeUser: 'user',
      status: status || 'active'
    });

    // Ne pas renvoyer le mot de passe dans la réponse
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 11000) { // Code MongoDB pour violation d'unicité
      res.status(400).json({ message: "Cet email est déjà utilisé" });
    } else {
      res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
  }
}; 