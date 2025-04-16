import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import espaceRoutes from "./Routes/espaceRoutes.js";
import atelierRoutes from "./Routes/atelierRoutes.js";
import reservationRoutes from './Routes/reservationRoutes.js';
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

// Test route
app.get("/", (req, res) => {
  res.send("API Auth OK");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
