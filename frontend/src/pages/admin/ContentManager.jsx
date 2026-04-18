import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Layout, FileText, Phone, Search, Globe, Loader2, CheckCircle, Image as ImageIcon, Upload, Trash2, Settings } from 'lucide-react';
import { fetchContent, updateContent, initContent, uploadImage } from '../../api';

const ContentManager = () => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const { data } = await fetchContent();
      if (data.length === 0) {
        // Initialize defaults if empty
        await initContent();
        const res = await fetchContent();
        setContent(res.data);
      } else {
        setContent(data);
      }
    } catch (err) {
      console.error('Failed to load content', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (key, value) => {
    try {
      setSaving(key);
      await updateContent(key, value);
      
      // Update local state
      setContent(prev => prev.map(item => 
        item.key === key ? { ...item, value } : item
      ));

      setMessage({ type: 'success', text: 'Saved successfully' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('Failed to save', err);
      setMessage({ type: 'error', text: 'Failed to save changes' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key, newValue) => {
    setContent(prev => prev.map(item => 
      item.key === key ? { ...item, value: newValue } : item
    ));
  };

  const getSectionContent = (section) => {
    return content.filter(item => item.section === section);
  };

  const handleImageUpload = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(key);
      const imageUrl = await uploadImage(file);
      await handleUpdate(key, imageUrl);
    } catch (err) {
      console.error('Failed to upload image', err);
      setMessage({ type: 'error', text: 'Failed to upload image' });
    } finally {
      setUploading(false);
    }
  };

  const tabs = [
    { id: 'home', label: 'Homepage', icon: Layout },
    { id: 'about', label: 'About Us', icon: FileText },
    { id: 'manufacturing', label: 'Manufacturing', icon: Settings },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'footer', label: 'Footer', icon: Layout },
    { id: 'seo', label: 'SEO Settings', icon: Search },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">Website Content</h1>
          <p className="text-gray-400 mt-1">Manage text and information across your website</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={loadContent}
            className="p-2 bg-white/5 text-gray-400 hover:text-white rounded-lg transition-colors"
            title="Refresh Content"
          >
            <RefreshCw size={20} />
          </button>
          <button 
            onClick={async () => {
              setLoading(true);
              try {
                await initContent();
                await loadContent();
                setMessage({ type: 'success', text: 'Content fields initialized' });
              } catch (err) {
                console.error(err);
                setMessage({ type: 'error', text: 'Failed to initialize' });
              } finally {
                setLoading(false);
              }
            }}
            className="p-2 bg-white/5 text-gray-400 hover:text-white rounded-lg transition-colors"
            title="Initialize Missing Fields"
          >
            <CheckCircle size={20} />
          </button>
          <a 
            href="/" 
            target="_blank" 
            className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-lg transition-colors"
          >
            <Globe size={18} />
            View Site
          </a>
        </div>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}
        >
          {message.type === 'success' ? <CheckCircle size={20} /> : null}
          {message.text}
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-white/10 pb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-secondary text-secondary'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="py-20 text-center text-gray-400">
          <Loader2 size={40} className="animate-spin mx-auto mb-4 opacity-50" />
          <p>Loading content configuration...</p>
        </div>
      ) : (
        <div className="grid gap-6 max-w-4xl">
          {getSectionContent(activeTab).length === 0 ? (
            <div className="text-center py-10 bg-white/5 rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-4">
              <p className="text-gray-500">No content fields configured for this section.</p>
              <button 
                onClick={async () => {
                  setLoading(true);
                  try {
                    await initContent();
                    await loadContent();
                    setMessage({ type: 'success', text: 'Content fields initialized' });
                  } catch (err) {
                    console.error(err);
                    setMessage({ type: 'error', text: 'Failed to initialize' });
                  } finally {
                    setLoading(false);
                  }
                }}
                className="px-4 py-2 bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-lg transition-colors flex items-center gap-2"
              >
                <CheckCircle size={18} />
                Initialize Missing Fields
              </button>
            </div>
          ) : (
            getSectionContent(activeTab).map((item) => (
              <div key={item.key} className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <label className="text-sm font-medium text-secondary uppercase tracking-wider">
                    {item.label || item.key.replace(/_/g, ' ')}
                  </label>
                  <span className="text-xs text-gray-600 font-mono">{item.key}</span>
                </div>
                
                <div className="relative">
                  {item.type === 'image' ? (
                    <div className="space-y-3">
                      {item.value && (
                        <div className="relative w-full h-48 bg-black/20 rounded-lg overflow-hidden group">
                          <img 
                            src={item.value} 
                            alt={item.label} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <a 
                              href={item.value} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-white hover:text-secondary flex items-center gap-2"
                            >
                              <ImageIcon size={20} />
                              View Full
                            </a>
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => handleChange(item.key, e.target.value)}
                          placeholder="Image URL"
                          className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                        />
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, item.key)}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            disabled={uploading === item.key}
                          />
                          <button 
                            className="h-full px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
                            disabled={uploading === item.key}
                          >
                            {uploading === item.key ? (
                              <Loader2 size={20} className="animate-spin" />
                            ) : (
                              <Upload size={20} />
                            )}
                          </button>
                        </div>
                        {item.value && (
                          <button 
                            onClick={() => handleChange(item.key, '')}
                            className="px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex items-center justify-center"
                            title="Remove Image"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : item.type === 'longtext' ? (
                    <div className="space-y-3">
                      <textarea
                        value={item.value}
                        onChange={(e) => handleChange(item.key, e.target.value)}
                        rows={4}
                        className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-secondary transition-colors"
                      />
                      {item.key === 'contact_map_embed_url' && item.value && (
                        <div className="w-full h-64 bg-black/20 rounded-lg overflow-hidden border border-white/10">
                          <iframe 
                            src={item.value} 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            title="Map Preview"
                          ></iframe>
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => handleChange(item.key, e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary transition-colors"
                    />
                  )}
                  
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={() => handleUpdate(item.key, item.value)}
                      disabled={saving === item.key}
                      className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary font-bold rounded-lg hover:bg-secondary/90 disabled:opacity-50 transition-all"
                    >
                      {saving === item.key ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Save size={16} />
                      )}
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ContentManager;
