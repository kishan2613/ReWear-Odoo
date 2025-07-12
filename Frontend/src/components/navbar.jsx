import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Premium Navbar Component
const PremiumNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      name: 'Collections', 
      hasDropdown: true,
      dropdownItems: ['New Arrivals', 'Bestsellers', 'Premium Line', 'Limited Edition']
    },
    { 
      name: 'Men', 
      hasDropdown: true,
      dropdownItems: ['Clothing', 'Footwear', 'Accessories', 'Grooming']
    },
    { 
      name: 'Women', 
      hasDropdown: true,
      dropdownItems: ['Clothing', 'Footwear', 'Accessories', 'Beauty']
    },
    { name: 'About', hasDropdown: false },
    { name: 'Contact', hasDropdown: false }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-black/60'
      }`}>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <h1 
              className={`text-2xl md:text-3xl font-light tracking-wider transition-colors duration-300 ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              ReWear
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div 
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className={`flex items-center space-x-1 py-2 px-4 rounded-full transition-all duration-300 font-medium ${
                    isScrolled 
                      ? 'text-black hover:bg-black hover:text-white' 
                      : 'text-white hover:bg-white/10'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <svg 
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && (
                  <div className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                    activeDropdown === item.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'
                  }`}>
                    {item.dropdownItems.map((dropdownItem) => (
                      <button
                        key={dropdownItem}
                        className="w-full text-left px-6 py-3 text-black hover:bg-black hover:text-white transition-colors duration-300 font-medium"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        onClick={() => navigate('/products')}
                      >
                        {dropdownItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            

            {/* User Profile */}
            <button className={`p-2 rounded-full transition-all duration-300 ${
              isScrolled 
                ? 'text-black hover:bg-black hover:text-white' 
                : 'text-white hover:bg-white/10'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden p-2 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'text-black hover:bg-black hover:text-white' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-2 bg-white/95 backdrop-blur-md rounded-2xl mt-4 shadow-xl">
            {navItems.map((item) => (
              <div key={item.name}>
                <button className="w-full text-left px-6 py-3 text-black hover:bg-black hover:text-white transition-colors duration-300 font-medium">
                  {item.name}
                </button>
                {item.hasDropdown && (
                  <div className="pl-6 space-y-1">
                    {item.dropdownItems.map((dropdownItem) => (
                      <button
                        key={dropdownItem}
                        className="w-full text-left px-6 py-2 text-gray-600 hover:text-black transition-colors duration-300 text-sm"
                      >
                        {dropdownItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};  

export default PremiumNavbar;