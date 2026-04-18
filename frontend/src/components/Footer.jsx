import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';
import { useContent } from '../context/ContentContext';

const Footer = () => {
  const { getContentByKey } = useContent();

  const address = getContentByKey('footer_address', '123 Industrial Area, Sector 5, New Delhi, India - 110001');
  const phone = getContentByKey('footer_phone', '+91 98765 43210');
  const email = getContentByKey('footer_email', 'info@chandrexine.com');
  const aboutText = getContentByKey('footer_about_text', "India's leading manufacturer of premium bike seat covers. We combine traditional craftsmanship with modern technology to deliver export-quality products.");
  const quickLinksLabel = getContentByKey('footer_quick_links_label', 'Quick Links');
  const collectionsLabel = getContentByKey('footer_collections_label', 'Collections');

  const socialLinks = {
    facebook: getContentByKey('social_facebook', '#'),
    instagram: getContentByKey('social_instagram', '#'),
    whatsapp: getContentByKey('social_whatsapp', '#'),
    linkedin: getContentByKey('social_linkedin', '#'),
    twitter: getContentByKey('social_twitter', '#'), // Added for consistency if needed, though not in default init yet
  };

  return (
    <footer className="bg-primary text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Chand Rexine House" className="h-16 w-auto" />
              <div className="flex flex-col">
                <span className="text-2xl font-heading font-bold tracking-wider text-white leading-tight">
                  CHAND <span className="text-secondary block">REXINE HOUSE</span>
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {aboutText}
            </p>
            <div className="flex space-x-4">
               {/* Note: Icons array matching keys */}
               <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-secondary hover:text-primary transition-all duration-300">
                  <Facebook size={18} />
               </a>
               <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-secondary hover:text-primary transition-all duration-300">
                  <Instagram size={18} />
               </a>
               <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#25D366] hover:text-white transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3.5c-4.69 0-8.5 3.62-8.5 8.09 0 1.43.39 2.77 1.07 3.94L3 21l5.62-1.47c1.12.61 2.39.96 3.73.96 4.69 0 8.5-3.62 8.5-8.09S16.69 3.5 12 3.5z" fill="currentColor" fillOpacity="0.15"/>
                    <path d="M12 4.5c-4.15 0-7.5 3.16-7.5 7.05 0 1.25.36 2.42 1.03 3.44l-.67 2.48 2.54-.67c.98.63 2.13.97 3.34.97 4.15 0 7.5-3.16 7.5-7.05S16.15 4.5 12 4.5z" fill="currentColor" fillOpacity="0.2"/>
                    <path d="M9.7 8.2c.12-.27.18-.58.04-.83-.11-.2-.32-.32-.54-.36-.28-.06-.56.01-.79.19-.49.37-.77.97-.74 1.59.06 1.09.58 2.13 1.43 3.06.85.93 1.86 1.62 2.9 2.02.57.21 1.2.35 1.81.29.63-.06 1.25-.35 1.66-.86.2-.25.32-.57.28-.89-.04-.29-.22-.55-.46-.71-.25-.17-.55-.24-.85-.2-.3.03-.57.18-.77.41-.12.14-.21.31-.3.48-.09.16-.18.33-.32.44-.13.1-.31.14-.47.1-.36-.09-.71-.25-1.02-.46-.45-.3-.86-.66-1.22-1.07-.2-.22-.39-.45-.53-.71-.09-.17-.16-.36-.15-.55.01-.19.11-.37.25-.49.16-.14.36-.26.46-.46.08-.16.07-.35 0-.51z" fill="currentColor"/>
                  </svg>
               </a>
               <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-secondary hover:text-primary transition-all duration-300">
                  <Linkedin size={18} />
               </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-secondary">{quickLinksLabel}</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'Manufacturing', path: '/manufacturing' },
                { name: 'Dealer Registration', path: '/dealer-registration' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-secondary">{collectionsLabel}</h3>
            <ul className="space-y-3">
              {['Premium Leather', 'Sports Edition', 'Comfort Series', 'Custom Designs', 'Bulk Orders'].map((item) => (
                <li key={item}>
                  <Link to="/products" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-secondary">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin size={18} className="mt-1 text-secondary flex-shrink-0" />
                <span>{address}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone size={18} className="text-secondary flex-shrink-0" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail size={18} className="text-secondary flex-shrink-0" />
                <span>{email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-12"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Chand Rexine House. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/admin" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
