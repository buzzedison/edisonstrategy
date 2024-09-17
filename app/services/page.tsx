"use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CombinedServicesPage = () => {
  const services = [
    {
      title: "Leadership Coaching",
      description: "Empower your leadership journey with personalized coaching to achieve extraordinary results and inspire positive change.",
      icon: "🎯",
      areas: [
        "Vision & Strategy",
        "Communication & Influence",
        "Empowerment & Delegation",
        "Personal Growth & Resilience"
      ]
    },
    {
      title: "Startup Consulting",
      description: "Get expert guidance and hands-on support to build and scale your thriving startup.",
      icon: "🚀",
      areas: [
        "Business Model Development",
        "Go-to-Market Strategies",
        "Marketing & Sales",
        "Partnerships & Funding"
      ]
    },
    {
      title: "Web Development",
      description: "Create cutting-edge websites and web applications tailored to your business goals.",
      icon: "💻",
      areas: [
        "Custom Website Development",
        "Web Application Development",
        "WordPress Development",
        "Database Integration & APIs"
      ]
    }
  ];

  const skills = [
    "React", "Next.js", "Svelte", "Node.js", "Express.js", "MongoDB",
    "WordPress", "API Integration", "Git", "Business Strategy",
    "Leadership Development", "Startup Growth"
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-extrabold text-gray-900 mb-6 pt-12">
            Elevate Your Business with <br/> <span className="text-blue-600">Edison's Expertise</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From leadership coaching to cutting-edge web development, we provide comprehensive solutions to drive your success.
          </p>
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Explore Our Services
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="text-gray-600">
                {service.areas.map((area, idx) => (
                  <li key={idx} className="flex items-center mb-2">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

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
                src="/image/edisonpass.png" 
                alt="Edison providing services" 
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Edison?</h2>
            <p className="text-xl text-gray-600 mb-6">
              With a unique blend of leadership expertise and technical prowess, I offer a holistic approach to solving your business challenges.
            </p>
            <p className="text-xl text-gray-600 mb-6">
              Whether you're looking to enhance your leadership skills, scale your startup, or create a powerful web presence, I provide tailored solutions that drive real results.
            </p>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-8 rounded-3xl shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">Let's discuss how my comprehensive services can help you achieve your goals and drive your success.</p>
          <a 
            href="/contact" 
            className="inline-block px-12 py-4 bg-white text-blue-600 font-bold text-lg rounded-full hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Schedule a Free Consultation
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default CombinedServicesPage;