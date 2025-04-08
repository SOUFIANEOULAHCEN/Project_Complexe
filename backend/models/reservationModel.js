const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  dateReservation: { type: Date, required: true },
  utilisateur: { type: String, required: true }, // ID utilisateur
  evenement: { type: String, required: true }    // ID evenement
});

module.exports = mongoose.model('Reservation', reservationSchema);
