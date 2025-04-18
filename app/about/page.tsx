'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Target, Zap, Users, Building, Brain } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// SEO Metadata (can be generated server-side if needed later)
// export const metadata = {
//   title: 'About | The Growth Architect - Building Scalable Businesses',
//   description: 'Learn about The Growth Architect - I partner with founders and leaders to build scalable tech, systems, and teams, turning vision into predictable growth.',
// };

const AboutPage: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <motion.section 
        className="relative py-24 md:py-32 bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden"
        initial="hidden" animate="visible" variants={fadeIn}
      >
        <div className="absolute inset-0 opacity-10 bg-grid-pattern bg-[length:30px_30px]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl opacity-50 -translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl opacity-50 translate-x-1/4 translate-y-1/4"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight"
                variants={fadeIn}
              >
                Meet <span className="text-blue-600">The Growth Architect</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed"
                variants={fadeIn}
              >
                I partner with founders, leaders, and organizations to transform ambitious ideas into <strong className="font-semibold">scalable, profitable realities</strong>. Many struggle to connect technology, strategy, and execution – I bridge that critical gap.
              </motion.p>
              <motion.div variants={fadeIn}>
                <Link href="/contact" passHref>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all">
                    Start Architecting Growth <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square md:aspect-[4/5]"
              variants={fadeIn}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Image
                src="/image/edisonnew.jpg" // Replace with your actual image path
                alt="Edison Ade - The Growth Architect"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* My Philosophy / Mission */}
      <motion.section 
        className="py-20 md:py-28"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" variants={fadeIn}>
            Bridging Vision & Execution
          </motion.h2>
          <motion.p className="text-lg text-gray-600 leading-relaxed" variants={fadeIn}>
            Great ideas often stall at the intersection of technology, business strategy, and practical implementation. My mission is to be the architect that designs and builds the bridge, ensuring your vision doesn't just stay a dream but becomes a well-executed, thriving reality. I believe in practical strategy, robust systems, and empowered teams as the pillars of sustainable growth.
          </motion.p>
        </div>
      </motion.section>

      {/* What I Architect (Services) */}
      <motion.section 
        className="py-20 md:py-28 bg-gray-50"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" variants={fadeIn}>
              Architecting Your Success: My Core Pillars
            </motion.h2>
            <motion.p className="text-lg text-gray-600 max-w-3xl mx-auto" variants={fadeIn}>
              I focus on three critical areas to build businesses that last and scale effectively.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Pillar 1: Technology */}
            <motion.div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col" variants={fadeIn}>
              <div className="mb-5">
                <div className="inline-block bg-blue-100 text-blue-600 p-3 rounded-lg">
                  <Zap className="h-7 w-7" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Build Digital Engines</h3>
              <p className="text-gray-600 mb-4 flex-grow">I design and construct the technology that powers growth – from sleek web/mobile apps and internal tools to robust digital platforms that deliver results and enhance user experience.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-blue-500" /> Custom App Development</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-blue-500" /> Platform Architecture</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-blue-500" /> System Integration</li>
              </ul>
            </motion.div>

            {/* Pillar 2: Systems */}
            <motion.div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col" variants={fadeIn}>
              <div className="mb-5">
                <div className="inline-block bg-indigo-100 text-indigo-600 p-3 rounded-lg">
                  <Building className="h-7 w-7" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Architect Scalable Systems</h3>
              <p className="text-gray-600 mb-4 flex-grow">Growth requires a solid foundation. I craft the operational blueprints for scale: resilient business models, optimized pricing strategies, and efficient revenue systems designed for longevity.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-indigo-500" /> Business Model Design</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-indigo-500" /> Pricing & Revenue Strategy</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-indigo-500" /> Operational Process Optimization</li>
              </ul>
            </motion.div>

            {/* Pillar 3: Leadership & Teams */}
            <motion.div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col" variants={fadeIn}>
              <div className="mb-5">
                <div className="inline-block bg-purple-100 text-purple-600 p-3 rounded-lg">
                  <Brain className="h-7 w-7" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Develop High-Performing Teams</h3>
              <p className="text-gray-600 mb-4 flex-grow">Ideas are executed by people. I empower founders and teams to elevate their capabilities in leadership, strategic thinking, operational excellence, and effective execution.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-purple-500" /> Founder & Leadership Coaching</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-purple-500" /> Team Skill Development</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-purple-500" /> Execution Frameworks</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* My Approach */}
      <motion.section 
        className="py-20 md:py-28"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" variants={fadeIn}>
              My Approach: Hands-On Partnership
            </motion.h2>
            <motion.p className="text-lg text-gray-600" variants={fadeIn}>
              I don't just deliver recommendations; I roll up my sleeves and become an extension of your team.
            </motion.p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-8 md:p-12 rounded-2xl shadow-md">
            <motion.div className="md:w-1/2" variants={fadeIn}>
              <p className="text-gray-700 leading-relaxed space-y-4">
                <span>My process is collaborative and results-focused. We'll work together to diagnose challenges, design solutions, and implement them effectively.</span>
                <span>I believe in building <strong className="font-semibold">long-term capability</strong>, not just short-term fixes. Expect direct involvement, transparent communication, and a relentless focus on achieving your strategic objectives.</span>
                <span>Whether it's architecting software, refining business processes, or coaching your team, I'm invested in your success.</span>
              </p>
            </motion.div>
             <motion.div className="md:w-1/2 flex justify-center" variants={fadeIn}>
              {/* Optional: Add an illustrative image or icon here */}
               <Target className="w-32 h-32 text-blue-500 opacity-50" />
            </motion.div>
          </div>
        </div>
      </motion.section>

       {/* Impact / Accomplishments */}
      <motion.section 
        className="py-20 md:py-28 bg-gray-800 text-white"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" variants={fadeIn}>
            Proven Impact
          </motion.h2>
          <motion.p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto" variants={fadeIn}>
            While every engagement is unique, my focus remains constant: delivering measurable results and building sustainable growth engines. 
            {/* Placeholder for specific accomplishments - add real data later */}
          </motion.p>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerContainer}>
            {/* Example Accomplishment Cards - Replace with real data */}
            <motion.div className="bg-gray-700 p-6 rounded-lg" variants={fadeIn}>
              <h3 className="text-2xl font-bold text-blue-400 mb-2">100+</h3>
              <p className="text-gray-300">Founders & Leaders Empowered</p>
            </motion.div>
            <motion.div className="bg-gray-700 p-6 rounded-lg" variants={fadeIn}>
              <h3 className="text-2xl font-bold text-indigo-400 mb-2">50+</h3>
              <p className="text-gray-300">Digital Products & Systems Built</p>
            </motion.div>
            <motion.div className="bg-gray-700 p-6 rounded-lg" variants={fadeIn}>
              <h3 className="text-2xl font-bold text-purple-400 mb-2">95%</h3>
              <p className="text-gray-300">Client Success & Satisfaction Rate</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Ideal Partners */}
      <motion.section 
        className="py-20 md:py-28"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" variants={fadeIn}>
              Who I Partner With
            </motion.h2>
            <motion.p className="text-lg text-gray-600 max-w-3xl mx-auto" variants={fadeIn}>
              I thrive when collaborating with ambitious leaders and organizations ready for meaningful transformation.
            </motion.p>
          </div>
          <motion.div className="space-y-6" variants={staggerContainer}>
            <motion.div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100 gap-4" variants={fadeIn}>
              <Users className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-1">Founders & CEOs</h3>
                <p className="text-gray-600">Visionaries aiming for significant, sustainable scaling who need a strategic and technical partner to execute.</p>
              </div>
            </motion.div>
             <motion.div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100 gap-4" variants={fadeIn}>
              <Building className="h-8 w-8 text-indigo-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-1">Companies Seeking Growth</h3>
                <p className="text-gray-600">Businesses requiring custom digital solutions, optimized processes, or strategic guidance to overcome growth plateaus.</p>
              </div>
            </motion.div>
             <motion.div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100 gap-4" variants={fadeIn}>
              <Brain className="h-8 w-8 text-purple-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-1">Leaders & Teams</h3>
                <p className="text-gray-600">Individuals and groups looking to enhance execution discipline, strategic thinking, and leadership capabilities.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-20 md:py-28 bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-6" variants={fadeIn}>
            Ready to Architect Your Growth?
          </motion.h2>
          <motion.p className="text-lg md:text-xl text-blue-100 mb-8" variants={fadeIn}>
            Let's discuss how we can translate your vision into tangible results and build a scalable future for your business.
          </motion.p>
          <motion.div variants={fadeIn}>
            <Link href="/contact" passHref>
              <Button size="lg" variant="outline" className="bg-white text-blue-700 hover:bg-gray-100 border-transparent text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all">
                Let's Build Together <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage; 