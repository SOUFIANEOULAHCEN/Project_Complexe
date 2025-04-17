import jwt from 'jsonwebtoken';

// Générer un token JWT
export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    typeUser: user.typeUser
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

// Générer un token de rafraîchissement
export const generateRefreshToken = (user) => {
  const payload = {
    id: user.id
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
};