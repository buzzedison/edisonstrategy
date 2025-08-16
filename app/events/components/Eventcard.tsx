// app/components/EventCard.tsx
"use client"
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';

interface EventCardProps {
  title: string;
  description: string;
  type: string;
  date: string;
  time: string;
  location: string;
  eventLink: string; // Add the eventLink prop to the interface
  className?: string;
}

export default function EventCard({ title, description, type, date, time, location, eventLink, className }: EventCardProps) {
  const getEventTypeStyle = () => {
    switch (type) {
      case 'Webinar':
        return 'bg-blue-500 text-white';
      case 'Live Audio':
        return 'bg-green-500 text-white';
      case 'Face to Face':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Link href={eventLink}>
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)' }}
        className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer ${className}`}
      >
        <div className="px-6 py-4">
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${getEventTypeStyle()}`}>
            {type}
          </div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-700 mb-4">{description}</p>
          <div className="flex items-center mb-2">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <span className="text-gray-700">{date}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaClock className="text-gray-500 mr-2" />
            <span className="text-gray-700">{time}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <span className="text-gray-700">{location}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}