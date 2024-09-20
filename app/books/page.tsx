"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaStar, FaCalendarAlt, FaShoppingCart } from 'react-icons/fa';

type BookCategory = "All Books" | "Best Sellers" | "New Arrivals";

const tabs: BookCategory[] = ["All Books", "Best Sellers", "New Arrivals"];

const books = {
  "All Books": [
    {
      title: "Pricing Strategy to Help You Win in Business",
      description: "Master the art of pricing to boost your business success. Dive into various pricing models, strategies, and customer psychology.",
      image: "/image/pricingbook.webp",
      link: "/books/pricing",
      buyLink: "https://buzzedison.gumroad.com/l/pricingstrategy",
      price: "$4.99",
      rating: 4.8,
    },
    {
      title: "The Art of Inversion",
      description: "Discover how to solve problems by approaching them backwards. Learn to think differently and find innovative solutions.",
      image: "/image/inversion.png",
      link: "/books/inversion",
      buyLink: "https://buzzedison.gumroad.com/l/inversion",
      price: "$0.99",
      rating: 4.6,
    },
  ],
  "Best Sellers": [
    // Add best sellers here
  ],
  "New Arrivals": [
    // Add new arrivals here
  ],
};

type Book = {
  title: string;
  description: string;
  image: string;
  link: string;
  buyLink: string;
  price: string;
  rating: number;
};

const BookCard = ({ book }: { book: Book }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    style={{ height: '420px' }}
  >
    <div className="relative h-48">
      <Image
        src={book.image}
        fill
        alt={`Cover of ${book.title}`}
        className="object-cover"
      />
    </div>
    <div className="p-4 flex-grow">
      <h3 className="text-lg font-bold mb-2 text-gray-800">{book.title}</h3>
      <p className="text-gray-600 mb-4">{book.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">{book.price}</span>
        <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-gray-600">{book.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <Link href={book.link}>
          <motion.button 
            className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBook className="mr-2" />
            Explore
          </motion.button>
        </Link>
        <Link href={book.buyLink}>
          <motion.button 
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart className="mr-2" />
            Purchase
          </motion.button>
        </Link>
      </div>
    </div>
  </motion.div>
);

const BooksPage = () => {
  const [selectedTab, setSelectedTab] = useState<BookCategory>(tabs[0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleExploreClick = () => {
    const bookCardsSection = document.getElementById("bookCards");
    if (bookCardsSection) {
      bookCardsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24">
      <header className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
     Grow Your Business in 12 months
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl mb-12 text-gray-800"
          >
          Get strategies, practical action steps to help you reach your goals
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl max-w-4xl mx-auto mb-16 text-gray-600"
          >
          Excel in business with Edison's expert guides. From pricing strategies to problem-solving techniques, discover the secrets to taking your business to the next level.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-10 rounded-full text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
            onClick={handleExploreClick}
          >
            Explore Books
          </motion.button>
        </div>
        <div className="absolute inset-0 bg-blue-100 opacity-50 transform -skew-y-6 z-0"></div>
      </header>

      <main className="container mx-auto px-4 py-8" id="books">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`py-2 px-6 rounded-full ${
                selectedTab === tab
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-800 hover:bg-gray-200 shadow-md"
              } transition-colors duration-300 ease-in-out mr-4 last:mr-0`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab === "All Books" && <FaBook className="inline mr-2" />}
              {tab === "Best Sellers" && <FaStar className="inline mr-2" />}
              {tab === "New Arrivals" && (
                <FaCalendarAlt className="inline mr-2" />
              )}
              {tab}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </motion.div>
          ) : (
            <motion.div
              key="books"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              id="bookCards"
            >
              {books[selectedTab].map((book, index) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default BooksPage;