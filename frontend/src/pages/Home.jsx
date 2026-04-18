import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Factory, Truck, Users, Star, Award, Loader2 } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import SEO from '../components/SEO';
import { fetchTopProducts } from '../api';

const HeroSection = () => {
  const { getContentByKey } = useContent();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const heroTitle = getContentByKey('home_hero_title', 'Premium Seat Covers For The Modern Rider');
  const heroSubtitle = getContentByKey('home_hero_subtitle', 'Engineered for durability, designed for comfort.');
  const ctaText = getContentByKey('home_cta_text', 'Explore Collection');
  const heroBgImage = getContentByKey('home_hero_bg_image', '');

  const defaultHeroImages = [
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
  ];

  const heroImages = heroBgImage ? [heroBgImage] : defaultHeroImages;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-primary/80 z-10 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-primary z-10"></div>
        
        <AnimatePresence mode="popLayout">
          <motion.img 
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            alt="Hero Background"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full object-cover absolute inset-0"
          />
        </AnimatePresence>
      </motion.div>

      {/* Navigation Dots */}
      <div className="absolute bottom-32 right-10 z-30 hidden md:flex flex-col gap-4">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? 'bg-secondary scale-125' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-4 px-4 py-1 border border-secondary/30 rounded-full bg-black/30 backdrop-blur-sm">
            <span className="text-secondary text-sm font-medium tracking-widest uppercase">Export Quality Manufacturing</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-tight">
            {heroTitle}
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">
            {heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products" className="group relative px-8 py-4 bg-secondary text-primary font-bold rounded-lg overflow-hidden transition-all hover:shadow-glow hover:scale-105">
              <span className="relative z-10 flex items-center">
                {ctaText} <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
            <Link to="/dealer-registration" className="px-8 py-4 bg-transparent border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all">
              Become a Dealer
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-10 left-0 right-0 z-20 hidden md:flex justify-center gap-12 text-white/50"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-secondary" /> <span>ISO 9001 Certified</span>
        </div>
        <div className="flex items-center gap-2">
          <Factory className="text-secondary" /> <span>In-House Manufacturing</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="text-secondary" /> <span>Pan-India Supply</span>
        </div>
      </motion.div>
    </div>
  );
};

const TrustZone = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-secondary rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Daily Production", value: "5,000+", icon: Factory },
            { label: "Dealers Served", value: "120+", icon: Users },
            { label: "Years Experience", value: "15+", icon: Award },
            { label: "Quality Rating", value: "4.9/5", icon: Star },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-secondary/30 transition-colors group"
            >
              <stat.icon className="w-10 h-10 text-secondary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-gray-900 to-primary border border-white/10 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Dealer Network</h3>
            <p className="text-gray-400 mb-6">Partner with Chand Rexine House and get access to premium products, competitive pricing, and priority support.</p>
            <Link to="/dealer-registration" className="inline-flex items-center text-secondary font-bold hover:text-white transition-colors">
              Apply for Dealership <ChevronRight className="ml-1 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const PremiumWhyUs = () => {
  const { getContentByKey } = useContent();

  const features = [
    {
      title: "Premium Materials",
      description: getContentByKey('why_choose_us_1', "We use only high-grade Rexine and foam, ensuring durability and comfort that lasts for years."),
      icon: "💎"
    },
    {
      title: "Precision Stitching",
      description: getContentByKey('why_choose_us_2', "Computerized cutting and stitching technology for perfect fit and finish on every seat cover."),
      icon: "🧵"
    },
    {
      title: "Water Resistant",
      description: getContentByKey('why_choose_us_3', "Advanced coating technology makes our covers 100% water and dust resistant."),
      icon: "💧"
    }
  ];

  return (
    <section className="py-24 bg-light relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-primary mb-4">Why Choose Us</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{getContentByKey('about_text', '')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-premium hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-b-4 border-transparent hover:border-secondary"
            >
              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const { data } = await fetchTopProducts();
        setTrendingProducts(data);
      } catch (err) {
        console.error('Failed to load trending products', err);
      } finally {
        setLoading(false);
      }
    };
    loadTrending();
  }, []);

  return (
    <div className="bg-light min-h-screen">
      <SEO pageKey="home" />
      <HeroSection />
      <TrustZone />
      <PremiumWhyUs />
      
      {/* Featured Products Teaser */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-bold tracking-wider uppercase text-sm">Best Sellers</span>
              <h2 className="text-4xl font-heading font-bold text-primary mt-2">Trending Collections</h2>
            </div>
            <Link to="/products" className="hidden md:flex items-center text-primary font-bold hover:text-secondary transition-colors">
              View All Products <ChevronRight className="ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-secondary animate-spin" />
            </div>
          ) : trendingProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {trendingProducts.map((product) => (
                 <Link to="/products" key={product._id} className="group cursor-pointer">
                   <div className="relative overflow-hidden rounded-xl h-80 mb-4 bg-gray-100">
                     <img 
                       src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/400x400?text=No+Image"} 
                       alt={product.name} 
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <span className="px-6 py-2 bg-white text-primary font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View Details</span>
                     </div>
                   </div>
                   <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors">{product.name}</h3>
                   <p className="text-gray-500">Starting from ₹{product.retailPrice}</p>
                 </Link>
               ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500">No trending products available at the moment.</p>
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/products" className="inline-block px-8 py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
