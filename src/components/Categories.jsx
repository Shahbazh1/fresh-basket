import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: "fruits",
    name: "Fruits",
    count: 6,
    image: "/assets/fruits.png",
    bgColor: "bg-yellow-50"
  },
  {
    id: "fresh_nuts",
    name: "Fresh Nuts",
    count: 5,
    image: "/assets/fresh_nuts.png",
    bgColor: "bg-green-50"
  },
  {
    id: "vegetables",
    name: "Vegetables",
    count: 4,
    image: "/assets/vegetables.png",
    bgColor: "bg-rose-50"
  },
  {
    id: "spices",
    name: "Spices",
    count: 4,
    image: "/assets/spices.png",
    bgColor: "bg-blue-50"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  })
};

const Categories = () => {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate("/category", {
      state: {
        category: "fruits", // Default to fruits or use "all" if you handle that
        searchTerm: "",     // Empty to show all
      },
    });
  };

  const handleCategoryClick = (categoryId) => {
    navigate("/category", {
      state: {
        category: categoryId,
        searchTerm: "", // Or categoryId if you want to auto-search
      },
    });
  };

  return (
    <section className="bg-white pt-24 pb-16 px-6 md:px-20">
      {/* Heading */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Browse Our Hottest</h2>
          <p className="text-xl font-semibold text-green-600">Categories</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSeeAll}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full flex items-center gap-2"
        >
          SEE ALL →
        </motion.button>
      </motion.div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            onClick={() => handleCategoryClick(cat.id)}
            className={`${cat.bgColor} cursor-pointer rounded-2xl p-6 text-center shadow hover:shadow-md transition`}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <img src={cat.image} alt={cat.name} className="w-28 h-28 mx-auto object-contain mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
            <p className="text-sm text-gray-600">({cat.count})</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
