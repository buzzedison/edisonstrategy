"use client"
import  { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic'
const Image = dynamic(() => import('next/image'), { ssr: false })

const HeroMain: React.FC = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const fullText1 = "Empowering";
  const fullText2 = "Founders";
  const fullText3 = "Together";

  useEffect(() => {
    const animateText = (fullText: string, setText: React.Dispatch<React.SetStateAction<string>>, delay: number) => {
      let index = 0;
      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(fullText.slice(0, index));
          index++;
          if (index > fullText.length) clearInterval(intervalId);
        }, 100);
      }, delay);
    };

    animateText(fullText1, setText1, 0);
    animateText(fullText2, setText2, 1000);
    animateText(fullText3, setText3, 2000);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-100 text-blue-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32  md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-10 md:mb-0 z-10"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
              <motion.span className="block" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>{text1}</motion.span>
              <motion.span className="block text-blue-600" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2 }}>{text2}</motion.span>
              <motion.span className="block" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 2.2 }}>{text3}</motion.span>
            </h1>
            <p className="mt-6 max-w-md text-xl text-blue-800">
              Join an exclusive community designed to connect, support, and elevate founders throughout their entrepreneurial journeys.
            </p>
            <div className="mt-10 flex space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
               
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg transition duration-150 ease-in-out"
              >
          <Link href="https://airtable.com/app6sLDmnMh84vOP4/pagUnNFYcByTVbday/form">Join the Circle</Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
               
                className="px-8 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg transition duration-150 ease-in-out"
              >
               <Link href="/founders"> Learn More</Link>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 relative"
          >
            <motion.div 
              className="relative w-full h-46 md:h-[500px] rounded-[30px] overflow-hidden shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/image/edisonnewb.jpg"
                alt="Founders collaborating"
                fill={true}
    style={{ objectFit: 'cover' }}
                className="rounded-[30px]"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-black to-blue-100 mix-blend-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1 }}
              />
            </motion.div>
            <motion.div
              className="absolute -z-10 top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full bg-blue-300 rounded-[40%] mix-blend-multiply filter blur-xl opacity-70" />
            </motion.div>
            <motion.div
              className="absolute -z-20 top-1/2 left-1/2 w-[180%] h-[180%] -translate-x-1/2 -translate-y-1/2"
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full bg-blue-100 rounded-[45%] mix-blend-multiply filter blur-xl opacity-70" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroMain;