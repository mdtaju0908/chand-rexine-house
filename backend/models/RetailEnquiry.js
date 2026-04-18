const mongoose = require('mongoose');

const retailEnquirySchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: { type: String }, // Snapshot incase product deleted
  message: { type: String },
  status: { type: String, default: 'New' },
}, {
  timestamps: true,
});

const RetailEnquiry = mongoose.model('RetailEnquiry', retailEnquirySchema);

module.exports = RetailEnquiry;