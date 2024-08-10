"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaBook, FaStar, FaCalendarAlt } from "react-icons/fa";

type BookCategory = "All Books" | "Best Sellers" | "New Arrivals";

const tabs: BookCategory[] = ["All Books", "Best Sellers", "New Arrivals"];

const books = {
  "All Books": [
    {
      title: "Pricing Strategy to Help You Win in Business",
      description:
        "Master the art of pricing to boost your business success. Dive into various pricing models, strategies, and customer psychology.",
      image: "/image/pricingbook.webp",
      link: "/books/pricing",
      buyLink: "https://buzzedison.gumroad.com/l/pricingstrategy",
    },
    {
      title: "The Art of Inversion",
      description:
        "Discover how to solve problems by approaching them backwards. Learn to think differently and find innovative solutions.",
      image: "/image/inversion.png",
      link: "/books/inversion",
      buyLink: "https://buzzedison.gumroad.com/l/inversion",
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
};

const BookCard = ({ book }: { book: Book }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="bg-white rounded-3xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
  >
    <div className="relative h-[400px] md:h-[500px]">
      <Image
        src={book.image}
        fill
        alt={`Cover of ${book.title}`}
        className="object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
    <div className="p-8 md:p-10">
      <h3 className="text-3xl font-bold mb-4 text-gray-800">{book.title}</h3>
      <p className="text-gray-600 mb-8 text-lg">{book.description}</p>
      <div className="flex space-x-4">
        <Link href={book.link}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-full hover:from-blue-600 hover:to-indigo-700 transition duration-300 flex items-center space-x-2 text-lg"
          >
            <FaBook className="text-xl" />
            <span>Explore</span>
          </motion.button>
        </Link>
        <Link href={book.buyLink}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 px-6 rounded-full hover:from-emerald-600 hover:to-green-700 transition duration-300 flex items-center space-x-2 text-lg"
          >
            <FaStar className="text-xl" />
            <span>Purchase</span>
          </motion.button>
        </Link>
      </div>
    </div>
  </motion.div>
);

const BooksPage = () => {
  const [selectedTab, setSelectedTab] = useState<BookCategory>(tabs[0]);

  const handleExploreClick = () => {
    const bookCardsSection = document.getElementById("bookCards");
    if (bookCardsSection) {
      bookCardsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-extrabold mb-8"
          >
            Elevate Your Business
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl mb-12"
          >
            with Proven Strategies
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl max-w-4xl mx-auto mb-16"
          >
            Discover the secrets to business success with Edison's expert guides. Gain insights on pricing, problem-solving, and more to take your business to new heights.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-gray-800 py-4 px-10 rounded-full text-xl font-semibold shadow-lg hover:bg-gray-200 transition duration-300"
            onClick={handleExploreClick}
          >
            Explore Books
          </motion.button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16" id="books">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-12"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`py-2 px-6 rounded-full ${
                selectedTab === tab
                  ? "bg-gray-800 text-white shadow-lg"
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

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          id="bookCards"
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