const DealerEnquiry = require('../models/DealerEnquiry.js');
const RetailEnquiry = require('../models/RetailEnquiry.js');

// @desc    Create a new dealer enquiry
// @route   POST /api/enquiries/dealer
// @access  Public
const createDealerEnquiry = async (req, res) => {
  try {
    const { agencyName, ownerName, city, phone, requirement, notes, expectedValue } = req.body;

    const enquiry = new DealerEnquiry({
      agencyName,
      ownerName,
      city,
      phone,
      requirement,
      notes,
      expectedValue,
    });

    const createdEnquiry = await enquiry.save();
    res.status(201).json(createdEnquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all dealer enquiries
// @route   GET /api/enquiries/dealer
// @access  Private/Admin
const getDealerEnquiries = async (req, res) => {
  try {
    const enquiries = await DealerEnquiry.find({}).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update dealer enquiry (status, priority, etc.)
// @route   PUT /api/enquiries/dealer/:id
// @access  Private/Admin
const updateDealerEnquiry = async (req, res) => {
  try {
    const enquiry = await DealerEnquiry.findById(req.params.id);

    if (enquiry) {
      enquiry.status = req.body.status || enquiry.status;
      enquiry.priority = req.body.priority || enquiry.priority;
      enquiry.notes = req.body.notes || enquiry.notes;
      enquiry.followUp = req.body.followUp || enquiry.followUp;
      enquiry.expectedValue = req.body.expectedValue || enquiry.expectedValue;

      const updatedEnquiry = await enquiry.save();
      res.json(updatedEnquiry);
    } else {
      res.status(404).json({ message: 'Enquiry not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete dealer enquiry
// @route   DELETE /api/enquiries/dealer/:id
// @access  Private/Admin
const deleteDealerEnquiry = async (req, res) => {
  try {
    const enquiry = await DealerEnquiry.findById(req.params.id);

    if (enquiry) {
      await DealerEnquiry.deleteOne({ _id: enquiry._id });
      res.json({ message: 'Enquiry removed' });
    } else {
      res.status(404).json({ message: 'Enquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new retail enquiry
// @route   POST /api/enquiries/retail
// @access  Public
const createRetailEnquiry = async (req, res) => {
  try {
    const { name, phone, message } = req.body;

    const enquiry = new RetailEnquiry({
      name,
      phone,
      message,
    });

    const createdEnquiry = await enquiry.save();
    res.status(201).json(createdEnquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all retail enquiries
// @route   GET /api/enquiries/retail
// @access  Private/Admin
const getRetailEnquiries = async (req, res) => {
  try {
    const enquiries = await RetailEnquiry.find({}).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update retail enquiry (status)
// @route   PUT /api/enquiries/retail/:id
// @access  Private/Admin
const updateRetailEnquiry = async (req, res) => {
  try {
    const enquiry = await RetailEnquiry.findById(req.params.id);

    if (enquiry) {
      enquiry.status = req.body.status || enquiry.status;
      // Retail enquiries usually just track status (New -> Contacted -> Closed)
      
      const updatedEnquiry = await enquiry.save();
      res.json(updatedEnquiry);
    } else {
      res.status(404).json({ message: 'Enquiry not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete retail enquiry
// @route   DELETE /api/enquiries/retail/:id
// @access  Private/Admin
const deleteRetailEnquiry = async (req, res) => {
  try {
    const enquiry = await RetailEnquiry.findById(req.params.id);

    if (enquiry) {
      await RetailEnquiry.deleteOne({ _id: enquiry._id });
      res.json({ message: 'Enquiry removed' });
    } else {
      res.status(404).json({ message: 'Enquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDealerEnquiry,
  getDealerEnquiries,
  updateDealerEnquiry,
  deleteDealerEnquiry,
  createRetailEnquiry,
  getRetailEnquiries,
  updateRetailEnquiry,
  deleteRetailEnquiry,
};
