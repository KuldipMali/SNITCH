import React, { useState } from "react";
import { useProduct } from "../hook/useProduct";

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const processFiles = (files) => {
    if (images.length + files.length > 7) {
      alert("You can only upload up to 7 images.");
      return;
    }

    const newImages = [...images, ...files].slice(0, 7);
    setImages(newImages);

    const newPreviews = newImages.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("priceAmount", formData.priceAmount);
    data.append("priceCurrency", formData.priceCurrency);

    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      await handleCreateProduct(data);
      alert("Product created successfully!");
      // Reset form
      setFormData({
        title: "",
        description: "",
        priceAmount: "",
        priceCurrency: "USD",
      });
      setImages([]);
      setPreviews([]);
    } catch (error) {
      console.error("Failed to create product:", error);
      alert("Failed to create product. See console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const SubmitButton = () => (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full bg-yellow-500 text-black rounded-sm py-3 lg:py-4 px-6 text-sm lg:text-base font-medium uppercase tracking-[0.15em] hover:bg-yellow-400 focus:outline-none hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        <span>Publish Product</span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-yellow-500 selection:text-black">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden"
      >
        {/* LEFT SIDE: Header & Form Fields */}
        <div className="w-full lg:w-[55%] h-full flex flex-col justify-center px-6 py-8 lg:px-12 lg:py-0 lg:overflow-y-auto scrollbar-hide">
          <div className="w-full max-w-120 mx-auto lg:ml-auto lg:mr-10 xl:mr-20">
            <header className="mb-8 lg:mb-10 border-l-4 border-yellow-500 pl-5">
              <h1 className="text-2xl lg:text-3xl font-light mb-1 lg:mb-2 text-white uppercase tracking-widest">
                Create Product
              </h1>
              <p className="text-zinc-400 text-xs lg:text-sm font-light tracking-wide">
                Add a new item to the SNITCH catalog.
              </p>
            </header>

            <div className="space-y-6 lg:space-y-8">
              {/* Title */}
              <div className="group">
                <label
                  htmlFor="title"
                  className="block text-[10px] lg:text-xs font-medium text-zinc-500 mb-1 lg:mb-2 transition-colors group-focus-within:text-yellow-500 uppercase tracking-widest"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="E.g. Signature Golden Bomber"
                  className="w-full bg-transparent border-b border-zinc-800 py-2 text-lg lg:text-xl font-light text-white placeholder-zinc-700 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>

              {/* Description */}
              <div className="group">
                <label
                  htmlFor="description"
                  className="block text-[10px] lg:text-xs font-medium text-zinc-500 mb-1 lg:mb-2 transition-colors group-focus-within:text-yellow-500 uppercase tracking-widest"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="2"
                  placeholder="Describe the item, materials, and fit..."
                  className="w-full bg-transparent border-b border-zinc-800 py-2 text-sm lg:text-base font-light text-white placeholder-zinc-700 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Pricing */}
              <div className="flex flex-col sm:flex-row gap-5 lg:gap-6">
                <div className="group flex-1">
                  <label
                    htmlFor="priceAmount"
                    className="block text-[10px] lg:text-xs font-medium text-zinc-500 mb-1 lg:mb-2 transition-colors group-focus-within:text-yellow-500 uppercase tracking-widest"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="priceAmount"
                    name="priceAmount"
                    value={formData.priceAmount}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full bg-transparent border-b border-zinc-800 py-2 text-lg lg:text-xl font-light text-white placeholder-zinc-700 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
                <div className="group sm:w-[40%] relative">
                  <label
                    htmlFor="priceCurrency"
                    className="block text-[10px] lg:text-xs font-medium text-zinc-500 mb-1 lg:mb-2 transition-colors group-focus-within:text-yellow-500 uppercase tracking-widest"
                  >
                    Currency
                  </label>
                  <select
                    id="priceCurrency"
                    name="priceCurrency"
                    value={formData.priceCurrency}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-zinc-800 py-2 text-lg lg:text-xl font-light text-white focus:outline-none focus:border-yellow-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="USD" className="bg-zinc-900 text-white">
                      USD ($)
                    </option>
                    <option value="EUR" className="bg-zinc-900 text-white">
                      EUR (€)
                    </option>
                    <option value="GBP" className="bg-zinc-900 text-white">
                      GBP (£)
                    </option>
                    <option value="INR" className="bg-zinc-900 text-white">
                      INR (₹)
                    </option>
                  </select>
                  <div className="absolute right-0 bottom-2.5 lg:bottom-3 pointer-events-none text-zinc-500 group-focus-within:text-yellow-500 transition-colors">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Desktop Button - Shown in 100vh constraint */}
              <div className="hidden lg:block pt-6 border-t border-zinc-900">
                <SubmitButton />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Image Gallery */}
        <div className="w-full lg:w-[45%] h-full bg-zinc-900/30 lg:border-l border-zinc-900 flex flex-col justify-center px-6 pb-8 lg:px-12 lg:py-0 lg:overflow-y-auto scrollbar-hide">
          <div className="w-full max-w-105 mx-auto lg:mr-auto lg:ml-10 xl:ml-16 pt-8 lg:pt-0 border-t border-zinc-900 lg:border-t-0">
            <div className="space-y-4 lg:space-y-5">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h2 className="text-lg font-light text-white mb-0.5">
                    Visual Assets
                  </h2>
                  <p className="text-[10px] lg:text-xs text-zinc-500 tracking-wider uppercase">
                    Cover & Gallery Imagery
                  </p>
                </div>
                <span className="text-xs lg:text-sm text-yellow-500 font-medium">
                  {images.length}{" "}
                  <span className="text-zinc-500 font-light">/ 7 items</span>
                </span>
              </div>

              {previews.length > 0 && (
                <div className="grid grid-cols-3 xl:grid-cols-4 gap-2.5 lg:gap-3 mb-5">
                  {previews.map((src, index) => (
                    <div
                      key={index}
                      className="relative aspect-square group rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800"
                    >
                      <img
                        src={src}
                        alt="Preview"
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-75"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-md text-white w-6 h-6 lg:w-7 lg:h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition focus:opacity-100 z-10 hover:bg-yellow-500 hover:text-black"
                        aria-label="Remove image"
                      >
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L11 11M11 1L1 11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {images.length < 7 && (
                    <label
                      className={`aspect-square flex flex-col items-center justify-center border-2 border-dashed text-zinc-500 rounded-lg cursor-pointer hover:border-yellow-500 hover:text-yellow-500 transition-colors ${isDragging ? "border-yellow-500 bg-zinc-900/50 text-yellow-500" : "border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/80"}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mb-1.5"
                      >
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[9px] font-medium tracking-widest uppercase">
                        Add More
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              )}

              {previews.length === 0 && (
                <label
                  className={`block w-full border-2 border-dashed rounded-2xl p-8 lg:p-10 text-center cursor-pointer hover:border-yellow-500 transition-all duration-300 group ${isDragging ? "border-yellow-500 bg-zinc-900/40" : "border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/40"}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full mb-4 group-hover:bg-yellow-500 group-hover:text-black transition-colors duration-300 shadow-lg ${isDragging ? "bg-yellow-500 text-black" : "bg-zinc-900 text-zinc-500"}`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transform group-hover:scale-110 transition-transform lg:w-5 lg:h-5"
                    >
                      <path
                        d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 16V3M12 3L16 7.375M12 3L8 7.375"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3
                    className={`text-base lg:text-lg font-light mb-1.5 tracking-wide ${isDragging ? "text-yellow-500" : "text-white"}`}
                  >
                    {isDragging ? "Drop images here" : "Upload Images"}
                  </h3>
                  <p className="text-[11px] lg:text-xs text-zinc-500 font-light max-w-65 mx-auto">
                    Drag and drop or click to upload up to 7 high-quality images
                    for this product.
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {/* Mobile Button - Shown only on small screens below the images */}
            <div className="lg:hidden pt-6 mt-6 border-t border-zinc-900">
              <SubmitButton />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
