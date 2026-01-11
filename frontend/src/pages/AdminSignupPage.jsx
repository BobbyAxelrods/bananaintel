import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import { Lock, User, Mail, Key } from 'lucide-react';

const AdminSignupPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    admin_token: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const { admin_token, ...user_data } = formData;
      const url = `${API_BASE_URL}/api/auth/signup?admin_token=${admin_token}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user_data),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Admin account created successfully! Check email for verification.' });
        setFormData({
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            admin_token: ''
        });
      } else {
        setStatus({ type: 'error', message: data.detail || 'Registration failed' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-3 mb-6">
           <div className="bg-black text-white p-2">
             <Lock className="w-6 h-6" />
           </div>
           <h1 className="text-2xl font-bold font-mono">ADMIN ACCESS</h1>
        </div>

        <p className="mb-6 text-gray-600 text-sm">
          Restricted area. Valid admin token required for account generation.
        </p>

        {status.message && (
          <div className={`mb-6 p-4 text-sm font-bold border-2 ${
            status.type === 'success' 
              ? 'bg-green-100 border-green-500 text-green-800' 
              : 'bg-red-100 border-red-500 text-red-800'
          }`}>
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-bold uppercase mb-1">First Name</label>
                <input
                    type="text"
                    name="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full border-2 border-black p-2 focus:ring-0 focus:outline-none bg-gray-50"
                />
            </div>
            <div>
                <label className="block text-xs font-bold uppercase mb-1">Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full border-2 border-black p-2 focus:ring-0 focus:outline-none bg-gray-50"
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Username</label>
            <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    name="username"
                    required
                    maxLength={8}
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border-2 border-black pl-9 p-2 focus:ring-0 focus:outline-none bg-gray-50"
                    placeholder="Max 8 chars"
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Email</label>
            <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-2 border-black pl-9 p-2 focus:ring-0 focus:outline-none bg-gray-50"
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-1">Password</label>
            <div className="relative">
                <Key className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border-2 border-black pl-9 p-2 focus:ring-0 focus:outline-none bg-gray-50"
                />
            </div>
          </div>

          <div className="pt-4 border-t-2 border-gray-200">
            <label className="block text-xs font-bold uppercase mb-1 text-red-600">Admin Token</label>
            <input
                type="password"
                name="admin_token"
                required
                value={formData.admin_token}
                onChange={handleChange}
                className="w-full border-2 border-red-500 p-2 focus:ring-0 focus:outline-none bg-red-50 text-red-700 font-mono"
                placeholder="Enter secure token"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white font-bold py-3 border-2 border-transparent hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {loading ? 'GENERATING...' : 'GENERATE ADMIN ACCOUNT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignupPage;
