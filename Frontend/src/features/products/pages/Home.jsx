import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProduct } from "../hook/useProduct";
import { useNavigate } from "react-router";

const Home = () => {
  const products = useSelector((state) => state.product.products);
  const { handleGetAllProducts } = useProduct();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f8f8] px-6 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-light tracking-wide text-gray-900">
          Explore Collection
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Discover premium styles curated for you
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products?.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="w-full h-60 bg-gray-100 overflow-hidden rounded-lg">
                <img
                  src={product.images[0]?.url}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="mt-3 space-y-1">
                <h2 className="text-sm text-gray-800 font-medium line-clamp-1">
                  {product.title}
                </h2>

                <p className="text-xs text-gray-500 line-clamp-1">
                  {product.description}
                </p>

                <p className="text-sm text-gray-900 font-medium">
                  ₹{product.price.amount}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 mt-20">
            No products available
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
