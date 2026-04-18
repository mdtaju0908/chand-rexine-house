import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { createDealerEnquiry } from '../api';
import SEO from '../components/SEO';

const DealerRegistration = () => {
  const [formData, setFormData] = useState({
    agencyName: '',
    ownerName: '',
    phone: '',
    email: '',
    city: '',
    gst: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.agencyName) tempErrors.agencyName = "Agency Name is required";
    if (!formData.ownerName) tempErrors.ownerName = "Owner Name is required";
    if (!formData.phone) tempErrors.phone = "Phone Number is required";
    else if (!/^\d{10}$/.test(formData.phone)) tempErrors.phone = "Invalid Phone Number";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid Email";
    if (!formData.city) tempErrors.city = "City is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const enquiryData = {
          agencyName: formData.agencyName,
          ownerName: formData.ownerName,
          phone: formData.phone,
          city: formData.city,
          requirement: formData.message,
          notes: `Email: ${formData.email}, GST: ${formData.gst}`
        };
        await createDealerEnquiry(enquiryData);
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        // Redirect to WhatsApp
        const text = `*New Dealer Application*%0A%0A*Agency:* ${formData.agencyName}%0A*Owner:* ${formData.ownerName}%0A*City:* ${formData.city}%0A*Phone:* ${formData.phone}%0A*GST:* ${formData.gst}`;
        window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
      } catch (error) {
        console.error(error);
        setIsSubmitting(false);
        setErrors({ submit: 'Failed to submit enquiry. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-light pt-24 pb-20 flex items-center justify-center">
      <SEO pageKey="dealer_registration" title="Dealer Registration" />
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-premium overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side - Info */}
          <div className="md:w-2/5 bg-primary text-white p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">Partner With Us</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Join our network of 120+ successful dealers across India. Get access to premium quality seat covers at manufacturer prices.
                </p>
                <ul className="space-y-4">
                  {[
                    "Direct Manufacturer Pricing",
                    "Priority Dispatch",
                    "Marketing Support",
                    "Exclusive Designs"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircle className="text-secondary w-5 h-5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10">
                <p className="text-sm text-gray-400">Need help?</p>
                <p className="text-xl font-bold">+91 98765 43210</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="md:w-3/5 p-10 relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-primary mb-6">Dealer Application</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FloatingInput 
                      label="Agency Name" 
                      name="agencyName" 
                      value={formData.agencyName} 
                      onChange={handleChange} 
                      error={errors.agencyName} 
                    />
                    <FloatingInput 
                      label="Owner Name" 
                      name="ownerName" 
                      value={formData.ownerName} 
                      onChange={handleChange} 
                      error={errors.ownerName} 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FloatingInput 
                      label="Phone Number" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      error={errors.phone} 
                      type="tel"
                    />
                    <FloatingInput 
                      label="Email (Optional)" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      error={errors.email} 
                      type="email"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FloatingInput 
                      label="City" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleChange} 
                      error={errors.city} 
                    />
                    <FloatingInput 
                      label="GST Number (Optional)" 
                      name="gst" 
                      value={formData.gst} 
                      onChange={handleChange} 
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=" "
                      rows="3"
                      className="peer w-full border-b-2 border-gray-300 bg-transparent py-2 px-1 text-gray-900 focus:border-secondary focus:outline-none transition-colors resize-none"
                    ></textarea>
                    <label className="absolute left-1 top-2 text-gray-500 transition-all duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-xs peer-focus:text-secondary peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs">
                      Additional Message
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary hover:text-primary transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin w-5 h-5" /> Processing...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-6"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Application Submitted!</h3>
                  <p className="text-gray-500 mb-8">
                    Thank you for your interest. We have redirected you to WhatsApp to complete the verification process.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-secondary font-bold hover:underline"
                  >
                    Submit another application
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const FloatingInput = ({ label, name, value, onChange, error, type = "text" }) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`peer w-full border-b-2 bg-transparent py-2 px-1 text-gray-900 focus:outline-none transition-colors ${
          error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-secondary'
        }`}
      />
      <label className={`absolute left-1 top-2 transition-all duration-300 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-5 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-5 peer-[&:not(:placeholder-shown)]:text-xs ${
        error ? 'text-red-500' : 'text-gray-500 peer-focus:text-secondary'
      }`}>
        {label}
      </label>
      {error && (
        <span className="absolute right-0 top-2 text-red-500">
          <AlertCircle className="w-4 h-4" />
        </span>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default DealerRegistration;
