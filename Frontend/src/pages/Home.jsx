import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Mock data - would be loaded from external JSON files
const heroData = {
  images: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop",
      title: "Where Style Meets Soul",
      subtitle: "Curated pieces for the extraordinary you",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=500&fit=crop",
      title: "Luxury, Redefined",
      subtitle: "Because ordinary was never an option",
    },
  ],
};

const categoriesData = [
  {
    id: 1,
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    count: "2.5K+ Pieces",
    tagline: "Gentleman's choice",
  },
  {
    id: 2,
    name: "Women",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.WWvdzNPX5bQmNilTx7gCqAHaEK?pid=Api&P=0&h=180",
    count: "3.2K+ Pieces",
    tagline: "Elegance defined",
  },
  {
    id: 3,
    name: "Footwear",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
    count: "1.8K+ Pairs",
    tagline: "Step into luxury",
  },
  {
    id: 4,
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=400&h=500&fit=crop",
    count: "950+ Items",
    tagline: "Details that dazzle",
  },
];

const productsData = [
  {
    id: 1,
    name: "Ethereal Cotton Essence",
    price: "1,299 coins",
    originalPrice: "1,999",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    discount: "35% OFF",
    badge: "BESTSELLER",
  },
  {
    id: 2,
    name: "Midnight Denim Dreams",
    price: "2,499 coins",
    originalPrice: "3,999",
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop",
    discount: "38% OFF",
    badge: "LIMITED",
  },
  {
    id: 3,
    name: "Artisan Leather Legacy",
    price: "3,199 coins",
    originalPrice: "4,999",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
    discount: "36% OFF",
    badge: "EXCLUSIVE",
  },
  {
    id: 4,
    name: "Cloud Walker Luxe",
    price: "4,299 coins",
    originalPrice: "5,999",
    image:
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=500&fit=crop",
    discount: "28% OFF",
    badge: "TRENDING",
  },
  {
    id: 5,
    name: "Silk Whisper Blouse",
    price: "1,899 coins",
    originalPrice: "2,999",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    discount: "37% OFF",
    badge: "PREMIUM",
  },
  {
    id: 6,
    name: "Executive Power Suit",
    price: "3,499 coins",
    originalPrice: "5,499",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    discount: "36% OFF",
    badge: "SIGNATURE",
  },
];

// Custom Hooks for animations
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState(null);

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(elementRef);
    return () => observer.disconnect();
  }, [elementRef, threshold]);

  return [setElementRef, isVisible];
};

// Animated Components
const AnimatedElement = ({ children, delay = 0, animation = "fadeInUp" }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setTimeout(() => setHasAnimated(true), delay);
    }
  }, [isVisible, delay, hasAnimated]);

  const animations = {
    fadeInUp: hasAnimated ? "animate-fade-in-up" : "opacity-0 translate-y-8",
    fadeInLeft: hasAnimated
      ? "animate-fade-in-left"
      : "opacity-0 -translate-x-8",
    fadeInRight: hasAnimated
      ? "animate-fade-in-right"
      : "opacity-0 translate-x-8",
    scaleIn: hasAnimated ? "animate-scale-in" : "opacity-0 scale-95",
    slideInUp: hasAnimated ? "animate-slide-in-up" : "opacity-0 translate-y-12",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${animations[animation]}`}
    >
      {children}
    </div>
  );
};

// Search Bar Component
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <AnimatedElement delay={300}>
        <div className="relative group">
          <div
            className={`relative overflow-hidden rounded-2xl bg-white border-2 transition-all duration-300 ${
              isFocused
                ? "border-black shadow-2xl"
                : "border-gray-200 shadow-lg"
            }`}
          >
            <div
              className="flex items-center px-6 py-4"
              onClick={() => navigate("/products")}
            >
              <svg
                className={`w-6 h-6 mr-4 transition-colors duration-300 ${
                  isFocused ? "text-black" : "text-gray-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="What's calling to you today?"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex-1 text-lg font-light tracking-wide placeholder-gray-400 focus:outline-none bg-transparent"
                style={{
                  fontFamily:
                    "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                }}
              />
            </div>
            <div
              className={`absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ${
                isFocused ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
        </div>
      </AnimatedElement>
    </div>
  );
};

// Hero Banner Component
const HeroBanner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  console.log(isLoaded);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroData.images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 mb-16">
      <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroData.images[currentImage].url}
            alt={heroData.images[currentImage].title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-start p-8 md:p-16">
          <AnimatedElement delay={500}>
            <h1
              className="text-4xl md:text-6xl font-thin text-white mb-4 leading-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {heroData.images[currentImage].title}
            </h1>
          </AnimatedElement>

          <AnimatedElement delay={700}>
            <p
              className="text-lg md:text-xl text-white/90 mb-8 font-light max-w-md"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {heroData.images[currentImage].subtitle}
            </p>
          </AnimatedElement>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Start Swapping - Primary CTA */}
            <AnimatedElement delay={900}>
              <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                  Start Swapping
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0"></div>
              </button>
            </AnimatedElement>

            {/* Explore Collection */}
            <AnimatedElement delay={1100}>
              <button className="group relative px-8 py-4 border-2 border-white text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"  onClick={() => navigate("/products")}>
                <span className="relative z-10 flex items-center group-hover:text-black transition-colors duration-300">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Explore Collection
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0"></div>
              </button>
            </AnimatedElement>

            {/* List an Item */}
            <AnimatedElement delay={1300}>
              <button className="group relative px-8 py-4 border-2 border-white text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl" onClick={() => navigate("/post")}>
                <span className="relative z-10 flex items-center group-hover:text-black transition-colors duration-300">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  List an Item
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0"></div>
              </button>
            </AnimatedElement>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroData.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImage ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Categories Section
const CategoriesSection = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 mb-20">
      <AnimatedElement delay={200}>
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-thin text-black mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Your World, Your Style
          </h2>
          <p
            className="text-lg text-gray-600 font-light max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Every piece tells a story. What's yours going to say?
          </p>
        </div>
      </AnimatedElement>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categoriesData.map((category, index) => (
          <AnimatedElement key={category.id} delay={300 + index * 150}>
            <div
              className="group cursor-pointer"
              onClick={() => navigate("/products")}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-[3/4] relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Content overlay */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3
                      className="text-2xl font-light mb-2"
                      style={{ fontFamily: "Playfair Display, serif" }}
                    >
                      {category.name}
                    </h3>
                    <p
                      className="text-sm font-light text-white/80 mb-1"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {category.tagline}
                    </p>
                    <p
                      className="text-xs text-white/60"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {category.count}
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white text-black px-6 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Explore
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  );
};

// Products Section
const ProductsSection = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 mb-20">
      <AnimatedElement delay={200}>
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-thin text-black mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Handpicked for You
          </h2>
          <p
            className="text-lg text-gray-600 font-light max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Because settling for ordinary has never been your style
          </p>
        </div>
      </AnimatedElement>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsData.map((product, index) => (
          <AnimatedElement key={product.id} delay={300 + index * 100}>
            <div
              className="group cursor-pointer"
              onClick={() => navigate("/products")}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className="aspect-[3/4] relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                      {product.badge}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold">
                      {product.discount}
                    </span>
                  </div>

                  {/* Quick action overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      <button className="bg-white text-black p-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                      <button className="bg-white text-black p-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product info */}
                <div className="p-6 bg-white">
                  <h3
                    className="text-lg font-light text-black mb-2"
                    style={{ fontFamily: "Playfair Display, serif" }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span
                        className="text-xl font-semibold text-black"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {product.price}
                      </span>
                      <span
                        className="text-sm text-gray-400 line-through"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {product.originalPrice}
                      </span>
                    </div>
                    <button className="text-black hover:text-gray-600 transition-colors duration-300">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  );
};

// Newsletter Section
const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="max-w-4xl mx-auto px-4 mb-20">
      <AnimatedElement delay={200}>
        <div className="bg-black rounded-3xl p-8 md:p-16 text-center">
          <h2
            className="text-3xl md:text-5xl font-thin text-white mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Stay in the Loop
          </h2>
          <p
            className="text-lg text-white/80 font-light mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Be the first to know about our latest drops, exclusive offers, and
            style insights. No spam, just pure fashion goodness.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email (we promise not to spam)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors duration-300">
              Join Us
            </button>
          </div>
        </div>
      </AnimatedElement>
    </div>
  );
};

// Main Component
const PremiumLandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Custom CSS for animations */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap");

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

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.8s ease-out forwards;
        }
        .animate-slide-in-up {
          animation: slideInUp 0.8s ease-out forwards;
        }
      `}</style>

      <SearchBar />
      <HeroBanner />
      <CategoriesSection />
      <ProductsSection />
      <NewsletterSection />
    </div>
  );
};

export default PremiumLandingPage;
