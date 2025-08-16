// Import necessary packages and components
"use client"
import { motion } from 'framer-motion';

// Define the InsightSection component
function InsightSection() {
  return (
    <div className="bg-gray-100 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Growth Time, Whoop Whoop!
        </h2>
        <p className="mt-4 text-lg text-gray-500">
        Let's Do This. Access Courses, Freebies, and Coaching to Level Up Your Leadership, Personal Growth, and Business Game.
        </p>
      </div>
      <div className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Card 1 */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-gray-900">Courses & Events</h3>
            <p className="mt-4 text-gray-600">Transformational Training Programs</p>
            <p className="mt-2 text-gray-500">Immerse yourself in life-changing courses and workshops to rapidly elevate your leadership, personal growth, and startup capabilities.</p>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-gray-900">Free Resources</h3>
            <p className="mt-4 text-gray-600">Downloadables, Templates & More</p>
            <p className="mt-2 text-gray-500">Access complimentary tools covering productivity, mindset, business strategy and more to apply in your life and work.</p>
          </motion.div>
          
          {/* Card 3 */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-gray-900">Services</h3>
            <p className="mt-4 text-gray-600">Coaching & Advisory</p>
            <p className="mt-2 text-gray-500">Get personalized guidance to conquer your biggest challenges and achieve breakthrough results with coaching packages tailored to your unique needs.</p>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}

// Export the InsightSection component
export default InsightSection;
