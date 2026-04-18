const mongoose = require('mongoose');

const dealerEnquirySchema = mongoose.Schema({
  agencyName: { type: String, required: true },
  ownerName: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  requirement: { type: String }, // monthlyRequirement
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Negotiation', 'Active Dealer', 'Closed', 'Pending'], 
    default: 'New' 
  },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  notes: { type: String },
  followUp: { type: Date },
  expectedValue: { type: String },
}, {
  timestamps: true,
});

const DealerEnquiry = mongoose.model('DealerEnquiry', dealerEnquirySchema);

module.exports = DealerEnquiry;