"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-100 text-gray-800 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="lg:flex lg:items-center lg:justify-between"
        >
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0"
          >
            <div className="relative w-full h-[950px] rounded-3xl overflow-hidden shadow-2xl transform hover:rotate-2 transition-all duration-300">
              <Image 
                src="/image/edisonabout.jpg"
                layout="fill"
                objectFit="cover"
                alt="Edison Ade" 
                className="rounded-3xl transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
            </div>
          </motion.div>
          
          {/* Text Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 sm:text-4xl mb-8">
            Empowering Leaders to Build Profitable Businesses with Purpose
            </h2>
            <div className="space-y-6 text-lg text-gray-700">
              <motion.div 
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: 0.6 }}
                className="bg-white/70 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white/90 hover:-translate-y-1"
              >
                <p>Edison is a leadership coach on a mission to help founders and creators like you build businesses that are both profitable and impactful. He believes that success isn't just about the bottom line, but also about creating a legacy you can be proud of.</p>
              </motion.div>
              <motion.div 
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: 0.8 }}
                className="bg-white/70 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white/90 hover:-translate-y-1"
              >
                <p>With over 15 years of experience building and scaling companies, Edison brings a wealth of practical knowledge to the table. He's helped countless founders secure funding, dominate new markets, and build teams that thrive. But more importantly, he helps leaders prioritize their own well-being, so they can lead with passion and purpose for the long haul.</p>
              </motion.div>
              <motion.div 
                variants={cardVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: 1 }}
                className="bg-white/70 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white/90 hover:-translate-y-1"
              >
                <p>Ready to build a business that lights you up and makes a real difference in the world?</p>
              </motion.div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10"
            >
              <Link href="/about" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out shadow-lg">
                Learn More About Edison
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutSection