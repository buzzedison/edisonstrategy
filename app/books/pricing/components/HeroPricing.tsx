"use client"
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
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
    <header className="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight mt-24"
          >
        Claim Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400">
              Pricing Power
            </span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold mb-8 text-blue-200"
          >
            Charge What You're Worth & Attract Premium Clients
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl max-w-3xl mx-auto mb-12 text-blue-100"
          >
            Tired of undercharging and undervaluing your expertise? This book is your secret weapon to unlock hidden profits and build a thriving business that pays you what you deserve.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-10 rounded-full text-xl font-semibold shadow-lg hover:from-pink-600 hover:to-purple-700 transition duration-300 transform hover:-translate-y-1"
          >
            Order Your Copy Now!
          </motion.button>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 opacity-90"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/path/to/background-image.jpg')" }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute inset-0"
        >
          <motion.div
            variants={blobVariants}
            animate="animate"
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          ></motion.div>
          <motion.div
            variants={blobVariants}
            animate="animate"
            transition={{ delay: 2 }}
            className="absolute top-3/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          ></motion.div>
          <motion.div
            variants={blobVariants}
            animate="animate"
            transition={{ delay: 4 }}
            className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          ></motion.div>
        </motion.div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default HeroPricing;