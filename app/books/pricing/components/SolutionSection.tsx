"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaBookOpen, FaChartLine, FaUsers, FaComments } from 'react-icons/fa';
import Image from 'next/image';

interface FeatureItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon: Icon, title, description }) => (
  <motion.li
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <div className="flex-shrink-0">
      <Icon className="text-blue-500 text-2xl" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </motion.li>
);

const SolutionSection = () => {
  const features = [
    {
      icon: FaBookOpen,
      title: "The Hidden Psychology of Pricing",
      description: "Understand the science behind why customers buy and how to use it to your advantage."
    },
    {
      icon: FaChartLine,
      title: "Value-Based Pricing Strategies",
      description: "Learn how to confidently charge premium prices based on the true value you deliver."
    },
    {
      icon: FaUsers,
      title: "Data-Driven Decision Making",
      description: "Ditch the guesswork and use proven frameworks to set prices that optimize profitability."
    },
    {
      icon: FaComments,
      title: "Overcoming Pricing Objections",
      description: "Master the art of communicating your value and handling price objections with ease."
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Introducing{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
              "Winning Pricing Strategy"
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive guide to mastering the psychology of pricing and developing strategies that attract dream clients and maximize your revenue.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2"
          >
            <div className="relative w-full aspect-w-3 aspect-h-4 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/image/pricingbook.webp"
                alt="Winning Pricing Strategy Book Cover"
             width={600}
               height={800}
                className="rounded-2xl"
              />
            </div>
          </motion.div>

          <div className="lg:w-1/2">
            <ul className="space-y-6">
              {features.map((feature, index) => (
                <FeatureItem key={index} {...feature} />
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl font-semibold text-gray-800 mb-8">
            And much more inside!
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            Get Your Copy Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;