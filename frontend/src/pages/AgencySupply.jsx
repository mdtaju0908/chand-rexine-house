import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Bike, CalendarCheck, ClipboardList, CheckCircle2 } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';

const AgencySupply = () => {
  return (
    <div className="bg-gray-50 pb-20">
      <SEO pageKey="agency_supply" title="Agency Supply" />
      {/* Header */}
      <div className="bg-primary text-white py-20 text-center">
        <Section>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Agency Supply Partner</h1>
          <p className="text-xl max-w-2xl mx-auto px-4">
            Reliable seat cover solutions for Bike Showrooms & Agencies. We ensure your new deliveries look perfect.
          </p>
        </Section>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <Section className="bg-white rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="text-center">
             <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
               <Bike size={32} />
             </div>
             <h3 className="text-xl font-bold mb-2">New Bike Delivery</h3>
             <p className="text-gray-600">Premium covers for every new bike delivery to enhance customer satisfaction.</p>
           </div>
           <div className="text-center">
             <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
               <Truck size={32} />
             </div>
             <h3 className="text-xl font-bold mb-2">Bulk Supply</h3>
             <p className="text-gray-600">Large quantity orders delivered on time for your stock maintenance.</p>
           </div>
           <div className="text-center">
             <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
               <CalendarCheck size={32} />
             </div>
             <h3 className="text-xl font-bold mb-2">Monthly Contracts</h3>
             <p className="text-gray-600">Consistent supply chain management with monthly contract options.</p>
           </div>
        </Section>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1558981806-ec527fa84f3d?q=80&w=2070&auto=format&fit=crop" 
              alt="Bike Showroom" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6 text-primary">Why Partner With Us?</h2>
            <ul className="space-y-4">
              {[
                "Direct Manufacturer Pricing (No Middlemen)",
                "Custom Branding Options Available",
                "Wide Range of Models (Splendor, Activa, Pulsar, etc.)",
                "Priority Support for Agencies",
                "Easy Returns & Replacement Policy"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-lg text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/dealer-registration" className="bg-secondary hover:bg-yellow-500 text-dark font-bold py-3 px-8 rounded-full transition-colors inline-flex items-center">
                <ClipboardList className="mr-2" />
                Register as Dealer
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default AgencySupply;
