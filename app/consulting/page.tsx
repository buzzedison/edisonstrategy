import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Users, TrendingUp, Target, Lightbulb, BarChart3, Compass } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50/30">
        <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-[0.03]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 font-medium text-sm">
                <Compass className="h-4 w-4 mr-2" />
                Business Strategy Support
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-gray-900">Turn Ideas Into</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">a Clear Plan</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                For founders who need clear priorities and faster execution. You get direction, structure, and practical next steps.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center">
                    Book Free Strategy Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Link href="#services">
                  <Button variant="outline" className="px-8 py-4 text-lg border-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                    Explore Services
                  </Button>
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center gap-8 pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">100+</p>
                  <p className="text-sm text-gray-600">Founders Helped</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">$5M+</p>
                  <p className="text-sm text-gray-600">Revenue Generated</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">85%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/image/edisonabout.jpg"
                  alt="Strategic business consulting"
                  width={600}
                  height={600}
                  className="object-cover w-full h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -left-6 top-20 bg-white rounded-xl shadow-lg p-4 transform rotate-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  <span className="font-semibold">Revenue Growth</span>
                </div>
              </div>
              
              <div className="absolute -right-6 bottom-20 bg-white rounded-xl shadow-lg p-4 transform -rotate-6">
                <div className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-blue-500" />
                  <span className="font-semibold">Market Focus</span>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How I Help</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practical support to solve growth problems and improve execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Business Model Validation */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Model Validation</h3>
              <p className="text-gray-600 mb-6">
                Test and refine your business model before heavy investment. Identify what works, 
                what doesn't, and what needs adjustment.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Market fit analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Revenue model optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Risk assessment & mitigation</span>
                </li>
              </ul>
            </div>

            {/* Market Positioning Strategy */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Market Positioning Strategy</h3>
              <p className="text-gray-600 mb-6">
                Define your unique position in the market. Stand out from competitors and 
                attract your ideal customers with clear messaging.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Competitive analysis</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Value proposition development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Brand messaging framework</span>
                </li>
              </ul>
            </div>

            {/* Revenue Optimization */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Revenue Optimization</h3>
              <p className="text-gray-600 mb-6">
                Maximize your revenue potential through strategic pricing, sales processes, 
                and growth tactics that scale with your business.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Pricing strategy development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Sales funnel optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Growth metrics & KPIs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How We Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple process to move from confusion to clear action.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Discovery</h3>
              <p className="text-gray-600">Deep dive into your business, challenges, and goals to understand the full picture.</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analysis</h3>
              <p className="text-gray-600">Thorough market and competitive analysis to identify opportunities and gaps.</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Strategy</h3>
              <p className="text-gray-600">Develop a comprehensive strategy and actionable roadmap for growth.</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">4</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Implementation</h3>
              <p className="text-gray-600">Support you through execution with ongoing guidance and optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Results</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how founders used this support to grow faster and make better decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">SJ</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600">Founder, TechStartup</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "Edison helped us clarify our vision and build a roadmap that made sense. His strategic guidance 
                was invaluable in securing our first round of funding and achieving product-market fit."
              </p>
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
                <span className="ml-2 text-gray-600">5.0 rating</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">MC</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Michael Chen</h4>
                  <p className="text-gray-600">CEO, GrowthSaaS</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "Working with Edison transformed our business. He helped us identify our ideal market, 
                optimize our pricing strategy, and scale from $50K to $500K ARR in 18 months."
              </p>
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  ★★★★★
                </div>
                <span className="ml-2 text-gray-600">5.0 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready for a Clear Growth Plan?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Book a free call to discuss your challenges and map your next steps.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="px-8 py-4 text-lg bg-white text-blue-700 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center">
                Book Free Strategy Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/about">
              <Button variant="outline" className= "bg-primary text-white px-8 py-4 text-lg  border-2 border-white text-white hover:bg-white/10">
                Learn More About Edison
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-blue-100">
            <p>✓ No commitment required  ✓ 15-minute discovery call  ✓ Clear next steps</p>
          </div>
        </div>
      </section>
    </div>
  );
}
