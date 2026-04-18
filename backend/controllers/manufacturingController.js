const ManufacturingStatus = require('../models/ManufacturingStatus.js');

// @desc    Get all manufacturing orders/tasks
// @route   GET /api/manufacturing
// @access  Private/Admin
const getManufacturingOrders = async (req, res) => {
  try {
    const orders = await ManufacturingStatus.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new manufacturing order
// @route   POST /api/manufacturing
// @access  Private/Admin
const createManufacturingOrder = async (req, res) => {
  try {
    const { product, qty, priority, deadline, status } = req.body;

    const order = new ManufacturingStatus({
      product,
      qty,
      priority,
      deadline,
      status,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update manufacturing order status
// @route   PUT /api/manufacturing/:id
// @access  Private/Admin
const updateManufacturingOrder = async (req, res) => {
  try {
    const order = await ManufacturingStatus.findById(req.params.id);

    if (order) {
      order.product = req.body.product || order.product;
      order.qty = req.body.qty || order.qty;
      order.priority = req.body.priority || order.priority;
      order.deadline = req.body.deadline || order.deadline;
      order.status = req.body.status || order.status;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete manufacturing order
// @route   DELETE /api/manufacturing/:id
// @access  Private/Admin
const deleteManufacturingOrder = async (req, res) => {
  try {
    const order = await ManufacturingStatus.findById(req.params.id);

    if (order) {
      await ManufacturingStatus.deleteOne({ _id: order._id });
      res.json({ message: 'Order removed' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getManufacturingOrders,
  createManufacturingOrder,
  updateManufacturingOrder,
  deleteManufacturingOrder,
};
