const Guest = require('../models/Guest');
const Event = require('../models/Event');

exports.addGuest = async (req, res) => {
  try {
    const guest = new Guest({
      user: req.body.userId,
      event: req.body.eventId,
      rsvpStatus: req.body.rsvpStatus || 'pending',
      dietaryRestrictions: req.body.dietaryRestrictions,
      specialRequirements: req.body.specialRequirements
    });

    await guest.save();

    // Add guest to event
    await Event.findByIdAndUpdate(
      req.body.eventId,
      { $push: { guests: guest._id } }
    );

    res.status(201).json(guest);
  } catch (error) {
    res.status(500).json({ message: 'Error adding guest', error: error.message });
  }
};

exports.getGuestsByEvent = async (req, res) => {
  try {
    const guests = await Guest.find({ event: req.params.eventId })
      .populate('user', 'name email');
    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guests', error: error.message });
  }
};

exports.updateGuestStatus = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(
      req.params.id,
      { rsvpStatus: req.body.rsvpStatus },
      { new: true }
    );
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    res.json(guest);
  } catch (error) {
    res.status(500).json({ message: 'Error updating guest status', error: error.message });
  }
};

exports.removeGuest = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }

    // Remove guest from event
    await Event.findByIdAndUpdate(
      guest.event,
      { $pull: { guests: guest._id } }
    );

    await Guest.findByIdAndDelete(req.params.id);
    res.json({ message: 'Guest removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing guest', error: error.message });
  }
}; 