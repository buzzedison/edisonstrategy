"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaGift, FaShieldAlt } from 'react-icons/fa';
import PurchaseModal from './PurchaseModal';

interface FeatureItemProps {
  icon: any;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
  >
    <div className="flex-shrink-0">
      <Icon className="text-indigo-600 text-3xl" />
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.div>
);

const CTASection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const features = [
    {
      icon: FaBook,
      title: '"Winning Pricing Strategy" - Your Blueprint for Profitable Pricing',
      description: 'Unlock the secrets to pricing your services for maximum profitability and client satisfaction.'
    },
    {
      icon: FaGift,
      title: 'Bonus #1: Pricing Strategy Template Library',
      description: 'Get instant access to our comprehensive library of proven pricing templates and frameworks.'
    },
    {
      icon: FaGift,
      title: 'Bonus #2: Exclusive Q&A Webinar with the Author',
      description: 'Join a live session to get your specific pricing questions answered by the expert.'
    }
  ];

  return (
    <section className="w-full md:w-3/4 container mx-auto bg-gradient-to-b from-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Get Your Copy of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
              "Winning Pricing Strategy"
            </span>{' '}
            Today!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your pricing approach and supercharge your business growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 flex items-start space-x-4 p-6 bg-indigo-50 rounded-lg border-2 border-indigo-200"
          >
            <div className="flex-shrink-0">
              <FaShieldAlt className="text-indigo-600 text-3xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">100% Money-Back Guarantee</h3>
              <p className="text-gray-600">
                If you're not completely satisfied with the strategies and insights in this book, simply contact us for a full refund. No questions asked.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Order Your Copy Now!
          </motion.button>
        </motion.div>
      </div>
      <PurchaseModal isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
};

export default CTASection;