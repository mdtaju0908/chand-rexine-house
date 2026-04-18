const Content = require('../models/Content.js');

// @desc    Get all content
// @route   GET /api/content
// @access  Public
const getContent = async (req, res) => {
  try {
    const content = await Content.find({});
    // Convert array to object for easier frontend consumption: { key: value }
    // Or just return array. Let's return array for admin to manage, and maybe a separate endpoint for frontend consumption if needed.
    // For now, array is fine.
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get content by section
// @route   GET /api/content/:section
// @access  Public
const getContentBySection = async (req, res) => {
  try {
    const content = await Content.find({ section: req.params.section });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or Update content
// @route   POST /api/content
// @access  Private/Admin
const updateContent = async (req, res) => {
  try {
    const { key, value, section, type, label } = req.body;

    let content = await Content.findOne({ key });

    if (content) {
      content.value = value;
      // Update other fields if provided
      if (section) content.section = section;
      if (type) content.type = type;
      if (label) content.label = label;
      
      const updatedContent = await content.save();
      res.json(updatedContent);
    } else {
      const newContent = new Content({
        key,
        value,
        section: section || 'general',
        type: type || 'text',
        label: label || key,
      });
      const createdContent = await newContent.save();
      res.status(201).json(createdContent);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete content
// @route   DELETE /api/content/:id
// @access  Private/Admin
const deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (content) {
      await Content.deleteOne({ _id: content._id });
      res.json({ message: 'Content removed' });
    } else {
      res.status(404).json({ message: 'Content not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Initialize default content (helper)
// @route   POST /api/content/init
// @access  Private/Admin
const initContent = async (req, res) => {
    try {
        const defaults = [
            // Homepage
            { section: 'home', key: 'home_hero_title', value: 'Welcome to Chand Rexine House', type: 'text', label: 'Hero Title' },
            { section: 'home', key: 'home_hero_subtitle', value: 'Premium Rexine & Upholstery Solutions', type: 'text', label: 'Hero Subtitle' },
            { section: 'home', key: 'home_cta_text', value: 'Explore Products', type: 'text', label: 'CTA Button Text' },
            { section: 'home', key: 'home_hero_bg_image', value: '', type: 'image', label: 'Hero Background Image' },
            
            // About Us
            { section: 'about', key: 'about_text', value: 'Chand Rexine House is a leading provider of high-quality rexine and upholstery materials. We have been serving the industry with dedication and excellence.', type: 'longtext', label: 'About Us Text' },
            
            // Why Choose Us (Simple text list for now, or JSON string if we want structure, but user asked for points)
            { section: 'about', key: 'why_choose_us_1', value: 'Premium Quality Materials', type: 'text', label: 'Why Choose Us Point 1' },
            { section: 'about', key: 'why_choose_us_2', value: 'Wide Range of Designs', type: 'text', label: 'Why Choose Us Point 2' },
            { section: 'about', key: 'why_choose_us_3', value: 'Competitive Pricing', type: 'text', label: 'Why Choose Us Point 3' },
            
            // Manufacturing
            { section: 'manufacturing', key: 'manufacturing_image_1', value: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop', type: 'image', label: 'Factory Image 1' },
            { section: 'manufacturing', key: 'manufacturing_title_1', value: 'Advanced Machinery', type: 'text', label: 'Factory Title 1' },
            { section: 'manufacturing', key: 'manufacturing_image_2', value: 'https://images.unsplash.com/photo-1605218427368-ade63ec171bd?q=80&w=2066&auto=format&fit=crop', type: 'image', label: 'Factory Image 2' },
            { section: 'manufacturing', key: 'manufacturing_title_2', value: 'Large Inventory', type: 'text', label: 'Factory Title 2' },

            // Contact
            { section: 'contact', key: 'contact_phone', value: '+91 98765 43210', type: 'text', label: 'Phone Number' },
            { section: 'contact', key: 'contact_whatsapp', value: '+91 98765 43210', type: 'text', label: 'WhatsApp Number' },
            { section: 'contact', key: 'contact_address', value: '123, Main Market, City, State - Pin Code', type: 'longtext', label: 'Address' },
            { section: 'contact', key: 'contact_hours', value: 'Mon - Sat: 10:00 AM - 8:00 PM', type: 'text', label: 'Working Hours' },
            { section: 'contact', key: 'contact_email', value: 'info@chandrexine.com', type: 'text', label: 'Email Address' },
            { section: 'contact', key: 'contact_map_embed_url', value: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1711000000000!5m2!1sen!2sin', type: 'longtext', label: 'Google Map Embed URL' },
            { section: 'contact', key: 'contact_map_link', value: 'https://www.google.com/maps/search/?api=1&query=Chand+Rexine+House', type: 'longtext', label: 'Google Maps Place Link' },
            { section: 'contact', key: 'contact_directions_link', value: 'https://www.google.com/maps/dir/?api=1&destination=Chand+Rexine+House', type: 'longtext', label: 'Google Maps Directions Link' },
            { section: 'contact', key: 'contact_reviews_link', value: 'https://www.google.com/maps/search/?api=1&query=Chand+Rexine+House#lrd=0x0:0x0,1', type: 'longtext', label: 'Google Reviews Link' },

            // Footer
            { section: 'footer', key: 'footer_about_text', value: "India's leading manufacturer of premium bike seat covers. We combine traditional craftsmanship with modern technology to deliver export-quality products.", type: 'longtext', label: 'About Text' },
            { section: 'footer', key: 'footer_quick_links_label', value: 'Quick Links', type: 'text', label: 'Quick Links Section Title' },
            { section: 'footer', key: 'footer_collections_label', value: 'Collections', type: 'text', label: 'Collections Section Title' },
            { section: 'footer', key: 'footer_address', value: '123 Industrial Area, Sector 5, New Delhi, India - 110001', type: 'text', label: 'Address' },
            { section: 'footer', key: 'footer_phone', value: '+91 98765 43210', type: 'text', label: 'Footer Phone' },
            { section: 'footer', key: 'footer_email', value: 'info@chandrexine.com', type: 'text', label: 'Footer Email' },
            { section: 'footer', key: 'social_facebook', value: 'https://facebook.com', type: 'text', label: 'Facebook Link' },
            { section: 'footer', key: 'social_instagram', value: 'https://instagram.com', type: 'text', label: 'Instagram Link' },
            { section: 'footer', key: 'social_whatsapp', value: 'https://wa.me/919876543210', type: 'text', label: 'WhatsApp Link' },
            { section: 'footer', key: 'social_linkedin', value: 'https://linkedin.com', type: 'text', label: 'LinkedIn Link' },
            { section: 'footer', key: 'social_youtube', value: 'https://youtube.com', type: 'text', label: 'YouTube Link' },

            // SEO
            { section: 'seo', key: 'seo_home_title', value: 'Home | Chand Rexine House', type: 'text', label: 'Home Page Title' },
            { section: 'seo', key: 'seo_home_description', value: 'Premium Seat Covers & Rexine Materials', type: 'longtext', label: 'Home Page Description' },
            { section: 'seo', key: 'seo_products_title', value: 'Products | Chand Rexine House', type: 'text', label: 'Products Page Title' },
            { section: 'seo', key: 'seo_products_description', value: 'Explore our wide range of products.', type: 'longtext', label: 'Products Page Description' },
            { section: 'seo', key: 'seo_manufacturing_title', value: 'Manufacturing | Chand Rexine House', type: 'text', label: 'Manufacturing Page Title' },
            { section: 'seo', key: 'seo_manufacturing_description', value: 'Our manufacturing process.', type: 'longtext', label: 'Manufacturing Page Description' },
            { section: 'seo', key: 'seo_contact_title', value: 'Contact Us | Chand Rexine House', type: 'text', label: 'Contact Page Title' },
            { section: 'seo', key: 'seo_contact_description', value: 'Get in touch with us.', type: 'longtext', label: 'Contact Page Description' },
            { section: 'seo', key: 'seo_agency_supply_title', value: 'Agency Supply | Chand Rexine House', type: 'text', label: 'Agency Supply Page Title' },
            { section: 'seo', key: 'seo_agency_supply_description', value: 'Reliable seat cover solutions for Bike Showrooms & Agencies.', type: 'longtext', label: 'Agency Supply Page Description' },
            { section: 'seo', key: 'seo_why_us_title', value: 'Why Choose Us | Chand Rexine House', type: 'text', label: 'Why Us Page Title' },
            { section: 'seo', key: 'seo_why_us_description', value: 'We are committed to quality, trust, and long-term partnerships.', type: 'longtext', label: 'Why Us Page Description' },
            { section: 'seo', key: 'seo_dealer_registration_title', value: 'Dealer Registration | Chand Rexine House', type: 'text', label: 'Dealer Registration Page Title' },
            { section: 'seo', key: 'seo_dealer_registration_description', value: 'Join our network of 120+ successful dealers across India.', type: 'longtext', label: 'Dealer Registration Page Description' },

        ];

        const operations = defaults.map(item => ({
            updateOne: {
                filter: { key: item.key },
                update: { $setOnInsert: item },
                upsert: true
            }
        }));

        await Content.bulkWrite(operations);
        res.json({ message: 'Default content initialized' });
    } catch (error) {
        console.error('Init Content Error:', error);
        res.status(500).json({ message: error.message || 'Failed to initialize content' });
    }
}

// @desc    Update content by key
// @route   PUT /api/content/:key
// @access  Private/Admin
const updateContentByKey = async (req, res) => {
  try {
    const { value } = req.body;
    const { key } = req.params;

    let content = await Content.findOne({ key });

    if (content) {
      content.value = value;
      const updatedContent = await content.save();
      res.json(updatedContent);
    } else {
      // Option: Create if not exists, or return 404. 
      // User requirements imply "Update", but let's allow upsert for convenience if the key is new.
      // However, usually we want to control keys. Let's stick to update or create if explicitly allowed.
      // Given the prompt "Update website text", the keys likely exist or are defined by the system.
      // Let's create if it doesn't exist to be safe and robust.
      const newContent = new Content({
        key,
        value,
        section: req.body.section || 'general',
        type: req.body.type || 'text',
        label: req.body.label || key,
      });
      const createdContent = await newContent.save();
      res.status(201).json(createdContent);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getContent,
  getContentBySection,
  updateContent,
  updateContentByKey,
  deleteContent,
  initContent
};
