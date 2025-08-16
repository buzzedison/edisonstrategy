
"use client"
import React from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 mt-2 lg:mt-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            Schedule a Consultation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book a time that works for you, and let's discuss how we can help your business grow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 rounded-xl shadow-2xl"
        >
          <iframe 
            src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0cfx_8uXRMAd69sMhA26BXX7exBnW3KDFUtLtoJq9_Llw5b94mWxB7NOqmhaUxM135XnFTPz3L?gv=true" 
            style={{ border: 0 }} 
            width="100%" 
            height="600" 
            frameBorder="0"
            title="Google Calendar Appointment Scheduling"
          ></iframe>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-600 mb-4">
            Can't find a suitable time? Feel free to reach out to me directly.
          </p>
          <a 
            href="mailto:me@buzzedison.com" 
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;