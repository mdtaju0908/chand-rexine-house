import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAnalyticsDashboard } from '../../api';

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary/50 backdrop-blur-sm border border-white/10 p-6 rounded-xl relative overflow-hidden group hover:border-secondary/30 transition-colors"
    >
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
        <Icon size={64} />
      </div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-3 rounded-lg bg-white/5 ${color} text-white`}>
          <Icon size={24} />
        </div>
        {change && (
          <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
            {change}
          </div>
        )}
      </div>
      
      <div className="relative z-10">
        <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
};

const ActionCard = ({ title, count, icon: Icon, color, items, cta }) => (
  <div className="bg-primary/50 border border-white/10 rounded-xl p-6 h-full flex flex-col">
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-2 rounded-lg ${color} bg-opacity-20 text-${color.split('-')[1]}-400`}>
        <Icon size={20} />
      </div>
      <div>
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-xs text-gray-400">{count} pending tasks</p>
      </div>
    </div>
    
    <div className="flex-1 space-y-4 mb-6">
      {items.length > 0 ? (
        items.map((item, idx) => (
          <div key={idx} className="flex items-start justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 mt-2 rounded-full ${item.status === 'New' ? 'bg-red-500' : 'bg-yellow-500'}`} />
              <div>
                <p className="text-sm font-medium text-white group-hover:text-secondary transition-colors">{item.agencyName || 'Unknown Agency'}</p>
                <p className="text-xs text-gray-500">{item.city} • {item.status}</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-sm text-center py-4">No recent activity</div>
      )}
    </div>

    <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-colors">
      {cta}
    </button>
  </div>
);

const DashboardHome = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const { data } = await fetchAnalyticsDashboard();
        setData(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400">
        {error}
      </div>
    );
  }

  const stats = [
    { title: 'Total Enquiries', value: data?.summary?.totalEnquiries || 0, change: null, isPositive: true, icon: MessageSquare, color: 'bg-blue-500' },
    { title: 'Active Dealers', value: data?.summary?.activeDealers || 0, change: null, isPositive: true, icon: Users, color: 'bg-green-500' },
    { title: 'Products Listed', value: data?.summary?.totalProducts || 0, change: null, isPositive: true, icon: ShoppingBag, color: 'bg-purple-500' },
    { title: 'Conversion Rate', value: `${data?.summary?.conversionRate}%` || '0%', change: null, isPositive: true, icon: TrendingUp, color: 'bg-secondary' },
  ];

  const recentEnquiries = data?.recentEnquiries || [];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActionCard 
          title="Recent Enquiries" 
          count={recentEnquiries.length}
          icon={MessageSquare} 
          color="bg-blue-500"
          items={recentEnquiries}
          cta="View All Enquiries"
        />
        
        {/* Placeholder for now as API doesn't separate pending conversions yet */}
        <ActionCard 
          title="Pending Actions" 
          count={0}
          icon={TrendingUp} 
          color="bg-orange-500"
          items={[]}
          cta="View Pipeline"
        />
      </div>
    </div>
  );
};

export default DashboardHome;
