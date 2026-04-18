import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import AgencySupply from './pages/AgencySupply';
import Products from './pages/Products';
import Manufacturing from './pages/Manufacturing';
import WhyUs from './pages/WhyUs';
import DealerRegistration from './pages/DealerRegistration';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

// Admin Imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import DealerEnquiries from './pages/admin/DealerEnquiries';
import RetailEnquiries from './pages/admin/RetailEnquiries';
import AdminProducts from './pages/admin/Products';
import AdminManufacturing from './pages/admin/Manufacturing';
import WhatsAppSettings from './pages/admin/WhatsAppSettings';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';
import AdminPlaceholder from './components/admin/AdminPlaceholder';
import Dealers from './pages/admin/Dealers';
import ContentManager from './pages/admin/ContentManager';

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Router>
          <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="agency-supply" element={<AgencySupply />} />
            <Route path="products" element={<Products />} />
            <Route path="manufacturing" element={<Manufacturing />} />
            <Route path="why-us" element={<WhyUs />} />
            <Route path="dealer-registration" element={<DealerRegistration />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="enquiries" element={<DealerEnquiries />} />
            <Route path="retail-enquiries" element={<RetailEnquiries />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="manufacturing" element={<AdminManufacturing />} />
            <Route path="dealers" element={<Dealers />} />
            <Route path="content" element={<ContentManager />} />
            <Route path="whatsapp" element={<WhatsAppSettings />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<AdminPlaceholder />} />
          </Route>
        </Routes>
      </Router>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;
