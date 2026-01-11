import React, { useState, useEffect } from 'react';
import { Plus, Save, Check, Edit, Trash2, LogOut } from 'lucide-react';
import Login from './Login';
import { API_BASE_URL } from '../config';

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    type: 'report', // report, ai_tool, open_source
    description: '',
    content: '',
    url: '',
    is_premium: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Initial fetch
  useEffect(() => {
    if (token) fetchItems();
  }, [token]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/intel`);
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'report',
      description: '',
      content: '',
      url: '',
      is_premium: false
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      type: item.type,
      description: item.description || '',
      content: item.content || '',
      url: item.url || '',
      is_premium: item.is_premium
    });
    setIsEditing(true);
    setEditingId(item.id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    
    try {
      const response = await fetch(`http://localhost:8000/api/intel/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        fetchItems();
      } else {
        alert('Failed to delete');
      }
    } catch (err) {
      alert('Error deleting');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const url = isEditing 
      ? `${API_BASE_URL}/api/intel/${editingId}`
      : `${API_BASE_URL}/api/intel/`;
    
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSuccess(true);
        resetForm();
        fetchItems();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Failed to save');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans flex flex-col lg:flex-row gap-8">
      
      {/* Sidebar / Form */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 sticky top-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              {isEditing ? 'Edit Intel' : 'New Intel'}
            </h1>
            <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1">
              <LogOut size={14} /> Logout
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="e.g., Healthcare AI Trends"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              >
                <option value="report">Newsletter / Report</option>
                <option value="ai_tool">AI Tool</option>
                <option value="open_source">Open Source Repo</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Short Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="Brief summary for the card..."
              ></textarea>
            </div>

            {/* Content (Markdown) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Content (Markdown)</label>
              <textarea 
                name="content" 
                value={formData.content} 
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none font-mono text-sm"
                placeholder="# Deep Dive..."
              ></textarea>
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">External URL</label>
              <input 
                type="url" 
                name="url" 
                value={formData.url} 
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                placeholder="https://github.com/..."
              />
            </div>

            {/* Premium Checkbox */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded border border-gray-200">
              <input 
                type="checkbox" 
                name="is_premium" 
                checked={formData.is_premium} 
                onChange={handleChange}
                className="w-5 h-5 text-black rounded focus:ring-black"
              />
              <label className="text-sm font-bold text-gray-700">Locked for Members (Premium)</label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-2">
              {isEditing && (
                 <button 
                  type="button" 
                  onClick={resetForm}
                  className="w-1/3 py-3 font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded uppercase tracking-wider"
                >
                  Cancel
                </button>
              )}
              <button 
                type="submit" 
                disabled={loading}
                className={`flex-1 py-3 font-bold text-white uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded
                  ${success ? 'bg-green-600' : 'bg-black hover:bg-gray-800'}
                `}
              >
                {loading ? 'Saving...' : success ? (
                  <>Saved <Check className="w-5 h-5" /></>
                ) : (
                  <>{isEditing ? 'Update' : 'Add'} Intel <Save className="w-5 h-5" /></>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Main Content / List */}
      <div className="w-full lg:w-2/3">
         <h2 className="text-xl font-bold mb-4">Existing Intelligence ({items.length})</h2>
         <div className="grid gap-4">
            {items.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${item.is_premium ? 'bg-black text-white' : 'bg-green-100 text-green-800'}`}>
                      {item.is_premium ? 'Premium' : 'Free'}
                    </span>
                    <span className="text-xs text-gray-500 uppercase">{item.type}</span>
                    <span className="text-xs text-gray-400">{item.created_at.split('T')[0]}</span>
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mt-1">{item.description}</p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
