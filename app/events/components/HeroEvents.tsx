// app/components/HeroSection.tsx
"use client"
import { motion } from 'framer-motion';
import Link from "next/link"
export default function HeroEvents() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-32 px-8 md:px-16 overflow-hidden"
    >
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.2, rotate: 5 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 transform -skew-y-6"
        ></motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-70"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-bold mb-6 text-white"
        >
          Upcoming Events
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
        >
         Check out some of my events to challenge your thinking and improve your overall skills.
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        className="relative z-10 mt-12"
      >
        <div className="flex justify-center">
        <Link href="#events">
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-blue-100 transition duration-300">
            Explore Events
          </button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}