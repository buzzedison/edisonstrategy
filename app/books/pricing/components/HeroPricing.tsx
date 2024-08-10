"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import PurchaseModal from "./PurchaseModal";

const HeroPricing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const blobVariants: Variants = {
    animate: {
      translateX: [0, 30, -20, 0],
      translateY: [0, -50, 20, 0],
      scale: [1, 1.1, 0.9, 1],
      transition: {
        duration: 7,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-8 max-w-4xl mx-auto"
        >
          Pricing Power Unlocked: Charge What You're Worth & Attract Premium Clients
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-12"
        >
          Tired of undercharging and undervaluing your expertise? This book is your secret weapon to unlock hidden profits and build a thriving business that pays you what you deserve.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openModal}
          className="bg-emerald-500 text-white py-4 px-10 rounded-full text-xl font-semibold shadow-lg hover:bg-emerald-600 transition duration-300"
        >
          Order Your Copy Now!
        </motion.button>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-800 to-blue-900 opacity-80"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/path/to/background-image.jpg')" }}></div>
      </div>

      {/* Floating Elements */}
      <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <motion.div
            variants={blobVariants}
            animate="animate"
            className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          ></motion.div>
          <motion.div
            variants={blobVariants}
            animate="animate"
            transition={{ delay: 2 }}
            className="absolute top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          ></motion.div>
          <motion.div
            variants={blobVariants}
            animate="animate"
            transition={{ delay: 4 }}
            className="absolute -bottom-20 left-20 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70"
          ></motion.div>
        </motion.div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default HeroPricing;
