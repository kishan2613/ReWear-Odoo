import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, ShoppingBag, Package, Search, Bell, Settings, Plus, Heart, Eye, Edit, Trash2, TrendingUp, Star, Award, Activity
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

// --- Hardcoded fallback data (Keep for error handling/purchase tab) ---
const fallbackUserData = {
  _id: 'fallback-user-id', // Unique ID
  name: 'Fallback User', // Placeholder Name
  email: 'fallback.user@example.com',
  address: 'Fallback City, State',
  bio: 'This is fallback profile data. Please check API connectivity if you see this.',
  points: 100,
  successfulSwaps: 10,
  totalSoldItems: 8,
  totalPurchasedItems: 5,
  earnings: 15000,
  spent: 10000,
  likedItems: [], // Array of product IDs
  createdAt: '2023-01-01T00:00:00.000Z'
};

const fallbackProducts = [
  {
    _id: 'fallback-prod-1', // Unique ID
    productName: 'Fallback Saree',
    category: 'Ethnic Wear',
    description: 'Fallback description.',
    heroImage: '/api/placeholder/200/200', // Placeholder image URL
    likes: 10,
    status: 'Available',
    createdAt: '2024-03-15T00:00:00.000Z'
    // Note: No price fields here to match backend schema limitation
  },
  {
    _id: 'fallback-prod-2',
    productName: 'Fallback Sneakers',
    category: 'Footwear',
    description: 'Fallback description.',
    heroImage: '/api/placeholder/200/200',
    likes: 5,
    status: 'Sold',
    createdAt: '2024-02-20T00:00:00.000Z'
  },
  {
    _id: 'fallback-prod-3',
    productName: 'Fallback Blazer',
    category: 'Office Wear',
    description: 'Fallback description.',
    heroImage: '/api/placeholder/200/200',
    likes: 3,
    status: 'In Negotiation',
    createdAt: '2024-01-10T00:00:00.000Z'
  },
];

// NOTE: Keeping fallbackPurchases as the backend provided does not have a purchase history endpoint matching this structure.
const fallbackPurchases = [
  {
    _id: 'fallback-purchase-1', // Unique ID
    productName: 'Fallback Vintage Kurta',
    category: 'Ethnic Wear',
    heroImage: '/api/placeholder/200/200', // Placeholder image URL
    expectedPrice: 2100, // Price field only exists in fallback for purchases
    status: 'Delivered', // Statuses match frontend display
    purchaseDate: '2024-03-10T00:00:00.000Z' // Date field only exists in fallback for purchases
  },
  {
    _id: 'fallback-purchase-2',
    productName: 'Fallback Casual Sneakers',
    category: 'Footwear',
    heroImage: '/api/placeholder/200/200',
    expectedPrice: 3200,
    status: 'Shipped',
    purchaseDate: '2024-03-05T00:00:00.000Z'
  },
  {
    _id: 'fallback-purchase-3',
    productName: 'Fallback Summer Dress',
    category: 'Western Wear',
    heroImage: '/api/placeholder/200/200',
    expectedPrice: 1800,
    status: 'Processing',
    purchaseDate: '2024-02-28T00:00:00.000Z'
  },
];
// --- End Fallback Data ---

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [userData, setUserData] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  // NOTE: userPurchases will *always* use fallback data
  const [userPurchases, setUserPurchases] = useState(fallbackPurchases);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to potentially show errors

  const token = localStorage.getItem('token'); // Get token once

  // Fetch user data
  const fetchUserData = async () => {
    if (!token) {
      console.warn("No token found, using fallback user data.");
      setUserData(fallbackUserData);
      return;
    }
    try {
      // Assuming this endpoint exists and is protected, returning user data from token
      const response = await fetch('http://localhost:5000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data);
      console.log("Fetched user data:", data);

    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to load profile data.');
      setUserData(fallbackUserData); // Use fallback on error
      console.warn('Using fallback user data:', err.message);
    }
  };

  // Fetch user products
  const fetchUserProducts = async () => {
     if (!token) {
      console.warn("No token found, using fallback product data.");
      setUserProducts(fallbackProducts);
      return;
    }
    try {
      // Assuming this endpoint returns products for the user authenticated by the token
      const response = await fetch('http://localhost:5000/api/products/user', {
         headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
         const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user products');
      }

      const data = await response.json();
      setUserProducts(data);
      console.log("Fetched products:", data);
    } catch (err) {
      console.error('Error fetching user products:', err);
      setError('Failed to load listings.');
      setUserProducts(fallbackProducts); // Use fallback on error
      console.warn('Using fallback products data:', err.message);
    }
  };

  // NOTE: This function will *not* fetch from the backend
  // because the provided backend code does not have a purchase history endpoint
  // matching the frontend's required data structure (price, delivery status etc.).
  // It will simply set the state to the hardcoded fallback data.
  const fetchUserPurchases = async () => {
     console.warn("No backend endpoint for user purchases available. Using fallback purchase data.");
     setUserPurchases(fallbackPurchases); // Always use fallback
     // Simulate a slight delay for consistency with async fetches
     await new Promise(resolve => setTimeout(resolve, 100));
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Fetch data concurrently
      await Promise.all([
        fetchUserData(),
        fetchUserProducts(),
        fetchUserPurchases() // This uses fallback, but keep in Promise.all for loading state sync
      ]);
      setLoading(false);
    };

    // Only load data if token exists or if we are allowing fallback
    // (Loading will happen anyway due to useEffect dependency array being empty)
    // if (token) {
       loadData();
    // } else {
    //    // Handle case where no token exists from the start if needed
    //    // For now, the fetch calls handle the missing token by using fallbacks
    //    loadData();
    // }

  }, []); // Empty dependency array means this runs once on mount

  // --- Chart Data Generation ---
  // These functions now operate on the state variables (which might hold fetched or fallback data)

  // Generate data for Monthly Listings chart (uses userProducts)
  const generateListingsChartData = () => {
    if (!userProducts.length) return [];

    const monthlyData = {};
    userProducts.forEach(product => {
      // Ensure product.createdAt is a valid date string
      const date = new Date(product.createdAt);
      if (isNaN(date)) {
          console.warn("Invalid createdAt date for product:", product);
          return; // Skip invalid dates
      }
      const month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

     // Convert to array and sort by date (rough sorting by parsing month string)
    const sortedData = Object.entries(monthlyData).map(([month, count]) => ({
      month,
      listings: count
    })).sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA - dateB;
    });


    return sortedData;
  };

  // Generate data for Category Distribution chart (uses userProducts)
  const generateCategoryData = () => {
    if (!userProducts.length) return [];

    const categories = {};
    userProducts.forEach(product => {
       if (product.category) { // Ensure category exists
            categories[product.category] = (categories[product.category] || 0) + 1;
       }
    });

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080']; // More colors
    return Object.entries(categories).map(([category, count], index) => ({
      name: category,
      value: count,
      color: colors[index % colors.length]
    }));
  };

  // Generate data for Monthly Spending chart (uses userPurchases - which is fallback)
  const generatePurchasesChartData = () => {
    // This function must continue to use fallbackPurchases
    // as the backend doesn't provide dynamic purchase data with price/date
    const data = userPurchases; // Using the state variable directly, which holds fallback

    if (!data.length) return [];

    const monthlyData = {};
    data.forEach(purchase => {
      const date = new Date(purchase.purchaseDate); // This date comes from fallback
       if (isNaN(date)) {
          console.warn("Invalid purchaseDate date for purchase (fallback data?):", purchase);
          return; // Skip invalid dates
      }
      const month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const amount = purchase.expectedPrice || 0; // Price comes from fallback
      if (!monthlyData[month]) {
        monthlyData[month] = { month, amount: 0, count: 0 };
      }
      monthlyData[month].amount += amount;
      monthlyData[month].count += 1;
    });

     // Convert to array and sort by date (rough sorting by parsing month string)
    const sortedData = Object.values(monthlyData).sort((a, b) => {
       const dateA = new Date(a.month);
       const dateB = new Date(b.month);
       return dateA - dateB;
    });

    return sortedData;
  };


   // Generate data for Earnings Over Time chart (uses userProducts)
   // NOTE: This chart will show 0 earnings if using fetched backend data
   // because the 'expectedPrice' field is missing from the backend Product schema.
  const generateEarningsData = () => {
    if (!userProducts.length) return [];

    // Filter for items marked as 'Sold'
    const soldItems = userProducts.filter(p => p.status === 'Sold');
    if (!soldItems.length) return []; // Return empty if no sold items

    const monthlyEarnings = {};

    soldItems.forEach(item => {
      const date = new Date(item.createdAt); // Use creation date for sale date
      if (isNaN(date)) {
         console.warn("Invalid createdAt date for sold product:", item);
         return; // Skip invalid dates
      }
      const month = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      // !!! IMPORTANT !!!
      // The backend Product schema does NOT have 'expectedPrice'.
      // If using fetched data, item.expectedPrice will be UNDEFINED.
      // This calculation will result in 0 earnings unless you add 'expectedPrice'
      // to your backend Product schema and fetch it.
      const earnings = item.expectedPrice || 0; // This will be 0 if fetched from current backend schema

      monthlyEarnings[month] = (monthlyEarnings[month] || 0) + earnings;
    });

     // Convert to array and sort by date (rough sorting by parsing month string)
     const sortedData = Object.entries(monthlyEarnings).map(([month, earnings]) => ({
       month,
       earnings
     })).sort((a, b) => {
       const dateA = new Date(a.month);
       const dateB = new Date(b.month);
       return dateA - dateB;
    });

    return sortedData;
  };
   // --- End Chart Data Generation ---


  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
           {/* Optionally show a generic error message if fetch failed but fallbacks are used */}
          {error && <p className="text-red-500 text-sm mt-2">{error} Using fallback data.</p>}
        </div>
      </div>
    );
  }

  // Check if userData is null after loading (e.g., if initial fetch failed and fallback was null/empty - shouldn't happen with current fallback)
  // Or if you want to display a different message if *even* fallback failed (unlikely)
   if (!userData) {
       return (
         <div className="min-h-screen bg-white flex items-center justify-center text-red-600">
             Failed to load user data. Please try again.
             {error && <p className="text-gray-500 text-sm mt-2">{error}</p>}
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
                {/* Search functionality not implemented in backend code */}
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  disabled // Disable search as backend endpoint not provided
                />
              </div>
              {/* Bell and Settings icons (functionality not implemented) */}
              <Bell className="w-6 h-6 text-gray-600 hover:text-black cursor-not-allowed opacity-50" title="Notifications (Not implemented)" />
              <Settings className="w-6 h-6 text-gray-600 hover:text-black cursor-not-allowed opacity-50" title="Settings (Not implemented)" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
         {/* Optional: Display a general error message at the top if fetches had issues */}
         {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
             <strong className="font-bold">Error:</strong>
             <span className="block sm:inline"> {error} Some data might be incomplete or using fallback information.</span>
         </div>}


        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Profile Picture */}
            <div className="relative group">
              {/* Profile picture upload/edit functionality not implemented */}
              <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center group-hover:border-black transition-colors duration-200 cursor-not-allowed opacity-50">
                {/* Display user avatar or fallback icon */}
                 {/* Assuming no avatar URL in backend, use icon */}
                <User className="w-12 h-12 text-gray-400 group-hover:text-black transition-colors duration-200" />
              </div>
              {/* Edit icon disabled as functionality not implemented */}
              <div className="absolute -bottom-2 -right-2 bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-not-allowed opacity-50 group-hover:opacity-50">
                <Edit className="w-3 h-3" />
              </div>
            </div>

            {/* Profile Info - Using fetched userData */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-black mb-2">{userData?.name || 'N/A'}</h2>
              <p className="text-gray-600 mb-2">{userData?.email || 'N/A'}</p>
              <p className="text-gray-500 mb-3">{userData?.address || 'N/A'}</p>
              {userData?.bio && (
                <p className="text-gray-700 text-sm leading-relaxed">{userData.bio}</p>
              )}
              {/* Link to edit profile - functionality not implemented */}
              <button className="mt-3 text-sm text-blue-600 hover:underline cursor-not-allowed opacity-50" disabled>Edit Profile</button>
            </div>

            {/* Stats Cards - Using fetched userData */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                <Award className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-800">{userData?.points || 0}</p>
                <p className="text-xs text-blue-600">Points</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg text-center">
                <Activity className="w-6 h-6 text-green-600 mx-auto mb-2" />
                {/* Backend `successfulSwaps` is available */}
                <p className="text-2xl font-bold text-green-800">{userData?.successfulSwaps || 0}</p>
                <p className="text-xs text-green-600">Swaps</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg text-center">
                <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                 {/* Backend `earnings` is available */}
                <p className="text-2xl font-bold text-purple-800">₹{userData?.earnings || 0}</p>
                <p className="text-xs text-purple-600">Earned</p>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg text-center">
                <ShoppingBag className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                 {/* Backend `spent` is available */}
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
            My Listings ({userProducts.length}) {/* Use dynamic count */}
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
            My Purchases ({userPurchases.length}) {/* Use dynamic count (based on fallback) */}
          </button>
        </div>

        {/* Content Area */}
        <div className="transition-all duration-300">
          {activeTab === 'listings' && (
            <div className="space-y-8">
              {/* Listings Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Listings Chart - Uses fetched userProducts */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Monthly Listings</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={generateListingsChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis allowDecimals={false} /> {/* Listings are whole numbers */}
                      <Tooltip />
                      <Line type="monotone" dataKey="listings" stroke="#000" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                   {!userProducts.length && <p className="text-center text-gray-500">No listing data available for charts.</p>}
                </div>

                {/* Category Distribution - Uses fetched userProducts */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Category Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                       {generateCategoryData().length > 0 ? (
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
                       ) : (
                         <></> // Render nothing if no data
                       )}
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                   {!userProducts.length && <p className="text-center text-gray-500">No category data available for charts.</p>}
                </div>

                {/* Earnings Over Time - Uses fetched userProducts */}
                {/* NOTE: This chart will likely show 0s if using fetched backend data
                   because the Product schema does not contain 'expectedPrice'.
                   Remove or modify this chart if you don't add price to your backend. */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 lg:col-span-2">
                  <h3 className="text-lg font-semibold text-black mb-4">Earnings Over Time <span className="text-red-500 text-sm">(Data limited by backend schema)</span></h3>
                   {generateEarningsData().length > 0 ? (
                     <ResponsiveContainer width="100%" height={300}>
                       <AreaChart data={generateEarningsData()}>
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis dataKey="month" />
                         <YAxis />
                         <Tooltip formatter={(value) => [`₹${value}`, 'Earnings']} />
                         <Area type="monotone" dataKey="earnings" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                       </AreaChart>
                     </ResponsiveContainer>
                   ) : (
                      <p className="text-center text-gray-500">No sold item data available for earnings chart.</p>
                   )}
                </div>
              </div>

              {/* Listings Grid - Uses fetched userProducts */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">My Listings ({userProducts.length})</h2>
                  <button
                     onClick={()=>navigate("/post")}
                     className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2 transform hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New</span>
                  </button>
                </div>
                {userProducts.length === 0 ? (
                   <p className="text-center text-gray-600">You haven't listed any items yet.</p>
                ) : (
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
                            {/* Use fetched heroImage */}
                           <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                              {item.heroImage ? (
                                 <img src={item.heroImage} alt={item.productName} className="w-full h-full object-cover"/>
                              ) : (
                                 <Package className="w-16 h-16 text-gray-400" />
                              )}
                           </div>
                            {/* Heart icon (like functionality not implemented) */}
                           <div className="absolute top-2 right-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-not-allowed opacity-50 group-hover:opacity-50">
                             <Heart className="w-4 h-4 text-gray-600" />
                           </div>
                            {/* Status from fetched data */}
                           <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                             item.status === 'Available' ? 'bg-green-100 text-green-800' :
                             item.status === 'Sold' ? 'bg-red-100 text-red-800' :
                             item.status === 'In Negotiation' ? 'bg-yellow-100 text-yellow-800' :
                             'bg-gray-100 text-gray-800' // Default fallback status style
                           }`}>
                             {item.status || 'Status N/A'}
                           </div>
                         </div>
                         <div className="p-4">
                            {/* Product Name from fetched data */}
                           <h3 className="font-semibold text-gray-900 mb-2 truncate">{item.productName || 'Untitled Product'}</h3>
                            {/* Category from fetched data */}
                           <p className="text-sm text-gray-600 mb-2">{item.category || 'Uncategorized'}</p>
                            {/* PRICES - REMOVED as they are NOT in the backend Product schema */}
                           {/*
                           <div className="flex justify-between items-center mb-3">
                             <span className="text-lg font-bold text-black">₹{item.expectedPrice}</span>
                             <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                           </div>
                           */}
                            <p className="text-sm text-gray-500 mb-3">Price information not available</p> {/* Placeholder */}

                            {/* Likes from fetched data. Views are still mocked. */}
                           <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                             <span className="flex items-center">
                               <Heart className="w-3 h-3 mr-1" />
                               {item.likes || 0}
                             </span>
                             <span className="flex items-center">
                               <Eye className="w-3 h-3 mr-1" />
                               {/* Views not tracked in backend, keep mocked */}
                               {Math.floor(Math.random() * 100) + 20}
                             </span>
                           </div>
                           <div className="flex space-x-2">
                              {/* Edit/Delete buttons - functionality not implemented */}
                             <button className="flex-1 bg-gray-100 text-black py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm cursor-not-allowed opacity-50" disabled>
                               <Edit className="w-3 h-3 inline mr-1" />
                               Edit
                             </button>
                             <button className="flex-1 bg-red-50 text-red-600 py-2 px-3 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm cursor-not-allowed opacity-50" disabled>
                               <Trash2 className="w-3 h-3 inline mr-1" />
                               Delete
                             </button>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'purchases' && (
            <div className="space-y-8">
              {/* Purchases Analytics - Uses fallbackPurchases */}
              {/* NOTE: Charts here use fallback data as backend endpoint is missing */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Spending Chart - Uses fallbackPurchases */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Monthly Spending <span className="text-orange-500 text-sm">(Using fallback data)</span></h3>
                   {generatePurchasesChartData().length > 0 ? (
                     <ResponsiveContainer width="100%" height={250}>
                       <BarChart data={generatePurchasesChartData()}>
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis dataKey="month" />
                         <YAxis />
                         <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                         <Bar dataKey="amount" fill="#8884d8" />
                       </BarChart>
                     </ResponsiveContainer>
                   ) : (
                      <p className="text-center text-gray-500">No purchase data available for spending chart (using fallback).</p>
                   )}
                </div>

                {/* Purchase Count Chart - Uses fallbackPurchases */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Purchase Count <span className="text-orange-500 text-sm">(Using fallback data)</span></h3>
                   {generatePurchasesChartData().length > 0 ? (
                     <ResponsiveContainer width="100%" height={250}>
                       <LineChart data={generatePurchasesChartData()}>
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis dataKey="month" />
                         <YAxis allowDecimals={false} /> {/* Count is whole numbers */}
                         <Tooltip />
                         <Line type="monotone" dataKey="count" stroke="#82ca9d" strokeWidth={2} />
                       </LineChart>
                     </ResponsiveContainer>
                   ) : (
                      <p className="text-center text-gray-500">No purchase data available for count chart (using fallback).</p>
                   )}
                </div>
              </div>

              {/* Purchases Grid - Uses fallbackPurchases */}
              {/* NOTE: Grid items here use fallback data structure */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">My Purchases ({userPurchases.length})</h2>
                  <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 transform hover:scale-105 cursor-not-allowed opacity-50" disabled>
                    View All Orders
                  </button>
                </div>
                 {userPurchases.length === 0 ? (
                    <p className="text-center text-gray-600">You haven't made any purchases yet.</p>
                 ) : (
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
                            {/* Use fallback heroImage */}
                           <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                              {item.heroImage ? (
                                 <img src={item.heroImage} alt={item.productName} className="w-full h-full object-cover"/>
                              ) : (
                                <ShoppingBag className="w-16 h-16 text-gray-400" />
                              )}
                           </div>
                            {/* Use fallback status */}
                           <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                             item.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                             item.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              item.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                             'bg-gray-100 text-gray-800' // Default fallback status style
                           }`}>
                             {item.status || 'Status N/A'}
                           </div>
                         </div>
                         <div className="p-4">
                            {/* Use fallback data fields */}
                           <h3 className="font-semibold text-gray-900 mb-2 truncate">{item.productName || 'Untitled Purchase'}</h3>
                           <p className="text-sm text-gray-600 mb-2">{item.category || 'Uncategorized'}</p>
                           <p className="text-xl font-bold text-black mb-2">₹{item.expectedPrice || 0}</p> {/* Use fallback price */}
                           <p className="text-xs text-gray-500 mb-3">
                             Purchased: {item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : 'Date N/A'} {/* Use fallback date */}
                           </p>
                            {/* View Details button - functionality not implemented */}
                           <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm cursor-not-allowed opacity-50" disabled>
                             View Details
                           </button>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add keyframes for animation */}
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