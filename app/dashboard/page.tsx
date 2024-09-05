'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/authContext';
import { FaChartLine, FaBook, FaMobileAlt, FaLightbulb } from 'react-icons/fa';

export default function Dashboard() {
  const { user, session } = useAuth();
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
      </div>
    </div>
  );
}