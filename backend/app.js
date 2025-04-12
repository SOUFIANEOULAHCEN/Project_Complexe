const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const evenementsRoutes = require("./routes/evenementsRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/evenements", evenementsRoutes);

// Démarrage
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
