import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ShoppingBag, Heart, MapPin, Tag } from 'lucide-react';

const ShoppingBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState('greeting'); // greeting, asking_product, searching, results
  const [userPreferences, setUserPreferences] = useState({
    productName: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample product data based on your schema
  const sampleProducts = [
    {
      _id: '1',
      productName: 'Elegant Kurta Set',
      category: 'Ethnic Wear',
      description: 'Beautiful traditional kurta set perfect for festivals',
      heroImage: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=300&fit=crop',
      likes: 45,
      address: 'Mumbai, Maharashtra',
      status: 'Available'
    },
    {
      _id: '2',
      productName: 'Casual Denim Jacket',
      category: 'Casual Wear',
      description: 'Stylish denim jacket for everyday wear',
      heroImage: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
      likes: 32,
      address: 'Delhi, India',
      status: 'Available'
    },
    {
      _id: '3',
      productName: 'Sports Running Shoes',
      category: 'Footwear',
      description: 'Comfortable running shoes for daily workout',
      heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      likes: 67,
      address: 'Bangalore, Karnataka',
      status: 'Available'
    },
    {
      _id: '4',
      productName: 'Formal Blazer',
      category: 'Office Wear',
      description: 'Professional blazer for office meetings',
      heroImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      likes: 28,
      address: 'Chennai, Tamil Nadu',
      status: 'Available'
    },
    {
      _id: '5',
      productName: 'Summer Dress',
      category: 'Western Wear',
      description: 'Light and breezy summer dress',
      heroImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=300&fit=crop',
      likes: 51,
      address: 'Pune, Maharashtra',
      status: 'Available'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        addBotMessage("Hi there! 👋 I'm your shopping assistant. I'm here to help you find the perfect products within your budget!");
        setTimeout(() => {
          addBotMessage("What product are you looking for today? You can search by name or category.");
        }, 1500);
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { text, isBot: true, timestamp: new Date() }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { text, isBot: false, timestamp: new Date() }]);
  };

  const showTypingIndicator = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const searchProducts = async (productName) => {
    try {
      const params = new URLSearchParams({
        name: productName
      });
      
      const response = await fetch(`/api/products/search?${params}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const products = await response.json();
      return products.slice(0, 5); // Top 5 results
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  };

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    const userMessage = currentInput.trim();
    addUserMessage(userMessage);
    setCurrentInput('');

    showTypingIndicator();

    setTimeout(() => {
      switch (chatState) {
        case 'greeting':
          setUserPreferences({ productName: userMessage });
          addBotMessage("Perfect! Let me search for the best products for you... 🔍");
          setChatState('searching');
          setIsSearching(true);
          
          setTimeout(async () => {
            const results = await searchProducts(userMessage);
            setSearchResults(results);
            setIsSearching(false);
            
            if (results.length > 0) {
              addBotMessage(`Found ${results.length} amazing products for you! Here are the top recommendations:`);
              setChatState('results');
            } else {
              addBotMessage("Sorry, I couldn't find any products matching your criteria. Would you like to try a different search?");
              setChatState('greeting');
            }
          }, 2000);
          break;

        case 'results':
          addBotMessage("Would you like to search for something else? Just tell me what you're looking for!");
          setChatState('greeting');
          setSearchResults([]);
          break;

        default:
          addBotMessage("I'm here to help you find products! What are you looking for?");
          setChatState('greeting');
      }
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        <img 
          src={product.heroImage} 
          alt={product.productName}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{product.productName}</h4>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <Tag className="w-3 h-3" />
            {product.category}
          </p>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {product.likes}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {product.address.split(',')[0]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md h-[500px] flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="bg-black text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white bg-opacity-20 p-2 rounded-full">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Shopping Assistant</h3>
                  <p className="text-sm text-gray-300">Find your perfect products</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
                 style={{ maxHeight: '400px' }}>
              {messages.map((message, index) => (
                <div key={index} className={`animate-in fade-in-50 duration-300 ${message.isBot ? 'flex justify-start' : 'flex justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'bg-black text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}

              {/* Product Results */}
              {searchResults.length > 0 && (
                <div className="space-y-3 animate-in fade-in-50 duration-300">
                  {searchResults.map((product, index) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-in fade-in-50 duration-300">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingBot;