import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

// 🔁 Replace these with your actual EmailJS credentials
const SERVICE_ID = "service_hr7lbma";
const TEMPLATE_ID = "template_d572vhb"; // ✅ Replace this with your correct template ID from EmailJS Dashboard
const PUBLIC_KEY = "f5B1GOviwZaroWGmf";

const ContactSplit = () => {
  const form = useRef();
  const [statusMsg, setStatusMsg] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        setStatusMsg("✅ Message sent successfully!");
        form.current.reset();
      }, (error) => {
        setStatusMsg("❌ Failed to send message. Please try again.");
        console.error("EmailJS Error:", error?.text || error);
      });
  };

  return (
    <section id="contact" className="bg-amber-50 py-32 px-6 md:px-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 relative z-10">

        {/* Left Info */}
        <motion.div className="md:w-1/2 space-y-6"
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-extrabold text-green-800 mb-4">Contact Us</h2>
          <p className="text-slate-700 mb-6">
            Reach out to us for any queries, suggestions or collaborations. We’re happy to connect!
          </p>

          <motion.div className="flex items-center gap-4" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Mail className="text-green-700 w-5 h-5" />
            <span className="text-gray-800">Fresh_basket@gmail.com</span>
          </motion.div>
          <motion.div className="flex items-center gap-4" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
            <Phone className="text-green-700 w-5 h-5" />
            <span className="text-gray-800">+92 300 4436740</span>
          </motion.div>
          <motion.div className="flex items-center gap-4" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2.4 }}>
            <MapPin className="text-green-700 w-5 h-5" />
            <span className="text-gray-800">Mianwali, Punjab, Pakistan</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Form */}
      <motion.div
        className="absolute right-6 md:right-20 top-1/2 transform -translate-y-1/2 bg-white p-8 rounded-2xl shadow-md w-full md:w-[45%] z-20"
        initial={{ x: 80, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <form ref={form} onSubmit={sendEmail} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="user_name" // 🔁 Must match your template variable
              placeholder="Your name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="user_email" // 🔁 Must match your template variable
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message" // 🔁 Must match your template variable
              placeholder="Write your message..."
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md h-28 focus:ring-green-600 focus:outline-none"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold"
          >
            Send Message
          </motion.button>

          {statusMsg && <p className="text-sm text-green-600 mt-2">{statusMsg}</p>}
        </form>
      </motion.div>
    </section>
  );
};

export default ContactSplit;
