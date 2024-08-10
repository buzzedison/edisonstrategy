"use client";

import { motion, useTransform, useViewportScroll } from "framer-motion";
import { FaCheck, FaChartLine, FaUsers, FaSmile } from "react-icons/fa";
import { useState } from "react";
import PurchaseModal from "./PurchaseModal";

const BenefitsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { scrollYProgress } = useViewportScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const benefitVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="bg-gradient-to-b from-blue-500 to-blue-700 py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-white"
        >
          Discover Your Pricing Potential
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={benefitVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center mb-4">
              <FaCheck className="text-blue-500 text-3xl mr-4" />
              <h3 className="text-2xl font-bold">Confident Pricing</h3>
            </div>
            <p className="text-gray-700">
              Set prices that reflect your worth without hesitation or fear. No more second-guessing or worrying about what clients will think!
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={benefitVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center mb-4">
              <FaUsers className="text-blue-500 text-3xl mr-4" />
              <h3 className="text-2xl font-bold">Premium Clients</h3>
            </div>
            <p className="text-gray-700">
              Attract high-paying clients who are thrilled to invest in your expertise. Clients who value your work and are happy to pay a premium for your unique skills.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={benefitVariants}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center mb-4">
              <FaChartLine className="text-blue-500 text-3xl mr-4" />
              <h3 className="text-2xl font-bold">Increased Profits</h3>
            </div>
            <p className="text-gray-700">
              Enjoy increased profits and the financial freedom to pursue your passions. Have the resources to grow your business, invest in yourself, and live life on your terms.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={benefitVariants}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center mb-4">
              <FaSmile className="text-blue-500 text-3xl mr-4" />
              <h3 className="text-2xl font-bold">Thriving Business</h3>
            </div>
            <p className="text-gray-700">
              Transform your mindset, own your value, and build a business that thrives on your terms. "Winning Pricing Strategy" is your guide to success.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="bg-white text-blue-700 font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:bg-blue-100 transition duration-300"
          >
            Get Your Copy Now
          </motion.button>
        </motion.div>
      </div>

      {/* Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-blue-900 opacity-80"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/path/to/background-image.jpg')" }}></div>
      </motion.div>

      {/* Purchase Modal */}
      <PurchaseModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default BenefitsSection;
