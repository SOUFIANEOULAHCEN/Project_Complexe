import { useState } from 'react';
import { 
  FiCalendar as CalendarIcon,
  FiPlus as PlusIcon
} from 'react-icons/fi';

const Events = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [events, setEvents] = useState([
    { id: 1, name: 'Conférence Tech', type: 'Conférence', date: '2023-06-15', location: 'Salle Principale' },
    { id: 2, name: 'Exposition Art', type: 'Exposition', date: '2023-06-20', location: 'Galerie' },
  ]);

  const [workshops, setWorkshops] = useState([
    { id: 1, name: 'Atelier Photographie', date: '2023-06-18', instructor: 'Alice Dupont' },
  ]);

  const [spaces, setSpaces] = useState([
    { id: 1, name: 'Salle de Conférence A', date: '2023-06-15', equipment: 'Projecteur, Tableau Blanc' },
  ]);

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <CalendarIcon className="h-6 w-6 text-[#824B26] mr-2" />
          Gestion des Événements
        </h1>
        <button 
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-[#824B26] text-white rounded-md hover:bg-[#A56B3A] transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter {activeTab === 'events' ? 'Événement' : activeTab === 'workshops' ? 'Atelier' : 'Espace'}
        </button>
      </div>

      {/* Onglets */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 font-medium ${activeTab === 'events' ? 'text-[#824B26] border-b-2 border-[#824B26]' : 'text-gray-500 hover:text-[#824B26]'}`}
        >
          Événements
        </button>
        <button
          onClick={() => setActiveTab('workshops')}
          className={`px-4 py-2 font-medium ${activeTab === 'workshops' ? 'text-[#824B26] border-b-2 border-[#824B26]' : 'text-gray-500 hover:text-[#824B26]'}`}
        >
          Ateliers
        </button>
        <button
          onClick={() => setActiveTab('spaces')}
          className={`px-4 py-2 font-medium ${activeTab === 'spaces' ? 'text-[#824B26] border-b-2 border-[#824B26]' : 'text-gray-500 hover:text-[#824B26]'}`}
        >
          Espaces
        </button>
      </div>

      {/* Contenu */}
      {activeTab === 'events' && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lieu</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'workshops' && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructeur</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workshops.map((workshop) => (
                <tr key={workshop.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{workshop.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{workshop.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{workshop.instructor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'spaces' && (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Équipement</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {spaces.map((space) => (
                <tr key={space.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{space.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{space.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{space.equipment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Ajouter {activeTab === 'events' ? 'un Événement' : activeTab === 'workshops' ? 'un Atelier' : 'un Espace'}
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#824B26] focus:border-[#824B26]"
                  required
                />
              </div>
              
              {activeTab === 'events' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#824B26] focus:border-[#824B26]">
                      <option>Conférence</option>
                      <option>Exposition</option>
                      <option>Spectacle</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#824B26] focus:border-[#824B26]"
                      required
                    />
                  </div>
                </>
              )}

              {activeTab === 'workshops' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructeur</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#824B26] focus:border-[#824B26]"
                    required
                  />
                </div>
              )}

              {activeTab === 'spaces' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Équipement</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#824B26] focus:border-[#824B26]"
                    required
                  />
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#824B26] focus:border-[#824B26]"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#824B26] text-white rounded-md text-sm font-medium hover:bg-[#A56B3A]"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;