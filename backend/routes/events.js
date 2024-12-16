const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');

router.post('/', auth, eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.put('/:id', auth, eventController.updateEvent);
router.delete('/:id', auth, eventController.deleteEvent);
router.get('/stats', auth, eventController.getEventStats);
router.get('/budget', auth, eventController.getBudgetOverview);
router.get('/tasks', auth, eventController.getEventTasks);
router.get('/calendar', auth, eventController.getCalendarEvents);

module.exports = router; 