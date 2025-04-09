import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiCalendar, 
  FiStar, 
  FiMessageSquare, 
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    talents: 0,
    reservations: 0,
    comments: 0,
  });

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setStats({
        users: 1245,
        events: 42,
        talents: 87,
        reservations: 563,
        comments: 231,
      });
    }, 1000);
  }, []);

  const StatCard = ({ icon, value, label, color }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-xl shadow-md ${color} text-white border border-[rgba(255,255,255,0.2)]`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">{value}</p>
          <p className="mt-2 text-sm opacity-90">{label}</p>
        </div>
        <div className="p-3 rounded-full bg-white bg-opacity-20 border border-[rgba(255,255,255,0.3)]">
          {icon}
        </div>
      </div>
    </motion.div>
  );

  const RecentActivityItem = ({ title, description, time, icon }) => (
    <motion.div 
      whileHover={{ x: 5 }}
      className="flex p-4 border-b border-gray-200 last:border-0"
    >
      <div className="flex-shrink-0 p-3 mr-4 text-white rounded-full bg-[#824B26] border border-[#A56B3A]">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="mt-1 text-xs text-gray-500">{time}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 border-gray-200">Tableau de bord</h2>
      
      {/* Statistiques */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <StatCard 
          icon={<FiUsers className="text-[#824B26]" size={24} />} 
          value={stats.users} 
          label="Utilisateurs" 
          color="bg-[#824B26]" 
        />
        <StatCard 
          icon={<FiCalendar className="text-[#A65C33]" size={24} />} 
          value={stats.events} 
          label="Événements" 
          color="bg-[#A65C33]" 
        />
        <StatCard 
          icon={<FiStar className="text-[#C97D4E]" size={24} />} 
          value={stats.talents} 
          label="Talents" 
          color="bg-[#C97D4E]" 
        />
        <StatCard 
          icon={<FiCheckCircle className="text-[#E39F76]" size={24} />} 
          value={stats.reservations} 
          label="Réservations" 
          color="bg-[#E39F76]" 
        />
        <StatCard 
          icon={<FiMessageSquare className="text-[#F2BFA1]" size={24} />} 
          value={stats.comments} 
          label="Commentaires" 
          color="bg-[#F2BFA1]" 
        />
      </div>

      {/* Activité récente et calendrier */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Activité récente */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="mb-4 text-lg font-semibold text-gray-800 border-b pb-2 border-gray-200">Activité récente</h3>
          <div className="divide-y divide-gray-200">
            <RecentActivityItem
              icon={<FiUsers size={18} />}
              title="Nouvel utilisateur inscrit"
              description="Ahmed El Mansouri s'est inscrit en tant que talent"
              time="Il y a 10 minutes"
            />
            <RecentActivityItem
              icon={<FiCalendar size={18} />}
              title="Nouvel événement créé"
              description="Festival du Film de Ouarzazate a été programmé"
              time="Il y a 2 heures"
            />
            <RecentActivityItem
              icon={<FiMessageSquare size={18} />}
              title="Nouveau commentaire"
              description="Commentaire sur l'atelier de peinture"
              time="Il y a 5 heures"
            />
            <RecentActivityItem
              icon={<FiCheckCircle size={18} />}
              title="Réservation confirmée"
              description="15 places réservées pour la conférence sur le cinéma"
              time="Il y a 1 jour"
            />
          </div>
        </motion.div>

        {/* Calendrier */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <h3 className="mb-4 text-lg font-semibold text-gray-800 border-b pb-2 border-gray-200">Calendrier</h3>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-[#824B26]">Avril 2023</h4>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-500 hover:text-[#824B26] border border-gray-300 rounded">
                  <FiChevronLeft />
                </button>
                <button className="p-1 text-gray-500 hover:text-[#824B26] border border-gray-300 rounded">
                  <FiChevronRight />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day) => (
                <div key={day} className="text-xs font-medium text-center text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <div 
                  key={day} 
                  className={`p-2 text-center rounded-full ${day === 15 ? 'bg-[#824B26] text-white border border-[#A56B3A]' : 'hover:bg-gray-200 border border-transparent hover:border-gray-300'}`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-gray-800 border-b pb-2 border-gray-200">Événements à venir</h4>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium">15 Avril - Festival du Film</p>
              <p className="text-xs text-gray-500">10:00 - Centre Culturel</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-medium">20 Avril - Atelier Peinture</p>
              <p className="text-xs text-gray-500">14:00 - Salle des Arts</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;