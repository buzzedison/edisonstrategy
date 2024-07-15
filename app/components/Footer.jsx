"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Image src="/image/logo.svg" alt="Company Logo" width={120} height={60} />
            <p className="text-sm">Empowering leaders to build profitable businesses with purpose.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Services', 'Brands', 'Insights', 'Speaking', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-sm hover:text-blue-600 transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map((social) => (
                <li key={social}>
                  <a href={`https://${social.toLowerCase()}.com/buzzedison`} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-blue-600 transition-colors duration-200">
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Get Growth Tactics</h3>
            <div className="w-full">
              <iframe 
                src="https://embeds.beehiiv.com/fdde57ec-365b-42cc-a7e9-8a898a7b9c53?slim=true" 
                data-test-id="beehiiv-embed" 
                height="52" 
                width="100%"
                frameBorder="0" 
                style={{ margin: 0, borderRadius: '0px', backgroundColor: 'transparent', overflow: 'auto' }}
              ></iframe>
            </div>
          </div>
        </div>
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Edison Ade. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;