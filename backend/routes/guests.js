const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');
const auth = require('../middleware/auth');

router.post('/', auth, guestController.addGuest);
router.get('/event/:eventId', auth, guestController.getGuestsByEvent);
router.put('/:id', auth, guestController.updateGuestStatus);
router.delete('/:id', auth, guestController.removeGuest);

module.exports = router; 