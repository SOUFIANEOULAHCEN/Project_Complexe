import express from "express";
import { ajouterCommentaire, getCommentairesByEvent, deleteCommentaire } from "../Controller/commentaireController.js";

const router = express.Router();

// Route pour ajouter un commentaire
router.post("/", ajouterCommentaire);

// Route pour afficher les commentaires d'un événement
router.get("/event/:id", getCommentairesByEvent);

// Route pour supprimer un commentaire (Admin/SuperAdmin)
router.delete("/:id", deleteCommentaire);

export default router;
