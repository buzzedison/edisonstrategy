'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/authContext';
import { FaChartLine, FaBook, FaMobileAlt, FaLightbulb, FaCalculator } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SignOutButton from '../components/SignOutButton'; // Import the SignupButton component

export default function Dashboard() {
  const { user, session, signOut } = useAuth(); // Extract signOut function from useAuth
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/signin');
    }
  }, [session, router]);

  if (!user || !session) {
    return null; // or a loading spinner
  }

  const cards = [
    { title: 'Insights', icon: FaChartLine, description: 'View your business analytics and trends' },
    { title: 'Resources', icon: FaBook, description: 'Access educational materials and guides' },
    { title: 'Free Apps', icon: FaMobileAlt, description: 'Discover useful free applications' },
    { title: 'Ideas', icon: FaLightbulb, description: 'Explore innovative business concepts' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen pt-2 md:pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome, {user.email}</h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-8 mb-12"
        >
          <div className="flex items-center mb-6">
            <FaCalculator className="text-4xl text-blue-500 mr-4" />
            <h2 className="text-3xl font-bold text-gray-800">New: Pricing Tools</h2>
          </div>
          <p className="text-xl text-gray-600 mb-6">
          I've been there - struggling to figure out if I was charging too much or too little. That's why I created these tools.  No more guesswork, just strategic pricing that boosts your bottom line.
          </p>
          <Link href="/dashboard/tools/pricing" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg">
            Explore Pricing Tools
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full mb-4">
                <card.icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{card.title}</h2>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <button onClick={signOut} className="px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg">Sign Out</button> {/* Display the SignupButton component */}
        </div>
<div>
  <Link href="/admin/blog/new"> New Blog</Link>
</div>
       
      </div>
    </div>
  );
}