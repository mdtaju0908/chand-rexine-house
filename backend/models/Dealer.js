const mongoose = require('mongoose');

const dealerSchema = mongoose.Schema({
  agencyName: { type: String, required: true },
  ownerName: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  monthlyVolume: { type: String },
  activeStatus: { type: Boolean, default: true },
  totalRevenue: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Dealer = mongoose.model('Dealer', dealerSchema);

module.exports = Dealer;