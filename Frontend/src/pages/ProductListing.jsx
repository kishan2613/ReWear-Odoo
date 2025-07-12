import { useState, useEffect } from "react";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Ethnic Wear', 'Casual Wear', "Men's Activewear", "Women's Activewear", 'Western Wear', 'Footwear', 'Sportswear', 'Office Wear', "Men's Ethnic Wear", "Size Inclusive Styles"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/all");
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
          setFilteredProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'name':
        filtered.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery, sortBy]);

  const truncateDescription = (description, lines = 2) => {
    const words = description.split(' ');
    const maxWords = lines === 2 ? 20 : 10;
    return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : description;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'text-green-600 bg-green-50';
      case 'In Negotiation':
        return 'text-yellow-600 bg-yellow-50';
      case 'Sold':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 
            className="text-4xl md:text-5xl font-light text-black mb-2 tracking-wide"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            ReWear Collection
          </h1>
          <p 
            className="text-gray-600 text-lg font-medium"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Discover pre-loved & unused fashion treasures
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="lg:w-48">
              <select
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p 
            className="text-gray-600 font-medium"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
        </div>

        {/* Product List */}
        <div className="space-y-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col md:flex-row">
                {/* Product Image */}
                <div className="md:w-80 h-64 md:h-48 flex-shrink-0">
                  <img
                    src={product.heroImage}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div className="flex-1">
                        <h3 
                          className="text-xl md:text-2xl font-light text-black mb-1 tracking-wide"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {product.productName}
                        </h3>
                        <p 
                          className="text-gray-600 text-sm font-medium mb-2"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {product.category}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)} mt-2 sm:mt-0`}>
                        {product.status}
                      </span>
                    </div>

                    {/* Description */}
                    <p 
                      className="text-gray-700 mb-4 leading-relaxed"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {truncateDescription(product.description)}
                    </p>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto">
                      <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                        <div className="flex items-center text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {product.address}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          <span className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {product.likes}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 font-medium text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 
              className="text-xl text-gray-600 mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              No products found
            </h3>
            <p 
              className="text-gray-500"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;