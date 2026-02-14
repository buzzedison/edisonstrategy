'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, Calendar, MapPin, Clock, Globe, Mic, Users, Play, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { cn } from '@/lib/utils'

interface StrategicEvent {
  _id: string
  title: string
  type: string
  description: string
  date: string
  time: string
  location: string
  eventLink?: string
  featured: boolean
}

export default function EventsPage() {
  const [events, setEvents] = useState<StrategicEvent[]>([])
  const [activeType, setActiveType] = useState<string>('All')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true)
      try {
        const data = await client.fetch(groq`
          *[_type == "event"] | order(date asc) {
            _id,
            title,
            type,
            description,
            date,
            time,
            location,
            eventLink,
            featured
          }
        `)
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const types = ['All', 'Clubhouse', 'LinkedIn Live', 'Face to Face', 'Webinar', 'Keynote']
  const filteredEvents = activeType === 'All'
    ? events
    : events.filter(e => e.type === activeType)

  const getIcon = (type: string) => {
    switch (type) {
      case 'Clubhouse': return Mic
      case 'LinkedIn Live': return Globe
      case 'Face to Face': return Users
      case 'Webinar': return Play
      default: return Calendar
    }
  }

  return (
    <div className="bg-white min-h-screen selection:bg-brand-charcoal selection:text-brand-stone">
      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-stone/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-4 py-1.5 bg-brand-stone border border-gray-100 rounded-full text-[10px] font-bold tracking-widest text-brand-muted uppercase mb-12"
            >
              <Sparkles className="h-3.5 w-3.5 mr-2 text-brand-gold" />
              Upcoming Events
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-8xl font-serif font-bold text-brand-charcoal tracking-tight leading-[0.9] mb-12"
            >
              Upcoming <br />
              <span className="text-gray-400 italic font-normal">Events.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-brand-muted font-light leading-relaxed max-w-2xl"
            >
              Join live sessions where I share practical ideas on growth, systems, and execution.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-y border-gray-100 py-6 px-6 lg:px-8 mb-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-4">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-500 border",
                  activeType === type
                    ? "bg-brand-charcoal text-white border-brand-charcoal shadow-lg shadow-brand-charcoal/10"
                    : "bg-white text-brand-muted border-gray-100 hover:border-brand-charcoal hover:text-brand-charcoal"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-6 lg:px-8 pb-40">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-10 h-10 text-brand-charcoal/20 animate-spin" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-muted text-center">Loading events...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-40 bg-brand-stone/10 rounded-[3rem] border border-dashed border-brand-stone">
              <p className="text-2xl font-serif italic text-brand-muted">No events in this category right now.</p>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal hover:text-brand-gold transition-colors">
                Request a Private Session <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredEvents.map((event, idx) => {
                const Icon = getIcon(event.type)
                return (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white border border-gray-100 p-10 rounded-[3rem] h-full flex flex-col hover:border-brand-charcoal transition-all duration-700 hover:shadow-2xl hover:shadow-brand-charcoal/5">
                      <div className="flex justify-between items-start mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-brand-stone/30 flex items-center justify-center text-brand-charcoal group-hover:bg-brand-charcoal group-hover:text-white transition-all duration-700">
                          <Icon className="w-8 h-8" />
                        </div>
                        {event.featured && (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold bg-brand-stone/50 px-3 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="mb-10">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted mb-4">
                          {event.type}
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-brand-charcoal mb-6 group-hover:text-brand-gold transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                        <p className="text-brand-muted font-light leading-relaxed mb-8 line-clamp-3">
                          {event.description}
                        </p>
                      </div>

                      <div className="mt-auto space-y-4 pt-8 border-t border-gray-50">
                        <div className="flex items-center gap-3 text-xs text-brand-muted">
                          <Calendar className="w-4 h-4 text-brand-gold" />
                          <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-brand-muted">
                          <Clock className="w-4 h-4 text-brand-gold" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-brand-muted">
                          <MapPin className="w-4 h-4 text-brand-gold" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      {event.eventLink && (
                        <Link
                          href={event.eventLink}
                          target="_blank"
                          className="mt-10 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal group-hover:text-brand-gold transition-all"
                        >
                          Register <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-40 bg-brand-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif italic text-white/90 leading-tight mb-16">
            "Great ideas grow faster when the right people are in the room."
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-16 h-[1px] bg-brand-gold/30 mb-8" />
            <p className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs">See You There</p>
          </div>
        </div>
      </section>
    </div>
  )
}
