// middleware/auth.js
import jwt from "jsonwebtoken";

/* -------------------------------------------------------------------------- */
/*                                      Lire le token depuis l'en-tête Authorization

                                          Vérifier s'il est valide

                                        Ajouter les infos utilisateur dans req.user si tout est OK                                     */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide" });
  }
};

export const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Accès non autorisé" });
    }

    if (!roles.includes(req.user.typeUser)) {
      return res.status(403).json({ message: "Permission refusée" });
    }

    next();
  };
};

// import { authenticateToken } from '../middleware/auth.js';

// router.get('/profile', authenticateToken, (req, res) => {
//   res.json({ user: req.user });
// });
