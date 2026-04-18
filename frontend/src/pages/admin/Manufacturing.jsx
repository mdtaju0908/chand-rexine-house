import React, { useState, useEffect } from 'react';
import { 
  Factory, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  MoreHorizontal,
  Plus,
  X,
  Loader2,
  Trash2,
  Edit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as api from '../../api';

const Manufacturing = () => {
  const [productionQueue, setProductionQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  // Stats (Mocked for now as API doesn't return these yet, or we calculate from queue)
  const [dailyCapacity, setDailyCapacity] = useState(500);
  const [producedToday, setProducedToday] = useState(0);

  useEffect(() => {
    loadManufacturingOrders();
  }, []);

  const loadManufacturingOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.fetchManufacturingOrders();
      setProductionQueue(data);
      
      // Simple calculation for "produced today" based on 'Ready' status items updated today
      // This is an approximation
      const today = new Date().toDateString();
      const produced = data
        .filter(item => item.status === 'Ready' && new Date(item.updatedAt).toDateString() === today)
        .reduce((acc, item) => acc + item.qty, 0);
      setProducedToday(produced);
      
    } catch (err) {
      console.error(err);
      setError('Failed to load manufacturing orders');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentJob({
      product: '',
      qty: 100,
      priority: 'Medium',
      deadline: '',
      status: 'Pending'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (job) => {
    setCurrentJob({ ...job });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (currentJob._id) {
        // Update
        const { data } = await api.updateManufacturingOrder(currentJob._id, currentJob);
        setProductionQueue(productionQueue.map(item => item._id === data._id ? data : item));
      } else {
        // Create
        const { data } = await api.createManufacturingOrder(currentJob);
        setProductionQueue([...productionQueue, data]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save job card');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await api.deleteManufacturingOrder(id);
        setProductionQueue(productionQueue.filter(item => item._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete job');
      }
    }
  };

  const statusColors = {
    'Pending': 'bg-yellow-500/20 text-yellow-400',
    'In Progress': 'bg-blue-500/20 text-blue-400',
    'Ready': 'bg-green-500/20 text-green-400'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Manufacturing Control</h1>
          <p className="text-gray-400 text-sm">Track daily production and order fulfillment.</p>
        </div>
        <button onClick={handleAddNew} className="bg-primary border border-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/5 flex items-center gap-2">
          <Plus size={18} /> Add Job Card
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Capacity Card */}
        <div className="bg-primary/50 border border-white/10 rounded-xl p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <Factory size={64} className="text-secondary" />
           </div>
           <h3 className="text-gray-400 font-medium mb-2">Daily Production</h3>
           <div className="flex items-end gap-2 mb-4">
             <span className="text-4xl font-bold text-white">{producedToday}</span>
             <span className="text-gray-500 text-sm mb-1">/ {dailyCapacity} units</span>
           </div>
           <div className="h-2 bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-secondary transition-all duration-500" style={{ width: `${Math.min((producedToday / dailyCapacity) * 100, 100)}%` }}></div>
           </div>
           <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
             <CheckCircle2 size={12} /> Live updates
           </p>
        </div>

        {/* Efficiency Card */}
        <div className="bg-primary/50 border border-white/10 rounded-xl p-6">
           <h3 className="text-gray-400 font-medium mb-2">Efficiency Rate</h3>
           <div className="flex items-end gap-2 mb-4">
             <span className="text-4xl font-bold text-green-400">92%</span>
             <span className="text-gray-500 text-sm mb-1">vs 85% avg</span>
           </div>
           <div className="flex gap-2 text-xs text-gray-400">
             <span className="bg-white/5 px-2 py-1 rounded">Shift A: 95%</span>
             <span className="bg-white/5 px-2 py-1 rounded">Shift B: 88%</span>
           </div>
        </div>

        {/* Pending Orders Card */}
        <div className="bg-primary/50 border border-white/10 rounded-xl p-6">
           <h3 className="text-gray-400 font-medium mb-2">Backlog</h3>
           <div className="flex items-end gap-2 mb-4">
             <span className="text-4xl font-bold text-yellow-400">
               {productionQueue.filter(j => j.status !== 'Ready').reduce((acc, j) => acc + j.qty, 0)}
             </span>
             <span className="text-gray-500 text-sm mb-1">units pending</span>
           </div>
           <p className="text-xs text-red-400 flex items-center gap-1">
             <AlertTriangle size={12} /> {productionQueue.filter(j => j.priority === 'High' && j.status !== 'Ready').length} High Priority Orders
           </p>
        </div>
      </div>

      {/* Production Queue */}
      <div className="bg-primary/50 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-bold text-white">Production Queue</h3>
          <div className="flex gap-2">
             <span className="text-xs text-gray-500 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div>High Priority</span>
             <span className="text-xs text-gray-500 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div>Medium</span>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-secondary" size={40} />
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Quantity</th>
                <th className="p-4 font-medium">Deadline</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300 text-sm">
              {productionQueue.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">No active jobs.</td>
                </tr>
              ) : productionQueue.map((item) => (
                <tr key={item._id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.priority === 'High' ? 'bg-red-500' : item.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                      <span className="text-white font-medium">{item.product}</span>
                    </div>
                  </td>
                  <td className="p-4">{item.qty} units</td>
                  <td className="p-4 flex items-center gap-2">
                    <Clock size={14} className="text-gray-500" />
                    {item.deadline || 'N/A'}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${statusColors[item.status] || 'bg-gray-500/20 text-gray-400'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(item)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Job Modal */}
      <AnimatePresence>
        {isModalOpen && currentJob && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark border border-white/10 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-primary/50">
                <h3 className="text-xl font-bold text-white">{currentJob._id ? 'Edit Job Card' : 'Create Job Card'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Product Name</label>
                  <input 
                    type="text" 
                    value={currentJob.product}
                    onChange={(e) => setCurrentJob({...currentJob, product: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    placeholder="e.g. Splendor Seat Cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Quantity</label>
                    <input 
                      type="number" 
                      value={currentJob.qty}
                      onChange={(e) => setCurrentJob({...currentJob, qty: parseInt(e.target.value)})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Priority</label>
                    <select 
                      value={currentJob.priority}
                      onChange={(e) => setCurrentJob({...currentJob, priority: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Deadline / ETA</label>
                    <input 
                      type="text" 
                      value={currentJob.deadline}
                      onChange={(e) => setCurrentJob({...currentJob, deadline: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                      placeholder="e.g. Tomorrow, 6 PM"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Status</label>
                    <select 
                      value={currentJob.status}
                      onChange={(e) => setCurrentJob({...currentJob, status: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Ready">Ready</option>
                    </select>
                  </div>
                </div>

                <button onClick={handleSave} className="w-full bg-secondary text-primary font-bold py-3 rounded-lg hover:bg-gold-400 transition-colors mt-4">
                  {currentJob._id ? 'Update Job Card' : 'Create Job Card'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Manufacturing;
