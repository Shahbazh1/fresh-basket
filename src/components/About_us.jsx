import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // 👈 Import

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.7,
      ease: 'easeOut',
    },
  }),
};

const AboutUs = () => {
  const navigate = useNavigate(); // 👈 Initialize

  const handleLearnMore = () => {
    navigate('/about_detail');
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-green-50 px-6 md:px-20 pt-24 pb-16 gap-12">

      {/* Left Side */}
      <motion.div
        className="w-full md:w-1/2"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          x: { duration: 1 },
          opacity: { duration: 1 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
        viewport={{ once: true }}
      >
        <img src="/assets/vegetables.png" alt="Accredited Farmers" className="w-full rounded-2xl" />
      </motion.div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 space-y-4">
        <motion.p className="text-green-600 text-lg font-medium" variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
          About Us
        </motion.p>

        <motion.h2 className="text-3xl md:text-4xl font-extrabold text-black" variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
          We believe in working with accredited farmers
        </motion.h2>

        <motion.p className="text-slate-600 leading-relaxed" variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
          Our mission is to provide you with the freshest fruits and vegetables directly from certified organic farms.
        </motion.p>

        <motion.button
          onClick={handleLearnMore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-full flex items-center gap-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          Learn More <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
};

export default AboutUs;
