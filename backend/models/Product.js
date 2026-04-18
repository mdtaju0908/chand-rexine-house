const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }], // Cloudinary URLs
  retailPrice: { type: Number, required: true },
  dealerPrice: { type: Number, required: true },
  moq: { type: Number, default: 10 },
  visibility: { type: String, enum: ['Public', 'Agency Only'], default: 'Public' },
  stock: { type: Number, default: 0 },
  demand: { type: Number, default: 0 }, // For analytics/logic
  isBestSeller: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;