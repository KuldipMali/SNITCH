import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { handleLogin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(formData);
    toast.success("User logged in successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
      <div className="w-95 bg-[#181818] border border-[#2a2a2a] rounded-2xl p-8 shadow-lg">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-white">Welcome Back</h2>
        <p className="text-sm text-gray-400 mt-1 mb-6">Login to your account</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[#121212] border border-[#2a2a2a] text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-b-[#c9a227]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[#121212] border border-[#2a2a2a] text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-b-[#c9a227]"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full cursor-pointer py-2.5 bg-[#c9a227] text-black font-semibold rounded-lg hover:bg-[#b8961e] transition"
          >
            Login
          </button>


          <a
            href="/api/auth/google"
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition border border-gray-300 shadow-sm"
          >
            {/* Google Logo */}
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />

            <span>Sign in with Google</span>
          </a>
        </form>

        {/* Footer */}
        <p className="text-xs  text-gray-500 mt-6 text-center">
          Don’t have an account?{" "}
          <span className="text-[#c9a227] cursor-pointer hover:underline">
          <Link to='/register'>Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
