import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import LoginImg from "../assets/Login.jpg";
import { Link } from 'react-router-dom';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br  from-gray-50 to-blue-50 flex items-center justify-center p-2">
      <div className="w-full max-w-6xl flex items-center justify-center relative">
        
        {/* Left side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative justify-center items-center">
          <div className="w-full h-full top-0">
            <img 
              src={LoginImg} 
              alt="Login illustration with character, rocket, clock and geometric shapes" 
              className="max-w-full max-h-full rounded-2xl object-contain"
            />
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Rewear! 👋</h1>
              <p className="text-gray-600">Please sign-in to your account and start the adventure</p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email or username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button className="text-sm text-[#333333] cursor-pointer hover:text-black font-medium">
                  Forgot password?
                </button>
              </div>

              <button
                type="button"
                className="w-full cursor-pointer bg-[#202020] text-white py-3 px-4 rounded-lg hover:bg-black-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Login
              </button>

              <div className="text-center">
                <span className="text-gray-600">New on our platform? </span>
                <Link to="/signup"><button className="text-[#333333] hover:text-black font-medium cursor-pointer">
                  Create an account
                </button></Link>
              </div>

              

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}