import { 
    createEspace as createEspaceModel,
    getAllEspaces as getAllEspacesModel,
    getEspaceById as getEspaceByIdModel,
    updateEspace as updateEspaceModel,
    deleteEspace as deleteEspaceModel
} from '../models/espaceModel.js';

export const createEspace = async (req, res) => {
    try {
        const { nom, dateDebut, dateFin, organisateur, idCalendar } = req.body;

        // Validation des données
        if (!nom || !dateDebut || !dateFin || !organisateur) {
            return res.status(400).json({ message: 'Tous les champs requis doivent être remplis' });
        }

        const result = await createEspaceModel(nom, dateDebut, dateFin, organisateur, idCalendar);
        res.status(201).json({ 
            message: 'Espace créé avec succès',
            data: { id: result.insertId, nom, dateDebut, dateFin, organisateur, idCalendar }
        });
    } catch (err) {
        console.error('Erreur lors de la création de l\'espace:', err);
        res.status(500).json({ message: 'Erreur lors de la création de l\'espace' });
    }
};

export const getAllEspaces = async (req, res) => {
    try {
        const espaces = await getAllEspacesModel();
        res.status(200).json(espaces);
    } catch (err) {
        console.error('Erreur lors de la récupération des espaces:', err);
        res.status(500).json({ message: 'Erreur lors de la récupération des espaces' });
    }
};

export const getEspaceById = async (req, res) => {
    try {
        const id = req.params.id;
        const [espace] = await getEspaceByIdModel(id);
        
        if (!espace) {
            return res.status(404).json({ message: 'Espace non trouvé' });
        }

        res.status(200).json(espace);
    } catch (err) {
        console.error('Erreur lors de la récupération de l\'espace:', err);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'espace' });
    }
};

export const updateEspace = async (req, res) => {
    try {
        const id = req.params.id;
        const { nom, dateDebut, dateFin, organisateur, idCalendar } = req.body;

        // Vérifier si l'espace existe
        const [existingEspace] = await getEspaceByIdModel(id);
        if (!existingEspace) {
            return res.status(404).json({ message: 'Espace non trouvé' });
        }

        // Validation des données
        if (!nom || !dateDebut || !dateFin || !organisateur) {
            return res.status(400).json({ message: 'Tous les champs requis doivent être remplis' });
        }

        await updateEspaceModel(id, nom, dateDebut, dateFin, organisateur, idCalendar);
        res.status(200).json({ 
            message: 'Espace mis à jour avec succès',
            data: { id, nom, dateDebut, dateFin, organisateur, idCalendar }
        });
    } catch (err) {
        console.error('Erreur lors de la mise à jour de l\'espace:', err);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'espace' });
    }
};

export const deleteEspace = async (req, res) => {
    try {
        const id = req.params.id;

        // Vérifier si l'espace existe
        const [existingEspace] = await getEspaceByIdModel(id);
        if (!existingEspace) {
            return res.status(404).json({ message: 'Espace non trouvé' });
        }

        await deleteEspaceModel(id);
        res.status(200).json({ message: 'Espace supprimé avec succès' });
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'espace:', err);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'espace' });
    }
};