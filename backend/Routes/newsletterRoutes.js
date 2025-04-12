import express from "express";
import { ajouterNewsletter, listerNewsletters } from "../Controller/newsletterController.js";

const router = express.Router();

router.post("/", ajouterNewsletter);
router.get("/", listerNewsletters);

export default router;
