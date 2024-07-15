"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const SpeakingPage = () => {
  const [activeTab, setActiveTab] = useState('topics');

  const topics = [
    "African Development", "High-Performing Teams", "Future of Business",
    "Project Management", "Artificial Intelligence", "Digital Transformation",
    "Startup Development", "Design Thinking", "Venture Capital",
    "Effective Leadership", "Marketing & Branding", "Pricing Strategies"
  ];

  const clients = ["UNFPA", "Yalda", "AIESEC", "Enactus", "GhanaTechLab", "USIU"];

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"> 
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-16 md:pt-24" // Increased top padding here
        >
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
            Empower Your Audience with <span className="text-blue-600">Edison</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering actionable insights and transformative experiences for over 100,000 individuals across 100+ engagements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-200 rounded-full transform -rotate-6"></div>
            <Image 
              src="/image/edisonnew.jpg" 
              alt="Edison speaking at an event" 
              width={600} 
              height={400} 
              className="rounded-lg shadow-2xl relative z-10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              Edison is a dynamic keynote speaker, facilitator, and trainer known for delivering practical, actionable insights that drive real-world results. His engaging presentations leave audiences equipped and inspired to create positive change.
            </p>
            <div className="flex space-x-4">
              {['Topics', 'Clients'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                    activeTab === tab.toLowerCase()
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'topics' ? (
                  <motion.div
                    key="topics"
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <h2 className="text-2xl font-semibold mb-4 text-blue-800">Areas of Expertise:</h2>
                    <ul className="grid grid-cols-2 gap-3">
                      {topics.map((topic, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div
                    key="clients"
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <h2 className="text-2xl font-semibold mb-4 text-blue-800">Trusted by:</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {clients.map((client, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg text-center">
                          <span className="text-lg font-semibold text-gray-800">{client}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Inspire Your Audience?</h2>
          <p className="text-xl mb-8">Available for both virtual and in-person events, Edison brings a dynamic and engaging presence to every stage.</p>
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            Book Edison for Your Event
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default SpeakingPage;