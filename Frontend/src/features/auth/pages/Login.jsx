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
    try {
      const user = await handleLogin(formData);
      if (user.role === "buyer") {
        navigate("/");
      } else if (user.role === "seller") {
        navigate("/seller/dashboard");
      }
      toast.success("User logged in successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
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
        <div className="w-full max-w-md max-h-full overflow-y-auto">
          {/* Tabs */}
          <div className="flex gap-6 mb-5 text-sm font-medium">
            <span className="text-yellow-500 border-b-2 border-yellow-500 pb-1">
              LOGIN
            </span>
            <Link to="/register" className="text-gray-400 hover:text-black">
              SIGN UP
            </Link>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500 mb-5">Login to your account</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-yellow-500 focus:border-b-2 focus:outline-none transition"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-0 py-3 bg-transparent border-b border-gray-300 focus:border-yellow-500 focus:border-b-2 focus:outline-none transition"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 text-black font-semibold hover:bg-yellow-400 transition"
            >
              LOGIN
            </button>

            <hr />
            <p className="text-center py-3 text-[12px]">OR</p>

            {/* Google */}
            <a
              href={`${import.meta.env.VITE_API_URL}/api/auth/google`}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border hover:bg-gray-100 transition"
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
            Don’t have an account?{" "}
            <Link to="/register" className="text-yellow-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
