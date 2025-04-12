import { createNewsletter, getNewsletters } from "../models/newsletterModel.js";

// POST - Ajouter
export const ajouterNewsletter = async (req, res) => {
  const { contenu, dateEnvoi } = req.body;

  if (!contenu || !dateEnvoi) {
    return res.status(400).json({ error: "Champs obligatoires manquants" });
  }

  try {
    const result = await createNewsletter(contenu, dateEnvoi);
    res.status(201).json({ message: "Newsletter ajoutée", id: result.insertId });
  } catch (err) {
    console.error("Erreur ajout :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// GET - Lister
export const listerNewsletters = async (req, res) => {
  try {
    const newsletters = await getNewsletters();
    res.status(200).json(newsletters);
  } catch (err) {
    console.error("Erreur récupération :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
