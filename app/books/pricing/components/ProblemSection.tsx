"use client";

import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";

const ProblemSection = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800"
        >
          Is This You?
        </motion.h2>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 max-w-xl mx-auto"
        >
          <li className="flex items-start">
            <FaCheck className="text-emerald-500 mt-1 mr-3" />
            <p className="text-gray-700">
              Are you constantly second-guessing your prices, afraid of scaring customers away?
            </p>
          </li>
          <li className="flex items-start">
            <FaCheck className="text-emerald-500 mt-1 mr-3" />
            <p className="text-gray-700">
              Do you struggle to justify premium rates, even though you know you deliver exceptional value?
            </p>
          </li>
          <li className="flex items-start">
            <FaCheck className="text-emerald-500 mt-1 mr-3" />
            <p className="text-gray-700">
              Are you tired of competing on price and watching your profits dwindle?
            </p>
          </li>
        </motion.ul>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={fadeInVariants}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-center text-gray-700 mt-12 max-w-xl mx-auto"
        >
          It's time to break free from the fear of pricing and step into your full potential.
        </motion.p>
      </div>
    </section>
  );
};

export default ProblemSection;