import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, Send, Trash2, Edit, Copy, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as api from '../../api';

const WhatsAppSettings = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const { data } = await api.fetchWhatsAppTemplates();
      setTemplates(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentTemplate({
      title: '',
      content: '',
      type: 'Marketing'
    });
    setIsModalOpen(true);
  };

  const handleEdit = (template) => {
    setCurrentTemplate({ ...template });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (currentTemplate._id) {
        // Update
        const { data } = await api.updateWhatsAppTemplate(currentTemplate._id, currentTemplate);
        setTemplates(templates.map(t => t._id === data._id ? data : t));
      } else {
        // Create
        const { data } = await api.createWhatsAppTemplate(currentTemplate);
        setTemplates([...templates, data]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to save template');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await api.deleteWhatsAppTemplate(id);
        setTemplates(templates.filter(t => t._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete template');
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">WhatsApp Sales Engine</h1>
          <p className="text-gray-400 text-sm">Manage templates and automation rules.</p>
        </div>
        <button onClick={handleAddNew} className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
          <Plus size={18} /> New Template
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-primary/50 border border-white/10 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <h3 className="font-bold text-white">Message Templates</h3>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-secondary" size={40} />
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {templates.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No templates found.</div>
                ) : templates.map((template) => (
                  <div key={template._id} className="p-4 hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-white">{template.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 bg-white/10 rounded-full text-gray-400 border border-white/5">{template.type}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => copyToClipboard(template.content)} className="text-gray-400 hover:text-white" title="Copy">
                          <Copy size={16} />
                        </button>
                        <button onClick={() => handleEdit(template)} className="text-gray-400 hover:text-white" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(template._id)} className="text-gray-400 hover:text-red-500" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 bg-black/20 p-3 rounded-lg border border-white/5 font-mono whitespace-pre-wrap">
                      {template.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-primary/50 border border-white/10 rounded-xl p-6">
             <h3 className="font-bold text-white mb-4">Automation Rules</h3>
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-sm text-gray-300">Auto-reply to new enquiries</span>
                 <div className="w-10 h-5 bg-secondary rounded-full relative cursor-pointer">
                   <div className="w-3 h-3 bg-primary rounded-full absolute top-1 right-1"></div>
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-gray-300">Send catalog on "Hi"</span>
                 <div className="w-10 h-5 bg-gray-600 rounded-full relative cursor-pointer">
                   <div className="w-3 h-3 bg-white rounded-full absolute top-1 left-1"></div>
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-sm text-gray-300">Order status updates</span>
                 <div className="w-10 h-5 bg-secondary rounded-full relative cursor-pointer">
                   <div className="w-3 h-3 bg-primary rounded-full absolute top-1 right-1"></div>
                 </div>
               </div>
             </div>
          </div>

          <div className="bg-primary/50 border border-white/10 rounded-xl p-6">
             <h3 className="font-bold text-white mb-4">Quick Broadcast</h3>
             <textarea 
               className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white mb-4 focus:outline-none focus:border-secondary resize-none"
               rows={4}
               placeholder="Type your broadcast message..."
             ></textarea>
             <button className="w-full bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
               <Send size={16} /> Send to All Dealers
             </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Template Modal */}
      <AnimatePresence>
        {isModalOpen && currentTemplate && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-dark border border-white/10 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10 bg-primary/50">
                <h3 className="text-xl font-bold text-white">{currentTemplate._id ? 'Edit Template' : 'New Template'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Template Title</label>
                  <input 
                    type="text" 
                    value={currentTemplate.title}
                    onChange={(e) => setCurrentTemplate({...currentTemplate, title: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                    placeholder="e.g. Welcome Message"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Category</label>
                  <select 
                    value={currentTemplate.type}
                    onChange={(e) => setCurrentTemplate({...currentTemplate, type: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary"
                  >
                    <option value="Marketing">Marketing</option>
                    <option value="Transaction">Transaction</option>
                    <option value="Dealer">Dealer Communication</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Message Content</label>
                  <textarea 
                    value={currentTemplate.content}
                    onChange={(e) => setCurrentTemplate({...currentTemplate, content: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-secondary h-32 resize-none"
                    placeholder="Type your message template here..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">Use {'{name}'}, {'{link}'} as placeholders.</p>
                </div>

                <button onClick={handleSave} className="w-full bg-secondary text-primary font-bold py-3 rounded-lg hover:bg-gold-400 transition-colors mt-4">
                  {currentTemplate._id ? 'Update Template' : 'Create Template'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppSettings;
