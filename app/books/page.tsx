"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaStar, FaCalendarAlt, FaShoppingCart, FaPen, FaAward, FaCrown } from 'react-icons/fa';

type BookCategory = "All Books" | "Best Sellers" | "New Arrivals";

const tabs: BookCategory[] = ["All Books", "Best Sellers", "New Arrivals"];

// Currency and pricing configuration
const currencyConfig = {
  'GH': { currency: 'GHC', symbol: '₵', writePrice: 50, originalWritePrice: 150, pricingPrice: 40, inversionPrice: 8 },
  'NG': { currency: 'NGN', symbol: '₦', writePrice: 2500, originalWritePrice: 7500, pricingPrice: 2000, inversionPrice: 400 },
  'KE': { currency: 'KES', symbol: 'KSh', writePrice: 650, originalWritePrice: 1950, pricingPrice: 520, inversionPrice: 104 },
  'ZA': { currency: 'ZAR', symbol: 'R', writePrice: 90, originalWritePrice: 270, pricingPrice: 72, inversionPrice: 14 },
  'UG': { currency: 'UGX', symbol: 'USh', writePrice: 18500, originalWritePrice: 55500, pricingPrice: 14800, inversionPrice: 2960 },
  'TZ': { currency: 'TZS', symbol: 'TSh', writePrice: 12500, originalWritePrice: 37500, pricingPrice: 10000, inversionPrice: 2000 },
  'CM': { currency: 'CFA', symbol: 'CFA', writePrice: 3000, originalWritePrice: 9000, pricingPrice: 2400, inversionPrice: 480 },
  'SN': { currency: 'CFA', symbol: 'CFA', writePrice: 3000, originalWritePrice: 9000, pricingPrice: 2400, inversionPrice: 480 },
  'CI': { currency: 'CFA', symbol: 'CFA', writePrice: 3000, originalWritePrice: 9000, pricingPrice: 2400, inversionPrice: 480 },
  'GB': { currency: 'GBP', symbol: '£', writePrice: 4, originalWritePrice: 12, pricingPrice: 3.5, inversionPrice: 0.8 },
  'CA': { currency: 'CAD', symbol: 'C$', writePrice: 7, originalWritePrice: 21, pricingPrice: 6.5, inversionPrice: 1.3 },
  'AU': { currency: 'AUD', symbol: 'A$', writePrice: 7.5, originalWritePrice: 22.5, pricingPrice: 7, inversionPrice: 1.4 },
  'IN': { currency: 'INR', symbol: '₹', writePrice: 415, originalWritePrice: 1245, pricingPrice: 332, inversionPrice: 66 },
  'ZW': { currency: 'USD', symbol: '$', writePrice: 5, originalWritePrice: 15, pricingPrice: 4.99, inversionPrice: 0.99 },
  'BW': { currency: 'BWP', symbol: 'P', writePrice: 67, originalWritePrice: 201, pricingPrice: 54, inversionPrice: 11 },
  'MZ': { currency: 'MZN', symbol: 'MT', writePrice: 320, originalWritePrice: 960, pricingPrice: 256, inversionPrice: 51 },
  'default': { currency: 'USD', symbol: '$', writePrice: 5, originalWritePrice: 15, pricingPrice: 4.99, inversionPrice: 0.99 }
};

type CurrencyConfig = {
  currency: string;
  symbol: string;
  writePrice: number;
  originalWritePrice: number;
  pricingPrice: number;
  inversionPrice: number;
};

const formatPrice = (amount: number, config: CurrencyConfig) => {
  if (config.currency === 'CFA' || config.currency === 'UGX' || config.currency === 'TZS') {
    return `${config.symbol}${amount.toLocaleString()}`;
  }
  return `${config.symbol}${amount}`;
};

const books = {
  "All Books": [
    {
      title: "Write Without Limits",
      description: "100 Tips for Transforming Ideas into Bestselling Books. Master the psychological triggers and proven formulas that make readers addicted to your writing.",
      image: "/image/writewithout.png",
      link: "/books/writershandbook",
      buyLink: "https://paystack.com/buy/write-without-limits-ebook",
      priceKey: 'writePrice',
      originalPriceKey: 'originalWritePrice',
      rating: 4.9,
      category: "Writing & Publishing",
      isFeatured: true,
      isNew: true,
    },
    {
      title: "Pricing Strategy to Help You Win in Business",
      description: "Master the art of pricing to boost your business success. Dive into various pricing models, strategies, and customer psychology.",
      image: "/image/pricingbook.webp",
      link: "/books/pricing",
      buyLink: "https://buzzedison.gumroad.com/l/pricingstrategy",
      priceKey: 'pricingPrice',
      rating: 4.8,
      category: "Business Strategy",
      isFeatured: true,
    },
    {
      title: "The Art of Inversion",
      description: "Discover how to solve problems by approaching them backwards. Learn to think differently and find innovative solutions.",
      image: "/image/inversion.png",
      link: "/books/inversion",
      buyLink: "https://buzzedison.gumroad.com/l/inversion",
      priceKey: 'inversionPrice',
      rating: 4.6,
      category: "Problem Solving",
    },
  ],
  "Best Sellers": [
    {
      title: "Write Without Limits",
      description: "100 Tips for Transforming Ideas into Bestselling Books. Master the psychological triggers and proven formulas that make readers addicted to your writing.",
      image: "/image/writewithout.png",
      link: "/books/writershandbook",
      buyLink: "https://paystack.com/buy/write-without-limits-ebook",
      priceKey: 'writePrice',
      originalPriceKey: 'originalWritePrice',
      rating: 4.9,
      category: "Writing & Publishing",
      isFeatured: true,
      isNew: true,
    },
    {
      title: "Pricing Strategy to Help You Win in Business",
      description: "Master the art of pricing to boost your business success. Dive into various pricing models, strategies, and customer psychology.",
      image: "/image/pricingbook.webp",
      link: "/books/pricing",
      buyLink: "https://buzzedison.gumroad.com/l/pricingstrategy",
      priceKey: 'pricingPrice',
      rating: 4.8,
      category: "Business Strategy",
      isFeatured: true,
    },
  ],
  "New Arrivals": [
    {
      title: "Write Without Limits",
      description: "100 Tips for Transforming Ideas into Bestselling Books. Master the psychological triggers and proven formulas that make readers addicted to your writing.",
      image: "/image/writewithout.png",
      link: "/books/writershandbook",
      buyLink: "https://paystack.com/buy/write-without-limits-ebook",
      priceKey: 'writePrice',
      originalPriceKey: 'originalWritePrice',
      rating: 4.9,
      category: "Writing & Publishing",
      isFeatured: true,
      isNew: true,
    },
  ],
};

type Book = {
  title: string;
  description: string;
  image: string;
  link: string;
  buyLink: string;
  priceKey: string;
  originalPriceKey?: string;
  rating: number;
  category: string;
  isFeatured?: boolean;
  isNew?: boolean;
};

const BookCard = ({ book, userCountry }: { book: Book; userCountry: string }) => {
  const priceConfig = currencyConfig[userCountry as keyof typeof currencyConfig] || currencyConfig.default;
  const price = formatPrice(priceConfig[book.priceKey as keyof CurrencyConfig] as number, priceConfig);
  const originalPrice = book.originalPriceKey ? formatPrice(priceConfig[book.originalPriceKey as keyof CurrencyConfig] as number, priceConfig) : null;

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group border border-blue-100"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      style={{ height: '480px' }}
    >
      <div className="relative h-56 overflow-hidden">
        {book.isNew && (
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-600 to-indigo-800 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
            <FaCrown className="mr-1" />
            NEW
          </div>
        )}
        {book.isFeatured && (
          <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
            <FaAward className="mr-1" />
            FEATURED
          </div>
        )}
        <Image
          src={book.image}
          fill
          alt={`Cover of ${book.title}`}
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {book.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">{book.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{book.description}</p>
        <div className="flex justify-between items-center mb-4 mt-auto">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg">
                {price}
              </span>
              {originalPrice && (
                <span className="text-gray-500 line-through text-sm">{originalPrice}</span>
              )}
            </div>
          </div>
          <div className="flex items-center bg-indigo-50 px-3 py-1 rounded-full">
            <FaStar className="text-indigo-500 mr-1" />
            <span className="text-gray-700 font-semibold">{book.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link href={book.link} className="flex-1">
            <motion.button 
              className="w-full bg-white text-blue-600 border-2 border-blue-600 px-4 py-3 rounded-xl hover:bg-blue-50 transition duration-300 flex items-center justify-center font-semibold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaBook className="mr-2" />
              Explore
            </motion.button>
          </Link>
          <Link href={book.buyLink} className="flex-1">
            <motion.button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-800 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-900 transition duration-300 flex items-center justify-center font-semibold shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaShoppingCart className="mr-2" />
              Buy Now
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const BooksPage = () => {
  const [selectedTab, setSelectedTab] = useState<BookCategory>(tabs[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCountry, setUserCountry] = useState('default');

  useEffect(() => {
    // Detect user's country
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserCountry(data.country_code || 'default');
      } catch (error) {
        console.log('Could not detect country, using default pricing');
        setUserCountry('default');
      }
    };

    detectCountry();
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleExploreClick = () => {
    const bookCardsSection = document.getElementById("bookCards");
    if (bookCardsSection) {
      bookCardsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentPriceConfig = currencyConfig[userCountry as keyof typeof currencyConfig] || currencyConfig.default;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900" />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10 pt-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center mb-6"
          >
            <FaPen className="text-indigo-400 text-2xl mr-3" />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 text-blue-900 px-6 py-2 rounded-full text-sm font-bold">
              📚 TRANSFORM YOUR BUSINESS & WRITING
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white leading-tight"
          >
            Books That Change
            <br />
            <span className="text-indigo-400">Everything</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl mb-8 text-blue-100 max-w-4xl mx-auto font-light"
          >
            From writing bestsellers to mastering business strategy — unlock the secrets that separate winners from dreamers
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl max-w-4xl mx-auto mb-12 text-blue-100/90 leading-relaxed"
          >
            Join thousands of entrepreneurs and writers who've used Edison's proven strategies to build six-figure businesses, write bestselling books, and create the life they've always wanted.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 text-blue-900 py-4 px-12 rounded-2xl text-xl font-bold shadow-2xl hover:from-indigo-300 hover:to-purple-300 transition-all duration-300 transform"
            onClick={handleExploreClick}
          >
            Discover Your Next Breakthrough
            <FaBook className="inline ml-3" />
          </motion.button>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 flex flex-wrap justify-center gap-8 text-blue-100/80"
          >
            <div className="flex items-center">
              <FaStar className="text-indigo-400 mr-2" />
              <span>4.8+ Average Rating</span>
            </div>
            <div className="flex items-center">
              <FaBook className="text-indigo-400 mr-2" />
              <span>10,000+ Readers</span>
            </div>
            <div className="flex items-center">
              <FaCrown className="text-indigo-400 mr-2" />
              <span>Proven Results</span>
            </div>
          </motion.div>

          {/* Currency Notice */}
          {userCountry !== 'default' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-8 bg-indigo-400/20 backdrop-blur-sm text-indigo-100 px-6 py-3 rounded-2xl inline-block"
            >
              <span className="text-sm">
                🌍 Prices shown in {currentPriceConfig.currency} for your region
              </span>
            </motion.div>
          )}
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`py-3 px-8 rounded-2xl font-semibold transition-all duration-300 mx-2 ${
                selectedTab === tab
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl"
                  : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-lg border border-blue-100"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab === "All Books" && <FaBook className="inline mr-2" />}
              {tab === "Best Sellers" && <FaStar className="inline mr-2" />}
              {tab === "New Arrivals" && <FaCalendarAlt className="inline mr-2" />}
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
              id="bookCards"
            >
              {books[selectedTab].map((book, index) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BookCard book={book} userCountry={userCountry} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Call to Action Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Life?</h3>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Don't let another year pass by. Start building the business and writing the books that will change everything.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-400 to-purple-400 text-blue-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:from-indigo-300 hover:to-purple-300 transition-colors duration-300"
            onClick={handleExploreClick}
          >
            Start Your Journey Today
          </motion.button>
        </motion.section>
      </main>
    </div>
  );
};

export default BooksPage;