import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Sample category-wise products
const allProducts = {
  fruits: [
    { name: "Apple", price: 300, image: "/fruits/apple.png" },       // per kg
    { name: "Banana", price: 150, image: "/fruits/banana.png" },     // dozen
    { name: "Orange", price: 250, image: "/fruits/orange.png" },     // per kg
    { name: "Grapes", price: 400, image: "/fruits/grape.png" },      // per kg
  ],
  vegetables: [
    { name: "Carrot", price: 100, image: "genral_images/Carrot.png" },
    { name: "Tomato", price: 80, image: "genral_images/tomato.png" },
    { name: "Broccoli", price: 300, image: "/genral_images/Broccoli.png" },
    { name: "Lettuce", price: 150, image: "genral_images/Iceberg.png" },
  ],
  nuts: [
    { name: "Almonds", price: 1800, image: "/nuts/almond.png" },     // per kg
    { name: "Cashews", price: 2000, image: "/nuts/cashchews.png" },  // per kg
    { name: "Walnuts", price: 1600, image: "/nuts/walnut.png" },
    { name: "Pistachios", price: 2200, image: "/nuts/pistacheos.png" },
  ],
  spices: [
    { name: "Black Pepper", price: 1200, image: "/species/black_pepper.png" },
    { name: "Turmeric", price: 500, image: "/species/turmeric.png" },
    { name: "Cinnamon", price: 1000, image: "/species/cinnamon.png" },
    { name: "Cloves", price: 1600, image: "/species/cloves.png" },
  ],
};


const productVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const categories = ['fruits', 'vegetables', 'nuts', 'spices'];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('fruits');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory(prev => {
        const currentIndex = categories.indexOf(prev);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-white pt-24 pb-20 px-6 md:px-20 gap-y-16">
      <motion.h2
        className="text-3xl font-bold text-green-800 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Featured <span className="capitalize">{activeCategory}</span>
      </motion.h2>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full border transition-all ${
              activeCategory === category
                ? "bg-green-700 text-white"
                : "bg-green-50 text-green-800 hover:bg-green-600 hover:text-white"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {allProducts[activeCategory].map((item, index) => (
          <motion.div
            key={index}
            className="bg-slate-100 rounded-2xl shadow p-4 flex flex-col items-center text-center"
            variants={productVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img src={item.image} alt={item.name} className="w-28 h-28 object-contain mb-4" />
            <h3 className="text-xl font-semibold text-green-800">{item.name}</h3>
            <p className="text-gray-700 mb-4">Rs:{item.price}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/buyer-details", { state: { product: item } })}
              className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full"
            >
              Order Now
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Shop;
