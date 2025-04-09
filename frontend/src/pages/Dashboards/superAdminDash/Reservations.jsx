import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiXCircle, FiUser, FiCalendar, FiSearch } from 'react-icons/fi';

const Reservations = () => {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      event: 'Festival du Film',
      user: 'Ahmed El Mansouri',
      date: '2023-04-15',
      status: 'confirmée',
      places: 2
    },
    {
      id: 2,
      event: 'Atelier Peinture',
      user: 'Fatima Zahra',
      date: '2023-04-20',
      status: 'en attente',
      places: 1
    },
    {
      id: 3,
      event: 'Concert Traditionnel',
      user: 'Karim Benjelloun',
      date: '2023-04-25',
      status: 'refusée',
      places: 4
    },
    {
      id: 4,
      event: 'Conférence Cinéma',
      user: 'Leila Alaoui',
      date: '2023-05-02',
      status: 'confirmée',
      places: 3
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('tous');

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.event.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         reservation.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'tous' || reservation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    setReservations(reservations.map(reservation => 
      reservation.id === id ? { ...reservation, status: newStatus } : reservation
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmée': return 'bg-green-100 text-green-800';
      case 'en attente': return 'bg-yellow-100 text-yellow-800';
      case 'refusée': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmée': return <FiCheckCircle />;
      case 'en attente': return <FiClock />;
      case 'refusée': return <FiXCircle />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Gestion des Réservations</h2>

      {/* Filtres */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative md:col-span-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher par événement ou utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:ring-[#824B26] focus:border-[#824B26]"
          />
        </div>
        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-[#824B26] focus:border-[#824B26]"
          >
            <option value="tous">Tous les statuts</option>
            <option value="confirmée">Confirmées</option>
            <option value="en attente">En attente</option>
            <option value="refusée">Refusées</option>
          </select>
        </div>
      </div>

      {/* Liste des réservations */}
      <div className="overflow-hidden bg-white rounded-xl shadow-sm">
        <div className="grid grid-cols-12 p-4 font-medium text-gray-700 bg-gray-50">
          <div className="col-span-4">Événement</div>
          <div className="col-span-3">Utilisateur</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-1">Places</div>
          <div className="col-span-2">Statut</div>
        </div>
        {filteredReservations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Aucune réservation trouvée
          </div>
        ) : (
          filteredReservations.map((reservation) => (
            <motion.div 
              whileHover={{ backgroundColor: 'rgba(130, 75, 38, 0.05)' }}
              key={reservation.id} 
              className="grid grid-cols-12 p-4 border-b border-gray-200 last:border-0"
            >
              <div className="col-span-4 font-medium">{reservation.event}</div>
              <div className="col-span-3 flex items-center">
                <FiUser className="mr-2 text-gray-500" />
                {reservation.user}
              </div>
              <div className="col-span-2 flex items-center">
                <FiCalendar className="mr-2 text-gray-500" />
                {new Date(reservation.date).toLocaleDateString('fr-FR')}
              </div>
              <div className="col-span-1">{reservation.places}</div>
              <div className="col-span-2">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(reservation.status)}`}>
                    {reservation.status}
                  </span>
                  <div className="flex space-x-1">
                    {reservation.status !== 'confirmée' && (
                      <button
                        onClick={() => handleStatusChange(reservation.id, 'confirmée')}
                        className="p-1 text-green-500 rounded-full hover:bg-green-100"
                        title="Confirmer"
                      >
                        <FiCheckCircle size={16} />
                      </button>
                    )}
                    {reservation.status !== 'refusée' && (
                      <button
                        onClick={() => handleStatusChange(reservation.id, 'refusée')}
                        className="p-1 text-red-500 rounded-full hover:bg-red-100"
                        title="Refuser"
                      >
                        <FiXCircle size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reservations;