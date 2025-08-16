import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Home, Search, BookOpen, Mail, Compass, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50/30"></div>
      <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-[0.03]"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 right-24 w-64 h-64 rounded-full bg-gradient-to-br from-blue-300/10 to-indigo-300/20 animate-float-slow"></div>
      <div className="absolute bottom-20 left-12 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-300/10 to-purple-300/20 animate-float-medium"></div>
      <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full border border-blue-200/30 animate-float-fast"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* 404 Animation */}
        <div className="mb-12 relative pt-24 mt-12">
          <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient-x leading-none">
            404
          </div>
          
          {/* Floating question marks */}
          <div className="absolute -top-8 -left-8 text-3xl text-blue-400/50 animate-float-fast">?</div>
          <div className="absolute -top-4 -right-12 text-2xl text-indigo-400/50 animate-float-medium">?</div>
          <div className="absolute -bottom-6 left-1/4 text-xl text-purple-400/50 animate-float-slow">?</div>
          
          {/* Compass icon in the center of the 0 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center animate-pulse-subtle">
              <Compass className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-8 mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-600 font-medium text-sm">
            <Star className="h-4 w-4 mr-2" />
            Oops! You've discovered uncharted territory
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Page Not Found
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Looks like this page decided to take a coffee break. Don't worry though — 
            there's plenty of great content waiting for you elsewhere!
          </p>
        </div>

        {/* Navigation cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/" className="group">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-50 hover:border-blue-200 transform hover:translate-y-[-4px]">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Go Home</h3>
              <p className="text-gray-600 text-sm">Back to the main page</p>
            </div>
          </Link>

          <Link href="/services" className="group">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-50 hover:border-blue-200 transform hover:translate-y-[-4px]">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Services</h3>
              <p className="text-gray-600 text-sm">Explore what we offer</p>
            </div>
          </Link>

          <Link href="/insights" className="group">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-50 hover:border-blue-200 transform hover:translate-y-[-4px]">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Insights</h3>
              <p className="text-gray-600 text-sm">Read our latest articles</p>
            </div>
          </Link>

          <Link href="/contact" className="group">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-50 hover:border-blue-200 transform hover:translate-y-[-4px]">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Contact</h3>
              <p className="text-gray-600 text-sm">Get in touch with us</p>
            </div>
          </Link>
        </div>

        {/* Popular links */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 mb-12 border border-blue-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Pages</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/consulting" className="flex items-center p-4 rounded-lg hover:bg-blue-50 transition-colors group">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-sm">C</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Consulting & Strategy</h3>
                <p className="text-gray-600 text-sm">Business model validation and growth</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link href="/development" className="flex items-center p-4 rounded-lg hover:bg-blue-50 transition-colors group">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <span className="text-green-600 font-bold text-sm">D</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Web & Mobile Development</h3>
                <p className="text-gray-600 text-sm">Custom applications and MVPs</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link href="/startup-launch" className="flex items-center p-4 rounded-lg hover:bg-blue-50 transition-colors group">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                <span className="text-purple-600 font-bold text-sm">S</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Startup Launch Support</h3>
                <p className="text-gray-600 text-sm">Your business co-pilot</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link href="/books" className="flex items-center p-4 rounded-lg hover:bg-blue-50 transition-colors group">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                <BookOpen className="h-4 w-4 text-orange-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Books & Resources</h3>
                <p className="text-gray-600 text-sm">Guides and learning materials</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Lost? Let's Get You Back on Track</h2>
          <p className="text-blue-100 mb-6">
            Can't find what you're looking for? We're here to help you navigate to the right place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Take Me Home
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button variant="outline" className="bg-primary text-white px-6 py-3 border-2 border-white text-white hover:bg-white/10 flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>

        {/* Fun fact */}
        <div className="mt-8 text-gray-500 text-sm mb-12">
          <p>💡 Fun fact: The first 404 error was recorded at CERN in 1992. You're part of internet history!</p>
        </div>
      </div>
    </div>
  );
}
