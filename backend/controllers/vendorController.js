const Vendor = require('../models/Vendor');
const Event = require('../models/Event');

exports.addVendor = async (req, res) => {
  try {
    const vendor = new Vendor({
      user: req.body.userId,
      companyName: req.body.companyName,
      serviceType: req.body.serviceType,
      contactNumber: req.body.contactNumber,
      pricing: req.body.pricing
    });

    await vendor.save();

    // Add vendor to event if eventId is provided
    if (req.body.eventId) {
      await Event.findByIdAndUpdate(
        req.body.eventId,
        { $push: { vendors: vendor._id } }
      );
      vendor.events.push(req.body.eventId);
      await vendor.save();
    }

    res.status(201).json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Error adding vendor', error: error.message });
  }
};

exports.getVendorsByEvent = async (req, res) => {
  try {
    const vendors = await Vendor.find({ events: req.params.eventId })
      .populate('user', 'name email');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vendors', error: error.message });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating vendor', error: error.message });
  }
};

exports.removeVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Remove vendor from all associated events
    await Event.updateMany(
      { vendors: vendor._id },
      { $pull: { vendors: vendor._id } }
    );

    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vendor removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing vendor', error: error.message });
  }
}; 