"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Star, BookOpen, Zap, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WritersHandbookPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 12
  });

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
      quote: "I went from 12 rejections to a 6-figure book deal in 8 months. My agent said my writing 'suddenly had this addictive quality.' I used technique #47 from the handbook."
    },
    {
      name: "Mike R.",
      role: "Thriller Author",
      quote: "Holy sh*t. I've been writing for 15 years and getting nowhere. Applied 3 techniques from this book and got my first agent within 2 weeks. My manuscript went from 'interesting' to 'unputdownable.'"
    },
    {
      name: "Jennifer L.",
      role: "First-Time Novelist",
      quote: "I thought I needed talent. Turns out I just needed the right formula. Chapter 12 alone was worth 10x what I paid. My beta readers are literally begging for the next chapter."
    }
  ];

  const techniques = [
    "The 'Hemingway Hack' that turns boring sentences into page-turners",
    "Why Stephen King says you should 'murder your darlings'—and the twisted psychology behind it",
    "The 30-second dialogue test that separates amateur writers from pros",
    "How to plant 'psychological breadcrumbs' that make readers physically unable to put your book down",
    "The 'curiosity gap' technique that creates actual addiction to your writing",
    "Advanced dialogue formulas that make conversations feel like eavesdropping"
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 text-white py-20 md:py-32 relative overflow-hidden"
        initial="initial" 
        animate="animate" 
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div className="mb-6" variants={fadeIn}>
              <span className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                🔥 LIMITED TIME: 72% OFF
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              variants={fadeIn}
            >
              The Writer's Handbook That Turns <span className="text-yellow-400">Struggling Authors</span> Into <span className="text-yellow-400">Bestselling Machines</span>
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl mb-8 text-blue-50"
              variants={fadeIn}
            >
              100+ Psychological Triggers, Proven Formulas & Secret Techniques Used by Million-Dollar Authors
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 text-blue-50 max-w-3xl mx-auto"
              variants={fadeIn}
            >
              Stop writing books that nobody reads. Start creating stories so addictive, readers will lose sleep, miss meals, and beg you for more.
            </motion.p>
            
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8" variants={fadeIn}>
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
                onClick={() => window.open('https://paystack.com/buy/write-without-limits-ebook', '_blank')}
              >
                Get Instant Access - $5 <span className="line-through ml-2 text-blue-600">$15</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center text-blue-50">
                <Clock className="h-5 w-5 mr-2" />
                <span>Offer expires in: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
              </div>
            </motion.div>
            
            <motion.div className="flex flex-wrap justify-center gap-6 text-sm text-blue-50" variants={fadeIn}>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-yellow-400" />
                <span>Instant Download</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-yellow-400" />
                <span>30-Day Money Back</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-yellow-400" />
                <span>Lifetime Updates</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Problem Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900" variants={fadeIn}>
              Are You Tired of Writing Books That Nobody Finishes?
            </motion.h2>
            
            <motion.div className="grid md:grid-cols-2 gap-8 mb-12" variants={staggerContainer}>
              <motion.div className="bg-white p-6 rounded-lg shadow-lg" variants={fadeIn}>
                <div className="text-blue-700 text-4xl mb-4">😤</div>
                <h3 className="text-xl font-bold mb-3">You Pour Your Heart Out...</h3>
                <p className="text-gray-600">Months of writing, editing, perfecting every sentence. You think it's your masterpiece.</p>
              </motion.div>
              
              <motion.div className="bg-white p-6 rounded-lg shadow-lg" variants={fadeIn}>
                <div className="text-blue-700 text-4xl mb-4">💔</div>
                <h3 className="text-xl font-bold mb-3">But Readers Don't Care</h3>
                <p className="text-gray-600">They start reading, get bored by page 10, and never pick it up again. Your book joins the 99% that never get finished.</p>
              </motion.div>
            </motion.div>
            
            <motion.p className="text-xl text-gray-700 mb-8" variants={fadeIn}>
              Here's the brutal truth: <strong>Writing talent isn't enough.</strong> You need to understand the psychology of what makes readers addicted to your words.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Solution Section */}
      <motion.section 
        className="py-20 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900" variants={fadeIn}>
              What If You Could Write Stories So Addictive, Readers Literally Can't Put Them Down?
            </motion.h2>
            
            <motion.p className="text-xl text-gray-700 mb-12" variants={fadeIn}>
              The Writer's Handbook reveals the psychological triggers and proven formulas that bestselling authors use to create unputdownable stories.
            </motion.p>
            
            <motion.div className="grid md:grid-cols-3 gap-8 mb-12" variants={staggerContainer}>
              <motion.div className="text-center" variants={fadeIn}>
                <div className="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-800" />
                </div>
                <h3 className="text-xl font-bold mb-3">Psychological Triggers</h3>
                <p className="text-gray-600">Learn the 47 psychological triggers that make readers physically unable to stop reading.</p>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeIn}>
                <div className="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-800" />
                </div>
                <h3 className="text-xl font-bold mb-3">Proven Formulas</h3>
                <p className="text-gray-600">Copy-paste formulas for dialogue, plot twists, and character development that work every time.</p>
              </motion.div>
              
              <motion.div className="text-center" variants={fadeIn}>
                <div className="bg-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-800" />
                </div>
                <h3 className="text-xl font-bold mb-3">Secret Techniques</h3>
                <p className="text-gray-600">Advanced techniques used by million-dollar authors that most writers never discover.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Techniques Preview */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900" variants={fadeIn}>
              Just a Taste of What's Inside...
            </motion.h2>
            
            <motion.div className="grid md:grid-cols-2 gap-6" variants={staggerContainer}>
              {techniques.map((technique, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-700"
                  variants={fadeIn}
                >
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-blue-700 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 font-medium">{technique}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.p className="text-center text-xl text-gray-700 mt-12" variants={fadeIn}>
              <strong>And 94+ more techniques</strong> that will transform your writing forever.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        className="py-20 bg-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900" variants={fadeIn}>
              Real Results from Real Writers
            </motion.h2>
            
            <motion.div className="grid md:grid-cols-3 gap-8" variants={staggerContainer}>
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-lg"
                  variants={fadeIn}
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section 
        className="py-20 bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900 text-white"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-8" variants={fadeIn}>
              Stop Writing Books That Get Ignored. Start Creating Stories That Get Devoured.
            </motion.h2>
            
            <motion.div className="bg-white bg-opacity-10 p-8 rounded-lg mb-8" variants={fadeIn}>
              <h3 className="text-2xl font-bold mb-4">The Writer's Handbook</h3>
              <div className="text-4xl font-bold mb-2">
                <span className="line-through text-blue-200">$15</span>
              <span className="ml-4 text-yellow-400">$5</span>
              </div>
              <p className="text-blue-50 mb-6">67% OFF - Limited Time Only</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button 
                  size="lg" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-8 py-4 text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
                  onClick={() => window.open('https://paystack.com/buy/write-without-limits-ebook', '_blank')}
                >
                  Get Instant Access Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-50">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-yellow-400" />
                  <span>Instant Download</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-yellow-400" />
                  <span>30-Day Money Back Guarantee</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-yellow-400" />
                  <span>Lifetime Updates</span>
                </div>
              </div>
            </motion.div>
            
            <motion.p className="text-lg text-blue-50 mb-4" variants={fadeIn}>
              <strong>P.S.</strong> Every day you wait is another day your stories remain forgettable. The techniques in this handbook have helped thousands of writers transform their careers. Don't let another manuscript gather digital dust.
            </motion.p>
            
            <motion.p className="text-lg text-blue-50" variants={fadeIn}>
              <strong>P.P.S.</strong> Still hesitating? Ask yourself this: What would happen to your writing if you had just ONE technique that made your stories unputdownable? This handbook has 100+. Do the math.
            </motion.p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default WritersHandbookPage;