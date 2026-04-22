import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";
import { Link, useNavigate } from "react-router";
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
    toast.success("User registered successfully");
    navigate("/");
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* LEFT SIDE - IMAGE */}
      <div className="hidden lg:flex w-1/2 h-full relative bg-black">
        <img
          src="https://images.unsplash.com/photo-1556821840-3a63f95609a7"
          alt="model"
          className="w-full h-full object-cover opacity-90"
        />

        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-5xl tracking-widest font-light">SNITCH</h1>
          <p className="text-xs mt-2 text-gray-300 tracking-wider">
            AUTUMN / WINTER ARCHIVE 2024
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full lg:w-1/2 h-full bg-[#f8f8f8] flex items-center justify-center px-6">
        {/* Scroll only inside form if needed */}
        <div className="w-full px-6 py-6 rounded-2xl max-w-md max-h-full overflow-y-auto">
          {/* Tabs */}
          <div className="flex gap-6 mb-5 text-sm font-medium">
            <Link to="/login" className="text-gray-400 hover:text-black">
              LOGIN
            </Link>
            <span className="text-yellow-500 border-b-2 border-yellow-500 pb-1">
              SIGN UP
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold text-gray-800">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            Join the elite streetwear community.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full py-3 bg-transparent border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full py-3 bg-transparent border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none transition"
            />

            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full py-3 bg-transparent border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full py-3 bg-transparent border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none transition"
            />

            {/* Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isSeller"
                checked={formData.isSeller}
                onChange={handleChange}
                className="accent-yellow-500"
              />
              <label className="text-sm text-gray-600">
                Register as Seller
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 mb-8 bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
            >
              REGISTER
            </button>

            <hr />

            <p className="text-center text-[12px]">OR</p>

            {/* Google */}
            <a
              href="/api/auth/google"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border mt-8 hover:bg-gray-100 transition"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </a>
          </form>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-5 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
