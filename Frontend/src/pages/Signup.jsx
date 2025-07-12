import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LoginImg from "../assets/Login.jpg";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!name || !address || !email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, address, email, password })
      });

      const data = await res.json();

      if (res.status === 201) {
        localStorage.setItem("userIDRewear", data.userId);
        setMessage("Account created successfully!");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again later.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-2">
      <div className="w-full max-w-6xl flex items-center justify-center relative">
        
        {/* Left side - Image */}
        <div className="hidden lg:flex lg:w-1/2 relative justify-center items-center">
          <div className="w-full h-full top-0">
            <img 
              src={LoginImg} 
              alt="Signup illustration"
              className="max-w-full max-h-full rounded-2xl object-contain"
            />
          </div>
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full lg:w-1/2 max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Join Rewear!</h1>
              <p className="text-gray-600 text-sm">Create your account to start listing and shopping</p>
            </div>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address (City, State)
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Delhi, India"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              {/* Password */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 pr-12 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSignup}
                className="w-full bg-gradient-to-r from-black via-gray-800 to-black text-white py-3 px-4 rounded-lg hover:brightness-110 focus:ring-2 focus:ring-blue-500 font-medium transition"
              >
                Create Account
              </button>

              {/* Message Feedback */}
              {message && (
                <p className="text-center text-sm text-red-600 font-medium">{message}</p>
              )}

              {/* Already have account */}
              <div className="text-center">
                <span className="text-gray-600">Already have an account? </span>
                <Link to="/login">
                  <button className="text-[#333333] hover:text-black font-medium cursor-pointer">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
