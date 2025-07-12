import React, { useState, useEffect } from 'react';
import { User, Package, BarChart3, Eye, Trash2, Search, Settings } from 'lucide-react';

// --- SECURITY WARNING ---
// Hardcoding tokens in frontend code is generally NOT secure.
// In a real application, the admin token should be handled securely,
// potentially obtained via a login process and stored more safely (e.g.,
// in HTTP-only cookies managed by the backend, or a secure context).
// This is done here only to match the provided backend structure.
const ADMIN_ACCESS_TOKEN = 'supersecrettoken123'; 

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]); // State for orders (backend endpoint missing)
  const [stats, setStats] = useState({ users: 0, products: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const API_BASE = 'http://localhost:5000/api/admin';

  // Fetch data when the active tab changes or component mounts
  useEffect(() => {
    fetchData();
  }, [activeTab]); // Dependency array ensures fetch runs when activeTab changes

  const fetchData = async () => {
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      // --- Fetch Stats (common for the dashboard overview) ---
      // Note: Using POST method to send token in body as required by backend checkAdmin
      const statsRes = await fetch(`${API_BASE}/stats`, {
        method: 'POST', // POST because backend requires token in body even for GET-like action
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminToken: ADMIN_ACCESS_TOKEN }),
      });
      
      if (!statsRes.ok) {
          throw new Error(`HTTP error fetching stats! status: ${statsRes.status}`);
      }
      const statsData = await statsRes.json();
      setStats(statsData);

      // --- Fetch Data based on Active Tab ---
      let endpoint = '';
      let dataKey = ''; // Key for the data array (users, products, orders)
      let setDataFunction; // State setter function

      switch (activeTab) {
        case 'users':
          endpoint = `${API_BASE}/users`;
          dataKey = 'users'; // Not actually needed if backend returns array directly
          setDataFunction = setUsers;
          break;
        case 'orders':
          // --- Backend Note ---
          // The provided backend code does NOT have an endpoint for orders.
          // This section assumes you will add an endpoint like /api/admin/orders
          // that returns an array of order objects.
          endpoint = `${API_BASE}/orders`; // Assuming this endpoint will exist
          dataKey = 'orders';
          setDataFunction = setOrders;
           // For now, if the endpoint is missing, we might get an error or empty data.
           // You'll need to implement the /api/admin/orders endpoint in your backend.
          console.warn("Note: Backend endpoint for orders is not provided. This fetch might fail.");
          break;
        case 'listings':
          endpoint = `${API_BASE}/products`; // Backend calls them products, frontend calls listings
          dataKey = 'products'; // Backend returns array of products
          setDataFunction = setProducts;
          break;
        default:
          console.error("Unknown active tab:", activeTab);
          setLoading(false);
          return;
      }

      // Note: Using POST method to send token in body as required by backend checkAdmin
      const dataRes = await fetch(endpoint, {
        method: 'POST', // POST because backend requires token in body even for GET-like action
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminToken: ADMIN_ACCESS_TOKEN }),
      });

      if (!dataRes.ok) {
        // Check for 403 Forbidden specifically if token is invalid
         if (dataRes.status === 403) {
             throw new Error('Access denied: Invalid admin token.');
         }
         // Handle 404 for missing orders endpoint gracefully if needed,
         // but a general error is fine for now.
        throw new Error(`HTTP error fetching ${activeTab}! status: ${dataRes.status}`);
      }

      const data = await dataRes.json();
      
      // Assuming backend returns the array directly (e.g., [user1, user2])
      // If backend returns an object like { users: [...] }, you'd use data[dataKey]
      if (Array.isArray(data)) {
          setDataFunction(data);
      } else {
          // Handle cases where backend might return an object wrapping the array
          // E.g., { users: [...] } - though your controller suggests direct array
          // If backend getAllUsers returns { message: '...', users: [...] }
          // const listData = data[dataKey] || [];
          // if (Array.isArray(listData)) {
          //     setDataFunction(listData);
          // } else {
          //     console.error("Unexpected data format:", data);
          //     setDataFunction([]); // Set empty array on unexpected format
          // }
           console.error("Unexpected non-array data format:", data);
           setDataFunction([]); // Assume empty on unexpected format
      }


    } catch (err) {
      console.error("Fetch error:", err);
      setError(`Failed to fetch data for ${activeTab}: ${err.message}`);
      // Clear data on error to avoid showing stale data
      if (activeTab === 'users') setUsers([]);
      if (activeTab === 'orders') setOrders([]);
      if (activeTab === 'listings') setProducts([]);
      setStats({ users: 0, products: 0 }); // Also clear stats on error
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
      // Add confirmation dialog for safety
      if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
          return;
      }

      setError(''); // Clear previous errors
      // Optionally set a specific loading state for the item being deleted
      // setLoading(true); // Could set global loading, but might affect whole page

      try {
          // Determine the correct endpoint based on type
          let endpoint = '';
          switch (type) {
              case 'user':
                  endpoint = `${API_BASE}/user/${id}`; // Backend uses /user/:id (singular)
                  break;
              case 'product':
                  endpoint = `${API_BASE}/product/${id}`; // Backend uses /product/:id (singular)
                  break;
               case 'order':
                 // --- Backend Note ---
                 // The provided backend code does NOT have an endpoint for deleting orders.
                 // This assumes you will add one like DELETE /api/admin/order/:id
                  endpoint = `${API_BASE}/order/${id}`; // Assuming this endpoint will exist
                   console.warn("Note: Backend endpoint for deleting orders is not provided. This delete might fail.");
                  break;
              default:
                  console.error("Unknown type for delete:", type);
                  setError(`Failed to delete: Unknown type ${type}`);
                  // setLoading(false);
                  return;
          }

          const res = await fetch(endpoint, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ adminToken: ADMIN_ACCESS_TOKEN }), // Send token in body
          });

          if (!res.ok) {
              // Check for 403 Forbidden specifically
              if (res.status === 403) {
                  throw new Error('Access denied: Invalid admin token.');
              }
               // Check for 404 Not Found if item already deleted or ID was wrong
              if (res.status === 404) {
                   throw new Error(`${type} not found.`);
              }
              throw new Error(`HTTP error deleting ${type}! status: ${res.status}`);
          }

          // Assuming backend returns a success message like { message: '...' }
          // We don't need to read the body unless showing a success message,
          // but we check res.ok.

          // Update local state by filtering out the deleted item
          if (type === 'user') {
              setUsers(users.filter(u => u._id !== id));
          } else if (type === 'product') {
              setProducts(products.filter(p => p._id !== id));
          } else if (type === 'order') {
              setOrders(orders.filter(o => o._id !== id));
          }
          // Optionally re-fetch stats if user/product count changes significantly
          // fetchData(); // Could call fetchData again, but less efficient
          // Instead, maybe update stats locally? (Harder if backend stats logic is complex)
          // For simplicity, we won't update stats locally after deletion.

      } catch (err) {
          console.error("Delete error:", err);
          setError(`Failed to delete ${type}: ${err.message}`);
      } finally {
          // setLoading(false);
      }
  };

  // Filtering logic remains the same
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user._id?.includes(searchTerm) // Allow searching by ID too
  );

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by category
    product._id?.includes(searchTerm) // Allow searching by ID
  );

  const filteredOrders = orders.filter(order =>
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status?.toLowerCase().includes(searchTerm.toLowerCase()) || // Search by status
     order._id?.includes(searchTerm) // Allow searching by ID
  );


  // Render method is largely the same, using the state variables
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white p-4 border-b-2 border-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex items-center space-x-4">
            {/* Display Stats - Use fetched stats */}
             <div className="hidden md:flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded">
              <BarChart3 size={16} />
              <span className="text-sm">Users: {stats.users} | Products: {stats.products}</span>
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
              onClick={() => {setActiveTab('users'); setSearchTerm('');}} // Clear search on tab change
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
              onClick={() => {setActiveTab('listings'); setSearchTerm('');}} // Clear search on tab change
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
                <div className="text-center py-8">Loading Users...</div>
              ) : (
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user._id} className="bg-white border-2 border-black rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-center space-x-4 flex-1">
                          {/* Avatar Placeholder */}
                           <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0">
                            <User size={24} className="text-black" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-black text-lg">{user.name}</h3>
                            <p className="text-gray-600 text-sm break-all">{user.email}</p>
                            <p className="text-gray-500 text-xs mt-1">
                              Role: <span className="capitalize">{user.role || 'User'}</span> •
                              Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                            {/* Display User ID (optional, helpful for debugging/admin actions) */}
                             {/* <p className="text-gray-500 text-xs mt-1">ID: {user._id}</p> */}
                          </div>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0">
                          {/* Action 1: View User Details (Placeholder) */}
                          {/* You would implement navigation or modal here */}
                          <button className="flex items-center space-x-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                            <Eye size={14} />
                            <span className="hidden sm:inline">View</span>
                          </button>
                           {/* Action 2: Delete User */}
                          <button
                            onClick={() => handleDelete('user', user._id)}
                            className="flex items-center space-x-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                             disabled={loading} // Disable delete button while loading/deleting
                          >
                            <Trash2 size={14} />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredUsers.length === 0 && !loading && (
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
                <div className="text-center py-8">Loading Orders...</div>
              ) : (
                <div className="space-y-4">
                  {orders.length === 0 && !loading && !error && (
                       <div className="text-center py-8 text-gray-500">
                          Note: Backend endpoint for Orders is missing. Displaying placeholder data if any was set, or none.
                      </div>
                  )}
                   {filteredOrders.map((order) => (
                    <div key={order._id} className="bg-white border-2 border-black rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-center space-x-4 flex-1">
                          {/* Icon Placeholder */}
                           <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0">
                            <Package size={24} className="text-black" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-black text-lg">{order.orderNumber}</h3>
                            <p className="text-gray-600 text-sm">{order.customerName}</p>
                            <p className="text-gray-500 text-xs mt-1">
                              Total: ${typeof order.total === 'number' ? order.total.toFixed(2) : 'N/A'} •
                              Status: <span className="capitalize">{order.status || 'Unknown'}</span> •
                              Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                             {/* Display Order ID (optional) */}
                             {/* <p className="text-gray-500 text-xs mt-1">ID: {order._id}</p> */}
                          </div>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0">
                           {/* Action 1: View Order Details (Placeholder) */}
                           <button className="flex items-center space-x-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                            <Eye size={14} />
                            <span className="hidden sm:inline">View</span>
                          </button>
                           {/* Action 2: Delete Order */}
                          <button
                            onClick={() => handleDelete('order', order._id)}
                            className="flex items-center space-x-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                             disabled={loading} // Disable delete button while loading/deleting
                          >
                            <Trash2 size={14} />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredOrders.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-500">
                      No orders found matching search
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
                <div className="text-center py-8">Loading Listings...</div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div key={product._id} className="bg-white border-2 border-black rounded-lg p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-center space-x-4 flex-1">
                           {/* Icon Placeholder */}
                           <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center border-2 border-black flex-shrink-0">
                            <Package size={24} className="text-black" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-black text-lg">{product.name}</h3>
                            <p className="text-gray-600 text-sm">{product.description}</p>
                            <p className="text-gray-500 text-xs mt-1">
                              Price: ${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'} •
                              Category: {product.category || 'N/A'} •
                              Added: {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                             {/* Display Product ID (optional) */}
                             {/* <p className="text-gray-500 text-xs mt-1">ID: {product._id}</p> */}
                          </div>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0">
                           {/* Action 1: View Product Details (Placeholder) */}
                           <button className="flex items-center space-x-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                            <Eye size={14} />
                            <span className="hidden sm:inline">View</span>
                          </button>
                           {/* Action 2: Delete Product */}
                          <button
                            onClick={() => handleDelete('product', product._id)}
                            className="flex items-center space-x-1 bg-black text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                             disabled={loading} // Disable delete button while loading/deleting
                          >
                            <Trash2 size={14} />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredProducts.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-500">
                      No products found matching search
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