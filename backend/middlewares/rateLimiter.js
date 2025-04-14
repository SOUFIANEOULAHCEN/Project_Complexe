// middleware/rateLimiter.js
// Ce middleware va limiter le nombre de requêtes vers les endpoints sensibles comme /login, /register, /forgot-password, etc.


import rateLimit from 'express-rate-limit';

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  // max: 10, // max 10 requêtes par IP pendant 15 min
  max: 1000,
  message: 'Trop de tentatives. Réessayez plus tard.',
  standardHeaders: true,
  legacyHeaders: false,
});









// import { authRateLimiter } from '../middleware/rateLimiter.js';

// router.post('/login', authRateLimiter, login);
// router.post('/register', authRateLimiter, register);
