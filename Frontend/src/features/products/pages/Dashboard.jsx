import React, { useEffect } from "react";
import { useProduct } from "../hook/useProduct";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { handleGetSellerProducts } = useProduct();
  const sellerProducts = useSelector((state) => state.product.sellerProducts);

  const navigate = useNavigate();

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f8f8] px-6 py-10">
      {/* Header + Button */}
      <div className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light tracking-wide text-gray-900">
            Your Products
          </h1>
          <p className="text-sm text-gray-500 mt-2">Manage your collection</p>
        </div>

        {/* 🔥 Add Product Button */}
        <button
          onClick={() => navigate("/seller/create-product")}
          className="px-5 py-2.5 bg-yellow-500 cursor-pointer text-black text-sm font-medium rounded-md hover:bg-yellow-400 transition shadow-sm"
        >
          + New Listing
        </button>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sellerProducts?.length > 0 ? (
          sellerProducts.map((product) => (
            <div
            onClick={() => {
              navigate(`/seller/product/${product._id}`)
            }}
              key={product._id}
              className="bg-white rounded-xl cursor-pointer overflow-hidden border border-gray-200 hover:shadow-md transition"
            >
              {/* Image */}
              <div className="w-full h-48 bg-gray-100 overflow-hidden">
                <img
                  src={product.images[0]?.url}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-1">
                <h2 className="text-sm font-medium text-gray-800 line-clamp-1">
                  {product.title}
                </h2>

                <p className="text-xs text-gray-500 line-clamp-1">
                  {product.description}
                </p>

                <p className="text-sm text-gray-900 font-medium mt-1">
                  ₹{product.price.amount}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 mt-20">
            No products found
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
