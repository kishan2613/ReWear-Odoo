import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { User, ShoppingBag, Package, Search, Bell, Settings, Plus, Heart, Eye, Edit, Trash2, TrendingUp, Star, Award, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [userData, setUserData] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [userPurchases, setUserPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded fallback data
  const fallbackUserData = {
    _id: '64a7b8c9d1e2f3g4h5i6j7k8',
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: 'Mumbai, Maharashtra',
    bio: 'Fashion enthusiast and sustainable shopping advocate. Love finding unique pieces and giving preloved items a new life.',
    points: 150,
    successfulSwaps: 15,
    totalSoldItems: 12,
    totalPurchasedItems: 8,
    earnings: 25000,
    spent: 18000,
    likedItems: ['64a7b8c9d1e2f3g4h5i6j7k9', '64a7b8c9d1e2f3g4h5i6j7l0'],
    createdAt: '2024-01-15T00:00:00.000Z'
  };

  const fallbackProducts = [
    {
      _id: '1',
      productName: 'Designer Silk Saree',
      category: 'Ethnic Wear',
      description: 'Beautiful handwoven silk saree with intricate gold embroidery.',
      heroImage: '/api/placeholder/200/200',
      originalPrice: 8500,
      expectedPrice: 4200,
      likes: 15,
      status: 'Available',
      createdAt: '2024-03-15T00:00:00.000Z'
    },
    {
      _id: '2',
      productName: 'Nike Air Max Sneakers',
      category: 'Footwear',
      description: 'Brand new Nike Air Max sneakers, comfortable and stylish.',
      heroImage: '/api/placeholder/200/200',
      originalPrice: 12000,
      expectedPrice: 7500,
      likes: 23,
      status: 'Sold',
      createdAt: '2024-02-20T00:00:00.000Z'
    },
    {
      _id: '3',
      productName: 'Formal Blazer Set',
      category: 'Office Wear',
      description: 'Professional black blazer with matching trousers.',
      heroImage: '/api/placeholder/200/200',
      originalPrice: 6500,
      expectedPrice: 3800,
      likes: 8,
      status: 'In Negotiation',
      createdAt: '2024-01-10T00:00:00.000Z'
    },
    {
      _id: '4',
      productName: 'Casual Denim Jacket',
      category: 'Casual Wear',
      description: 'Classic denim jacket in excellent condition.',
      heroImage: '/api/placeholder/200/200',
      originalPrice: 4500,
      expectedPrice: 2800,
      likes: 31,
      status: 'Available',
      createdAt: '2024-03-01T00:00:00.000Z'
    }
  ];

  const fallbackPurchases = [
    {
      _id: '1',
      productName: 'Vintage Kurta',
      category: 'Ethnic Wear',
      heroImage: '/api/placeholder/200/200',
      expectedPrice: 2100,
      status: 'Delivered',
      purchaseDate: '2024-03-10T00:00:00.000Z'
    },
    {
      _id: '2',
      productName: 'Casual Sneakers',
      category: 'Footwear',
      heroImage: '/api/placeholder/200/200',
      expectedPrice: 3200,
      status: 'Shipped',
      purchaseDate: '2024-03-05T00:00:00.000Z'
    },
    {
      _id: '3',
      productName: 'Summer Dress',
      category: 'Western Wear',
      heroImage: '/api/placeholder/200/200',
      expectedPrice: 1800,
      status: 'Processing',
      purchaseDate: '2024-02-28T00:00:00.000Z'
    },
    {
      _id: '4',
      productName: 'Cotton Shirt',
      category: 'Casual Wear',
      heroImage: '/api/placeholder/200/200',
      expectedPrice: 1200,
      status: 'Delivered',
      purchaseDate: '2024-02-15T00:00:00.000Z'
    }
  ];

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      console.warn('Using fallback user data:', err.message);
      setUserData(fallbackUserData);
    }
  };

  // Fetch user products
  const fetchUserProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/user', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user products');
      }

      const data = await response.json();
      setUserProducts(data);
    } catch (err) {
      console.warn('Using fallback products data:', err.message);
      setUserProducts(fallbackProducts);
    }
  };

  // Fetch user purchases
  const fetchUserPurchases = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders/purchases', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user purchases');
      }

      const data = await response.json();
      setUserPurchases(data);
    } catch (err) {
      console.warn('Using fallback purchases data:', err.message);
      setUserPurchases(fallbackPurchases);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchUserData(),
        fetchUserProducts(),
        fetchUserPurchases()
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  // Generate chart data
  const generateListingsChartData = () => {
    if (!userProducts.length) return [];
    
    const monthlyData = {};
    userProducts.forEach(product => {
      const month = new Date(product.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    return Object.entries(monthlyData).map(([month, count]) => ({
      month,
      listings: count
    }));
  };

  const generatePurchasesChartData = () => {
    if (!userPurchases.length) return [];
    
    const monthlyData = {};
    userPurchases.forEach(purchase => {
      const month = new Date(purchase.purchaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const amount = purchase.expectedPrice || 0;
      if (!monthlyData[month]) {
        monthlyData[month] = { month, amount: 0, count: 0 };
      }
      monthlyData[month].amount += amount;
      monthlyData[month].count += 1;
    });

    return Object.values(monthlyData);
  };

  const generateCategoryData = () => {
    const categories = {};
    userProducts.forEach(product => {
      categories[product.category] = (categories[product.category] || 0) + 1;
    });

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
    return Object.entries(categories).map(([category, count], index) => ({
      name: category,
      value: count,
      color: colors[index % colors.length]
    }));
  };

  const generateEarningsData = () => {
    const soldItems = userProducts.filter(p => p.status === 'Sold');
    const monthlyEarnings = {};
    
    soldItems.forEach(item => {
      const month = new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyEarnings[month] = (monthlyEarnings[month] || 0) + item.expectedPrice;
    });

    return Object.entries(monthlyEarnings).map(([month, earnings]) => ({
      month,
      earnings
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-black">User Dashboard</h1>
              
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                />
              </div>
              <Bell className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer transition-colors duration-200" />
              <Settings className="w-6 h-6 text-gray-600 hover:text-black cursor-pointer transition-colors duration-200" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center group-hover:border-black transition-colors duration-200">
                <User className="w-12 h-12 text-gray-400 group-hover:text-black transition-colors duration-200" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                <Edit className="w-3 h-3" />
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-black mb-2">{userData?.name}</h2>
              <p className="text-gray-600 mb-2">{userData?.email}</p>
              <p className="text-gray-500 mb-3">{userData?.address}</p>
              {userData?.bio && (
                <p className="text-gray-700 text-sm leading-relaxed">{userData.bio}</p>
              )}
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                <Award className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-800">{userData?.points || 0}</p>
                <p className="text-xs text-blue-600">Points</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg text-center">
                <Activity className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-800">{userData?.successfulSwaps || 0}</p>
                <p className="text-xs text-green-600">Swaps</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg text-center">
                <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-800">₹{userData?.earnings || 0}</p>
                <p className="text-xs text-purple-600">Earned</p>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg text-center">
                <ShoppingBag className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-800">₹{userData?.spent || 0}</p>
                <p className="text-xs text-orange-600">Spent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'listings'
                ? 'bg-white text-black shadow-sm transform scale-105'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Package className="w-4 h-4 inline mr-2" />
            My Listings
          </button>
          <button
            onClick={() => setActiveTab('purchases')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'purchases'
                ? 'bg-white text-black shadow-sm transform scale-105'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <ShoppingBag className="w-4 h-4 inline mr-2" />
            My Purchases
          </button>
        </div>

        {/* Content Area */}
        <div className="transition-all duration-300">
          {activeTab === 'listings' && (
            <div className="space-y-8">
              {/* Listings Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Listings Chart */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Monthly Listings</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={generateListingsChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="listings" stroke="#000" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Category Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={generateCategoryData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {generateCategoryData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Earnings Over Time */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:col-span-2">
                  <h3 className="text-lg font-semibold text-black mb-4">Earnings Over Time</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={generateEarningsData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value}`, 'Earnings']} />
                      <Area type="monotone" dataKey="earnings" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Listings Grid */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">My Listings ({userProducts.length})</h2>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2 transform hover:scale-105">
                    <Plus className="w-4 h-4" />
                    <span onClick={()=>navigate("/post")}>Add New</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {userProducts.map((item, index) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl group"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      <div className="relative">
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <Package className="w-16 h-16 text-gray-400" />
                        </div>
                        <div className="absolute top-2 right-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Available' ? 'bg-green-100 text-green-800' :
                          item.status === 'Sold' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate">{item.productName}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-lg font-bold text-black">₹{item.expectedPrice}</span>
                          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {item.likes}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {Math.floor(Math.random() * 100) + 20}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-gray-100 text-black py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm">
                            <Edit className="w-3 h-3 inline mr-1" />
                            Edit
                          </button>
                          <button className="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm">
                            <Trash2 className="w-3 h-3 inline mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'purchases' && (
            <div className="space-y-8">
              {/* Purchases Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Spending Chart */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Monthly Spending</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={generatePurchasesChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Purchase Count Chart */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Purchase Count</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={generatePurchasesChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Purchases Grid */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">My Purchases ({userPurchases.length})</h2>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 transform hover:scale-105">
                    View All Orders
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {userPurchases.map((item, index) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      <div className="relative">
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <ShoppingBag className="w-16 h-16 text-gray-400" />
                        </div>
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          item.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 truncate">{item.productName}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                        <p className="text-xl font-bold text-black mb-2">₹{item.expectedPrice}</p>
                        <p className="text-xs text-gray-500 mb-3">
                          Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
                        </p>
                        <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;