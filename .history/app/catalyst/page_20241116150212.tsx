"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Users, Lightbulb, Target, ArrowRight, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function StartupCatalystLanding() {
  const [activeSection, setActiveSection] = useState('problem')

  return (
    <div className="min-h-screen bg-white text-blue-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-900 rounded-full opacity-10 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900 rounded-full opacity-10 transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 animate-fade-in-up">
            Startup Catalyst
            <span className="block text-blue-600">Mastermind</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-8 animate-fade-in-up animation-delay-200">
            Build, Lead, Succeed
          </p>
          <Link href="https://airtable.com/appSFdtBZ0mhEzlyF/pag9uDaL9FhNYGYNP/form">
          <Button className="text-lg px-8 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 animate-fade-in-up animation-delay-400">
            Apply Now <ChevronRight className="ml-2" />
          </Button>
          </Link>
        </div>
      </section>

      {/* Interactive Problem & Solution Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-8 text-center md:text-left">The Startup Journey</h2>
              <div className="flex flex-col space-y-4">
                <Button
                  variant={activeSection === 'problem' ? 'default' : 'outline'}
                  className="justify-start text-left"
                  onClick={() => setActiveSection('problem')}
                >
                  The Problem
                </Button>
                <Button
                  variant={activeSection === 'solution' ? 'default' : 'outline'}
                  className="justify-start text-left"
                  onClick={() => setActiveSection('solution')}
                >
                  The Solution
                </Button>
                <Button
                  variant={activeSection === 'goal' ? 'default' : 'outline'}
                  className="justify-start text-left"
                  onClick={() => setActiveSection('goal')}
                >
                  The Goal
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 bg-blue-900 text-white p-8 rounded-lg shadow-xl">
              {activeSection === 'problem' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold mb-4">The Problem</h3>
                  <p>
                    Starting a business is hard. Founders have great ideas but often struggle to execute them. Building an MVP, raising funding, assembling a team, and getting to market can feel like navigating a maze without a map. Many fail, not because the idea isn't good, but because they lack the right guidance, tools, and support.
                  </p>
                </div>
              )}
              {activeSection === 'solution' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold mb-4">The Solution</h3>
                  <p>
                    Startup Catalyst Mastermind is a founder-focused program designed to help entrepreneurs turn ideas into MVPs, secure funding, and build businesses that succeed. Through monthly mastermind sessions, skill-building workshops, and a powerful network of like-minded founders, we provide the structure and mentorship you need to move fast and make progress.
                  </p>
                </div>
              )}
              {activeSection === 'goal' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold mb-4">The Goal</h3>
                  <p>
                    We're not here to give you generic advice or motivational speeches. The goal is simple: help you move from idea to MVP, get funded, and start building a company that lasts. We're committed to providing actionable insights and support that drive real results for your startup.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Rocket, title: "Monthly Mastermind Meetings", description: "Share challenges, get actionable feedback, and learn from others on the same journey." },
              { icon: Lightbulb, title: "Workshops That Solve Real Problems", description: "Learn practical skills in team building, leadership, product development, and fundraising." },
              { icon: Users, title: "A Community That Has Your Back", description: "Access a curated group of ambitious founders who understand your challenges." }
            ].map((item, index) => (
              <Card key={index} className="bg-blue-900 text-white border-blue-800 overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-800 rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>
                  <item.icon className="w-12 h-12 mb-4 text-blue-300 relative z-10" />
                  <h3 className="text-xl font-bold mb-2 relative z-10">{item.title}</h3>
                  <p className="text-blue-100 relative z-10">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Join Startup Catalyst?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Proven Expertise", description: "Hosted by Edison Ade, a founder with 15+ years of experience building and scaling successful businesses." },
              { title: "Hands-On Guidance", description: "Learn practical frameworks for tackling the hardest parts of starting up—from idea to launch to growth." },
              { title: "A Clear Path Forward", description: "Stop guessing what to do next. Get actionable steps that move your business forward." },
              { title: "Real Results", description: "Build your MVP, attract the right team, pitch with confidence, and launch with purpose." }
            ].map((item, index) => (
              <div key={index} className="flex items-start group">
                <div className="mr-4 bg-blue-800 p-2 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
                  <Target className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-100">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-16 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Catalyze Your Startup?</h2>
          <p className="text-xl mb-8">Applications opens November 20, 2024. Program starts in January 2025.</p>
          <Link href="https://airtable.com/appSFdtBZ0mhEzlyF/pag9uDaL9FhNYGYNP/form">
          <Button className="text-lg px-8 py-3 rounded-full bg-white text-blue-900 hover:bg-blue-100 transition duration-300">
           Apply Now <ArrowRight className="ml-2" />
          </Button>
          </Link>
          <p className="mt-8 text-blue-300">
            In partnership with The Enterprise Village, Bloop Global, and Taskwit.
          </p>
        </div>
      </section>
    </div>
  )
}