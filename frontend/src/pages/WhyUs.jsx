import React from 'react';
import { ShieldCheck, TrendingUp, Clock, Users, Award, Truck } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';

const WhyUs = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: "Direct Manufacturer",
      description: "No middlemen involved. Get the best prices directly from the factory."
    },
    {
      icon: TrendingUp,
      title: "Bulk Capacity",
      description: "Capable of handling large orders for agencies and showrooms with ease."
    },
    {
      icon: Award,
      title: "Consistent Quality",
      description: "We use premium materials to ensure every product meets high standards."
    },
    {
      icon: Clock,
      title: "On-time Delivery",
      description: "Committed to delivering your orders on schedule, every time."
    },
    {
      icon: Users,
      title: "Dealer Support",
      description: "Long-term partnership with dedicated support for our dealers."
    },
    {
      icon: Truck,
      title: "Pan India Supply",
      description: "Reliable logistics network to supply products across the country."
    }
  ];

  return (
    <div className="bg-gray-50 pb-20">
      <SEO pageKey="why_us" title="Why Choose Us" />
      {/* Header */}
      <div className="bg-primary text-white py-20 text-center">
        <Section>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Why Choose Us?</h1>
          <p className="text-xl max-w-2xl mx-auto px-4">
            We are committed to quality, trust, and long-term partnerships.
          </p>
        </Section>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Section key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-secondary">
              <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6">
                <reason.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
