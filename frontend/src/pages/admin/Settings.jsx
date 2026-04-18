import React, { useState, useEffect } from 'react';
import { User, Lock, Bell, Shield, LogOut, Plus, Trash2, X, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as api from '../../api';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    email: '',
    password: '',
    role: 'Editor'
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      setLoading(true);
      const { data } = await api.fetchStaff();
      setStaff(data);
    } catch (err) {
      console.error('Failed to fetch staff', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const { data } = await api.createStaff(newStaff);
      setStaff([...staff, data]);
      setIsModalOpen(false);
      setNewStaff({ email: '', password: '', role: 'Editor' });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to add staff');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteStaff = async (id) => {
    if (window.confirm('Are you sure you want to remove this staff member?')) {
      try {
        await api.deleteStaff(id);
        setStaff(staff.filter(s => s._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete staff');
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      <div className="bg-primary/50 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center gap-4">
          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold text-2xl">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.email?.split('@')[0] || 'Admin'}</h2>
            <p className="text-gray-400 text-sm capitalize">{user?.role || 'Super Admin'} Access</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <User size={20} className="text-gray-400" /> Profile Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Display Name</label>
                <input type="text" value={user?.email?.split('@')[0] || 'Admin'} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" readOnly />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                <input type="email" value={user?.email || ''} className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white" readOnly />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Lock size={20} className="text-gray-400" /> Security
            </h3>
            <button className="text-secondary text-sm font-medium hover:underline">Change Password</button>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield size={16} className="text-green-500" /> Two-factor authentication enabled
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Bell size={20} className="text-gray-400" /> Notifications
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Email notifications for new enquiries</span>
              <div className="w-10 h-5 bg-secondary rounded-full relative cursor-pointer">
                <div className="w-3 h-3 bg-primary rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <User size={20} className="text-gray-400" /> Staff Management
            </h3>
            <div className="bg-white/5 rounded-lg p-4 border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-300">Active Staff Accounts</span>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs bg-secondary text-primary font-bold px-2 py-1 rounded flex items-center gap-1 hover:bg-gold-400"
                >
                  <Plus size={12} /> Add New
                </button>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="animate-spin text-secondary" size={20} />
                </div>
              ) : (
                <div className="space-y-2">
                  {staff.length === 0 ? (
                    <p className="text-gray-500 text-xs text-center">No staff accounts found.</p>
                  ) : (
                    staff.map((staffMember) => (
                      <div key={staffMember._id} className="flex items-center justify-between text-sm p-2 hover:bg-white/5 rounded transition-colors">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            staffMember.role === 'Admin' ? 'bg-purple-500 text-white' : 'bg-blue-500 text-white'
                          }`}>
                            {staffMember.role.charAt(0)}
                          </div>
                          <div>
                            <span className="text-white block leading-none">{staffMember.email.split('@')[0]}</span>
                            <span className="text-gray-500 text-[10px]">{staffMember.email}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs ${staffMember.role === 'Admin' ? 'text-purple-400' : 'text-blue-400'}`}>
                            {staffMember.role}
                          </span>
                          {staffMember._id !== user._id && (
                            <button 
                              onClick={() => handleDeleteStaff(staffMember._id)}
                              className="text-gray-500 hover:text-red-500 transition-colors"
                              title="Remove Staff"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Shield size={20} className="text-gray-400" /> Recent Activity
            </h3>
            <div className="space-y-3">
              {[
                { action: 'Updated pricing for Splendor Cover', time: '2 hours ago', user: 'Founder' },
                { action: 'Approved new dealer: Metro Bikes', time: '5 hours ago', user: 'Founder' },
                { action: 'Exported monthly sales report', time: 'Yesterday', user: 'Manager' },
              ].map((log, i) => (
                <div key={i} className="flex items-start justify-between text-sm pb-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-gray-300">{log.action}</p>
                    <p className="text-xs text-gray-500">{log.user}</p>
                  </div>
                  <span className="text-xs text-gray-600">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <button onClick={handleLogout} className="text-red-500 font-medium flex items-center gap-2 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors">
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Add Staff Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark border border-white/10 rounded-xl w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-primary/50">
                <h3 className="text-xl font-bold text-white">Add Staff Member</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAddStaff} className="p-6 space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={newStaff.email}
                    onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    placeholder="staff@chandrexine.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Password</label>
                  <input 
                    type="password" 
                    required
                    minLength={6}
                    value={newStaff.password}
                    onChange={(e) => setNewStaff({...newStaff, password: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    placeholder="******"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Role</label>
                  <select 
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                  >
                    <option value="Editor">Editor (Can edit content)</option>
                    <option value="Admin">Admin (Full access)</option>
                    <option value="Viewer">Viewer (Read only)</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-secondary text-primary font-bold py-3 rounded-lg hover:bg-gold-400 transition-colors mt-4 flex justify-center items-center gap-2"
                >
                  {submitting ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} Create Account
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
