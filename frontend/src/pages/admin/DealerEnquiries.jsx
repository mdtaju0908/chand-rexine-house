import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Eye, Trash2, MessageCircle, CheckSquare, X, Calendar, Edit2, Phone, Save, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as api from '../../api';

const DealerEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const { data } = await api.fetchDealerEnquiries();
      setEnquiries(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load enquiries');
      setLoading(false);
    }
  };

  const handleEdit = (enquiry) => {
    setSelectedEnquiry({ ...enquiry });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const { data } = await api.updateDealerEnquiry(selectedEnquiry._id, selectedEnquiry);
      setEnquiries(enquiries.map(e => e._id === data._id ? data : e));
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update enquiry');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      try {
        await api.deleteDealerEnquiry(id);
        setEnquiries(enquiries.filter(e => e._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete enquiry');
      }
    }
  };

  const statusColors = {
    'New': 'bg-blue-500/20 text-blue-400',
    'Contacted': 'bg-yellow-500/20 text-yellow-400',
    'Negotiation': 'bg-purple-500/20 text-purple-400',
    'Active Dealer': 'bg-green-500/20 text-green-400',
    'Closed': 'bg-gray-500/20 text-gray-400',
    'Pending': 'bg-red-500/20 text-red-400'
  };

  const priorityColors = {
    'High': 'text-red-400',
    'Medium': 'text-yellow-400',
    'Low': 'text-green-400'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dealer Enquiries (CRM)</h1>
          <p className="text-gray-400 text-sm">Manage dealer pipeline and conversions.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-primary border border-white/10 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/5">
            <Filter size={18} /> Filter
          </button>
          <button className="bg-secondary text-primary font-bold px-4 py-2 rounded-lg hover:bg-gold-400">
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-primary/50 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search enquiries by agency name, city or phone..." 
              className="bg-black/20 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-secondary/50 w-full sm:w-96"
            />
          </div>
        </div>
        
        {loading ? (
           <div className="flex justify-center py-12">
             <Loader2 className="animate-spin text-secondary" size={40} />
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">Agency Name</th>
                  <th className="p-4 font-medium">Owner / City</th>
                  <th className="p-4 font-medium">Priority</th>
                  <th className="p-4 font-medium">Follow-Up</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300 text-sm">
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      No enquiries found.
                    </td>
                  </tr>
                ) : enquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-white">
                      {enquiry.agencyName}
                      <div className="text-xs text-gray-500 mt-1">{enquiry.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-white">{enquiry.ownerName}</div>
                      <div className="text-xs text-gray-500">{enquiry.city}</div>
                    </td>
                    <td className="p-4">
                      <span className={`flex items-center gap-1 font-medium ${priorityColors[enquiry.priority]}`}>
                        <div className={`w-2 h-2 rounded-full ${enquiry.priority === 'High' ? 'bg-red-500' : enquiry.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                        {enquiry.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                         <Calendar size={14} className="text-gray-500" />
                         {enquiry.followUp ? new Date(enquiry.followUp).toLocaleDateString() : 'N/A'}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${statusColors[enquiry.status] || 'bg-gray-500/20 text-gray-400'}`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(enquiry)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors" title="Edit / View Details">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(enquiry._id)} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && selectedEnquiry && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark border border-white/10 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-primary/50">
                <div>
                  <h3 className="text-xl font-bold text-white">Edit Enquiry Details</h3>
                  <p className="text-gray-400 text-sm">{selectedEnquiry.agencyName}</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Status</label>
                    <select 
                      value={selectedEnquiry.status}
                      onChange={(e) => setSelectedEnquiry({...selectedEnquiry, status: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Active Dealer">Active Dealer</option>
                      <option value="Closed">Closed / Lost</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Priority</label>
                    <select 
                      value={selectedEnquiry.priority}
                      onChange={(e) => setSelectedEnquiry({...selectedEnquiry, priority: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Follow Up Date</label>
                    <input 
                      type="date" 
                      value={selectedEnquiry.followUp ? new Date(selectedEnquiry.followUp).toISOString().split('T')[0] : ''}
                      onChange={(e) => setSelectedEnquiry({...selectedEnquiry, followUp: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Expected Value</label>
                    <input 
                      type="text" 
                      value={selectedEnquiry.expectedValue || ''}
                      onChange={(e) => setSelectedEnquiry({...selectedEnquiry, expectedValue: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                      placeholder="e.g. 50k / month"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Notes / Remarks</label>
                    <textarea 
                      value={selectedEnquiry.notes || ''}
                      onChange={(e) => setSelectedEnquiry({...selectedEnquiry, notes: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary h-24 resize-none"
                      placeholder="Enter conversation notes here..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-primary/30 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} className="px-4 py-2 bg-secondary text-primary font-bold rounded-lg hover:bg-gold-400 transition-colors flex items-center gap-2">
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DealerEnquiries;
