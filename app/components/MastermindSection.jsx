"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MastermindSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-center mb-8"
        >
          Want to Start a Business? This Free Mastermind Will Help You Do It Right.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl text-center mb-12"
        >
          Starting a business is exciting, but let's be real, it can also feel overwhelming. You've got the passion and the ideas, but figuring out the next steps can be tough.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white text-gray-800 rounded-lg shadow-xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold mb-4">Introducing the Acme Mastermind</h3>
          <p className="mb-4">We're giving new entrepreneurs like you the support, guidance, and community you need to succeed.</p>
          <p className="text-xl font-semibold text-blue-600">And here's the best part: the first 100 entrepreneurs get in FREE.</p>
        </motion.div>
        
        <motion.h3 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-2xl font-bold mb-6"
        >
          Here's what you'll get as one of the first 100 members:
        </motion.h3>
        
        <motion.ul 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="list-disc list-inside space-y-4 mb-12"
        >
          <li>Learn from Edison's 15+ years of experience: He's built and scaled successful companies, and he'll share the strategies that work (and the mistakes to avoid).</li>
          <li>Follow a proven framework for success: We'll help you clarify your vision, validate your idea, and create a step-by-step plan to achieve your goals.</li>
          <li>Connect with a community of driven entrepreneurs: Share your challenges, celebrate your wins, and build relationships with other founders who get it.</li>
        </motion.ul>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-2xl font-bold mb-6">Ready to turn your business dreams into a reality?</p>
          <Link 
            href="https://airtable.com/appSFdtBZ0mhEzlyF/pag9uDaL9FhNYGYNP/form" 
            className="inline-block bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition duration-300"
          >
            Claim Your Free Spot! Only 100 Available!
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MastermindSection;