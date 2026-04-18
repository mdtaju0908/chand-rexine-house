const mongoose = require('mongoose');

const whatsappTemplateSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['Dealer', 'Retail', 'Transaction', 'Marketing'], required: true },
}, {
  timestamps: true,
});

const WhatsAppTemplate = mongoose.model('WhatsAppTemplate', whatsappTemplateSchema);

module.exports = WhatsAppTemplate;