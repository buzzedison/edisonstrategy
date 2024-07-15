"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LeadershipCoachingPage = () => {
  const coachingAreas = [
    {
      title: "Vision & Strategy",
      description: "Craft a compelling vision for the future, develop a clear roadmap for success, and inspire your team to achieve shared goals.",
      icon: "🎯"
    },
    {
      title: "Communication & Influence",
      description: "Master the art of communication, build trust and rapport, and effectively influence stakeholders at all levels.",
      icon: "💬"
    },
    {
      title: "Empowerment & Delegation",
      description: "Develop your team's potential, delegate effectively, and create a culture of ownership and accountability.",
      icon: "🚀"
    },
    {
      title: "Personal Growth & Resilience",
      description: "Cultivate self-awareness, manage stress effectively, and build the resilience to navigate challenges with grace and determination.",
      icon: "🌱"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 mt-2 lg:mt-12"
        >
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6">
            Lead with Purpose. <br /> <span className="text-blue-600">Create Lasting Impact.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Partner with Edison for personalized leadership coaching that empowers you to achieve extraordinary results and inspire positive change.
          </p>
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Begin Your Leadership Journey
          </a>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-between mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 mb-12 lg:mb-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 rounded-full transform -rotate-6"></div>
              <Image 
                src="/image/edisonlead.png" 
                alt="Edison interacting with leaders" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-2xl relative z-10"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/2 lg:pl-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Transform Your Leadership, Elevate Your Impact</h2>
            <p className="text-xl text-gray-600 mb-6">
              True leadership extends beyond titles and positions—it has the power to transform teams, organizations, and even entire communities.
            </p>
            <p className="text-xl text-gray-600">
              As an experienced founder and leader driven by purpose, I understand the challenges and rewards of leading with impact. I'm here to guide you in developing your unique leadership style, maximizing your strengths, and achieving results that align with your values.
            </p>
          </motion.div>
        </div>

        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Guiding You to Lead with Confidence and Purpose</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {coachingAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{area.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{area.title}</h3>
              <p className="text-gray-600">{area.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-8 rounded-3xl shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-8">Ready to Embark on a Transformative Leadership Journey?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">Invest in your growth, empower your team, and create a lasting legacy.</p>
          <a 
            href="/contact" 
            className="inline-block px-12 py-4 bg-white text-blue-600 font-bold text-lg rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Schedule Your Complimentary Consultation
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default LeadershipCoachingPage;