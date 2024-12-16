const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  rsvpStatus: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  dietaryRestrictions: {
    type: String,
    default: ''
  },
  specialRequirements: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Guest', guestSchema); 