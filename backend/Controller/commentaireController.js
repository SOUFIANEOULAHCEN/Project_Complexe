import db from "../config/db.js";


// Ajouter un commentaire
export const ajouterCommentaire = async (req, res) => {
  const { contenu, idUtilisateur, idEvenement, note } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO commentaire (contenu, idUtilisateur, idEvenement, note) VALUES (?, ?, ?, ?)",
      [contenu, idUtilisateur, idEvenement, note]
    );
    res.status(201).json({
      message: "Commentaire ajouté avec succès",
      commentaireId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'ajout du commentaire" });
  }
};

// Afficher les commentaires d'un événement
export const getCommentairesByEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute("SELECT * FROM commentaire WHERE idEvenement = ?", [id]);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des commentaires" });
  }
};

// Supprimer un commentaire (Admin/SuperAdmin)
export const deleteCommentaire = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute("DELETE FROM commentaire WHERE idCommentaire = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la suppression du commentaire" });
  }
};