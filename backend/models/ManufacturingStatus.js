const mongoose = require('mongoose');

const manufacturingStatusSchema = mongoose.Schema({
  product: { type: String, required: true }, // Or ref to Product
  qty: { type: Number, required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  deadline: { type: String }, // Storing as string for now to match frontend "Tomorrow, 6 PM"
  status: { type: String, enum: ['Pending', 'In Progress', 'Ready'], default: 'Pending' },
}, {
  timestamps: true,
});

const ManufacturingStatus = mongoose.model('ManufacturingStatus', manufacturingStatusSchema);

module.exports = ManufacturingStatus;