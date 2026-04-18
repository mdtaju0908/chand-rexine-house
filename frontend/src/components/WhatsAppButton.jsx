import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const WhatsAppButton = () => {
  const { getContentByKey } = useContent();
  const rawNumber = getContentByKey('contact_whatsapp', '+91 98765 43210');
  const phoneNumber = rawNumber.replace(/[^0-9]/g, '');
  const message = 'Hi, I am interested in your products.';

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#1ebe5d] transition-colors flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Chat on WhatsApp"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3.5c-4.69 0-8.5 3.62-8.5 8.09 0 1.43.39 2.77 1.07 3.94L3 21l5.62-1.47c1.12.61 2.39.96 3.73.96 4.69 0 8.5-3.62 8.5-8.09S16.69 3.5 12 3.5z" fill="white" fillOpacity="0.15"/>
        <path d="M12 4.5c-4.15 0-7.5 3.16-7.5 7.05 0 1.25.36 2.42 1.03 3.44l-.67 2.48 2.54-.67c.98.63 2.13.97 3.34.97 4.15 0 7.5-3.16 7.5-7.05S16.15 4.5 12 4.5z" fill="white" fillOpacity="0.2"/>
        <path d="M9.7 8.2c.12-.27.18-.58.04-.83-.11-.2-.32-.32-.54-.36-.28-.06-.56.01-.79.19-.49.37-.77.97-.74 1.59.06 1.09.58 2.13 1.43 3.06.85.93 1.86 1.62 2.9 2.02.57.21 1.2.35 1.81.29.63-.06 1.25-.35 1.66-.86.2-.25.32-.57.28-.89-.04-.29-.22-.55-.46-.71-.25-.17-.55-.24-.85-.2-.3.03-.57.18-.77.41-.12.14-.21.31-.3.48-.09.16-.18.33-.32.44-.13.1-.31.14-.47.1-.36-.09-.71-.25-1.02-.46-.45-.3-.86-.66-1.22-1.07-.2-.22-.39-.45-.53-.71-.09-.17-.16-.36-.15-.55.01-.19.11-.37.25-.49.16-.14.36-.26.46-.46.08-.16.07-.35 0-.51z" fill="white"/>
      </svg>
    </motion.a>
  );
};

export default WhatsAppButton;
