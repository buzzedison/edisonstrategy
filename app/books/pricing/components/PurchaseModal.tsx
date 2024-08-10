"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose }) => {
  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto"
            onClick={handleModalClick}
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Get Your Copy Now!</h2>
            <p className="text-lg mb-8 text-center">Choose your preferred platform:</p>
            <div className="grid grid-cols-1 gap-4">
              <Link
                href="https://www.amazon.com/Winning-Pricing-Strategy-ideal-market-ebook/dp/B09HMZCTXK"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition duration-300"
              >
                Buy from Amazon
              </Link>
              <Link
                href="https://buzzedison.gumroad.com/l/pricingstrategy"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-grey-700 text-white font-bold py-3 px-6 rounded-lg text-center transition duration-300"
              >
                Buy from Gumroad
              </Link>
              <Link
                href="https://selar.co/ybjy"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-700 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg text-center transition duration-300"
              >
                Buy from Selar
              </Link>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PurchaseModal;