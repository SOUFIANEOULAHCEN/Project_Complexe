const Evenement = require("../models/Evenement");

// Récupérer tous les événements (avec pagination)
exports.getAllEvenements = (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Par défaut, page 1 et 10 éléments par page
  const offset = (page - 1) * limit;

  Evenement.getAll((err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({
      data: result.slice(offset, offset + limit), // Pagination manuelle
      total: result.length, // Total d'événements
      page,
      limit,
    });
  });
};

// Récupérer un événement par son ID
exports.getEvenementById = (req, res) => {
  const { id } = req.params;

  Evenement.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: "Événement non trouvé" });
    res.json(result[0]);
  });
};

// Créer un nouvel événement
exports.createEvenement = (req, res) => {
  const { nom, dateDebut, dateFin, lieu, description, organisateur, typeEvenement, idCalendar } = req.body;

  // Valider les données (tu peux ajouter plus de validation ici)
  if (!nom || !dateDebut || !dateFin || !lieu || !description || !organisateur || !typeEvenement || !idCalendar) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const newEvenement = {
    nom,
    dateDebut,
    dateFin,
    lieu,
    description,
    organisateur,
    typeEvenement,
    idCalendar,
  };

  Evenement.create(newEvenement, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Événement créé avec succès", idEvent: result.insertId });
  });
};

// Mettre à jour un événement existant
exports.updateEvenement = (req, res) => {
  const { id } = req.params;
  const { nom, dateDebut, dateFin, lieu, description, organisateur, typeEvenement, idCalendar } = req.body;

  // Valider les données
  if (!nom || !dateDebut || !dateFin || !lieu || !description || !organisateur || !typeEvenement || !idCalendar) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  const updatedEvenement = {
    nom,
    dateDebut,
    dateFin,
    lieu,
    description,
    organisateur,
    typeEvenement,
    idCalendar,
  };

  Evenement.update(id, updatedEvenement, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Événement non trouvé" });
    res.json({ message: "Événement mis à jour avec succès" });
  });
};

// Supprimer un événement
exports.deleteEvenement = (req, res) => {
  const { id } = req.params;

  Evenement.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Événement non trouvé" });
    res.json({ message: "Événement supprimé avec succès" });
  });
};

// Recherche d'événements
// Recherche d'événements
exports.searchEvenements = (req, res) => {
  const { search } = req.query;
  
  if (!search) {
    return res.status(400).json({ message: "Veuillez fournir un terme de recherche." });
  }

  // Recherche basique sur le nom et la description de l'événement
  Evenement.search(search, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};
