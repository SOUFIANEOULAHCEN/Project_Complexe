const express = require('express');
// Importation des routes
const reservationRoutes = require('./routes/reservationRoutes');
const espaceRoutes = require('./routes/espaceRoutes');
const atelierRoutes = require('./routes/atelierRoutes');
const actualiteRoutes = require('./routes/actualiteRoutes');


const app = express();


const bodyParser = require('body-parser');



// Middleware pour parser le JSON
app.use(bodyParser.json());

// Utilisation des routes avec préfixe '/api'
app.use('/api', reservationRoutes); // => /api/reservations
app.use('/api', espaceRoutes);      // => /api/espaces
app.use('/api', atelierRoutes);     // => /api/ateliers
app.use('/api', actualiteRoutes);   // => /api/actualites

// Route d’accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API de gestion des réservations, espaces et ateliers !');
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
