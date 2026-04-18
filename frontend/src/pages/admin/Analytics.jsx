import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, ShoppingBag, MapPin, Loader2 } from 'lucide-react';
import * as api from '../../api';

const Analytics = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [topProducts, setTopProducts] = useState([]);
  const [topDealers, setTopDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        const [dashboardRes, productsRes, dealersRes] = await Promise.all([
          api.fetchAnalyticsDashboard(),
          api.fetchTopProducts(),
          api.fetchDealers()
        ]);

        setDashboardData(dashboardRes.data);
        setTopProducts(productsRes.data);
        
        // Sort dealers by totalRevenue
        const sortedDealers = dealersRes.data
          .sort((a, b) => (b.totalRevenue || 0) - (a.totalRevenue || 0))
          .slice(0, 5);
        setTopDealers(sortedDealers);

      } catch (err) {
        console.error(err);
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Business Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary/50 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Users size={20} className="text-secondary" /> Dealer Conversion
          </h3>
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">{dashboardData?.summary?.conversionRate || 0}%</div>
              <p className="text-gray-400">Enquiry to Dealer Rate</p>
              {/* <p className="text-xs text-green-400 mt-2">+2% from last month</p> */}
            </div>
          </div>
        </div>

        <div className="bg-primary/50 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-blue-500" /> Top Regions
          </h3>
          <div className="space-y-4">
            {dashboardData?.charts?.topCities?.length > 0 ? (
              dashboardData.charts.topCities.map((region, idx) => {
                 // Calculate percentage based on total count of top cities for visualization
                 const totalTop = dashboardData.charts.topCities.reduce((acc, curr) => acc + curr.count, 0);
                 const percent = totalTop > 0 ? Math.round((region.count / totalTop) * 100) : 0;
                 
                 return (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{region.city}</span>
                      <span className="text-white font-bold">{region.count} ({percent}%)</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-gray-500 text-center py-4">No region data available</div>
            )}
          </div>
        </div>

        <div className="bg-primary/50 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <ShoppingBag size={20} className="text-purple-500" /> Top Products
          </h3>
          <div className="space-y-3">
            {topProducts.length > 0 ? (
              topProducts.map((prod, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300 text-sm">{prod.name}</span>
                  <span className="text-white font-bold text-sm">In Stock: {prod.stock}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">No top products data</div>
            )}
          </div>
        </div>

        <div className="bg-primary/50 border border-white/10 rounded-xl p-6 lg:col-span-3">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Users size={20} className="text-blue-400" /> Dealer Contribution (Top 5)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
             {topDealers.length > 0 ? (
               topDealers.map((d, i) => {
                 const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500'];
                 const color = colors[i % colors.length];
                 return (
                   <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                     <div className={`w-12 h-12 ${color} rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold opacity-80`}>
                       {d.agencyName.charAt(0)}
                     </div>
                     <h4 className="text-white font-medium text-sm mb-1">{d.agencyName}</h4>
                     <p className="text-secondary font-bold">₹{(d.totalRevenue || 0).toLocaleString()}</p>
                   </div>
                 );
               })
             ) : (
               <div className="col-span-5 text-center text-gray-500 py-4">No dealer data available</div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
