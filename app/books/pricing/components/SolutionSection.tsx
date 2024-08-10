"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Image from "next/image";

const SolutionSection = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center text-gray-800"
        >
          Introducing "Winning Pricing Strategy"
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          Your comprehensive guide to mastering the psychology of pricing and developing strategies that attract dream clients and maximize your revenue.
        </motion.p>
        <div className="flex justify-center mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative w-full sm:w-2/3 md:w-3/4 lg:w-3/4 aspect-w-3 aspect-h-4 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <Image
              src="/image/pricingbook.webp"
              alt="Winning Pricing Strategy Book Cover"
             
              width={700}
              height={500}
            />
          </motion.div>
        </div>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-6 max-w-2xl mx-auto"
        >
          <li className="flex items-start">
            <FaStar className="text-emerald-500 mt-1 mr-3" />
            <p className="text-gray-700">
              <strong>The Hidden Psychology of Pricing:</strong> Understand the science behind why customers buy and how to use it to your advantage.
            </p>
          </li>
          <li className="flex items-start">
            <FaStar className="text-emerald-500 mt-1 mr-3" />
            <p className="text-gray-700">
              <strong>Value-Based Pricing Strategies:</strong> Learn how to confidently charge premium prices based on the true value you deliver (not just your costs).
            </p>
          </li>
          <li className="flex items-start">
            <FaStar className="text-emerald-500 mt-1 mr-3" />
            <p className="text-gray-700">
              <strong>Data-Driven Decision Making:</strong> Ditch the guesswork and use proven frameworks to set prices that optimize profitability.
            </p>
          </li>
          <li className="flex items-start">
            <FaStar className="text-emerald-500 mt-1 mr-3" />
            <p className="text-gray-700">
              <span className="font-bold">Overcoming Pricing Objections:</span> Master the art of communicating your value and handling price objections with ease.
            </p>
          </li>
          <li className="flex items-start">
            <FaStar className="text-emerald-500 mt-1 mr-3" />
            <p className="text-gray-700">
              And much more!
            </p>
          </li>
        </motion.ul>
      </div>
    </section>
  );
};

export default SolutionSection;