"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCheck, FaRocket, FaCode, FaChartLine, FaBrain, FaTools, FaBullhorn, FaLifeRing, FaUsers } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';

interface OfferProps {
  icon: React.ReactNode;
  title: string;
  forText: string;
  duration: string;
  price: string;
  includes: string[];
  outcome: string;
  color: string;
  hoverColor: string;
  bgColor: string;
  gradient: string;
}

const OfferCard: React.FC<OfferProps> = ({
  icon,
  title,
  forText,
  duration,
  price,
  includes,
  outcome,
  color,
  hoverColor,
  bgColor,
  gradient
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`embla__slide flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-3`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className={`${bgColor} rounded-2xl shadow-xl overflow-hidden h-full flex flex-col relative border border-gray-200/50`}>
        {/* Subtle animated gradient border effect on hover */}
        <motion.div 
          className={`absolute inset-0 rounded-2xl border-2 border-transparent z-0 pointer-events-none`} 
          style={{ 
            backgroundImage: isHovered ? `linear-gradient(white, white), ${gradient}` : undefined,
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box' 
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content */}
        <div className="p-6 md:p-8 flex-grow flex flex-col relative z-10">
          <div className="mb-5">
            <div className={`inline-block text-${color} p-3 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-md`}>
              {icon}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
          
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-semibold text-gray-700">Ideal for:</span> {forText}
          </p>
          
          <div className="flex justify-between items-center mb-6 text-sm">
            <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full font-medium text-gray-700 border border-gray-200">
              {duration}
            </div>
            <div className={`font-bold text-lg text-${color}`}>{price}</div>
          </div>
          
          <div className="mb-6 flex-grow">
            <h4 className="font-semibold text-gray-800 mb-3">What's Included:</h4>
            <ul className="space-y-2">
              {includes.map((item, index) => (
                <li key={index} className="flex items-start text-sm">
                  <FaCheck className={`text-${color} mt-1 mr-2 flex-shrink-0 w-3.5 h-3.5`} />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 p-4 rounded-xl mb-6 mt-auto">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">Expected Outcome:</h4>
            <p className="text-gray-600 text-sm">{outcome}</p>
          </div>
          
          <Link href="/contact" passHref>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full ${gradient} text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg`}
            >
              Discuss Offer
              <FaArrowRight className="ml-2 w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const SignatureOffers: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  const offers: OfferProps[] = [
    {
      icon: <FaRocket className="w-7 h-7" />,
      title: "1. Idea to Income Accelerator",
      forText: "First-time founders, creators & experts needing clarity and a launchpad.",
      duration: "4 Weeks Intense Sprint",
      price: "$600",
      includes: [
        "90-min Deep Dive Strategy Sprint",
        "Validated Business Model & Monetization Plan",
        "Crystal Clear Market Positioning",
        "Actionable Go-to-Market Roadmap",
        "30-Day Priority Text Support"
      ],
      outcome: "Transform your raw idea into a validated concept with a clear path to revenue.",
      color: "blue-600",
      hoverColor: "blue-700",
      bgColor: "bg-white",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      icon: <FaCode className="w-7 h-7" />,
      title: "2. The MVP Builder Suite",
      forText: "Non-technical founders or small teams ready to build, launch, and iterate.",
      duration: "6–8 Weeks Build Cycle",
      price: "Starts at $3,500",
      includes: [
        "Tech Stack & Architecture Design",
        "Interactive Wireframes & UX Flow",
        "Lean MVP Development (Web/Mobile)",
        "Guided Launch & GTM Execution",
        "Beta Testing Framework & Feedback Loop",
        "2 Post-Launch Iteration Cycles"
      ],
      outcome: "A polished, market-ready MVP and a strategic plan to acquire early adopters.",
      color: "indigo-600",
      hoverColor: "indigo-700",
      bgColor: "bg-white",
      gradient: "bg-gradient-to-r from-indigo-500 to-purple-600"
    },
    {
      icon: <FaChartLine className="w-7 h-7" />,
      title: "3. Strategy & Scale Sprint",
      forText: "Established founders feeling stuck or overwhelmed, needing focused growth.",
      duration: "1 Month Strategic Overhaul",
      price: "$750",
      includes: [
        "Comprehensive Business Strategy Audit",
        "Pricing & Revenue Model Optimization",
        "Brand Positioning & Messaging Refinement",
        "Marketing & Sales Funnel Architecture",
        "4x Weekly High-Impact 1-Hour Sessions",
        "Detailed Strategy Implementation Playbook"
      ],
      outcome: "Break through plateaus, refine your strategy, and unlock sustainable growth.",
      color: "purple-600",
      hoverColor: "purple-700",
      bgColor: "bg-white",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-600"
    },
    {
      icon: <FaBrain className="w-7 h-7" />,
      title: "4. Full Stack Founder Partnership",
      forText: "Visionary founders seeking ongoing strategic guidance and execution support.",
      duration: "3 Months Retainer",
      price: "$2,200/month",
      includes: [
        "Weekly Business Strategy & Leadership Coaching",
        "Marketing & GTM Execution Co-Pilot",
        "Tech Roadmap & Implementation Advisory",
        "Revenue Systems & Pricing Architecture Design",
        "Custom KPI Dashboard & Performance Tracking",
        "Full Access to Resource Vault & Templates",
        "Priority Email & Text Support"
      ],
      outcome: "A robust, scalable company with aligned strategy, systems, and execution.",
      color: "pink-600",
      hoverColor: "pink-700",
      bgColor: "bg-white",
      gradient: "bg-gradient-to-r from-pink-500 to-rose-600"
    },
    // Add more offers if needed
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
       {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Signature Offers & Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored solutions designed to deliver tangible results, fast.
          </p>
        </div>

        {/* Carousel container */}
        <div className="relative px-10">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex -ml-3">
              {offers.map((offer, index) => (
                <OfferCard key={index} {...offer} />
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Positioned inside the padded container */}
          <button 
            className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed z-20`}
            onClick={scrollPrev} 
            disabled={!prevBtnEnabled}
            aria-label="Previous offer"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button 
            className={`absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed z-20`}
            onClick={scrollNext} 
            disabled={!nextBtnEnabled}
            aria-label="Next offer"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Dots Navigation - Centered below the carousel */}
        <div className="flex justify-center mt-10 space-x-3">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to offer ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-blue-600 scale-110' : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureOffers;