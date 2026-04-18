import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Filter, MoreVertical, Edit2, Trash2, 
  CheckCircle, XCircle, Loader2, Building2, User, MapPin, Phone,
  BarChart3, Calendar, AlertTriangle
} from 'lucide-react';
import { 
  fetchDealers, createDealer, updateDealer, deleteDealer 
} from '../../api';

const Dealers = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, inactive
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentDealer, setCurrentDealer] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    agencyName: '',
    ownerName: '',
    city: '',
    phone: '',
    monthlyVolume: '',
    activeStatus: true
  });

  useEffect(() => {
    loadDealers();
  }, []);

  const loadDealers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchDealers();
      setDealers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load dealers. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (status) => setFilterStatus(status);

  const filteredDealers = dealers.filter(dealer => {
    const matchesSearch = 
      dealer.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.phone.includes(searchTerm);
    
    const matchesFilter = 
      filterStatus === 'all' ? true :
      filterStatus === 'active' ? dealer.activeStatus :
      !dealer.activeStatus;

    return matchesSearch && matchesFilter;
  });

  const openAddModal = () => {
    setCurrentDealer(null);
    setFormData({
      agencyName: '',
      ownerName: '',
      city: '',
      phone: '',
      monthlyVolume: '',
      activeStatus: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (dealer) => {
    setCurrentDealer(dealer);
    setFormData({
      agencyName: dealer.agencyName,
      ownerName: dealer.ownerName,
      city: dealer.city,
      phone: dealer.phone,
      monthlyVolume: dealer.monthlyVolume || '',
      activeStatus: dealer.activeStatus
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (dealer) => {
    setCurrentDealer(dealer);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      if (currentDealer) {
        await updateDealer(currentDealer._id, formData);
        setDealers(dealers.map(d => d._id === currentDealer._id ? { ...d, ...formData } : d));
      } else {
        const { data } = await createDealer(formData);
        setDealers([data, ...dealers]);
      }
      setIsModalOpen(false);
      loadDealers(); // Reload to ensure sync
    } catch (err) {
      console.error(err);
      alert('Failed to save dealer');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async () => {
    setModalLoading(true);
    try {
      await deleteDealer(currentDealer._id);
      setDealers(dealers.filter(d => d._id !== currentDealer._id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to delete dealer');
    } finally {
      setModalLoading(false);
    }
  };

  const toggleStatus = async (dealer) => {
    try {
      const newStatus = !dealer.activeStatus;
      await updateDealer(dealer._id, { activeStatus: newStatus });
      setDealers(dealers.map(d => d._id === dealer._id ? { ...d, activeStatus: newStatus } : d));
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Dealer Management</h1>
          <p className="text-gray-400 mt-1">Manage your dealer network and performance</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-secondary text-primary px-6 py-3 rounded-xl font-bold hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20"
        >
          <Plus size={20} />
          Add New Dealer
        </button>
      </div>

      {/* Stats Cards (Optional Summary) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Dealers</p>
              <p className="text-2xl font-bold text-white">{dealers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 text-green-400 rounded-lg">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Dealers</p>
              <p className="text-2xl font-bold text-white">
                {dealers.filter(d => d.activeStatus).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/20 text-red-400 rounded-lg">
              <XCircle size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Inactive Dealers</p>
              <p className="text-2xl font-bold text-white">
                {dealers.filter(d => !d.activeStatus).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search agency, owner, city..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-black/20 border border-white/10 text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-secondary/50"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <Filter size={20} className="text-gray-400" />
          {['all', 'active', 'inactive'].map((status) => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                filterStatus === status
                  ? 'bg-secondary text-primary'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 border-b border-white/10">
                <th className="p-4 text-gray-400 font-medium text-sm">Agency</th>
                <th className="p-4 text-gray-400 font-medium text-sm">Owner</th>
                <th className="p-4 text-gray-400 font-medium text-sm">Contact</th>
                <th className="p-4 text-gray-400 font-medium text-sm">Volume</th>
                <th className="p-4 text-gray-400 font-medium text-sm">Status</th>
                <th className="p-4 text-gray-400 font-medium text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    <Loader2 size={32} className="animate-spin mx-auto mb-2" />
                    Loading dealers...
                  </td>
                </tr>
              ) : filteredDealers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    No dealers found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredDealers.map((dealer) => (
                  <tr key={dealer._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                          {dealer.agencyName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{dealer.agencyName}</p>
                          <div className="flex items-center text-xs text-gray-500 gap-1 mt-0.5">
                            <Calendar size={12} />
                            {new Date(dealer.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        {dealer.ownerName}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-gray-500" />
                          {dealer.city}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-gray-500" />
                          {dealer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <BarChart3 size={16} className="text-gray-500" />
                        {dealer.monthlyVolume || 'N/A'}
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(dealer)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          dealer.activeStatus
                            ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                        }`}
                      >
                        {dealer.activeStatus ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(dealer)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(dealer)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-heading font-bold text-white">
                  {currentDealer ? 'Edit Dealer' : 'Add New Dealer'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XCircle size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Agency Name</label>
                    <input
                      type="text"
                      required
                      value={formData.agencyName}
                      onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Owner Name</label>
                    <input
                      type="text"
                      required
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Monthly Volume</label>
                  <input
                    type="text"
                    value={formData.monthlyVolume}
                    onChange={(e) => setFormData({ ...formData, monthlyVolume: e.target.value })}
                    placeholder="e.g. 500 Rolls"
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-secondary"
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="activeStatus"
                    checked={formData.activeStatus}
                    onChange={(e) => setFormData({ ...formData, activeStatus: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-secondary focus:ring-offset-gray-900"
                  />
                  <label htmlFor="activeStatus" className="text-gray-300">Active Dealer</label>
                </div>
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={modalLoading}
                    className="flex-1 px-4 py-2 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    {modalLoading ? <Loader2 size={18} className="animate-spin" /> : 'Save Dealer'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-xl font-heading font-bold text-white mb-2">Delete Dealer?</h2>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete <span className="text-white font-bold">{currentDealer?.agencyName}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={modalLoading}
                  className="flex-1 px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  {modalLoading ? <Loader2 size={18} className="animate-spin" /> : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dealers;
