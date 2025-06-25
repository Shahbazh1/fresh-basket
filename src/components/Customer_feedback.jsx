import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Ayesha Khan",
    message:
      "The vegetables are always fresh and delivered right on time. I love knowing where my food comes from!",
    image: "/assets/review-3.jpg",
  },
  {
    name: "Ali Raza",
    message:
      "Absolutely love the quality and taste of the products. Highly recommend for anyone looking for organic options.",
    image: "/assets/review-2.jpg",
  },
  {
    name: "Fatima Noor",
    message:
      "Their service is amazing and packaging is eco-friendly. I always look forward to my weekly delivery!",
    image: "/assets/review-1.jpg",
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Customer_feedback = () => {
  return (
    <section className="bg-white-50 pt-24 pb-20 px-6 md:px-20">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-green-800 text-center mb-12"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        What Customers Say About Us
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((customer, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src={customer.image}
              alt={customer.name}
              className="w-20 h-20 object-cover rounded-full mb-4"
            />
            <h4 className="font-semibold text-lg text-gray-800 mb-2">
              {customer.name}
            </h4>
            <p className="text-slate-600 text-sm">{customer.message}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Customer_feedback;
