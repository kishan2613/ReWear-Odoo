import React, { useState, useEffect } from 'react';
import { User, Package, BarChart3, Eye, Trash2, Search, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ users: 0, products: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const API_BASE = 'http://localhost:5000/api/admin';

  // Mock data for demonstration
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // You can replace this with actual API calls
      if (activeTab === 'users') {
        // Mock users data
        setUsers([
          { _id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', createdAt: new Date() },
          { _id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: new Date() },
          { _id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'admin', createdAt: new Date() },
        ]);
      } else if (activeTab === 'orders') {
        // Mock orders data
        setOrders([
          { _id: '1', customerName: 'John Doe', orderNumber: '#ORD-001', total: 299.99, status: 'pending', createdAt: new Date() },
          { _id: '2', customerName: 'Jane Smith', orderNumber: '#ORD-002', total: 149.99, status: 'completed', createdAt: new Date() },
        ]);
      } else if (activeTab === 'listings') {
        // Mock products data
        setProducts([
          { _id: '1', name: 'Laptop', description: 'High-performance laptop', price: 999.99, category: 'Electronics', createdAt: new Date() },
          { _id: '2', name: 'Headphones', description: 'Wireless headphones', price: 199.99, category: 'Electronics', createdAt: new Date() },
        ]);
      }
      setStats({ users: 150, products: 45 });
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      // Make API call to delete
      // await fetch(`${API_BASE}/${type}s/${id}`, { method: 'DELETE' });
      
      // Update local state
      if (type === 'user') {
        setUsers(users.filter(u => u._id !== id));
      } else if (type === 'product') {
        setProducts(products.filter(p => p._id !== id));
      } else if (type === 'order') {
        setOrders(orders.filter(o => o._id !== id));
      }
    } catch (err) {
      setError(`Failed to delete ${type}`);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(product => 
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrders = orders.filter(order => 
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-4 border-b-2 border-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded">
              <BarChart3 size={16} />
              <span className="text-sm">Dashboard Stats</span>
            </div>
            <button className="bg-gray-800 p-2 rounded hover:bg-gray-700">
              <Settings size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b-2 border-black p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                activeTab === 'users' 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-black border-black hover:bg-gray-50'
              }`}
            >
              <User size={16} />
              <span>Manage Users</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                activeTab === 'orders' 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-black border-black hover:bg-gray-50'
              }`}
            >
              <Package size={16} />
              <span>Manage Orders</span>
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                activeTab === 'listings' 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-black border-black hover:bg-gray-50'
              }`}
            >
              <Package size={16} />
              <span>Manage Listings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:border-gray-600"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Content Area */}
        <div className="space-y-4">
          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-black">Manage Users</h2>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user._id} className="bg-white border-2 border-black rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0">
                            <User size={24} className="text-black" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-black text-lg">{user.name}</h3>
                            <p className="text-gray-600 text-sm break-all">{user.email}</p>
                            <p className="text-gray-500 text-xs mt-1">
                              Role: {user.role || 'User'} • 
                              Joined: {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0">
                          <button className="flex items-center space-x-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                            <Eye size={14} />
                            <span className="hidden sm:inline">Actions 1</span>
                          </button>
                          <button 
                            onClick={() => handleDelete('user', user._id)}
                            className="flex items-center space-x-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                          >
                            <Trash2 size={14} />
                            <span className="hidden sm:inline">Action 2</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredUsers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No users found
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-black">Manage Orders</h2>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order._id} className="bg-white border-2 border-black rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0">
                            <Package size={24} className="text-black" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-black text-lg">{order.orderNumber}</h3>
                            <p className="text-gray-600 text-sm">{order.customerName}</p>
                            <p className="text-gray-500 text-xs mt-1">
                              Total: ${order.total} • 
                              Status: {order.status} • 
                              Date: {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0">
                          <button className="flex items-center space-x-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                            <Eye size={14} />
                            <span className="hidden sm:inline">Actions 1</span>
                          </button>
                          <button 
                            onClick={() => handleDelete('order', order._id)}
                            className="flex items-center space-x-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                          >
                            <Trash2 size={14} />
                            <span className="hidden sm:inline">Action 2</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredOrders.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No orders found
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Listings Tab */}
          {activeTab === 'listings' && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-black">Manage Listings</h2>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div key={product._id} className="bg-white border-2 border-black rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0">
                            <Package size={24} className="text-black" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-black text-lg">{product.name}</h3>
                            <p className="text-gray-600 text-sm">{product.description}</p>
                            <p className="text-gray-500 text-xs mt-1">
                              Price: ${product.price} • 
                              Category: {product.category || 'N/A'} • 
                              Added: {new Date(product.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0">
                          <button className="flex items-center space-x-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                            <Eye size={14} />
                            <span className="hidden sm:inline">Actions 1</span>
                          </button>
                          <button 
                            onClick={() => handleDelete('product', product._id)}
                            className="flex items-center space-x-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                          >
                            <Trash2 size={14} />
                            <span className="hidden sm:inline">Action 2</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;