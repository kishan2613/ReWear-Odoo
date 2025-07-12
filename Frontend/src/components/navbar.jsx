import React from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-semibold text-purple-700">Rewear</div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-purple-700 transition">Home</a>
          <a href="#" className="hover:text-purple-700 transition">Categories</a>
          <a href="#" className="hover:text-purple-700 transition">Products</a>
          <a href="#" className="hover:text-purple-700 transition">About</a>
        </div>

        {/* Right Side (User/Cart/Sign In) */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-gray-600 hover:text-purple-700">Sign In</button>
          <button className="bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-800 transition">Get Started</button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3">
          <a href="#" className="block text-gray-700">Home</a>
          <a href="#" className="block text-gray-700">Categories</a>
          <a href="#" className="block text-gray-700">Products</a>
          <a href="#" className="block text-gray-700">About</a>
          <hr />
          <button className="block w-full text-left text-gray-600">Sign In</button>
          <button className="w-full bg-purple-700 text-white py-2 rounded-full">Get Started</button>
        </div>
      )}
    </nav>
  );
}
