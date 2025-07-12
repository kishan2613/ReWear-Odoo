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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address, email, password })
      });

      const data = await res.json();

      if (res.status === 201) {
        localStorage.setItem("userIDRewear", data.userId);
        setMessage("Account created successfully!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again later.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen  pb-16 px-4 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left - Image */}
        <div className="hidden md:block md:w-1/2 -mt-55">
          <img
            src={LoginImg}
            alt="Signup Visual"
            className="rounded-2xl object-cover shadow-xl"
          />
        </div>

        {/* Right - Form */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 rounded-2xl shadow-xl">
          <div className="mb-8 text-center">
            <h1
              className="text-3xl font-bold"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Create Your ReWear Account
            </h1>
            <p className="text-gray-500 text-sm mt-2">Join the movement. Swap sustainably.</p>
          </div>

          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Address (City, State)</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Delhi, India"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-black outline-none"
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
              <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSignup}
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors font-medium"
            >
              Create Account
            </button>

            {/* Message */}
            {message && (
              <p className="text-center text-sm text-red-600 font-medium">{message}</p>
            )}

            {/* Already have account */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already a member?
                <Link to="/login" className="ml-1 text-black font-medium hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
