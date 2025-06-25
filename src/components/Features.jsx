import React from 'react';
import { Leaf, Truck, Star, Percent } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Leaf className="text-green-600 w-6 h-6" />,
    text: "Product from organic farm",
  },
  {
    icon: <Truck className="text-green-600 w-6 h-6" />,
    text: "Free home delivery",
  },
  {
    icon: <Star className="text-green-600 w-6 h-6" />,
    text: "Promotion of the week",
  },
  {
    icon: <Percent className="text-green-600 w-6 h-6" />,
    text: "-20% discount on all vegetables",
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const Features = () => {
  return (
    <section className="bg-white py-10 px-6 md:px-20">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-2 bg-white p-4 rounded-xl hover:shadow-md transition"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {feature.icon}
            </motion.div>
            <p className="text-green-700 font-semibold text-sm md:text-base">
              {feature.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <div className="w-full bg-slate-200 h-1 mt-5"></div>
    </section>
  );
};

export default Features;
