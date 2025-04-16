import express from "express";
import actualiteController from "../Controller/actualiteController.js";
import { verifyToken, checkRole } from "../middlewares/auth.js";

const router = express.Router();
router.use(verifyToken);
// CRUD Actualité
router.post("/actualites", actualiteController.createActualite); // Create an actualité (Admin or Talent)
router.get("/actualites", actualiteController.getAllActualites); // List all actualités
router.get("/actualites/:id", actualiteController.getActualiteById); // View an actualité
router.put("/actualites/:id", actualiteController.updateActualite); // Update an actualité
router.delete("/actualites/:id", actualiteController.deleteActualite); // Delete an actualité

export default router;
