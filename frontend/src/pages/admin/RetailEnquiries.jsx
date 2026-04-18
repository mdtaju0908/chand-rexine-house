import React, { useState, useEffect } from 'react';
import { Search, Filter, MessageCircle, Phone, MapPin, Calendar, CheckCircle, Clock, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as api from '../../api';

const RetailEnquiries = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const { data } = await api.fetchRetailEnquiries();
      setEnquiries(data);
    } catch (err) {
      setError('Failed to load enquiries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = (phone, name, product) => {
    // Remove spaces and special chars from phone
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = `Hi ${name}, thank you for contacting Chand Rexine House${product ? ` regarding ${product}` : ''}. How can we help you?`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await api.updateRetailEnquiry(id, { status: newStatus });
      setEnquiries(enquiries.map(e => e._id === id ? data : e));
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this enquiry?')) {
      try {
        await api.deleteRetailEnquiry(id);
        setEnquiries(enquiries.filter(e => e._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete enquiry');
      }
    }
  };

  const filteredEnquiries = enquiries.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.phone.includes(searchQuery);
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Retail Enquiries</h1>
          <p className="text-gray-400 text-sm">Manage direct customer queries</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search customer..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-primary/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-secondary/50"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-40 pl-10 pr-4 py-2 bg-primary/50 border border-white/10 rounded-lg text-white appearance-none focus:outline-none focus:border-secondary/50 cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {filteredEnquiries.map((enquiry) => (
            <motion.div
              key={enquiry._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-primary/30 border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {enquiry.name.charAt(0)}
                  </div>
                  
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{enquiry.name}</h3>
                      <select 
                        value={enquiry.status}
                        onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                        className={`px-2 py-0.5 rounded text-xs border-none outline-none cursor-pointer ${
                          enquiry.status === 'New' ? 'bg-blue-500/20 text-blue-400' :
                          enquiry.status === 'Contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        <option value="New" className="bg-dark text-white">New</option>
                        <option value="Contacted" className="bg-dark text-white">Contacted</option>
                        <option value="Closed" className="bg-dark text-white">Closed</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-x-4 gap-y-1 text-sm text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Phone size={14} />
                        {enquiry.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {new Date(enquiry.createdAt).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="bg-black/20 rounded-lg p-3 text-sm text-gray-300 border border-white/5">
                      <p>{enquiry.message}</p>
                      {enquiry.productName && (
                         <div className="mt-2 text-secondary text-xs font-semibold">
                           Interested in: {enquiry.productName}
                         </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start justify-end gap-2">
                  <button 
                    onClick={() => handleWhatsApp(enquiry.phone, enquiry.name, enquiry.productName)}
                    className="p-2 bg-green-600/20 text-green-500 rounded-lg hover:bg-green-600/30 transition-colors"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(enquiry._id)}
                    className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredEnquiries.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No enquiries found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default RetailEnquiries;
