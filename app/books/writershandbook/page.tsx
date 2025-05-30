"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Star, BookOpen, Zap, Target, Users, Award, Crown, PenTool, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Currency and pricing configuration
const currencyConfig = {
  'GH': { currency: 'GHC', symbol: '₵', price: 50, originalPrice: 150 },
  'NG': { currency: 'NGN', symbol: '₦', price: 2500, originalPrice: 7500 },
  'KE': { currency: 'KES', symbol: 'KSh', price: 650, originalPrice: 1950 },
  'ZA': { currency: 'ZAR', symbol: 'R', price: 90, originalPrice: 270 },
  'UG': { currency: 'UGX', symbol: 'USh', price: 18500, originalPrice: 55500 },
  'TZ': { currency: 'TZS', symbol: 'TSh', price: 12500, originalPrice: 37500 },
  'CM': { currency: 'CFA', symbol: 'CFA', price: 3000, originalPrice: 9000 },
  'SN': { currency: 'CFA', symbol: 'CFA', price: 3000, originalPrice: 9000 },
  'CI': { currency: 'CFA', symbol: 'CFA', price: 3000, originalPrice: 9000 },
  'GB': { currency: 'GBP', symbol: '£', price: 4, originalPrice: 12 },
  'CA': { currency: 'CAD', symbol: 'C$', price: 7, originalPrice: 21 },
  'AU': { currency: 'AUD', symbol: 'A$', price: 7.5, originalPrice: 22.5 },
  'IN': { currency: 'INR', symbol: '₹', price: 415, originalPrice: 1245 },
  'ZW': { currency: 'USD', symbol: '$', price: 5, originalPrice: 15 },
  'BW': { currency: 'BWP', symbol: 'P', price: 67, originalPrice: 201 },
  'MZ': { currency: 'MZN', symbol: 'MT', price: 320, originalPrice: 960 },
  'default': { currency: 'USD', symbol: '$', price: 5, originalPrice: 15 }
};

const formatPrice = (amount: number, symbol: string, currency: string) => {
  if (currency === 'CFA' || currency === 'UGX' || currency === 'TZS') {
    return `${symbol}${amount.toLocaleString()}`;
  }
  return `${symbol}${amount}`;
};

const WritersHandbookPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 12
  });
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

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds > 0 ? prev.seconds - 1 : 59;
        const newMinutes = prev.seconds === 0 ? (prev.minutes > 0 ? prev.minutes - 1 : 59) : prev.minutes;
        const newHours = prev.minutes === 0 && prev.seconds === 0 ? (prev.hours > 0 ? prev.hours - 1 : 23) : prev.hours;
        
        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentPriceConfig = currencyConfig[userCountry as keyof typeof currencyConfig] || currencyConfig.default;
  const currentPrice = formatPrice(currentPriceConfig.price, currentPriceConfig.symbol, currentPriceConfig.currency);
  const currentOriginalPrice = formatPrice(currentPriceConfig.originalPrice, currentPriceConfig.symbol, currentPriceConfig.currency);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Romance Writer",
      rating: 5,
      quote: "I went from 12 rejections to a 6-figure book deal in 8 months. My agent said my writing 'suddenly had this addictive quality.' I used technique #47 from the handbook.",
      result: "$600K book deal"
    },
    {
      name: "Mike R.",
      role: "Thriller Author", 
      rating: 5,
      quote: "Holy sh*t. I've been writing for 15 years and getting nowhere. Applied 3 techniques from this book and got my first agent within 2 weeks. My manuscript went from 'interesting' to 'unputdownable.'",
      result: "Agent in 2 weeks"
    },
    {
      name: "Jennifer L.",
      role: "First-Time Novelist",
      rating: 5,
      quote: "I thought I needed talent. Turns out I just needed the right formula. Chapter 12 alone was worth 10x what I paid. My beta readers are literally begging for the next chapter.",
      result: "First novel completed"
    }
  ];

  const techniques = [
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "The 'Hemingway Hack'",
      description: "Turn boring sentences into page-turners with this simple technique"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Murder Your Darlings Psychology",
      description: "Why Stephen King's advice works and the twisted psychology behind it"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "30-Second Dialogue Test",
      description: "The test that separates amateur writers from publishing pros"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Psychological Breadcrumbs",
      description: "Make readers physically unable to put your book down"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Curiosity Gap Technique",
      description: "Create actual addiction to your writing with this method"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Advanced Dialogue Formulas",
      description: "Make conversations feel like readers are eavesdropping"
    }
  ];

  const bonuses = [
    "🎯 The 'First Page Formula' that hooks agents in 30 seconds",
    "📚 50 Plot Twist Templates that work in any genre",
    "💰 The Publishing Roadmap: Traditional vs Self-Publishing",
    "🚀 Marketing Secrets that turn writers into bestsellers",
    "📝 Character Development Worksheets (worth $47 alone)",
    "🎪 The 'Emotional Roller Coaster' technique for reader engagement"
  ];

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-50 text-gray-900 min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative overflow-hidden"
        initial="initial" 
        animate="animate" 
        variants={fadeIn}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-red-900" />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-600/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="text-white">
              <motion.div className="mb-6" variants={fadeIn}>
                <span className="inline-flex items-center bg-gradient-to-r from-amber-400 to-amber-500 text-red-900 px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                  <Crown className="mr-2 h-4 w-4" />
                  🔥 LIMITED TIME: 72% OFF
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
                variants={fadeIn}
              >
                Write Stories So <span className="text-amber-400">Addictive</span>, Readers Will <span className="text-amber-400">Lose Sleep</span>
              </motion.h1>
              
              <motion.h2 
                className="text-xl lg:text-2xl mb-8 text-red-100"
                variants={fadeIn}
              >
                100 Psychological Triggers & Secret Techniques Used by Million-Dollar Authors
              </motion.h2>
              
              <motion.p 
                className="text-lg mb-8 text-red-100 leading-relaxed"
                variants={fadeIn}
              >
                Stop writing books that nobody finishes. Start creating stories so compelling, readers will beg you for more and agents will fight to represent you.
              </motion.p>
              
              <motion.div className="flex flex-col gap-4 mb-8" variants={fadeIn}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-red-900 font-bold px-8 py-6 text-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 w-fit"
                  onClick={() => window.open('https://paystack.com/buy/write-without-limits-ebook', '_blank')}
                >
                  Get Instant Access - {currentPrice} <span className="line-through ml-2 text-red-700">{currentOriginalPrice}</span>
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
                
                <div className="flex items-center text-red-100 bg-red-800/50 px-4 py-2 rounded-xl w-fit">
                  <Clock className="h-5 w-5 mr-2 text-amber-400" />
                  <span className="font-semibold">Offer expires in: {timeLeft.hours}h {timeLeft.minutes}m {String(timeLeft.seconds).padStart(2, '0')}s</span>
                </div>
              </motion.div>
              
              <motion.div className="flex flex-wrap gap-6 text-sm text-red-100" variants={fadeIn}>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-amber-400" />
                  <span>Instant Download</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-amber-400" />
                  <span>30-Day Money Back</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-amber-400" />
                  <span>Lifetime Updates</span>
                </div>
              </motion.div>

              {/* Currency Notice */}
              {userCountry !== 'default' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="mt-6 bg-amber-400/20 backdrop-blur-sm text-amber-100 px-6 py-3 rounded-2xl inline-block"
                  variants={fadeIn}
                >
                  <span className="text-sm">
                    🌍 Prices shown in {currentPriceConfig.currency} for your region
                  </span>
                </motion.div>
              )}
            </div>
            
            {/* Right Column - Book Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-red-600/20 rounded-3xl blur-3xl scale-110" />
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                  <Image
                    src="/image/writewithout.png"
                    alt="Write Without Limits Book Cover"
                    width={400}
                    height={500}
                    className="w-full h-auto rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-red-900 px-4 py-2 rounded-full font-bold shadow-lg">
                    #1 Bestseller
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Problem Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" variants={fadeIn}>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
                Are You Tired of Writing Books That <span className="text-red-600">Nobody Finishes?</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Here's the brutal truth most writing coaches won't tell you...
              </p>
            </motion.div>
            
            <motion.div className="grid lg:grid-cols-2 gap-8 mb-16" variants={staggerContainer}>
              <motion.div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-lg border border-red-200" variants={fadeIn}>
                <div className="text-red-600 text-5xl mb-6">😤</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">You Pour Your Heart Out...</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Months of writing, editing, perfecting every sentence. You think it's your masterpiece. You've followed all the "rules" of good writing.
                </p>
              </motion.div>
              
              <motion.div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg border border-gray-200" variants={fadeIn}>
                <div className="text-gray-600 text-5xl mb-6">💔</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">But Readers Don't Care</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  They start reading, get bored by page 10, and never pick it up again. Your book joins the 99% that never get finished.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div className="text-center bg-gradient-to-r from-red-600 to-red-800 text-white p-8 rounded-2xl" variants={fadeIn}>
              <p className="text-2xl font-bold mb-4">
                Here's the brutal truth: <span className="text-amber-400">Writing talent isn't enough.</span>
              </p>
              <p className="text-xl">
                You need to understand the psychology of what makes readers addicted to your words.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Solution Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-red-50 to-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900" variants={fadeIn}>
              What If You Could Write Stories So <span className="text-red-600">Addictive</span>, Readers Literally Can't Put Them Down?
            </motion.h2>
            
            <motion.p className="text-xl text-gray-700 mb-16 max-w-4xl mx-auto" variants={fadeIn}>
              The Writer's Handbook reveals the psychological triggers and proven formulas that bestselling authors use to create unputdownable stories.
            </motion.p>
            
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16" variants={staggerContainer}>
              {techniques.map((technique, index) => (
                <motion.div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100" variants={fadeIn}>
                  <div className="bg-gradient-to-r from-red-600 to-red-800 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {technique.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{technique.title}</h3>
                  <p className="text-gray-600">{technique.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" variants={fadeIn}>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900">
                Real Writers. <span className="text-red-600">Real Results.</span>
              </h2>
              <p className="text-xl text-gray-600">
                See what happens when you apply these proven techniques
              </p>
            </motion.div>
            
            <motion.div className="grid lg:grid-cols-3 gap-8" variants={staggerContainer}>
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl shadow-lg border border-red-100" variants={fadeIn}>
                  <div className="flex items-center mb-4">
                    <div className="flex text-amber-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                  <div className="border-t border-red-200 pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900">{testimonial.name}</p>
                        <p className="text-red-600 text-sm">{testimonial.role}</p>
                      </div>
                      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {testimonial.result}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Bonuses Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-red-600 to-red-800 text-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 className="text-4xl lg:text-5xl font-bold mb-8" variants={fadeIn}>
              But Wait, There's More! <span className="text-amber-400">$297 Worth of Bonuses</span>
            </motion.h2>
            
            <motion.p className="text-xl mb-12 text-red-100" variants={fadeIn}>
              When you get Write Without Limits today, you also receive these exclusive bonuses:
            </motion.p>
            
            <motion.div className="grid md:grid-cols-2 gap-6 mb-12" variants={staggerContainer}>
              {bonuses.map((bonus, index) => (
                <motion.div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl flex items-center" variants={fadeIn}>
                  <CheckCircle className="h-6 w-6 text-amber-400 mr-4 flex-shrink-0" />
                  <span className="text-left font-semibold">{bonus}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div className="bg-amber-400 text-red-900 p-8 rounded-2xl shadow-2xl" variants={fadeIn}>
              <h3 className="text-3xl font-bold mb-4">Total Value: $312</h3>
              <h4 className="text-4xl font-bold mb-2">Your Price Today: {currentPrice}</h4>
              <p className="text-xl">That's 98% off for the next 24 hours only!</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900 text-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h2 className="text-4xl lg:text-5xl font-bold mb-8" variants={fadeIn}>
              Your Writing Career Starts <span className="text-amber-400">Right Now</span>
            </motion.h2>
            
            <motion.p className="text-xl mb-12 text-gray-200 leading-relaxed" variants={fadeIn}>
              Don't let another day pass wondering "what if." The techniques in this handbook have created bestselling authors, million-dollar book deals, and writing careers that seemed impossible just months ago.
            </motion.p>
            
            <motion.div className="space-y-6" variants={fadeIn}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-red-900 font-bold px-12 py-6 text-2xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => window.open('https://paystack.com/buy/write-without-limits-ebook', '_blank')}
              >
                YES! Give Me The Writer's Handbook for {currentPrice}
                <ArrowRight className="ml-3 h-8 w-8" />
              </Button>
              
              <div className="flex items-center justify-center text-red-200 bg-red-800/50 px-6 py-3 rounded-xl">
                <Clock className="h-6 w-6 mr-3 text-amber-400" />
                <span className="text-lg font-semibold">This offer expires in: {timeLeft.hours}h {timeLeft.minutes}m {String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 text-gray-300 mt-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-amber-400" />
                  <span>Instant Access</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-amber-400" />
                  <span>30-Day Money Back Guarantee</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-amber-400" />
                  <span>Lifetime Updates</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default WritersHandbookPage;