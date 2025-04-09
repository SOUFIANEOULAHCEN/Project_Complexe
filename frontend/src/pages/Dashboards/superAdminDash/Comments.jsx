import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiUser, FiCalendar, FiThumbsUp, FiThumbsDown, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      content: 'Très bel événement, organisation impeccable!',
      user: 'Ahmed El Mansouri',
      date: '2023-04-10',
      event: 'Festival du Film',
      rating: 5,
      status: 'approuvé'
    },
    {
      id: 2,
      content: 'L\'atelier était intéressant mais un peu court à mon goût.',
      user: 'Fatima Zahra',
      date: '2023-04-05',
      event: 'Atelier Peinture',
      rating: 3,
      status: 'en attente'
    },
    {
      id: 3,
      content: 'Le talent de ce jeune musicien est incroyable!',
      user: 'Karim Benjelloun',
      date: '2023-03-28',
      event: 'Concert des Jeunes Talents',
      rating: 5,
      status: 'approuvé'
    },
    {
      id: 4,
      content: 'Contenu inapproprié et insultant.',
      user: 'Anonyme',
      date: '2023-03-15',
      event: 'Conférence Cinéma',
      rating: 1,
      status: 'rejeté'
    }
  ]);
  const [filter, setFilter] = useState('tous');

  const filteredComments = comments.filter(comment => {
    if (filter === 'tous') return true;
    return comment.status === filter;
  });

  const handleStatusChange = (id, newStatus) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, status: newStatus } : comment
    ));
  };

  const handleDelete = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approuvé': return 'bg-green-100 text-green-800';
      case 'en attente': return 'bg-yellow-100 text-yellow-800';
      case 'rejeté': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Gestion des Commentaires</h2>
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-[#824B26] focus:border-[#824B26]"
          >
            <option value="tous">Tous les commentaires</option>
            <option value="approuvé">Approuvés</option>
            <option value="en attente">En attente</option>
            <option value="rejeté">Rejetés</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Aucun commentaire trouvé
          </div>
        ) : (
          filteredComments.map((comment) => (
            <motion.div 
              whileHover={{ scale: 1.01 }}
              key={comment.id} 
              className="p-6 bg-white rounded-xl shadow-sm"
            >
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 mr-3 text-white rounded-full bg-[#824B26]">
                    <FiUser />
                  </div>
                  <div>
                    <h3 className="font-medium">{comment.user}</h3>
                    <p className="text-sm text-gray-500">
                      <FiCalendar className="inline mr-1" />
                      {new Date(comment.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(comment.status)}`}>
                    {comment.status}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-gray-700">{comment.content}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Événement: <span className="font-medium">{comment.event}</span>
                  </p>
                  {renderStars(comment.rating)}
                </div>
                
                <div className="flex space-x-2">
                  {comment.status !== 'approuvé' && (
                    <button
                      onClick={() => handleStatusChange(comment.id, 'approuvé')}
                      className="p-2 text-green-500 rounded-full hover:bg-green-100"
                      title="Approuver"
                    >
                      <FiCheck size={18} />
                    </button>
                  )}
                  {comment.status !== 'rejeté' && (
                    <button
                      onClick={() => handleStatusChange(comment.id, 'rejeté')}
                      className="p-2 text-red-500 rounded-full hover:bg-red-100"
                      title="Rejeter"
                    >
                      <FiX size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                    title="Supprimer"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;