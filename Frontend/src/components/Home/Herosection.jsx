import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  'https://static.vecteezy.com/system/resources/thumbnails/008/174/590/small/fashion-advertising-web-banner-illustration-vector.jpg',
  'https://marketplace.canva.com/EAFoEJMTGiI/1/0/1600w/canva-beige-aesthetic-new-arrival-fashion-banner-landscape-cNjAcBMeF9s.jpg',
  'https://i.pinimg.com/originals/24/c7/b6/24c7b6bc82dec49ffce7f23a0822109f.png',
];

export default function SearchWithCarousel() {
  const [query, setQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSearch = () => {
    if (query.trim()) {
      console.log('Searching for:', query);
      // Trigger API or navigation
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white py-8 px-4">
      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center border border-gray-300 rounded-full shadow-sm overflow-hidden">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-grow px-5 py-3 focus:outline-none text-gray-700 placeholder-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-3 transition-all"
          >
            <Search className="w-5 h-6" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative max-w-6xl mx-auto overflow-hidden rounded-xl shadow-md h-64 md:h-80">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          />
        ))}

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-20"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-20"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </section>
  );
}
