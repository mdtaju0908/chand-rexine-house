import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  ShoppingBag, 
  Factory, 
  Users, 
  Globe, 
  Settings, 
  LogOut,
  Phone,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.png';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Dealer Enquiries', path: '/admin/enquiries', icon: Users },
    { name: 'Retail Enquiries', path: '/admin/retail-enquiries', icon: MessageSquare },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Manufacturing', path: '/admin/manufacturing', icon: Factory },
    { name: 'Dealer Mgmt', path: '/admin/dealers', icon: Globe }, // Using Globe as placeholder for Dealer Network
    { name: 'Website Content', path: '/admin/content', icon: Globe },
    { name: 'WhatsApp', path: '/admin/whatsapp', icon: Phone },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 bg-primary border-r border-white/10 w-64 flex flex-col`}
    >
      <div className="h-16 flex items-center px-6 border-b border-white/10 gap-3">
        <img src={logo} alt="CRH" className="h-8 w-auto" />
        <span className="text-xl font-heading font-bold text-secondary tracking-wider">
          CHAND ADMIN
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-3 py-3 rounded-lg transition-all group ${
                  isActive(item.path)
                    ? 'bg-secondary/20 text-secondary border border-secondary/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon 
                  size={20} 
                  className={`mr-3 transition-colors ${
                    isActive(item.path) ? 'text-secondary' : 'text-gray-500 group-hover:text-white'
                  }`} 
                />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          <span className="font-medium text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
