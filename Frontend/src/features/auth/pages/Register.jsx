import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contact: "",
    password: "",
    isSeller: false,
  });

  const navigate = useNavigate();

  const { handleRegister } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(formData);

    navigate("/");
    toast.success("User registered successfully");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
      <div className="w-95 bg-[#181818] border border-[#2a2a2a] rounded-2xl p-8 shadow-lg">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-white">Create Account</h2>
        <p className="text-sm text-gray-400 mt-1 mb-6">
          Join and start your journey 🚀
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[#121212] border border-[#2a2a2a] text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#c9a227]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[#121212] border border-[#2a2a2a] text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#c9a227]"
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[#121212] border border-[#2a2a2a] text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#c9a227]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-[#121212] border border-[#2a2a2a] text-white rounded-lg placeholder-gray-500 focus:outline-none focus:border-[#c9a227]"
          />

          {/* Seller checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isSeller"
              checked={formData.isSeller}
              onChange={handleChange}
              className="accent-[#c9a227]"
            />
            <label className="text-sm text-gray-300">Register as Seller</label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full cursor-pointer py-2.5 bg-[#c9a227] text-black font-semibold rounded-lg hover:bg-[#b8961e] transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#c9a227] cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
