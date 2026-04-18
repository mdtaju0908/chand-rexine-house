import React from 'react';
import { motion } from 'framer-motion';
import { Settings, PenTool, CheckCircle, Package, Truck, Award } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import SEO from '../components/SEO';

const Manufacturing = () => {
  const { getContentByKey } = useContent();
  const steps = [
    {
      id: 1,
      title: 'Material Selection',
      description: 'Sourcing premium grade Rexine and high-density foam from certified suppliers.',
      icon: Package
    },
    {
      id: 2,
      title: 'Precision Cutting',
      description: 'Advanced automated cutting machines ensure 100% accuracy for every bike model.',
      icon: Settings
    },
    {
      id: 3,
      title: 'Expert Stitching',
      description: 'Skilled craftsmen use double-stitching techniques for maximum durability.',
      icon: PenTool
    },
    {
      id: 4,
      title: 'Quality Control',
      description: 'Rigorous 3-step quality check: Water resistance, tear strength, and fit testing.',
      icon: CheckCircle
    },
    {
      id: 5,
      title: 'Packaging',
      description: 'Secure, branded packaging to prevent damage during transit.',
      icon: Award
    },
    {
      id: 6,
      title: 'Dispatch',
      description: 'Same-day dispatch for dealer orders via our logistics partners.',
      icon: Truck
    }
  ];

  return (
    <div className="bg-light min-h-screen pt-24 pb-20 overflow-hidden">
      <SEO pageKey="manufacturing" title="Manufacturing Process" />
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block mb-4 px-4 py-1 border border-secondary/50 rounded-full bg-secondary/10"
          >
            <span className="text-secondary text-sm font-bold uppercase tracking-widest">In-House Production</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6"
          >
            Manufacturing <span className="text-secondary">Excellence</span>
          </motion.h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            A state-of-the-art facility where traditional craftsmanship meets modern technology.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/10 via-secondary/50 to-primary/10 hidden md:block"></div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1 w-full md:w-1/2 p-6">
                  <div className={`bg-white p-8 rounded-2xl shadow-premium border-l-4 border-secondary hover:-translate-y-2 transition-transform duration-300 ${
                    index % 2 === 0 ? 'text-left' : 'md:text-right text-left'
                  }`}>
                    <div className={`md:hidden flex items-center mb-4 text-secondary`}>
                       <step.icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-primary border-4 border-white shadow-xl z-10 hidden md:flex">
                  <step.icon className="text-secondary w-8 h-8" />
                </div>

                {/* Spacer */}
                <div className="flex-1 w-full md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Factory Visuals */}
        <div className="mt-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-80 rounded-2xl overflow-hidden group">
              <img 
                src={getContentByKey('manufacturing_image_1', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')}
                alt="Factory Floor" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors"></div>
              <div className="absolute bottom-6 left-6">
                <h4 className="text-2xl font-bold text-white">{getContentByKey('manufacturing_title_1', 'Advanced Machinery')}</h4>
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden group">
              <img 
                src={getContentByKey('manufacturing_image_2', 'https://images.unsplash.com/photo-1605218427368-ade63ec171bd?q=80&w=2066&auto=format&fit=crop')}
                alt="Stock Area" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors"></div>
              <div className="absolute bottom-6 left-6">
                <h4 className="text-2xl font-bold text-white">{getContentByKey('manufacturing_title_2', 'Large Inventory')}</h4>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Manufacturing;
