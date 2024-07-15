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

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-24 sm:py-32">
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
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/image/edisonabout.jpg"
                layout="fill"
                objectFit="cover"
                alt="Edison Ade" 
                className="rounded-2xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </motion.div>
          
          {/* Text Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
              About Edison. Empowering Leaders to Build Profitable Businesses with Purpose
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Edison is a leadership coach on a mission: to help founders and creators like you build businesses that are both profitable and impactful. He believes that success isn't just about the bottom line, but also about creating a legacy you can be proud of.
              </p>
              <p>
                With over 15 years of experience building and scaling companies, Edison brings a wealth of practical knowledge to the table. He's helped countless founders secure funding, dominate new markets, and build teams that thrive. But more importantly, he helps leaders prioritize their own well-being, so they can lead with passion and purpose for the long haul.
              </p>
              <p>
                Ready to build a business that lights you up and makes a real difference in the world?
              </p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10"
            >
              <Link href="https://airtable.com/appyQ1Xz7zt3o456g/shrrb6Nwgw8ERvBff" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out shadow-md">
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