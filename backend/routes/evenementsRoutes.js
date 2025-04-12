const express = require("express");
const router = express.Router();
const controller = require("../controllers/evenementsController");

router.get("/", controller.getAllEvenements);
router.get("/:id", controller.getEvenementById);
router.post("/", controller.createEvenement);
router.put("/:id", controller.updateEvenement);
router.delete("/:id", controller.deleteEvenement);

module.exports = router;
