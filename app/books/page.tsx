"use client"

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { FaBook, FaStar, FaCalendarAlt } from 'react-icons/fa';

type BookCategory = 'All Books' | 'Best Sellers' | 'New Arrivals';

const tabs: BookCategory[] = ['All Books', 'Best Sellers', 'New Arrivals'];

const books = {
  'All Books': [
    {
      title: "Pricing Strategy to Help You Win in Business",
      description: "Master the art of pricing to boost your business success. Dive into various pricing models, strategies, and customer psychology.",
      image: "/image/pricingbook.webp",
      link: "/books/pricing",
      buyLink: "https://buzzedison.gumroad.com/l/pricingstrategy"
    },
    {
      title: "The Art of Inversion",
      description: "Discover how to solve problems by approaching them backwards. Learn to think differently and find innovative solutions.",
      image: "/image/inversion.png",
      link: "/books/inversion",
      buyLink: "https://buzzedison.gumroad.com/l/inversion"
    },
  ],
  'Best Sellers': [
    // Add best sellers here
  ],
  'New Arrivals': [
    // Add new arrivals here
  ]
};

type Book = {
  title: string;
  description: string;
  image: string;
  link: string;
  buyLink: string;
};

const BookCard = ({ book }: { book: Book }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl flex flex-col h-full"
  >
    <div className="relative h-64 md:h-80">
      <Image 
        src={book.image} 
        layout="fill"
        objectFit="cover"
        alt={`Cover of ${book.title}`} 
        className="transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    </div>
    <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold mb-3 text-gray-800 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 mb-6 line-clamp-3">{book.description}</p>
      </div>
      <div className="flex flex-col space-y-3">
        <Link href={book.link} className="w-full">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-full hover:from-blue-600 hover:to-indigo-700 transition duration-300 flex items-center justify-center space-x-2 group"
          >
            <FaBook className="text-lg transition-transform duration-300 group-hover:rotate-12" />
            <span className="font-semibold">Explore Book</span>
          </motion.button>
        </Link>
        <Link href={book.buyLink} className="w-full">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-4 rounded-full hover:from-emerald-600 hover:to-green-700 transition duration-300 flex items-center justify-center space-x-2 group"
          >
            <FaStar className="text-lg transition-transform duration-300 group-hover:rotate-45" />
            <span className="font-semibold">Purchase Now</span>
          </motion.button>
        </Link>
      </div>
    </div>
  </motion.div>
);

const BooksPage = () => {
  const [selectedTab, setSelectedTab] = useState<BookCategory>(tabs[0]);

  return (
    <div className="bg-gray-100 h-screen">
      <header className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 opacity-80 animate-gradient"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-extrabold mb-4">Transform Your Business</h1>
          <h2 className="text-4xl mb-6">with Expert Insights</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Unlock your potential with Edison's bestselling guides. Gain actionable insights on strategy, branding, and digital transformation to elevate your business and leadership skills.
          </p>
          <Link href="/#books" passHref>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-8 rounded-full text-lg font-semibold hover:from-green-500 hover:to-green-700 transition duration-300"
            >
              Browse Books
            </motion.button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12" id="books">
        <div className="flex justify-center space-x-4 mb-12">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`py-2 px-6 rounded-full ${
                selectedTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-blue-600 hover:bg-blue-100'
              } transition-colors duration-300 ease-in-out shadow-md`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab === 'All Books' && <FaBook className="inline mr-2" />}
              {tab === 'Best Sellers' && <FaStar className="inline mr-2" />}
              {tab === 'New Arrivals' && <FaCalendarAlt className="inline mr-2" />}
              {tab}
            </motion.button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {books[selectedTab].map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default BooksPage;
