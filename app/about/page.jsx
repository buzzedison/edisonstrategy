"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion';
const Image = dynamic(() => import('next/image'), { ssr: false })

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" {...fadeIn}>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl pt-1 lg:pt-24">
            About <span className="text-blue-600">Edison</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl md:mt-5 md:max-w-3xl">
            Empowering Founders to Build Impactful, Profitable Businesses
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn} className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="/image/edisonslide2.jpg"
              alt="Edison speaking at a conference"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>

          <motion.div {...fadeIn} className="space-y-8">
            <p className="text-lg text-gray-600 leading-relaxed">
              Edison is a leadership coach for founders and creators, driven by a passion for helping visionary leaders build profitable businesses that make a real impact. With over 15 years of experience igniting movements, training thousands, and guiding hundreds of startups to success, Edison brings a unique blend of entrepreneurial expertise and deep commitment to founder well-being.
            </p>
            <div className="flex space-x-4">
              {['Mission', 'Achievements'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.toLowerCase()
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {activeTab === 'mission' ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Edison's Mission</h2>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Equip 100,000 creators with tools to find their voice and monetize their work.
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Support 1,000 founders in building impactful global businesses.
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-900">Key Achievements</h2>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Trained 5,000+ individuals in programming and technology.
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Pioneered an organic farmers' market and inspired 10,000 young people into agribusiness.
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Co-founded Founder Institute in Ghana and leads Bloop Global, CrowdPen, Agripro and African Recovery.
                    </li>

                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Helped startups win pitch competitions, secure funding, and carve blue ocean niches.
                    </li>

                    <li className="flex items-start">
                      <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Engaged audiences of over 100,000 through public speaking and coaching.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          {...fadeIn}
          className="mt-20 text-center bg-blue-600 text-white py-16 px-4 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Impactful Business?</h2>
          <div className="space-x-4">
            <a href="/book-session" className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition duration-300">
              Book a Free Session
            </a>
            <a href="/services" className="inline-block px-8 py-3 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition duration-300">
              Explore Services
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;