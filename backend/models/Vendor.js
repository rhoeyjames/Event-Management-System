const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  pricing: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Vendor', vendorSchema); 