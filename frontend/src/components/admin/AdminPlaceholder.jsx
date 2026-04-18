import React from 'react';
import { useLocation } from 'react-router-dom';
import { Construction } from 'lucide-react';

const AdminPlaceholder = () => {
  const location = useLocation();
  const pageName = location.pathname.split('/').pop().replace('-', ' ').toUpperCase();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-secondary mb-4">
        <Construction size={48} />
      </div>
      <div>
        <h1 className="text-3xl font-heading font-bold text-white mb-2">{pageName}</h1>
        <p className="text-gray-400 max-w-md mx-auto">
          This module is currently under development. Please check back later or contact the system administrator.
        </p>
      </div>
    </div>
  );
};

export default AdminPlaceholder;
