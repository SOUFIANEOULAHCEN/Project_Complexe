import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import espaceRoutes from "./Routes/espaceRoutes.js";
import atelierRoutes from "./Routes/atelierRoutes.js";
import reservationRoutes from './Routes/reservationRoutes.js';
import actualiteRoutes from "./Routes/actualiteRoutes.js";
import newsletterRoutes from "./Routes/newsletterRoutes.js"; // Import newsletter routes
import statisticsRoutes from "./Routes/statisticsRoutes.js"; // Import statistics routes
import commentaireRoutes from "./Routes/commentaireRoutes.js"; // Import commentaire routes
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// DB connection
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/espaces", espaceRoutes);
app.use("/api/ateliers", atelierRoutes);
app.use('/api/reservations', reservationRoutes);
app.use("/api/actualites", actualiteRoutes);
app.use("/api/newsletters", newsletterRoutes); // Add the daddy route for newsletters
app.use("/api/statistics", statisticsRoutes); // Add the daddy route for statistics
app.use("/api/commentaires", commentaireRoutes); // Add the daddy route for commentaires

// Test route
app.get("/", (req, res) => {
  res.send("API Auth OK");
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue sur le serveur' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
