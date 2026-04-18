import API from './axios';

// Auth
export const login = (email, password) => API.post('/auth/login', { email, password });
export const getProfile = () => API.get('/auth/me');
export const fetchStaff = () => API.get('/auth/users');
export const createStaff = (userData) => API.post('/auth/users', userData);
export const deleteStaff = (id) => API.delete(`/auth/users/${id}`);

// Products
export const fetchProducts = (keyword = '') => API.get(`/products?keyword=${keyword}`);
export const fetchProductById = (id) => API.get(`/products/${id}`);
export const fetchTopProducts = () => API.get('/products/top');
export const createProduct = (productData) => API.post('/products', productData);
export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Enquiries (Dealer)
export const createDealerEnquiry = (enquiryData) => API.post('/enquiries/dealer', enquiryData);
export const fetchDealerEnquiries = () => API.get('/enquiries/dealer');
export const updateDealerEnquiry = (id, enquiryData) => API.put(`/enquiries/dealer/${id}`, enquiryData);
export const deleteDealerEnquiry = (id) => API.delete(`/enquiries/dealer/${id}`);

// Enquiries (Retail)
export const createRetailEnquiry = (enquiryData) => API.post('/enquiries/retail', enquiryData);
export const fetchRetailEnquiries = () => API.get('/enquiries/retail');
export const updateRetailEnquiry = (id, enquiryData) => API.put(`/enquiries/retail/${id}`, enquiryData);
export const deleteRetailEnquiry = (id) => API.delete(`/enquiries/retail/${id}`);

// Dealers
export const fetchDealers = () => API.get('/dealers');
export const createDealer = (dealerData) => API.post('/dealers', dealerData);
export const updateDealer = (id, dealerData) => API.put(`/dealers/${id}`, dealerData);
export const deleteDealer = (id) => API.delete(`/dealers/${id}`);

// Manufacturing
export const fetchManufacturingOrders = () => API.get('/manufacturing');
export const createManufacturingOrder = (orderData) => API.post('/manufacturing', orderData);
export const updateManufacturingOrder = (id, orderData) => API.put(`/manufacturing/${id}`, orderData);
export const deleteManufacturingOrder = (id) => API.delete(`/manufacturing/${id}`);

// WhatsApp
export const fetchWhatsAppTemplates = () => API.get('/whatsapp-templates');
export const createWhatsAppTemplate = (templateData) => API.post('/whatsapp-templates', templateData);
export const updateWhatsAppTemplate = (id, templateData) => API.put(`/whatsapp-templates/${id}`, templateData);
export const deleteWhatsAppTemplate = (id) => API.delete(`/whatsapp-templates/${id}`);

// Analytics
export const fetchAnalyticsDashboard = () => API.get('/analytics/dashboard');

// Upload
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const { data } = await API.post('/upload', formData, config);
  return data;
};

// Content
export const fetchContent = () => API.get('/content');
export const updateContent = (key, value) => API.put(`/content/${key}`, { value });
export const initContent = () => API.post('/content/init');
