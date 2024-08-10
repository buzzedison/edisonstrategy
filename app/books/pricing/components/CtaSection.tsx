"use client";

import { motion } from "framer-motion";
import { FaBook, FaGift, FaShieldAlt } from "react-icons/fa";
import { useState } from "react";
import PurchaseModal from "./PurchaseModal";

const CTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-gray-100 py-16 ">
      <div className="container mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.6 }}
          className=" mt-1 md:mt-12 text-4xl md:text-4xl font-bold mb-8 text-center text-blue-900"
        >
          Get Your Copy of "Winning Pricing Strategy" Today!
        </motion.h2>
        <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center mb-8"
          >
            <FaBook className="text-blue-500 text-4xl mr-4" />
            <h3 className="text-2xl font-bold">
              "Winning Pricing Strategy" - Your Blueprint for Profitable Pricing
            </h3>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center mb-8"
          >
            <FaGift className="text-blue-500 text-3xl mr-4" />
            <p className="text-xl">
              <strong>Bonus #1:</strong> Pricing Strategy Template Library
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center mb-12"
          >
            <FaGift className="text-blue-500 text-3xl mr-4" />
            <p className="text-xl">
              <strong>Bonus #2:</strong> Exclusive Q&A Webinar with the Author
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center mb-12"
          >
            <FaShieldAlt className="text-blue-500 text-3xl mr-4" />
            <p className="text-xl">
              <strong>100% Money-Back Guarantee:</strong> If you're not completely satisfied with the strategies and insights in this book, simply contact us for a full refund. No questions asked.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-2xl shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Order Your Copy Now!
            </motion.button>
          </motion.div>
        </div>
      </div>
      <PurchaseModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default CTASection;