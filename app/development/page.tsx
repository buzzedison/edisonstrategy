import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Code, Smartphone, Globe, Rocket, Zap, Shield, Users, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function DevelopmentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[80vh] flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50/30">
        <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-[0.03]"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 font-medium text-sm">
                <Code className="h-4 w-4 mr-2" />
                Web & Mobile Development
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-gray-900">Done-For-You</span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Digital Platforms</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Custom MVPs and digital platforms that grow your business and deliver results. 
                From concept to launch, we build technology that drives revenue and scales with your vision.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Link href="#portfolio">
                  <Button variant="outline" className="px-8 py-4 text-lg border-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                    View Portfolio
                  </Button>
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center gap-8 pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">50+</p>
                  <p className="text-sm text-gray-600">Apps Built</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">98%</p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">15+</p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/image/webdev.png"
                  alt="Web and mobile development"
                  width={600}
                  height={600}
                  className="object-cover w-full h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
              </div>
              
              {/* Floating tech stack elements */}
              <div className="absolute -left-6 top-20 bg-white rounded-xl shadow-lg p-4 transform rotate-6">
                <div className="flex items-center space-x-2">
                  <Globe className="h-6 w-6 text-blue-500" />
                  <span className="font-semibold">React/Next.js</span>
                </div>
              </div>
              
              <div className="absolute -right-6 bottom-20 bg-white rounded-xl shadow-lg p-4 transform -rotate-6">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-6 w-6 text-green-500" />
                  <span className="font-semibold">React Native</span>
                </div>
              </div>
              
              <div className="absolute top-1/2 -left-4 bg-white rounded-xl shadow-lg p-3 transform rotate-12">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  <span className="font-medium text-sm">Secure</span>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Development Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Full-stack development solutions that bring your vision to life with modern technology and best practices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Custom Web Applications */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Custom Web Applications</h3>
              <p className="text-gray-600 mb-6">
                Scalable web applications built with modern frameworks. From simple landing pages 
                to complex SaaS platforms that handle thousands of users.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">React/Next.js development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Database design & optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">API development & integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Authentication & security</span>
                </li>
              </ul>
            </div>

            {/* Mobile App Development */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mobile App Development</h3>
              <p className="text-gray-600 mb-6">
                Native and cross-platform mobile apps that deliver exceptional user experiences 
                on both iOS and Android platforms.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">React Native development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">iOS & Android deployment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Push notifications & offline support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">App store optimization</span>
                </li>
              </ul>
            </div>

            {/* SaaS Product Development */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Rocket className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">SaaS Product Development</h3>
              <p className="text-gray-600 mb-6">
                Complete SaaS platforms with subscription management, user dashboards, 
                analytics, and everything needed to run a profitable software business.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Multi-tenant architecture</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Subscription & billing integration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Analytics & reporting dashboards</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Scalable cloud infrastructure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Modern Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use proven, cutting-edge technologies to build fast, secure, and scalable applications.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="h-20 w-20 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                R
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">React/Next.js</h3>
              <p className="text-gray-600 text-sm">Modern frontend frameworks for fast, SEO-friendly web applications</p>
            </div>
            
            <div className="text-center group">
              <div className="h-20 w-20 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                N
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Node.js</h3>
              <p className="text-gray-600 text-sm">Scalable backend development with JavaScript ecosystem</p>
            </div>
            
            <div className="text-center group">
              <div className="h-20 w-20 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                P
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">PostgreSQL</h3>
              <p className="text-gray-600 text-sm">Robust, enterprise-grade database for complex applications</p>
            </div>
            
            <div className="text-center group">
              <div className="h-20 w-20 rounded-xl bg-gradient-to-r from-orange-600 to-orange-700 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform">
                A
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">AWS/Vercel</h3>
              <p className="text-gray-600 text-sm">Cloud deployment and hosting for maximum reliability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real applications built for real businesses. See how we've helped companies launch and scale their digital products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <Rocket className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-xl font-bold">FinTech SaaS Platform</h4>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Management Platform</h3>
                <p className="text-gray-600 mb-4">
                  Complete SaaS platform for small business financial management with automated reporting, 
                  invoicing, and cash flow predictions. Scaled to 500+ active users.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">React</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Node.js</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">PostgreSQL</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Stripe</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-2 text-gray-600 text-sm">Client rated 5/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <Smartphone className="h-16 w-16 mx-auto mb-4" />
                  <h4 className="text-xl font-bold">E-commerce Mobile App</h4>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">React Native E-commerce App</h3>
                <p className="text-gray-600 mb-4">
                  Cross-platform mobile app for a fashion retailer with AR try-on features, 
                  social shopping, and AI-powered recommendations. 50K+ downloads in first quarter.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">React Native</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">TypeScript</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">Firebase</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">AR Kit</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-2 text-gray-600 text-sm">4.8/5 App Store rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <Button variant="outline" className="px-8 py-4 text-lg border-2 border-blue-200 text-blue-600 hover:bg-blue-50">
                View Full Portfolio
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Development Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures your project is delivered on time, within budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Discovery & Planning</h3>
              <p className="text-gray-600 text-sm">Understanding your vision, requirements, and technical specifications.</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Design & Prototyping</h3>
              <p className="text-gray-600 text-sm">Creating wireframes, mockups, and interactive prototypes.</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Development</h3>
              <p className="text-gray-600 text-sm">Building your application with clean code and best practices.</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">4</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Testing & QA</h3>
              <p className="text-gray-600 text-sm">Comprehensive testing to ensure quality and performance.</p>
            </div>
            
            <div className="text-center">
              <div className="h-20 w-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">5</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Launch & Support</h3>
              <p className="text-gray-600 text-sm">Deployment, monitoring, and ongoing maintenance and updates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your Digital Platform?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let's discuss your project and create a custom solution that drives growth for your business. 
            From MVP to full-scale platform, we've got you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="px-8 py-4 text-lg bg-white text-blue-700 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link href="/portfolio">
              <Button variant="outline" className="bg-primary text-white px-8 py-4 text-lg border-2 border-white text-white hover:bg-white/10">
                View My Work
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-blue-100">
            <p>✓ Free project consultation  ✓ 30-day money-back guarantee  ✓ Ongoing support included</p>
          </div>
        </div>
      </section>
    </div>
  );
}
