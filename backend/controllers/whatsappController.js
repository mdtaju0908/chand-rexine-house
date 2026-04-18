const WhatsAppTemplate = require('../models/WhatsAppTemplate.js');

// @desc    Get all WhatsApp templates
// @route   GET /api/whatsapp-templates
// @access  Private/Admin
const getWhatsAppTemplates = async (req, res) => {
  try {
    const templates = await WhatsAppTemplate.find({}).sort({ createdAt: -1 });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new WhatsApp template
// @route   POST /api/whatsapp-templates
// @access  Private/Admin
const createWhatsAppTemplate = async (req, res) => {
  try {
    const { title, content, type, isActive } = req.body;

    const template = new WhatsAppTemplate({
      title,
      content,
      type,
      isActive: isActive !== undefined ? isActive : true,
    });

    const createdTemplate = await template.save();
    res.status(201).json(createdTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a WhatsApp template
// @route   PUT /api/whatsapp-templates/:id
// @access  Private/Admin
const updateWhatsAppTemplate = async (req, res) => {
  try {
    const template = await WhatsAppTemplate.findById(req.params.id);

    if (template) {
      template.title = req.body.title || template.title;
      template.content = req.body.content || template.content;
      template.type = req.body.type || template.type;
      template.isActive = req.body.isActive !== undefined ? req.body.isActive : template.isActive;

      const updatedTemplate = await template.save();
      res.json(updatedTemplate);
    } else {
      res.status(404).json({ message: 'Template not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a WhatsApp template
// @route   DELETE /api/whatsapp-templates/:id
// @access  Private/Admin
const deleteWhatsAppTemplate = async (req, res) => {
  try {
    const template = await WhatsAppTemplate.findById(req.params.id);

    if (template) {
      await WhatsAppTemplate.deleteOne({ _id: template._id });
      res.json({ message: 'Template removed' });
    } else {
      res.status(404).json({ message: 'Template not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWhatsAppTemplates,
  createWhatsAppTemplate,
  updateWhatsAppTemplate,
  deleteWhatsAppTemplate,
};
