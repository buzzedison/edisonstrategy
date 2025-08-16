"use client"
// Import necessary packages and components
import React from 'react';

// Import animation library (Framer Motion)
import { motion } from 'framer-motion';

// Define the HeroSection component
function HeroSection() {
  return (
    <div className="relative bg-blue-200 overflow-hidden">
      <div className="max-w-7xl mx-auto my-12 md:my-24 p-4 sm:p-0">
        <div className="text-center pt-0 lg:pt-12">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }} 
            className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
            Funding, Systems, and Growth Tactics <br/><span className="text-3xl font-normal "> <i>To Take Your Business to the Next Level</i> </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.5 }} 
            className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get step-by-step game plans to secure funding, build efficient systems, and scale your business the smart way.
          </motion.p>
        </div>
        <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
          <div className="min-w-full">
            {/* Replaced subscribe input and button with Beehiiv iframe embed */}
            <iframe 
              src="https://embeds.beehiiv.com/fdde57ec-365b-42cc-a7e9-8a898a7b9c53?slim=true" 
              data-test-id="beehiiv-embed" 
              height="52" 
              width="100%"  // Changed from fixed 500px to 100%
              frameBorder="0" 
              style={{ margin: 0, borderRadius: '0px', backgroundColor: 'transparent', overflow: 'auto' }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the HeroSection component
export default HeroSection;
