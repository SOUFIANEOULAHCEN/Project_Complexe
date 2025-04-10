// middleware/auth.js
import jwt from "jsonwebtoken";

/* -------------------------------------------------------------------------- */
/*                                      Lire le token depuis l’en-tête Authorization

                                          Vérifier s’il est valide

                                        Ajouter les infos utilisateur dans req.user si tout est OK                                     */
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token." });
    req.user = user; // { id, typeUser, email }
    next();
  });
};








// import { authenticateToken } from '../middleware/auth.js';

// router.get('/profile', authenticateToken, (req, res) => {
//   res.json({ user: req.user });
// });
