"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaChartLine, FaCode, FaLaptop, FaRocket, FaCogs, FaBullhorn, FaBuilding, FaBrain, FaHandshake, FaGraduationCap, FaCalendarAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { MapPin, Rocket, Mail } from 'lucide-react';
import SignatureOffers from './components/SignatureOffers';
import { Button } from '@/components/ui/button';

// Define primary color
const primaryColor = "#3B82F6"; // Blue-600 color
const primaryHoverColor = "#2563EB"; // Blue-700 color for hover state

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  services: ServiceDetail[];
}

interface ServiceDetail {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface PricingOptionProps {
  title: string;
  price: string;
  period?: string;
}

interface ServiceCategoryProps {
  categoryIcon: React.ReactNode;
  title: string;
  subtitle: string;
  services: ServiceDetail[];
  gradient: string;
  accentColor: string;
  link: string;
}

const PricingOption: React.FC<PricingOptionProps> = ({ title, price, period }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      whileHover={{ scale: 1.03, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
    >
      <motion.div 
        className="absolute -right-16 -top-16 w-32 h-32 bg-blue-50 rounded-full opacity-30"
        animate={{ scale: isHovered ? 1.1 : 1, opacity: isHovered ? 0.4 : 0.3 }}
        transition={{ duration: 0.4 }}
      />
      <motion.div 
        className="absolute -left-16 -bottom-16 w-32 h-32 bg-indigo-50 rounded-full opacity-20"
        animate={{ scale: isHovered ? 1.1 : 1, opacity: isHovered ? 0.3 : 0.2 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
      <div className="relative z-10">
        <p className="font-medium text-gray-600 mb-2 text-sm">{title}</p>
        <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">
          {price}
        </p>
        {period && (
          <div className="flex items-center text-xs text-gray-500">
            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 mr-1.5"></div>
            {period}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ServiceCategory: React.FC<ServiceCategoryProps> = ({ categoryIcon, title, subtitle, services, gradient, accentColor, link }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`rounded-2xl shadow-lg overflow-hidden mb-10 border border-gray-200/50 ${gradient} relative transition-shadow duration-300 hover:shadow-xl`}
    >
      <div 
        className="p-6 md:p-8 cursor-pointer relative flex justify-between items-center z-10" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <motion.div 
            className={`p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-md text-${accentColor}`}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {React.cloneElement(categoryIcon as React.ReactElement, { className: "h-7 w-7" })}
          </motion.div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
            <p className="text-md md:text-lg text-gray-600 mt-1">{subtitle}</p>
          </div>
        </div>
        <motion.div 
          className={`text-${accentColor} bg-white/70 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white/90 transition-colors`}
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaPlus className={`h-6 w-6 transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`} />
        </motion.div>
      </div>
      
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 pt-4 bg-white/50 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    variants={{ collapsed: { opacity: 0, y: 10 }, open: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-md p-5 transition-all duration-300 border border-gray-100 hover:shadow-lg hover:border-blue-100 group"
                  >
                    <div className={`mb-3 text-${accentColor}`}>
                      {React.cloneElement(service.icon as React.ReactElement, { className: "h-6 w-6" })}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                variants={{ collapsed: { opacity: 0 }, open: { opacity: 1 } }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-center"
              >
                <Link href={link} passHref>
                  <Button variant="outline" size="lg" className={`bg-white border-${accentColor} text-${accentColor} hover:bg-gray-50 hover:text-${accentColor}`}>
                    Learn more about {title.split(' ')[0]}
                    <FaArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ServicesPage: React.FC = () => {
  const businessStrategyServices = [
    {
      title: "Business Model Design & Validation",
      description: "Develop and validate your business model to ensure market fit and sustainable growth.",
      icon: <FaChartLine className="w-10 h-10" />
    },
    {
      title: "Market Research & Positioning Strategy",
      description: "Understand your market and position your offering for maximum impact and differentiation.",
      icon: <FaBuilding className="w-10 h-10" />
    },
    {
      title: "Go-to-Market Planning",
      description: "Create a comprehensive plan to launch your product or service successfully in the market.",
      icon: <FaRocket className="w-10 h-10" />
    },
    {
      title: "Revenue & Pricing Strategy",
      description: "Develop pricing models that maximize revenue while delivering value to customers.",
      icon: <FaChartLine className="w-10 h-10" />
    },
    {
      title: "Investor Readiness & Pitch Deck Strategy",
      description: "Prepare for investor meetings with compelling materials and a solid pitch strategy.",
      icon: <FaHandshake className="w-10 h-10" />
    },
    {
      title: "Strategic Roadmapping for Growth",
      description: "Create a clear roadmap for sustainable growth aligned with your business goals.",
      icon: <FaChartLine className="w-10 h-10" />
    }
  ];

  const webDevServices = [
    {
      title: "Custom Website & Landing Page Development",
      description: "Professional websites and landing pages designed to convert visitors into customers.",
      icon: <FaLaptop className="w-10 h-10" />
    },
    {
      title: "Web Applications (Next.js, Tailwind, Supabase)",
      description: "Custom web applications built with modern technologies for optimal performance.",
      icon: <FaCode className="w-10 h-10" />
    },
    {
      title: "Mobile App Development (Flutter, React Native)",
      description: "Cross-platform mobile applications that provide seamless user experiences.",
      icon: <FaLaptop className="w-10 h-10" />
    },
    {
      title: "SaaS MVPs, Internal Tools & Client Portals",
      description: "Custom software solutions to streamline operations and enhance client experiences.",
      icon: <FaCogs className="w-10 h-10" />
    },
    {
      title: "Database Architecture & API Integrations",
      description: "Robust database solutions and seamless API integrations for your applications.",
      icon: <FaCode className="w-10 h-10" />
    },
    {
      title: "WordPress Solutions",
      description: "Fast and functional WordPress websites customized to your specific needs.",
      icon: <FaLaptop className="w-10 h-10" />
    }
  ];

  const startupServices = [
    {
      title: "Business Setup & Formation Guidance",
      description: "Expert guidance on setting up your business structure and operations.",
      icon: <FaBuilding className="w-10 h-10" />
    },
    {
      title: "Launch Strategy & Execution Support",
      description: "Comprehensive support for planning and executing your product launch.",
      icon: <FaRocket className="w-10 h-10" />
    },
    {
      title: "Customer Journey Design",
      description: "Create seamless customer experiences that drive satisfaction and loyalty.",
      icon: <FaHandshake className="w-10 h-10" />
    },
    {
      title: "Monetization Models & Growth Hacking",
      description: "Develop effective monetization strategies and growth tactics for rapid scaling.",
      icon: <FaChartLine className="w-10 h-10" />
    },
    {
      title: "User Acquisition & Funnel Strategy",
      description: "Build effective funnels to attract, convert, and retain your ideal customers.",
      icon: <FaBullhorn className="w-10 h-10" />
    },
    {
      title: "Brand & Product Ecosystem Planning",
      description: "Develop a cohesive brand and product ecosystem that scales with your business.",
      icon: <FaCogs className="w-10 h-10" />
    }
  ];

  const marketingServices = [
    {
      title: "KPI-Focused Strategy Session",
      description: "Develop a results-oriented marketing strategy focused on key performance indicators.",
      icon: <FaChartLine className="w-10 h-10" />
    },
    {
      title: "End-to-End Funnel Design",
      description: "Create comprehensive marketing funnels that convert prospects into customers.",
      icon: <FaBullhorn className="w-10 h-10" />
    },
    {
      title: "Messaging, Copywriting & Offers that Sell",
      description: "Develop compelling messaging and offers that resonate with your target audience.",
      icon: <FaBullhorn className="w-10 h-10" />
    },
    {
      title: "Organic + Paid Strategy Mapping",
      description: "Create a balanced marketing approach combining organic and paid channels.",
      icon: <FaChartLine className="w-10 h-10" />
    },
    {
      title: "Content Strategy + Creator Monetization Models",
      description: "Develop content strategies that build authority and drive revenue.",
      icon: <FaBullhorn className="w-10 h-10" />
    },
    {
      title: "Email & Retargeting Automation Strategy",
      description: "Implement automated marketing systems that nurture leads and drive conversions.",
      icon: <FaCogs className="w-10 h-10" />
    }
  ];

  const systemsServices = [
    {
      title: "Business Infrastructure Design",
      description: "Create scalable systems and processes that support sustainable growth.",
      icon: <FaCogs className="w-10 h-10" />
    },
    {
      title: "Pricing Models Built for Profit & Scale",
      description: "Develop pricing strategies that maximize profitability as you scale.",
      icon: <FaChartLine className="w-10 h-10" />
    },
    {
      title: "Consistent Revenue Systems",
      description: "Implement systems that generate predictable, recurring revenue streams.",
      icon: <FaChartLine className="w-10 h-10" />
    },
    {
      title: "Automation & Tech Stack Consulting",
      description: "Optimize your technology stack to automate processes and improve efficiency.",
      icon: <FaCogs className="w-10 h-10" />
    },
    {
      title: "Metrics, Dashboards & Scorecard Design",
      description: "Create data visualization tools that provide actionable business insights.",
      icon: <FaChartLine className="w-10 h-10" />
    },
    {
      title: "Scalable Lead Gen & Sales Workflows",
      description: "Develop systems that consistently generate and convert high-quality leads.",
      icon: <FaBullhorn className="w-10 h-10" />
    }
  ];

  const brandServices = [
    {
      title: "Brand Audit + Differentiation Strategy",
      description: "Assess your brand's current position and develop strategies to stand out.",
      icon: <FaBullhorn className="w-10 h-10" />
    },
    {
      title: "Messaging Frameworks & Brand Narrative",
      description: "Create compelling brand stories and messaging that resonates with your audience.",
      icon: <FaBullhorn className="w-10 h-10" />
    },
    {
      title: "Growth Loops & Community Design",
      description: "Build self-sustaining growth systems and engaged communities around your brand.",
      icon: <FaChartLine className="w-10 h-10" />
    },
    {
      title: "Content Pillar Strategy",
      description: "Develop content frameworks that establish your authority in your industry.",
      icon: <FaBullhorn className="w-10 h-10" />
    },
    {
      title: "Authority Building + Strategic Collaborations",
      description: "Build your personal and brand authority through strategic partnerships.",
      icon: <FaHandshake className="w-10 h-10" />
    },
    {
      title: "Growth KPI Tracking",
      description: "Implement systems to track and optimize your key growth metrics.",
      icon: <FaChartLine className="w-10 h-10" />
    }
  ];

  const leadershipServices = [
    {
      title: "Founder Mindset & Execution Coaching",
      description: "Develop the mindset and skills needed to lead your organization effectively.",
      icon: <FaBrain className="w-10 h-10" />
    },
    {
      title: "Communication, Delegation, and Influence",
      description: "Master the essential leadership skills that drive team performance.",
      icon: <FaHandshake className="w-10 h-10" />
    },
    {
      title: "Vision-Mission-Values Activation",
      description: "Align your team around a compelling vision and core values.",
      icon: <FaRocket className="w-10 h-10" />
    },
    {
      title: "Founder/Co-Founder Alignment",
      description: "Build strong partnerships with co-founders based on clear expectations.",
      icon: <FaHandshake className="w-10 h-10" />
    },
    {
      title: "Resilience & Personal Growth",
      description: "Develop the mental toughness and adaptability needed for entrepreneurial success.",
      icon: <FaBrain className="w-10 h-10" />
    },
    {
      title: "High-Performance Team Systems",
      description: "Create frameworks and processes that enable your team to perform at its best.",
      icon: <FaCogs className="w-10 h-10" />
    }
  ];

  const executionServices = [
    {
      title: "Project Management & Implementation",
      description: "Expert execution of your strategic initiatives with clear milestones and accountability.",
      icon: <FaRocket className="w-10 h-10" />
    },
    {
      title: "Fractional COO/CTO Services",
      description: "Experienced operational and technical leadership without the full-time commitment.",
      icon: <FaCogs className="w-10 h-10" />
    },
    {
      title: "Tech & Marketing Implementation",
      description: "Hands-on execution of your technology and marketing strategies.",
      icon: <FaCode className="w-10 h-10" />
    },
    {
      title: "Ongoing Advisory & Accountability",
      description: "Regular check-ins and guidance to keep your initiatives on track.",
      icon: <FaHandshake className="w-10 h-10" />
    },
    {
      title: "Team Training & Capability Building",
      description: "Develop your team's skills and capabilities to drive long-term success.",
      icon: <FaGraduationCap className="w-10 h-10" />
    },
    {
      title: "Quarterly Business Reviews & Planning",
      description: "Regular assessment and planning sessions to optimize performance.",
      icon: <FaCalendarAlt className="w-10 h-10" />
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-24 md:py-32 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 15, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -15, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 2 }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="blue" strokeWidth="0.5" opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </motion.div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6 inline-block"
              >
                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium tracking-wide">EXPERT SERVICES</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                <span className="block text-gray-800">Transform Your</span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Bold Ideas Into Reality</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl"
              >
                Strategic guidance and hands-on execution to help founders, creators, and companies build and scale through tech, strategy, systems, and leadership.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/contact">
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5), 0 8px 10px -6px rgba(59, 130, 246, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition duration-300 inline-flex items-center shadow-lg"
                  >
                  Ready to Begin ?
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <FaArrowRight />
                    </motion.div>
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-blue-400 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative h-[400px] w-full max-w-[500px] mx-auto">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl transform rotate-3"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-200 to-blue-200 rounded-2xl transform -rotate-3"></div>
                <div className="absolute top-4 left-4 right-4 bottom-4 bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-blue-100 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4 h-full">
                    <motion.div 
                      className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 flex flex-col justify-center items-center border border-blue-200"
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.2)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChartLine className="text-blue-600 text-3xl mb-3" />
                      <h3 className="text-lg font-semibold text-gray-800">Strategy</h3>
                    </motion.div>
                    <motion.div 
                      className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 flex flex-col justify-center items-center border border-purple-200"
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.2)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaCode className="text-purple-600 text-3xl mb-3" />
                      <h3 className="text-lg font-semibold text-gray-800">Development</h3>
                    </motion.div>
                    <motion.div 
                      className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 flex flex-col justify-center items-center border border-indigo-200"
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.2)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaRocket className="text-indigo-600 text-3xl mb-3" />
                      <h3 className="text-lg font-semibold text-gray-800">Growth</h3>
                    </motion.div>
                    <motion.div 
                      className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg p-4 flex flex-col justify-center items-center border border-cyan-200"
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.2)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaBrain className="text-cyan-600 text-3xl mb-3" />
                      <h3 className="text-lg font-semibold text-gray-800">Leadership</h3>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Showcase */}
      <div className="container mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Services & Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Click on each service category to explore the details and offerings.
          </p>
        </motion.div>

        <ServiceCategory 
          categoryIcon={<FaChartLine className="w-12 h-12" />}
          title="Business Strategy & Consulting"
          subtitle="From vision to viable model. For founders who need clarity, validation, and execution-ready plans."
          services={businessStrategyServices}
          gradient="bg-gradient-to-br from-blue-50 to-indigo-50"
          accentColor="blue-600"
          link="/contact"
        />

        <ServiceCategory 
          categoryIcon={<FaCode className="w-12 h-12" />}
          title="Web & Mobile Product Builds"
          subtitle="Done-for-you MVPs, apps & platforms. For non-technical founders who want to build and launch fast."
          services={webDevServices}
          gradient="bg-gradient-to-br from-purple-50 to-pink-50"
          accentColor="purple-600"
          link="/services/webdev"
        />

        <ServiceCategory 
          categoryIcon={<FaRocket className="w-12 h-12" />}
          title="Startup Launch & Scale Support"
          subtitle="Business co-pilot for execution. For startups in early traction or scaling mode."
          services={startupServices}
          gradient="bg-gradient-to-br from-teal-50 to-cyan-50"
          accentColor="teal-600"
          link="/services/startup"
        />

        <ServiceCategory 
          categoryIcon={<FaBullhorn className="w-12 h-12" />}
          title="Marketing Strategy Consulting"
          subtitle="Marketing that moves the needle. For brands that want results—not fluff."
          services={marketingServices}
          gradient="bg-gradient-to-br from-blue-200 to-pink-200"
          accentColor="pink-600"
          link="/contact"
        />

        <ServiceCategory 
          categoryIcon={<FaCogs className="w-12 h-12" />}
          title="Systems & Revenue Architecture"
          subtitle="Build the engine behind the brand. For founders ready to scale with precision."
          services={systemsServices}
          gradient="bg-gradient-to-br from-blue-100 to-teal-100"
          accentColor="teal-600"
          link="/contact"
        />

        <ServiceCategory 
          categoryIcon={<FaChartLine className="w-12 h-12" />}
          title="Brand Growth & Positioning"
          subtitle="Grow your visibility, credibility, and revenue."
          services={brandServices}
          gradient="bg-gradient-to-br from-blue-50 to-pink-50"
          accentColor="pink-600"
          link="/contact"
        />

        <ServiceCategory 
          categoryIcon={<FaBrain className="w-12 h-12" />}
          title="Leadership Coaching & Team Development"
          subtitle="Train the people who drive the mission. For founders, managers, and emerging leaders."
          services={leadershipServices}
          gradient="bg-gradient-to-br from-blue-200 to-pink-200"
          accentColor="pink-600"
          link="/services/leadership"
        />

        <ServiceCategory 
          categoryIcon={<FaRocket className="w-12 h-12" />}
          title="Execution & Implementation Partner"
          subtitle="Not just advice—execution side-by-side. Ideal for clients who want a long-term partner, not just a strategist."
          services={executionServices}
          gradient="bg-gradient-to-br from-teal-100 to-cyan-100"
          accentColor="cyan-600"
          link="/contact"
        />
      </div>

      {/* Signature Offers */}
      <SignatureOffers />

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-12 rounded-3xl shadow-xl max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book a free 15-minute discovery call to discuss your needs and how we can work together.
          </p>
          <Link href="/contact" passHref>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -6px rgba(0, 0, 0, 0.05)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 inline-block shadow-lg border border-blue-500/30 backdrop-blur-sm"
            >
              Schedule Your Call
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;