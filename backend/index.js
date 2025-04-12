import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./Routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import commentaireRoutes from "./Routes/commentaireRoutes.js";
import newsletterRoutes from "./Routes/newsletterRoutes.js";


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
app.use("/api/commentaires", commentaireRoutes);
app.use('/api/newsletter', newsletterRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("API Auth  et Commentaires OK");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
