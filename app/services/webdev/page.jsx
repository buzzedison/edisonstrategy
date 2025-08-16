"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const WebDevelopmentPage = () => {
  const services = [
    {
      title: "Custom Website Development",
      description: "From sleek landing pages to complex e-commerce platforms, I build custom websites that align with your brand identity and deliver exceptional user experiences.",
      icon: "🖥️"
    },
    {
      title: "Web Application Development",
      description: "Leveraging the latest technologies like React, Next.js, and Svelte, I create powerful, scalable web applications that streamline your operations and drive business growth.",
      icon: "⚛️"
    },
    {
      title: "WordPress Development",
      description: "Whether you need a custom WordPress theme, plugin development, or ongoing maintenance and support, I can help you maximize the power of this versatile platform.",
      icon: "🔧"
    },
    {
      title: "Database Integration & APIs",
      description: "Seamlessly integrate databases like MongoDB and leverage APIs to create dynamic, data-driven web experiences.",
      icon: "🔗"
    }
  ];

  const skills = [
    "React", "Next.js", "Svelte", "HTML", "CSS", "JavaScript",
    "Node.js", "Express.js", "MongoDB", "WordPress", "API Integration", "Git"
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
            Crafted Web Experiences That <br/> <span className="text-blue-600">Drive Results</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From high-performance websites to custom web applications, Edison delivers cutting-edge solutions tailored to your business goals.
          </p>
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Bring Your Vision to Life
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
                src="/image/webdev.png" 
                alt="Web Development Showcase" 
                width={600} 
                height={400} 
                className="rounded-full shadow-2xl relative z-10"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/2 lg:pl-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Elevate Your Online Presence</h2>
            <p className="text-xl text-gray-600 mb-6">
              Your website is your most valuable asset. It's often the first point of contact for potential customers, partners, and investors.
            </p>
            <p className="text-xl text-gray-600">
              I combine technical expertise with a deep understanding of user experience to create websites and web applications that are not only beautiful but also high-performing, user-friendly, and optimized to achieve your specific business objectives.
            </p>
          </motion.div>
        </div>

        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Web Development Services Tailored to Your Needs</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
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
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-24">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Technical Skills</h3>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, index) => (
              <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-8 rounded-3xl shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Online Presence?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">Let's discuss your web development needs and how I can help you achieve your digital goals.</p>
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

export default WebDevelopmentPage;