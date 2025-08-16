"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Instagram, Youtube, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div>
            <Image 
              src="/image/logo.svg" 
              alt="Edison Ade" 
              width={120} 
              height={60}
              className="mb-4"
            />
            <p className="text-gray-600 mb-6">
              Empowering visionary leaders to build profitable businesses with purpose.
            </p>
            
            <div className="flex space-x-3">
              {[
                { icon: <Twitter size={18} />, url: 'https://twitter.com/buzzedison', label: 'Twitter' },
                { icon: <Linkedin size={18} />, url: 'https://linkedin.com/in/buzzedison', label: 'LinkedIn' },
                { icon: <Instagram size={18} />, url: 'https://instagram.com/buzzedison', label: 'Instagram' },
                { icon: <Youtube size={18} />, url: 'https://youtube.com/buzzedison', label: 'YouTube' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="bg-white p-2 rounded-md shadow-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Services', 'Brands', 'Insights', 'Speaking', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Services</h3>
            <ul className="space-y-2">
              {['Consulting', 'Development', 'Startup Launch', 'Books', 'Pricing Strategy'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <a href="mailto:hello@buzzedison.com" className="text-gray-600 hover:text-blue-600">
                  ask@buzzedison.com
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <span className="text-gray-600">Remote Worldwide</span>
              </div>
              <div className="pt-3">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                >
                  Get in touch
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">&copy; {currentYear} Edison Ade. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-blue-600">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-blue-600">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;