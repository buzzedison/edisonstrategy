"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

interface ProblemItemProps {
  children: React.ReactNode;
}

const ProblemItem: React.FC<ProblemItemProps> = ({ children }) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <div className="flex-shrink-0 mt-1">
      <FaCheck className="text-blue-500 text-xl" />
    </div>
    <p className="text-gray-700 text-lg">{children}</p>
  </motion.li>
);

const ProblemSection = () => {
  const problems = [
    "Are you constantly second-guessing your prices, afraid of scaring customers away?",
    "Do you struggle to justify premium rates, even though you know you deliver exceptional value?",
    "Are you tired of competing on price and watching your profits dwindle?"
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Is This <span className="text-blue-500">You?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Recognize yourself in these common pricing challenges?
          </p>
        </motion.div>

        <ul className="space-y-6 max-w-3xl mx-auto mb-12">
          {problems.map((problem, index) => (
            <ProblemItem key={index}>{problem}</ProblemItem>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-2xl font-semibold text-gray-800 mb-8 max-w-2xl mx-auto">
            It's time to break free from the fear of pricing and step into your full potential.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            Discover Your Solution
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;