import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, EyeOff, CheckSquare, AlertCircle, Save, X, Loader2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as api from '../../api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [searchTerm]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.fetchProducts(searchTerm);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct({ ...product });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setCurrentProduct({
      name: '',
      category: 'Sports',
      retailPrice: 0,
      dealerPrice: 0,
      moq: 10,
      visibility: 'Public',
      isBestSeller: false,
      stock: 0,
      description: '',
      images: [],
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    try {
      let imageUrls = currentProduct.images || [];

      if (imageFile) {
        setUploading(true);
        const url = await api.uploadImage(imageFile);
        imageUrls = [url]; // For MVP, replacing with single image. Can push to array for multiple.
        setUploading(false);
      }

      const productData = {
        ...currentProduct,
        images: imageUrls,
      };

      if (currentProduct._id) {
        // Update
        const { data } = await api.updateProduct(currentProduct._id, productData);
        setProducts(products.map((p) => (p._id === data._id ? data : p)));
      } else {
        // Create
        const { data } = await api.createProduct(productData);
        setProducts([...products, data]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save product');
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(id);
        setProducts(products.filter((p) => p._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete product');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Management</h1>
          <p className="text-gray-400 text-sm">Manage catalog, pricing, and dealer visibility.</p>
        </div>
        <button onClick={handleAddNew} className="bg-secondary text-primary font-bold px-4 py-2 rounded-lg hover:bg-gold-400 flex items-center gap-2">
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 bg-primary/50 p-4 rounded-xl border border-white/10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/20 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-secondary/50 w-full"
          />
        </div>
        <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10">
          <Filter size={18} /> Filter
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-secondary" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-primary/50 border border-white/10 rounded-xl overflow-hidden group hover:border-secondary/50 transition-colors relative">
              <div className="relative h-48 bg-gray-800">
                <img 
                  src={product.images[0] || `https://via.placeholder.com/300?text=${product.name}`} 
                  alt={product.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2 items-end">
                  {product.stock < 20 && (
                    <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                      <AlertCircle size={10} /> Low Stock
                    </div>
                  )}
                  {product.isBestSeller && (
                    <div className="bg-secondary text-primary text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> Best Seller
                    </div>
                  )}
                  {product.visibility === 'Agency Only' && (
                    <div className="bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                      <EyeOff size={10} /> Agency Only
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs text-secondary font-bold uppercase tracking-wider">{product.category}</span>
                    <h3 className="text-lg font-bold text-white leading-tight mt-1">{product.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm mt-4 mb-4">
                  <div>
                    <span className="block text-gray-500">Retail</span>
                    <span className="text-white font-medium">₹{product.retailPrice}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Dealer</span>
                    <span className="text-secondary font-bold">₹{product.dealerPrice}</span>
                  </div>
                  <div>
                    <span className="block text-gray-500">Stock</span>
                    <span className={`${product.stock < 10 ? 'text-red-400' : 'text-green-400'} font-medium`}>{product.stock}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-white/10 pt-3">
                  <button onClick={() => handleEdit(product)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit/Add Product Modal */}
      <AnimatePresence>
        {isModalOpen && currentProduct && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark border border-white/10 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-primary/50 sticky top-0 z-10 backdrop-blur-md">
                <h3 className="text-xl font-bold text-white">{currentProduct._id ? 'Edit Product' : 'Add New Product'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Product Name</label>
                    <input 
                      type="text" 
                      value={currentProduct.name} 
                      onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Category</label>
                    <select 
                      value={currentProduct.category}
                      onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    >
                      <option value="Sports">Sports</option>
                      <option value="Scooter">Scooter</option>
                      <option value="Cruiser">Cruiser</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Visibility</label>
                    <select 
                      value={currentProduct.visibility}
                      onChange={(e) => setCurrentProduct({...currentProduct, visibility: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    >
                      <option value="Public">Public (Everyone)</option>
                      <option value="Agency Only">Agency / Dealer Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Retail Price (₹)</label>
                    <input 
                      type="number" 
                      value={currentProduct.retailPrice} 
                      onChange={(e) => setCurrentProduct({...currentProduct, retailPrice: parseInt(e.target.value)})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Dealer Price (₹)</label>
                    <input 
                      type="number" 
                      value={currentProduct.dealerPrice} 
                      onChange={(e) => setCurrentProduct({...currentProduct, dealerPrice: parseInt(e.target.value)})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">MOQ (Min Order Qty)</label>
                    <input 
                      type="number" 
                      value={currentProduct.moq} 
                      onChange={(e) => setCurrentProduct({...currentProduct, moq: parseInt(e.target.value)})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Current Stock</label>
                    <input 
                      type="number" 
                      value={currentProduct.stock} 
                      onChange={(e) => setCurrentProduct({...currentProduct, stock: parseInt(e.target.value)})}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Description</label>
                    <textarea 
                      value={currentProduct.description} 
                      onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                      rows={3}
                      className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div className="md:col-span-2">
                     <label className="block text-gray-400 text-sm mb-2">Product Image</label>
                     <input 
                       type="file" 
                       onChange={handleImageUpload}
                       className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                     />
                     {currentProduct.images && currentProduct.images[0] && (
                        <div className="mt-2">
                          <img src={currentProduct.images[0]} alt="Preview" className="h-20 rounded" />
                        </div>
                     )}
                  </div>
                </div>

                <div className="flex items-center gap-2 p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer" onClick={() => setCurrentProduct({...currentProduct, isBestSeller: !currentProduct.isBestSeller})}>
                  <div className={`w-5 h-5 rounded flex items-center justify-center border ${currentProduct.isBestSeller ? 'bg-secondary border-secondary' : 'border-gray-500'}`}>
                    {currentProduct.isBestSeller && <CheckSquare size={14} className="text-primary" />}
                  </div>
                  <span className="text-white select-none">Mark as Best Seller</span>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-primary/30 flex justify-end gap-3 sticky bottom-0 z-10 backdrop-blur-md">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg hover:bg-white/5 text-gray-300 transition-colors">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={uploading} className="px-4 py-2 bg-secondary text-primary font-bold rounded-lg hover:bg-gold-400 transition-colors flex items-center gap-2 disabled:opacity-50">
                  {uploading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Product
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
