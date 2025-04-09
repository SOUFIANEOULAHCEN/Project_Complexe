import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiPlus, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    { 
      id: '1', 
      type: 'event', 
      title: 'Festival du Film', 
      date: '2023-04-15', 
      location: 'Centre Culturel',
      color: '#824B26'
    },
    { 
      id: '2', 
      type: 'workshop', 
      title: 'Atelier Peinture', 
      date: '2023-04-20', 
      location: 'Salle des Arts',
      color: '#A65C33'
    },
    { 
      id: '3', 
      type: 'space', 
      title: 'Salle Conférence', 
      date: '2023-04-25', 
      location: 'Bâtiment Principal',
      color: '#C97D4E'
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'event',
    title: '',
    date: '',
    location: '',
    description: ''
  });

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const newDate = result.destination.droppableId;
    const eventId = result.draggableId;
    
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, date: newDate } : event
    ));
  };

  const renderDays = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const totalDays = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);
    const days = [];

    // Jours vides au début
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    // Jours du mois
    for (let i = 1; i <= totalDays; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayEvents = events.filter(event => event.date === dateStr);
      
      days.push(
        <Droppable key={dateStr} droppableId={dateStr}>
          {(provided) => (
            <div 
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`h-24 p-1 border border-gray-200 ${dayEvents.length > 0 ? 'bg-gray-50' : ''}`}
            >
              <div className="flex justify-between">
                <span className="text-sm font-medium">{i}</span>
                {dayEvents.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                )}
              </div>
              
              <div className="space-y-1 mt-1">
                {dayEvents.map((event, index) => (
                  <Draggable key={event.id} draggableId={event.id} index={index}>
                    {(provided) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        whileHover={{ scale: 1.02 }}
                        className={`p-1 text-xs rounded truncate text-white`}
                        style={{ 
                          backgroundColor: event.color,
                          ...provided.draggableProps.style 
                        }}
                      >
                        {event.title}
                      </motion.div>
                    )}
                  </Draggable>
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddEvent = () => {
    setFormData({
      type: 'event',
      title: '',
      date: '',
      location: '',
      description: ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const color = {
      event: '#824B26',
      workshop: '#A65C33',
      space: '#C97D4E'
    }[formData.type];
    
    const newEvent = {
      id: Date.now().toString(),
      ...formData,
      color
    };
    
    setEvents([...events, newEvent]);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const getEventTypeName = (type) => {
    return {
      event: 'Événement',
      workshop: 'Atelier',
      space: 'Espace'
    }[type];
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Calendrier des Réservations</h2>
          <button
            onClick={handleAddEvent}
            className="flex items-center px-4 py-2 text-white bg-[#824B26] rounded-lg hover:bg-[#A65C33] transition-colors"
          >
            <FiPlus className="mr-2" />
            Ajouter
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Calendrier */}
          <div className="p-6 bg-white rounded-xl shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-[#824B26]">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <div className="flex space-x-2">
                <button 
                  onClick={handlePrevMonth}
                  className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                >
                  <FiChevronLeft />
                </button>
                <button 
                  onClick={handleNextMonth}
                  className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day) => (
                <div key={day} className="p-2 text-center font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {renderDays()}
            </div>
          </div>

          {/* Liste des événements */}
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="mb-6 text-xl font-semibold text-[#824B26]">Réservations</h3>
            <div className="space-y-4">
              {events.length === 0 ? (
                <p className="text-gray-500">Aucune réservation</p>
              ) : (
                events.map(event => (
                  <motion.div 
                    whileHover={{ x: 5 }}
                    key={event.id} 
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center">
                          <span 
                            className="w-3 h-3 mr-2 rounded-full" 
                            style={{ backgroundColor: event.color }}
                          ></span>
                          <h4 className="font-medium text-gray-800">{event.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">
                          {getEventTypeName(event.type)} • {new Date(event.date).toLocaleDateString('fr-FR')}
                        </p>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleDelete(event.id)}
                          className="p-1 text-gray-500 hover:text-red-500"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Modal Ajout */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md p-6 bg-white rounded-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#824B26]">Nouvelle Réservation</h3>
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
                    <label className="block mb-1 text-sm font-medium text-gray-700">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    >
                      <option value="event">Événement</option>
                      <option value="workshop">Atelier</option>
                      <option value="space">Espace</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Titre</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Lieu</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
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
    </DragDropContext>
  );
};

export default Calendar;