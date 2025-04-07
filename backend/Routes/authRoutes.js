// routes/auth.js
import express from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  refreshToken,
} from "../Controller/authController.js";
import { authRateLimiter } from "../middlewares/rateLimiter.js";

const authRoutes = express.Router();

// Auth routes
authRoutes.post("/register", authRateLimiter, register);
authRoutes.post("/login", authRateLimiter, login);
authRoutes.post("/logout", logout);
authRoutes.post("/refresh-token", refreshToken);

// Password reset
authRoutes.post("/forgot-password", authRateLimiter, forgotPassword);
authRoutes.post("/reset-password/:token", resetPassword);

export default authRoutes;
