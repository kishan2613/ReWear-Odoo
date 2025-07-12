import React, { useState, useEffect } from 'react';
import { User, Package, BarChart3, Eye, Trash2, Search, Settings } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/admin';
const ADMIN_TOKEN = 'supersecrettoken123'; // Optional: move to .env or localStorage

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ users: 0, products: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const res = await fetch(`${API_BASE}/users`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminToken: ADMIN_TOKEN })
        });
        const data = await res.json();
        setUsers(data.length ? data : fallbackUsers());
      } else if (activeTab === 'listings') {
        const res = await fetch(`${API_BASE}/products`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminToken: ADMIN_TOKEN })
        });
        const data = await res.json();
        setProducts(data.length ? data : fallbackProducts());
      } else if (activeTab === 'stats') {
        const res = await fetch(`${API_BASE}/stats`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminToken: ADMIN_TOKEN })
        });
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load data. Showing fallback info.');
      if (activeTab === 'users') setUsers(fallbackUsers());
      if (activeTab === 'listings') setProducts(fallbackProducts());
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    const endpoint = type === 'user' ? 'user' : 'product';
    try {
      await fetch(`${API_BASE}/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminToken: ADMIN_TOKEN })
      });
      if (type === 'user') setUsers(prev => prev.filter(u => u._id !== id));
      if (type === 'product') setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      setError(`Failed to delete ${type}`);
    }
  };

  const fallbackUsers = () => ([
    { _id: '1', name: 'Fallback User', email: 'fallback@example.com', role: 'user', createdAt: new Date() }
  ]);

  const fallbackProducts = () => ([
    { _id: '1', name: 'Fallback Item', description: 'Offline data', price: 99.99, category: 'Misc', createdAt: new Date() }
  ]);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <button onClick={() => setActiveTab('users')}>Users</button>
        <button onClick={() => setActiveTab('listings')}>Listings</button>
        <button onClick={() => setActiveTab('stats')}>Stats</button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="mb-4 p-2 border"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Render Tabs */}
      {activeTab === 'users' && (
        filteredUsers.map(user => (
          <div key={user._id} className="border p-2 mb-2 flex justify-between">
            <div>
              <p><strong>{user.name}</strong> - {user.email}</p>
              <p>Role: {user.role} | Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <button onClick={() => handleDelete('user', user._id)}>Delete</button>
          </div>
        ))
      )}

      {activeTab === 'listings' && (
        filteredProducts.map(product => (
          <div key={product._id} className="border p-2 mb-2 flex justify-between">
            <div>
              <p><strong>{product.name}</strong> - ${product.price}</p>
              <p>{product.description}</p>
            </div>
            <button onClick={() => handleDelete('product', product._id)}>Delete</button>
          </div>
        ))
      )}

      {activeTab === 'stats' && (
        <div>
          <p>Total Users: {stats.users}</p>
          <p>Total Products: {stats.products}</p>
        </div>
      )}
    </div>
  );
}
