import React, { useState } from "react";
import { useProduct } from "../hook/useProduct";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { handleCreateProduct } = useProduct();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const processFiles = (files) => {
    const newImages = [...images, ...files].slice(0, 7);
    setImages(newImages);
    setPreviews(newImages.map((file) => URL.createObjectURL(file)));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    images.forEach((img) => data.append("images", img));

    await handleCreateProduct(data);
    navigate("/seller/dashboard");
    toast.success("Product created successfully");
  };

  return (
    <div className="h-screen bg-[#f8f8f8] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-3xl font-light tracking-wide text-gray-900">
            Create Product
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Add a new item to your collection.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="text-xs tracking-widest text-gray-400 uppercase">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Signature Jacket"
              className="w-full mt-2 py-2 bg-transparent border-b border-gray-300 focus:border-yellow-500 focus:border-b-2 focus:outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs tracking-widest text-gray-400 uppercase">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="2"
              placeholder="Material, fit, and design details..."
              className="w-full mt-2  bg-transparent border-b border-gray-300 focus:border-yellow-500 focus:border-b-2 focus:outline-none transition resize-none"
            />
          </div>

          {/* Price */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="text-xs tracking-widest text-gray-400 uppercase">
                Price
              </label>
              <input
                type="number"
                name="priceAmount"
                value={formData.priceAmount}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full mt-2 py-2 bg-transparent border-b border-gray-300 focus:border-yellow-500 focus:border-b-2 focus:outline-none transition"
              />
            </div>

            <div className="w-32">
              <label className="text-xs tracking-widest text-gray-400 uppercase">
                Currency
              </label>
              <select
                name="priceCurrency"
                value={formData.priceCurrency}
                onChange={handleInputChange}
                className="w-full mt-2 py-2 bg-transparent border-b border-gray-300 focus:border-yellow-500 focus:outline-none"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          {/* Upload */}
          <div>
            <label className="text-xs tracking-widest text-gray-400 uppercase">
              Images
            </label>

            <label className="mt-3 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-yellow-500 transition">
              <span className="text-sm text-gray-500">
                Click to upload or drag images (max 7)
              </span>

              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {/* Preview */}
            {previews.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {previews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt="preview"
                    className="w-full h-24 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-yellow-500 text-black font-medium tracking-wide rounded-md hover:bg-yellow-400 transition"
          >
            PUBLISH PRODUCT
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
