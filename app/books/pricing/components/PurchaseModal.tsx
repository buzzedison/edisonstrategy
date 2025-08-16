"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaAmazon, FaShoppingCart, FaTimes } from 'react-icons/fa';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const platforms = [
    {
      name: 'Amazon',
      icon: FaAmazon,
      href: 'https://www.amazon.com/Winning-Pricing-Strategy-ideal-market-ebook/dp/B09HMZCTXK',
      bgColor: 'bg-yellow-400',
      hoverColor: 'hover:bg-yellow-500',
      textColor: 'text-black'
    },
    {
      name: 'Gumroad',
      icon: FaShoppingCart,
      href: 'https://buzzedison.gumroad.com/l/pricingstrategy',
      bgColor: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600',
      textColor: 'text-white'
    },
    {
      name: 'Selar',
      icon: FaShoppingCart,
      href: 'https://selar.co/ybjy',
      bgColor: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      textColor: 'text-white'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes size={24} />
            </button>
            <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">
              Get Your Copy Now!
            </h2>
            <p className="text-lg mb-6 text-center text-gray-600">
              Choose your preferred platform:
            </p>
            <div className="space-y-4">
              {platforms.map((platform) => (
                <Link
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center ${platform.bgColor} ${platform.hoverColor} ${platform.textColor} font-bold py-3 px-6 rounded-lg text-center transition duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
                >
                  <platform.icon className="mr-2" size={20} />
                  Buy from {platform.name}
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center text-gray-500 text-sm">
              By purchasing, you agree to our{' '}
              <a href="#" className="underline hover:text-gray-700">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="underline hover:text-gray-700">
                Privacy Policy
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PurchaseModal;