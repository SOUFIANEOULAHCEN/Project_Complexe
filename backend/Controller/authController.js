// controllers/authController.js
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../config/jwt.js";
import transporter from "../config/mailer.js";
import {
  findUserByEmail,
  createUser,
  saveResetToken,
  findByResetToken,
  updateUserPassword,
  clearResetToken,
} from "../models/User.js";

export const register = async (req, res) => {
  const { nom, email, password, typeUser } = req.body;

  if (!nom || !email || !password || !typeUser) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ message: "Utilisateur déjà inscrit." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await createUser({
    nom,
    email,
    password: hashedPassword,
    typeUser,
  });

  res.status(201).json({ message: "Utilisateur créé avec succès", userId });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: "Mot de passe incorrect" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Configurer les cookies sécurisés
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'developement',
    sameSite: 'lax',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'developement',
    sameSite: 'lax',
    // maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    maxAge: 15 * 60 * 1000 
  });

  // Renvoyer les informations utilisateur sans données sensibles
  const { password: _, ...userInfo } = user;
  res.json({
    user: userInfo,
    message: "Connexion réussie"
  });
};

export const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: "Déconnexion réussie" });
};
// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { userId: user._id, typeUser: user.typeUser },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1h",
//       }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "development",
//       // maxAge: 3600000, // 1 hour
//       maxAge: 1000 * 60, // 1 minute
//     });

//     res.json({
//       user: { id: user._id, email: user.email, typeUser: user.typeUser },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const logout = (req, res) => {
//   res.clearCookie("token");
//   res.json({ message: "Logged out" });
// };
export const refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken(decoded);
    res.json({ accessToken });
  } catch (err) {
    res.sendStatus(403);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ message: "Email non trouvé" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  await saveResetToken(email, resetToken);

  const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await transporter.sendMail({
    to: email,
    subject: "Réinitialisation de mot de passe",
    html: `<p>Cliquez ici pour réinitialiser votre mot de passe : <a href="${resetURL}">${resetURL}</a></p>`,
  });

  res.json({ message: "Email de réinitialisation envoyé" });
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await findByResetToken(token);
  if (!user) return res.status(400).json({ message: "Token invalide" });

  const hashed = await bcrypt.hash(password, 10);
  await updateUserPassword(user.id, hashed);
  await clearResetToken(user.id);

  res.json({ message: "Mot de passe réinitialisé avec succès" });
};
