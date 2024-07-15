"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const servicesStartup = [
    {
      title: "Business Model Development",
      description: "Validate your idea, define your target market, and create a sustainable business model.",
      icon: (
        <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Go-to-Market Strategies",
      description: "Reach your ideal customers, build brand awareness, and drive early traction.",
      icon: (
        <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Marketing & Sales",
      description: "Develop effective marketing campaigns, optimize your sales funnel, and convert leads into loyal customers.",
      icon: (
        <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    },
    {
      title: "Partnerships & Funding",
      description: "Identify strategic partnerships, secure funding, and navigate the investment landscape.",
      icon: (
        <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];
  

const ServicesStartup = () => {
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
            Fuel Your Startup's <span className="text-blue-600">Growth</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get expert guidance and hands-on support from an experienced founder to build a thriving business.
          </p>
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
                src="/image/edisonstart.png" 
                alt="Edison providing startup guidance" 
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Stop Dreaming, Start Scaling</h2>
            <p className="text-xl text-gray-600 mb-6">
              Building a successful startup is hard. You need a solid strategy, the right resources, and the ability to adapt quickly. I'm here to be your guide.
            </p>
            <p className="text-xl text-gray-600">
              As an experienced founder myself, I'm not just a consultant; I'm your partner in growth. I provide the strategic advice, hands-on support, and accountability you need to turn your vision into a thriving business.
            </p>
          </motion.div>
        </div>

        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">How I Help Startups Win</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
  {servicesStartup.map((service, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {service.icon} {/* Render the icon directly here */}
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
      <p className="text-gray-600">{service.description}</p>
    </motion.div>
  ))}
</div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-8 rounded-3xl shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-8">Ready to Take Your Startup to the Next Level?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">Don't leave your startup's success to chance. Partner with an experienced founder who has a proven track record of helping businesses thrive.</p>
          <a 
            href="/contact" 
            className="inline-block px-12 py-4 bg-white text-blue-600 font-bold text-lg rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Book a Free Consultation
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesStartup;