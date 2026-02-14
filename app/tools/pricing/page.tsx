"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PricingToolsLandingPage = () => {
  return (
    <div className="pt-24 bg-gradient-to-b from-white to-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            Pricing Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pick a pricing method and get a clear number fast.
          </p>
        </motion.div>

        {/* Pricing Tools Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {pricingTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {tool.name}
              </h3>
              <p className="text-gray-600 mb-8 h-20">
                {tool.description}
              </p>
              <Link href={tool.link} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg">
                Open Tool
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const pricingTools = [
  {
    name: "Cost-Plus Pricing",
    description: "Set your price from cost and markup.",
    link: "/tools/pricing/costpricing"
  },
  {
    name: "Target Return Pricing",
    description: "Set a price based on the profit target you want.",
    link: "/tools/pricing/targetreturn"
  },
  {
    name: "Value-Based Pricing",
    description: "Set a price based on what customers think it is worth.",
    link: "/tools/pricing/valuebased"
  },
  {
    name: "Dynamic Pricing",
    description: "Adjust price using demand and supply.",
    link: "/tools/pricing/dynamicpricing"
  },
  {
    name: "Bundle Pricing",
    description: "Price product bundles with a discount.",
    link: "/tools/pricing/bundlepricing"
  }
];

export default PricingToolsLandingPage;
