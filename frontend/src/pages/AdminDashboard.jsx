import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'enquiries', label: 'Dealer Enquiries', icon: Users },
    { id: 'products', label: 'Product Management', icon: Package },
    { id: 'uploads', label: 'Image Uploads', icon: ImageIcon },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'enquiries':
        return <DealerEnquiries />;
      default:
        return (
          <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
            <p>Module for {activeTab} is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-light">
      {/* Sidebar */}
      <div className="w-64 bg-primary text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-heading font-bold tracking-wider">
            CHAND <span className="text-secondary">REXINE</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-secondary text-primary font-bold shadow-glow' 
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h2>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-secondary w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            
            <button className="relative text-gray-500 hover:text-secondary transition-colors">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs">
                AD
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const stats = [
    { label: 'Total Dealers', value: '124', change: '+12%', color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'New Enquiries', value: '12', change: '+5%', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { label: 'Products Listed', value: '45', change: '+2', color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Pending Orders', value: '8', change: '-2%', color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Users className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                  <Bell size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">New dealer application from Mumbai</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-secondary hover:text-secondary transition-colors flex flex-col items-center justify-center gap-2">
              <Package size={24} />
              <span className="text-sm font-medium">Add Product</span>
            </button>
            <button className="p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-secondary hover:text-secondary transition-colors flex flex-col items-center justify-center gap-2">
              <ImageIcon size={24} />
              <span className="text-sm font-medium">Upload Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DealerEnquiries = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-bold text-lg">Recent Enquiries</h3>
        <button className="text-sm text-secondary font-medium hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Agency Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { name: 'Royal Auto Spares', owner: 'Rajesh Kumar', city: 'New Delhi', status: 'New' },
              { name: 'Bike Zone', owner: 'Amit Singh', city: 'Mumbai', status: 'Pending' },
              { name: 'Speed Motors', owner: 'Vikram Mehta', city: 'Pune', status: 'Verified' },
              { name: 'City Riders', owner: 'Suresh Reddy', city: 'Hyderabad', status: 'New' },
              { name: 'Auto World', owner: 'Deepak Verma', city: 'Chandigarh', status: 'Verified' },
            ].map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-gray-600">{item.owner}</td>
                <td className="px-6 py-4 text-gray-600">{item.city}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    item.status === 'New' ? 'bg-blue-100 text-blue-800' : 
                    item.status === 'Verified' ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-secondary hover:text-primary font-medium text-sm transition-colors">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
