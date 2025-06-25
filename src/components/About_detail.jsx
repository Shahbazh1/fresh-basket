import React from 'react';
import { motion } from 'framer-motion';

const AboutDetail = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 px-6 md:px-20 py-16 text-slate-800">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-green-700 text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        About Our Mission
      </motion.h1>

      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="text-lg leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          At <strong className="text-green-700">FreshHarvest</strong>, we believe in more than just delivering produce — we support ethical farming, local communities, and sustainability. We work exclusively with accredited organic farmers to ensure everything we deliver is fresh, pesticide-free, and packed with nutrition.
        </motion.p>

        <motion.p
          className="text-lg leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Our team visits farms regularly, checks compliance, and builds trust with growers. This direct relationship reduces middlemen and gives you produce that’s fresher and more affordable. We're passionate about giving families access to food they can trust.
        </motion.p>

        <motion.img
          src="/assets/farmer.webp"
          alt="Our Farmers"
          className="w-full rounded-lg mt-6 shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        />
      </motion.div>
    </main>
  );
};

export default AboutDetail;
