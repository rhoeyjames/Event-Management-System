const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      organizer: req.user._id
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('organizer', 'name email')
      .populate('guests')
      .populate('vendors');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('guests')
      .populate('vendors');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};

exports.getEventStats = async (req, res) => {
    try {
        const total = await Event.countDocuments();
        const upcoming = await Event.countDocuments({
            date: { $gt: new Date() }
        });

        // Get monthly count
        const monthlyCount = await Event.aggregate([
            {
                $group: {
                    _id: { $month: "$date" },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            total,
            upcoming,
            monthlyCount: Array(12).fill(0).map((_, i) => {
                const month = monthlyCount.find(m => m._id === i + 1);
                return month ? month.count : 0;
            })
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event stats' });
    }
};

exports.getBudgetOverview = async (req, res) => {
    try {
        const events = await Event.find();
        const total = events.reduce((sum, event) => sum + event.budget, 0);
        const used = events.reduce((sum, event) => {
            return sum + (event.expenses || []).reduce((expSum, exp) => expSum + exp.amount, 0);
        }, 0);

        res.json({
            total,
            used,
            usagePercentage: (used / total) * 100
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching budget data' });
    }
};

exports.getEventTasks = async (req, res) => {
    try {
        const events = await Event.find()
            .sort({ date: 1 })
            .limit(5);

        const tasks = events.map(event => ({
            title: event.title,
            dueDate: event.date,
            status: event.status
        }));

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

exports.getCalendarEvents = async (req, res) => {
    try {
        const events = await Event.find();
        const calendarEvents = events.map(event => ({
            title: event.title,
            start: event.date,
            end: event.date,
            url: `#/events/${event._id}`
        }));

        res.json(calendarEvents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching calendar events' });
    }
}; 