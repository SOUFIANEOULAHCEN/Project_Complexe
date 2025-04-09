import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Spaces = () => {
  const [spaces, setSpaces] = useState([
    {
      id: 1,
      name: 'Salle Polyvalente',
      capacity: 50,
      location: 'Bâtiment A, RDC',
      status: 'Disponible'
    },
    {
      id: 2,
      name: 'Espace Exposition',
      capacity: 100,
      location: 'Bâtiment B, 1er étage',
      status: 'Réservé'
    },
    {
      id: 3,
      name: 'Studio Artistique',
      capacity: 15,
      location: 'Bâtiment C, 2ème étage',
      status: 'En maintenance'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSpace, setCurrentSpace] = useState(null);

  const handleAddSpace = () => {
    setCurrentSpace(null);
    setIsModalOpen(true);
  };

  const handleEditSpace = (space) => {
    setCurrentSpace(space);
    setIsModalOpen(true);
  };

  const handleDeleteSpace = (id) => {
    setSpaces(spaces.filter(space => space.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Espaces</h1>
        <button
          onClick={handleAddSpace}
          className="flex items-center px-4 py-2 bg-[#824B26] text-white rounded-lg hover:bg-[#A65C33] transition-colors"
        >
          <FiPlus className="mr-2" />
          Ajouter un espace
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <motion.div
            key={space.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className={`h-2 ${space.status === 'Disponible' ? 'bg-green-500' : space.status === 'Réservé' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-800">{space.name}</h2>
                <span className={`px-2 py-1 text-xs rounded-full ${space.status === 'Disponible' ? 'bg-green-100 text-green-800' : space.status === 'Réservé' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {space.status}
                </span>
              </div>
              
              <div className="mt-4 space-y-2 text-gray-600">
                <div className="flex items-center">
                  <FiMapPin className="mr-2" />
                  <span>{space.location}</span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="mr-2" />
                  <span>Capacité: {space.capacity} personnes</span>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => handleEditSpace(space)}
                  className="p-2 text-gray-500 hover:text-[#824B26] rounded-full hover:bg-gray-100"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDeleteSpace(space.id)}
                  className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-100"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal pour ajouter/modifier un espace */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold mb-4">
              {currentSpace ? 'Modifier Espace' : 'Nouvel Espace'}
            </h2>
            
            <form>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    defaultValue={currentSpace?.name || ''}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacité</label>
                  <input
                    type="number"
                    defaultValue={currentSpace?.capacity || ''}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Localisation</label>
                  <input
                    type="text"
                    defaultValue={currentSpace?.location || ''}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Statut</label>
                  <select
                    defaultValue={currentSpace?.status || 'Disponible'}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="Disponible">Disponible</option>
                    <option value="Réservé">Réservé</option>
                    <option value="En maintenance">En maintenance</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#824B26] text-white rounded-lg hover:bg-[#A65C33]"
                >
                  {currentSpace ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Spaces;