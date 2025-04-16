import express from "express";
import {
  ajouterNewsletter,
  listerNewsletters,
} from "../Controller/newsletterController.js";

import { verifyToken, checkRole } from "../middlewares/auth.js";
const router = express.Router();

router.use(verifyToken);

router.post("/", ajouterNewsletter);
router.get("/", listerNewsletters);

export default router;
