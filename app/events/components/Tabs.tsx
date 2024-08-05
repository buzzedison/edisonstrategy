// app/components/Tabs.tsx
"use client"

import { useState } from 'react';
import EventCard from './Eventcard';

type EventItem = {
  title: string;
  description: string;
  type: string;
  date: string;
  time: string;
  location: string;
  link: string;
};

const events: Record<string, EventItem[]> = {
  'All Events': [],
  Clubhouse: [
    {
      title: "Building a killer team",
      description: "Learn how to build an exceptional team to drive your business forward.",
      type: 'Clubhouse',
      date: 'August 20, 2024',
      time: '12PM GMT / 8:00 AM EST',
      location: 'Online',
      link: 'https://www.clubhouse.com/invite/B27Fww7NgdY9Jlzgb25W95Xy08ZXSyYKj:73m3-ORbEWWqrUxZOX-pSBUVtcR3hgU851Yv6KpvLK4',
    },
    {
      title: "AFCFTA. What's going on so far?",
      description: "Come and share your insights on AFCFTA progress.",
      type: 'Clubhouse',
      date: 'September 4, 2024',
      time: '12:00 PM - 1:00 PM (GMT)',
      location: 'Online',
      link: '/events/webinar-2',
    },
    {
      title: "African networking",
      description: "Business, collaborations, partnerships, and more.",
      type: 'Clubhouse',
      date: 'August 21, 2024',
      time: '12:00 PM - 1:00 PM (GMT)',
      location: 'Clubhouse',
      link: 'https://www.clubhouse.com/invite/9dGub00eQ8k1v6vw9bYWyb9QllD2hE3yW:EjriyPHgjpThEKNerMDW9PVG947YeD6bFRKM7WyraGw',
    },
  ],
  'LinkedIn Audio': [
    {
      title: "Wellness for entrepreneurs",
      description: "Tips and strategies for maintaining wellness as an entrepreneur.",
      type: 'Live Audio',
      date: 'September 10, 2024',
      time: '12:00 PM - 1:00 PM',
      location: 'LinkedIn',
      link: '/events/live-audio-1',
    },
    {
      title: "Building a killer team",
      description: "Learn how to build an exceptional team to drive your business forward.",
      type: 'Live Audio',
      date: 'August 15, 2024',
      time: '1:00 PM GMT/ 9AM EST',
      location: 'LinkedIn Audio',
      link: 'https://www.linkedin.com/events/buildingakillerteam7226318235208478720/',
    },
  ],
  'Face to Face': [
    {
      title: "Leadership Accelerator",
      description: "Transform Your Leadership. Become a More Confident & Impactful Leader in Just 2 Hours.",
      type: 'Face to Face',
      date: 'August 17, 2024',
      time: '11:30 AM - 2:00 PM (GMT)',
      location: 'The Enterprise Village',
      link: 'https://taskwit.bloopglobal.com/training/leadership',
    },
    {
      title: "AI For Business Growth",
      description: "Master the strategies and skills to harness artificial intelligence for sustainable business growth and competitive advantage.",
      type: 'Face to Face',
      date: 'October 12, 2024',
      time: '11:00 AM - 4:00 PM',
      location: 'The Enterprise Village',
      link: 'https://taskwit.bloopglobal.com/courses/ai',
    },
  ],
};

// Populate the 'All Events' array with events from other categories
Object.values(events).forEach((eventArray) => {
  events['All Events'].push(...eventArray);
});

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<keyof typeof events>('All Events');

  return (
    <div id="events" className="container mx-auto px-4 py-8">
      <div className="mb-8 overflow-x-auto">
        <div className="flex justify-center space-x-4">
          {Object.keys(events).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as keyof typeof events)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform -translate-y-1'
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events[activeTab].map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            description={event.description}
            type={event.type}
            date={event.date}
            time={event.time}
            location={event.location}
            eventLink={event.link}
            className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          />
        ))}
      </div>
    </div>
  );
}