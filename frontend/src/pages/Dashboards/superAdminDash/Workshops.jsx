import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiPlus, FiEdit2, FiTrash2, FiClock, FiUser } from 'react-icons/fi';

const Workshops = () => {
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      nom: 'Atelier de Peinture',
      dateDebut: '2023-04-15',
      dateFin: '2023-04-17',
      organisateur: 'Fatima Zahra',
      participants: 12,
      statut: 'actif'
    },
    {
      id: 2,
      nom: 'Initiation au Cinéma',
      dateDebut: '2023-04-20',
      dateFin: '2023-04-22',
      organisateur: 'Mohamed Ali',
      participants: 8,
      statut: 'actif'
    },
    {
      id: 3,
      nom: 'Artisanat Traditionnel',
      dateDebut: '2023-03-10',
      dateFin: '2023-03-12',
      organisateur: 'Amina Berrada',
      participants: 15,
      statut: 'terminé'
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    dateDebut: '',
    dateFin: '',
    organisateur: '',
    description: ''
  });

  const handleAddWorkshop = () => {
    setFormData({
      nom: '',
      dateDebut: '',
      dateFin: '',
      organisateur: '',
      description: ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWorkshop = {
      id: workshops.length + 1,
      nom: formData.nom,
      dateDebut: formData.dateDebut,
      dateFin: formData.dateFin,
      organisateur: formData.organisateur,
      participants: 0,
      statut: 'actif'
    };
    setWorkshops([...workshops, newWorkshop]);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setWorkshops(workshops.filter(workshop => workshop.id !== id));
  };

  const formatDate = (dateStr) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Ateliers</h2>
        <button
          onClick={handleAddWorkshop}
          className="flex items-center px-4 py-2 text-white bg-[#824B26] rounded-lg hover:bg-[#A65C33] transition-colors"
        >
          <FiPlus className="mr-2" />
          Ajouter Atelier
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workshops.map((workshop) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={workshop.id} 
            className={`p-6 rounded-xl shadow-md ${workshop.statut === 'terminé' ? 'bg-gray-100' : 'bg-white'}`}
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-semibold text-[#824B26]">{workshop.nom}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${workshop.statut === 'actif' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                {workshop.statut}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-600">
                <FiClock className="mr-2" />
                <span>{formatDate(workshop.dateDebut)} - {formatDate(workshop.dateFin)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiUser className="mr-2" />
                <span>Organisateur: {workshop.organisateur}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FiUser className="mr-2" />
                <span>Participants: {workshop.participants}</span>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button className="p-2 text-gray-500 rounded-full hover:bg-gray-200">
                <FiEdit2 size={16} />
              </button>
              <button 
                onClick={() => handleDelete(workshop.id)}
                className="p-2 text-gray-500 rounded-full hover:bg-red-100 hover:text-red-500"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Ajout Atelier */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 bg-white rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#824B26]">Ajouter un Atelier</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Nom de l'atelier</label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => setFormData({...formData, nom: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Date de début</label>
                    <input
                      type="date"
                      value={formData.dateDebut}
                      onChange={(e) => setFormData({...formData, dateDebut: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Date de fin</label>
                    <input
                      type="date"
                      value={formData.dateFin}
                      onChange={(e) => setFormData({...formData, dateFin: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Organisateur</label>
                  <input
                    type="text"
                    value={formData.organisateur}
                    onChange={(e) => setFormData({...formData, organisateur: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-[#824B26] rounded-lg hover:bg-[#A65C33]"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Workshops;