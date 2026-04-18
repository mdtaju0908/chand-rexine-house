import React, { useState } from 'react';
import { Phone, MapPin, Mail, Clock, MessageCircle, Loader2 } from 'lucide-react';
import Section from '../components/Section';
import { createRetailEnquiry } from '../api';
import { useContent } from '../context/ContentContext';
import SEO from '../components/SEO';

const Contact = () => {
  const { getContentByKey } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const address = getContentByKey('contact_address', '123 Industrial Area, Phase 2, New Delhi, India');
  const phone = getContentByKey('contact_phone', '+91 98765 43210');
  const email = getContentByKey('contact_email', 'info@chandrexine.com');
  const hours = getContentByKey('contact_hours', 'Mon - Sat: 9:00 AM - 8:00 PM');
  const whatsapp = getContentByKey('contact_whatsapp', '+91 98765 43210');
  const mapEmbedUrl = getContentByKey('contact_map_embed_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.8609952220677!2d75.88894917486482!3d26.812554364388703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc873264c3df3%3A0x4c7b45a9ce474b8!2sVivekananda%20Global%20University!5e0!3m2!1sen!2sin!4v1769713823481!5m2!1sen!2sin%22%20width=%22600%22%20height=%22450%22%20style=%22border:0;%22%20allowfullscreen=%22%22%20loading=%22lazy%22%20referrerpolicy=%22no-referrer-when-downgrade');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await createRetailEnquiry(formData);
      setStatus('success');
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-50 pb-20">
      <SEO pageKey="contact" title="Contact Us" />
      {/* Header */}
      <div className="bg-primary text-white py-16 text-center">
        <Section>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto px-4">
            Have questions? We are here to help you.
          </p>
        </Section>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <Section className="bg-white rounded-xl shadow-xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold mb-2">Our Address</h3>
              <p className="text-gray-600 text-sm">{address}</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} />
              </div>
              <h3 className="font-bold mb-2">Phone Number</h3>
              <p className="text-gray-600 text-sm">{phone}</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} />
              </div>
              <h3 className="font-bold mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm">{email}</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} />
              </div>
              <h3 className="font-bold mb-2">Working Hours</h3>
              <p className="text-gray-600 text-sm">{hours}</p>
              <p className="text-gray-600 text-sm">Sunday Closed</p>
            </div>
          </div>
        </Section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          {mapEmbedUrl && (
            <Section className="bg-white p-4 rounded-xl shadow-lg h-[400px]">
              <iframe 
                src={mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
                className="rounded-lg"
              ></iframe>
            </Section>
          )}

          {/* Quick Contact Form */}
          <Section className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                  placeholder="John Doe" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                  placeholder="9876543210" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  rows="4" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
              
              {status === 'success' && (
                <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm">
                  Message sent successfully! We'll contact you soon.
                </div>
              )}
              
              {status === 'error' && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  Failed to send message. Please try again.
                </div>
              )}

              <button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </Section>
        </div>

        <Section className="mt-12 text-center">
          <a 
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="mr-2">
              <path d="M12 3.5c-4.69 0-8.5 3.62-8.5 8.09 0 1.43.39 2.77 1.07 3.94L3 21l5.62-1.47c1.12.61 2.39.96 3.73.96 4.69 0 8.5-3.62 8.5-8.09S16.69 3.5 12 3.5z" fill="white" fillOpacity="0.15"/>
              <path d="M12 4.5c-4.15 0-7.5 3.16-7.5 7.05 0 1.25.36 2.42 1.03 3.44l-.67 2.48 2.54-.67c.98.63 2.13.97 3.34.97 4.15 0 7.5-3.16 7.5-7.05S16.15 4.5 12 4.5z" fill="white" fillOpacity="0.2"/>
              <path d="M9.7 8.2c.12-.27.18-.58.04-.83-.11-.2-.32-.32-.54-.36-.28-.06-.56.01-.79.19-.49.37-.77.97-.74 1.59.06 1.09.58 2.13 1.43 3.06.85.93 1.86 1.62 2.9 2.02.57.21 1.2.35 1.81.29.63-.06 1.25-.35 1.66-.86.2-.25.32-.57.28-.89-.04-.29-.22-.55-.46-.71-.25-.17-.55-.24-.85-.2-.3.03-.57.18-.77.41-.12.14-.21.31-.3.48-.09.16-.18.33-.32.44-.13.1-.31.14-.47.1-.36-.09-.71-.25-1.02-.46-.45-.3-.86-.66-1.22-1.07-.2-.22-.39-.45-.53-.71-.09-.17-.16-.36-.15-.55.01-.19.11-.37.25-.49.16-.14.36-.26.46-.46.08-.16.07-.35 0-.51z" fill="white"/>
            </svg>
            Chat with us on WhatsApp
          </a>
        </Section>
      </div>
    </div>
  );
};

export default Contact;
