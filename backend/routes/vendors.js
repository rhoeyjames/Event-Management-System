const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const auth = require('../middleware/auth');

router.post('/', auth, vendorController.addVendor);
router.get('/event/:eventId', auth, vendorController.getVendorsByEvent);
router.put('/:id', auth, vendorController.updateVendor);
router.delete('/:id', auth, vendorController.removeVendor);

module.exports = router; 