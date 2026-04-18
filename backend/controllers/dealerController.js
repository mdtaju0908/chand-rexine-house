const Dealer = require('../models/Dealer.js');

// @desc    Get all active dealers
// @route   GET /api/dealers
// @access  Private/Admin
const getDealers = async (req, res) => {
  try {
    const dealers = await Dealer.find({}).sort({ createdAt: -1 });
    res.json(dealers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new dealer (or convert enquiry)
// @route   POST /api/dealers
// @access  Private/Admin
const createDealer = async (req, res) => {
  try {
    const { agencyName, ownerName, city, phone, monthlyVolume, activeStatus, totalRevenue } = req.body;

    const dealer = new Dealer({
      agencyName,
      ownerName,
      city,
      phone,
      monthlyVolume,
      activeStatus: activeStatus !== undefined ? activeStatus : true,
      totalRevenue: totalRevenue || 0,
    });

    const createdDealer = await dealer.save();
    res.status(201).json(createdDealer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update dealer details
// @route   PUT /api/dealers/:id
// @access  Private/Admin
const updateDealer = async (req, res) => {
  try {
    const dealer = await Dealer.findById(req.params.id);

    if (dealer) {
      dealer.agencyName = req.body.agencyName || dealer.agencyName;
      dealer.ownerName = req.body.ownerName || dealer.ownerName;
      dealer.city = req.body.city || dealer.city;
      dealer.phone = req.body.phone || dealer.phone;
      dealer.monthlyVolume = req.body.monthlyVolume || dealer.monthlyVolume;
      dealer.activeStatus = req.body.activeStatus !== undefined ? req.body.activeStatus : dealer.activeStatus;
      dealer.totalRevenue = req.body.totalRevenue !== undefined ? req.body.totalRevenue : dealer.totalRevenue;

      const updatedDealer = await dealer.save();
      res.json(updatedDealer);
    } else {
      res.status(404).json({ message: 'Dealer not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete dealer
// @route   DELETE /api/dealers/:id
// @access  Private/Admin
const deleteDealer = async (req, res) => {
  try {
    const dealer = await Dealer.findById(req.params.id);

    if (dealer) {
      await Dealer.deleteOne({ _id: dealer._id });
      res.json({ message: 'Dealer removed' });
    } else {
      res.status(404).json({ message: 'Dealer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDealers,
  createDealer,
  updateDealer,
  deleteDealer,
};
