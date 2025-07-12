import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import LoginImg from "../assets/Login.jpg";
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

 const handleLogin = async () => {
  if (!email || !password) {
    setMessage("Please fill in all fields.");
    return;
  }

  // Admin shortcut
  if (email === "admin@gmail.com" && password === "admin1234") {
    localStorage.setItem("isAdminRewear", "true");
    setMessage("Admin login successful!");
    setTimeout(() => navigate("/admin-dashboard"), 1000);
    return;
  }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem("userIDRewear", data.userId);

        if (data.adminAccessToken) {
          localStorage.setItem("isAdminRewear", "true");
          setMessage("Admin login successful!");
          setTimeout(() => navigate("/admin-dashboard"), 1000);
        } else {
          localStorage.setItem("isAdminRewear", "false");
          setMessage("Login successful!");
          setTimeout(() => navigate("/"), 1500);
        }
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen  pb-16 px-4 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        
        {/* Left - Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={LoginImg}
            alt="Login Visual"
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
              Welcome Back to ReWear
            </h1>
            <p className="text-gray-500 text-sm mt-2">Sign in to continue your fashion journey.</p>
          </div>

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-black focus:outline-none"
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

            {/* Forgot Password */}
            <div className="text-right">
              <button className="text-sm text-gray-500 hover:text-black font-medium">
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors font-medium"
            >
              Sign In
            </button>

            {/* Message */}
            {message && (
              <p className="text-center text-sm text-red-600 font-medium">{message}</p>
            )}

            {/* Signup */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don’t have an account?
                <Link to="/signup" className="ml-1 text-black font-medium hover:underline">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

