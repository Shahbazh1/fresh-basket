import { Search, ShoppingBasket } from 'lucide-react';
import { FaCarrot, FaAppleAlt, FaSeedling, FaPepperHot, FaUtensils } from 'react-icons/fa';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for routing
import { motion } from "framer-motion";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleCategorySearch = (selectedCategory) => {
    navigate("/category", {
      state: {
        category: selectedCategory,
        searchTerm,
      },
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen bg-amber-50 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 gap-8">

        {/* Left Side */}
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-green-800 leading-tight">
            Farm Fresh <br />
            Vegetables and Fruits<br />
            at Your Doorstep
          </h1>

          {/* Search Bar */}
          <div className="mt-6 relative w-full max-w-md mx-auto md:mx-0">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                const cleaned = e.target.value.toLowerCase().replace(/\s+/g, "");
                setSearchTerm(cleaned);
              }}
              placeholder="Search for vegetables or fruits..."
              className="w-full pl-5 pr-12 py-3 rounded-full shadow bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/* Category Buttons */}
          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            <motion.button
              onClick={() => handleCategorySearch("fruits")}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Fruits
            </motion.button>
            <motion.button
              onClick={() => handleCategorySearch("vegetables")}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Vegetables
            </motion.button>
            <motion.button
              onClick={() => handleCategorySearch("species")}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Species
            </motion.button>
            <motion.button
              onClick={() => handleCategorySearch("fresh_nuts")}
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Fresh Nuts
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0 relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <img
            src="/genral_images/basket.png"
            alt="Fresh vegetables basket"
            className="w-full max-w-sm rounded-xl z-10"
          />

          {/* Floating Icons with animation */}
          <motion.div
            className="absolute top-0 -left-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FaPepperHot size={50} color="green" />
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <FaAppleAlt size={50} color="green" />
          </motion.div>

          <motion.div
            className="absolute top-4 right-4"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          >
            <FaCarrot size={50} color="green" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
