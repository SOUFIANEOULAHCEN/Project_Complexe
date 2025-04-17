import Talent from '../models/talentModel.js';

export const getAllTalents = async (req, res) => {
  try {
    const talents = await Talent.getAllTalents();
    res.status(200).json(talents);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des talents' });
  }
};