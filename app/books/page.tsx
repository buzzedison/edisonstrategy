"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaStar, FaCalendarAlt, FaShoppingCart, FaPen, FaAward, FaCrown } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import InsightsWithSidebar from '../components/InsightsWithSidebar';

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
    <InsightsWithSidebar>
      <div className="min-h-screen bg-brand-stone/30">
        <header className="py-24 px-6 lg:px-8 border-b border-gray-100 bg-white/50">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-stone rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-charcoal mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              Books
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif font-medium text-brand-charcoal mb-8 leading-tight tracking-tight">
              Books to Help You <br />
              <span className="text-brand-muted italic">Think and Build Better.</span>
            </h1>

            <p className="text-xl text-brand-muted max-w-2xl mx-auto font-light leading-relaxed mb-12">
              Practical books on writing, pricing, decision-making, and growth.
            </p>

            <div className="flex items-center justify-center gap-8 text-[10px] font-bold uppercase tracking-widest text-brand-muted">
              <div className="flex items-center gap-2">
                <FaStar className="text-brand-gold" />
                <span>4.8+ Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBook className="text-brand-gold" />
                <span>10k+ Readers</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-20" id="books">
          <div className="flex justify-center mb-16">
            <div className="inline-flex p-1.5 bg-brand-stone rounded-2xl border border-gray-100 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={cn(
                    "px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                    selectedTab === tab
                      ? "bg-white text-brand-charcoal shadow-sm"
                      : "text-brand-muted hover:text-brand-charcoal"
                  )}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <div key="loader" className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                id="bookCards"
              >
                {books[selectedTab].map((book, index) => (
                  <motion.div
                    key={book.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BookCard book={book} userCountry={userCountry} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <section className="mt-32 bg-brand-charcoal text-white rounded-[3rem] p-16 text-center relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-serif font-medium mb-6">Ready to Start Reading?</h3>
              <p className="text-gray-400 mb-10 font-light text-lg">
                Pick one book and apply what you learn this week.
              </p>
              <button
                onClick={handleExploreClick}
                className="bg-white text-brand-charcoal px-10 py-5 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-brand-stone transition-all"
              >
                Browse All Books
              </button>
            </div>
          </section>
        </main>
      </div>
    </InsightsWithSidebar>
  );
};

export default BooksPage;
