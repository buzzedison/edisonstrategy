"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'
import { motion } from "framer-motion"
import { Brain, Battery, Zap, Users, Calendar, MapPin, Clock, AlertCircle, Heart, Shield, Target, Coffee } from 'lucide-react'

export default function FounderTherapy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <section className="relative py-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-blue-500/[0.05] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-purple-100/20 -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="mt-24 text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                FOUNDER THERAPY
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
                Burnout-Proofing Your Hustle
              </h2>
              <p className="text-xl text-gray-600 italic mb-8">
                A No-BS Guide to Surviving Startup Life
              </p>
            </motion.div>

            {/* Event Details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              <div className="flex items-center gap-2 text-blue-600">
                <Calendar className="w-5 h-5" />
                <span>February 22, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Clock className="w-5 h-5" />
                <span>2:00 PM – 5:30 PM</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <MapPin className="w-5 h-5" />
                <span>The Enterprise Village, Dzorwulu</span>
              </div>
            </motion.div>
          </div>

          {/* Why This Event Exists */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-red-50 hover:shadow-2xl transition-all duration-300 mb-12">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-red-600 p-3 rounded-2xl">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-4 text-red-900">Why This Event Exists</h2>
                    <p className="text-gray-700 text-lg mb-4">
                      Startup culture glorifies sleepless nights and "hustle at all costs." But what happens when the grind grinds <em>you</em> down?
                    </p>
                    <div className="bg-red-100 p-4 rounded-xl">
                      <p className="text-red-800 font-semibold">
                        72% of founders admit to mental health struggles
                      </p>
                      <p className="text-red-600 text-sm">Forbes, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Event Highlights */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-blue-50 h-full">
                <CardContent className="p-8">
                  <div className="bg-blue-100 p-4 rounded-2xl inline-block mb-4">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">The "Raw Stories" Panel</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                      Recovering founders share their darkest moments
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                      Submit anonymous burnout confessions live
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-purple-50 h-full">
                <CardContent className="p-8">
                  <div className="bg-purple-100 p-4 rounded-2xl inline-block mb-4">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Stress Trigger Mapping</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 bg-purple-600 rounded-full"></span>
                      Use the Burnout Canvas to pinpoint what's draining you
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 bg-purple-600 rounded-full"></span>
                      Transform survival mode into sustainable workflows
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Who Should Attend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-green-50">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-green-900">Who Should Attend?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="bg-green-100 p-4 rounded-2xl inline-block">
                      <Battery className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-gray-700">Early-stage founders feeling isolated, overwhelmed, or secretly burnt out</p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-green-100 p-4 rounded-2xl inline-block">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-gray-700">Hustlers who've sacrificed health, relationships, or sanity for their startup</p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-green-100 p-4 rounded-2xl inline-block">
                      <Coffee className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-gray-700">Anyone tired of "just hustle harder" advice</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                "Your startup won't thrive if you're barely alive."
              </h2>
              <p className="text-gray-600 mb-8">
                Ready to admit you're not okay? Join us.
              </p>
              <div className="space-y-6">
                <Link href="https://airtable.com/appSFdtBZ0mhEzlyF/pag9uDaL9FhNYGYNP/form">
                  <Button className="text-lg px-12 py-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                    Apply Now - Limited to 35 Seats
                  </Button>
                </Link>
                <p className="text-gray-500">Application Deadline: February 10, 2025</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
