const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservationController');

router.post('/', controller.createReservation);
router.get('/', controller.getAllReservations);
router.get('/:id', controller.getReservationById);
router.delete('/:id', controller.cancelReservation);

module.exports = router;
