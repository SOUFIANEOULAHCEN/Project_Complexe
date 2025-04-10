const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const reservationRoutes = require('./routes/reservationRoutes');

// Middleware pour parser le JSON
app.use(bodyParser.json());

// Utilisation des routes

app.use('/api', reservationRoutes);
 // Préfixe de toutes les routes avec '/api'

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
