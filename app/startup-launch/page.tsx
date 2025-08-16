import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Rocket, Target, TrendingUp, Users, Zap, BarChart3, Lightbulb, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function StartupLaunchPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50/30">
        <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-[0.03]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 font-medium text-sm">
                <Rocket className="h-4 w-4 mr-2" />
                Startup Launch Support
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-gray-900">Your Business</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Co-Pilot</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Business setup, go-to-market, and monetization help. Think "business co-pilot" for 
                non-technical founders ready to launch, scale, and succeed.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center">
                    Launch Your Startup
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Link href="#services">
                  <Button variant="outline" className="px-8 py-4 text-lg border-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                    Learn More
                  </Button>
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center gap-8 pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">75+</p>
                  <p className="text-sm text-gray-600">Startups Launched</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">$15M+</p>
                  <p className="text-sm text-gray-600">Funding Raised</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">75%</p>
                  <p className="text-sm text-gray-600">Still Operating</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/image/founders.png"
                  alt="Startup launch and business development"
                  width={600}
                  height={600}
                  className="object-cover w-full h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
              
              {/* Floating startup elements */}
              <div className="absolute -left-6 top-20 bg-white rounded-xl shadow-lg p-4 transform rotate-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  <span className="font-semibold">Growth</span>
                </div>
              </div>
              
              <div className="absolute -right-6 bottom-20 bg-white rounded-xl shadow-lg p-4 transform -rotate-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-purple-500" />
                  <span className="font-semibold">Team Building</span>
                </div>
              </div>
              
              <div className="absolute top-1/2 -left-4 bg-white rounded-xl shadow-lg p-3 transform rotate-12">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium text-sm">Innovation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Launch Support Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support to take your startup from idea to profitable, sustainable business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Launch Strategy */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Launch Strategy</h3>
              <p className="text-gray-600 mb-6">
                Strategic roadmap from MVP to market entry. Define your go-to-market strategy, 
                timing, and launch sequence for maximum impact.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Product-market fit validation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Launch timeline & milestones</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Resource allocation planning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Risk mitigation strategies</span>
                </li>
              </ul>
            </div>

            {/* Marketing & User Acquisition */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Marketing & User Acquisition</h3>
              <p className="text-gray-600 mb-6">
                Build awareness, attract your first customers, and create sustainable growth 
                through proven marketing strategies and acquisition channels.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Brand positioning & messaging</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Digital marketing campaigns</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Content marketing strategy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Customer acquisition funnels</span>
                </li>
              </ul>
            </div>

            {/* Growth Hacking & Scaling */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Growth Hacking & Scaling</h3>
              <p className="text-gray-600 mb-6">
                Rapid experimentation and optimization to accelerate growth. Data-driven 
                approaches to scale efficiently and sustainably.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Growth experiment design</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Conversion optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Retention & engagement strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Scaling infrastructure planning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Launch Phases */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Launch Phases</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured approach to launching your startup, from initial planning to sustainable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center text-xl font-bold mx-auto mb-6">
                <Lightbulb className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pre-Launch</h3>
              <p className="text-gray-600">Foundation building, market research, MVP development, and initial team assembly.</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white flex items-center justify-center text-xl font-bold mx-auto mb-6">
                <Rocket className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Soft Launch</h3>
              <p className="text-gray-600">Limited release to test market response, gather feedback, and refine the product.</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white flex items-center justify-center text-xl font-bold mx-auto mb-6">
                <Globe className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Full Launch</h3>
              <p className="text-gray-600">Public launch with comprehensive marketing campaign and customer acquisition focus.</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 text-white flex items-center justify-center text-xl font-bold mx-auto mb-6">
                <TrendingUp className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scale & Growth</h3>
              <p className="text-gray-600">Optimization, expansion, and sustainable growth strategies for long-term success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Startup Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real founders who launched successful businesses with our co-pilot support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">TF</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">TechFlow Solutions</h4>
                  <p className="text-gray-600">SaaS Platform for Small Businesses</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-6">
                "From idea to $100K ARR in 8 months. Edison's launch strategy and growth hacking 
                approach helped us find product-market fit faster than we ever imagined. His business 
                co-pilot support was invaluable during those critical early months."
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">8mo</p>
                  <p className="text-sm text-gray-600">To $100K ARR</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">500+</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">$2M</p>
                  <p className="text-sm text-gray-600">Series A Raised</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">EC</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">EcoCommerce</h4>
                  <p className="text-gray-600">Sustainable E-commerce Platform</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-6">
                "Edison's marketing and user acquisition strategies helped us launch to 10,000 users 
                in our first month. His growth hacking techniques and data-driven approach to scaling 
                were exactly what we needed as non-technical founders."
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">1mo</p>
                  <p className="text-sm text-gray-600">To 10K Users</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">25%</p>
                  <p className="text-sm text-gray-600">Monthly Growth</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">$500K</p>
                  <p className="text-sm text-gray-600">Seed Funding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Areas */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Startup Support</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              End-to-end support for every aspect of your startup journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Business Planning</h3>
              <p className="text-gray-600 text-sm">Business model development, financial planning, and strategic roadmapping.</p>
            </div>

            <div className="text-center p-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Team Building</h3>
              <p className="text-gray-600 text-sm">Hiring strategy, team structure, and culture development for early-stage startups.</p>
            </div>

            <div className="text-center p-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fundraising Support</h3>
              <p className="text-gray-600 text-sm">Pitch deck creation, investor outreach, and fundraising strategy.</p>
            </div>

            <div className="text-center p-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Product Development</h3>
              <p className="text-gray-600 text-sm">MVP planning, feature prioritization, and product roadmap development.</p>
            </div>

            <div className="text-center p-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Market Entry</h3>
              <p className="text-gray-600 text-sm">Go-to-market strategy, customer validation, and competitive positioning.</p>
            </div>

            <div className="text-center p-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Growth Strategy</h3>
              <p className="text-gray-600 text-sm">Scaling tactics, optimization strategies, and sustainable growth planning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Launch Your Startup?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Get the business co-pilot support you need to launch successfully. From idea to sustainable 
            business, we'll guide you through every step of the journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="px-8 py-4 text-lg bg-white text-blue-700 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center">
                Schedule Launch Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/about">
              <Button variant="outline" className="bg-primary text-white px-8 py-4 text-lg border-2 border-white text-white hover:bg-white/10">
                Learn About Our Process
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-blue-100">
            <p>✓ Free startup assessment  ✓ Launch roadmap included  ✓ Ongoing support guaranteed</p>
          </div>
        </div>
      </section>
    </div>
  );
}
