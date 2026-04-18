const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
  section: {
    type: String,
    required: true, // e.g., 'home_hero', 'about_us', 'contact_info'
  },
  key: {
    type: String,
    required: true,
    unique: true, // e.g., 'hero_title', 'hero_subtitle'
  },
  value: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'longtext', 'image', 'link'],
    default: 'text',
  },
  label: {
    type: String, // User-friendly label for the admin UI
  }
}, {
  timestamps: true,
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
