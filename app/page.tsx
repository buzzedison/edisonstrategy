import { supabase } from '../lib/supabaseClient';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ClientHeroEffects from './components/ClientHeroEffects';
import FeaturedPortfolio from './components/FeaturedPortfolio';

// Fetch posts from Supabase
const fetchPosts = async () => {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) throw error;
  return posts;
};

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Advanced background with animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-indigo-50/30 z-0"></div>
        <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-[0.03] z-0"></div>
        <div className="absolute inset-0 backdrop-blur-[100px] z-0"></div>
        
        {/* Animated floating elements */}
        <div className="absolute top-20 right-24 w-64 h-64 rounded-full bg-gradient-to-br from-blue-300/10 to-indigo-300/20 animate-float-slow z-0"></div>
        <div className="absolute bottom-20 left-12 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-300/10 to-purple-300/20 animate-float-medium z-0"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full border border-blue-200/30 animate-float-fast z-0"></div>
        
        {/* Particle canvas */}
        <ClientHeroEffects />
        
        {/* Glassmorphism container */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Content column with advanced typography and animations */}
            <div className="space-y-10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              {/* Animated badge */}
              <div className="mt-14 inline-flex items-center pl-1 pr-4 py-2 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-100/50 backdrop-blur-md rounded-full text-blue-600 font-medium mb-2 text-sm shadow-sm animate-pulse-subtle group relative overflow-hidden">
                <span className="flex h-6 w-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full items-center justify-center mr-2">
                  <span className="text-white text-xs">✦</span>
                </span>
                <span className="relative z-10">Advanced Business Strategy & Development</span>
                {/* Hover effect overlay */}
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-100/30 to-indigo-100/30 transition-all duration-700 ease-out group-hover:w-full"></span>
              </div>
              
              {/* Advanced animated heading with clip-path reveal */}
              <div className="perspective-1000">
                <h1 className="text-6xl md:text-7xl xl:text-8xl font-black tracking-tight leading-none">
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-blue-900 to-gray-900 animate-gradient-x pb-2">
                    Turn Your Idea
                  </span>
                  <div className="relative overflow-hidden inline-block w-full">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 pb-2 animate-gradient-x animate-reveal-text">
                      Into Income.
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 animate-line-reveal"></span>
                  </div>
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl xl:text-3xl leading-relaxed text-gray-700 font-light">
                From startup consulting to full product builds, I help founders and creators bring  
                <span className="relative inline-block mx-2">
                  <span className="relative z-10 font-semibold text-blue-600">big ideas to life</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-3 bg-blue-100/50 -z-10 transform -rotate-1"></span>
                </span>
                and get paid for them.
              </p>
              
              {/* Interactive 3D buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <Link href="/contact" passHref>
                  <Button className="group w-full sm:w-auto px-10 py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center rounded-xl transform hover:translate-y-[-4px] hover:scale-[1.02] active:translate-y-[2px]">
                    <span className="mr-2">Start a Project</span>
                    <span className="relative w-6 h-6 overflow-hidden flex items-center group-hover:w-8 transition-all duration-300">
                      <ArrowRight className="absolute transform group-hover:translate-x-6 transition-all duration-300" />
                      <ArrowRight className="absolute transform translate-x-[-24px] group-hover:translate-x-0 transition-all duration-300" />
                    </span>
                  </Button>
                </Link>
                
                <Link href="/contact" passHref>
                  <Button variant="outline" className="relative w-full sm:w-auto px-10 py-6 text-lg overflow-hidden rounded-xl group bg-white backdrop-filter backdrop-blur-sm bg-opacity-10 border-2 border-white/30 hover:bg-opacity-20 transform hover:translate-y-[-4px] hover:scale-[1.02] active:translate-y-[2px] transition-all duration-300">
                    {/* Animated gradient border on hover */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
                    
                    <span className="relative text-blue-600">Book a Free Strategy Call</span>
                  </Button>
                </Link>
              </div>
              
              {/* Social proof with counter animation */}
              <div className="flex items-center gap-6 pt-6">
                <div className="flex -space-x-3">
                  <div className="inline-block h-12 w-12 rounded-full border-2 border-white shadow-lg bg-gradient-to-br from-blue-200 to-blue-100 transform hover:translate-y-[-5px] transition-transform duration-300"></div>
                  <div className="inline-block h-12 w-12 rounded-full border-2 border-white shadow-lg bg-gradient-to-br from-indigo-200 to-indigo-100 transform hover:translate-y-[-5px] transition-transform duration-300"></div>
                  <div className="inline-block h-12 w-12 rounded-full border-2 border-white shadow-lg bg-gradient-to-br from-purple-200 to-purple-100 transform hover:translate-y-[-5px] transition-transform duration-300"></div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-white shadow-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-medium transform hover:translate-y-[-5px] transition-transform duration-300">
                    +97
                  </div>
                </div>
                <div>
                  <p className="text-gray-600">
                    <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 counter-animate" data-target="100" data-speed="20">100+</span>
                    <span className="block text-sm mt-1">founders & creators helped</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* 3D Interactive Image Column */}
            <div className="relative perspective-1200">
              {/* Main image with 3D transform effect */}
              <div className="relative group cursor-pointer transform-gpu transition-all duration-500 hover:rotate-y-12 hover:rotate-x-6 rounded-2xl overflow-hidden shadow-2xl border border-white/20 tilt-element">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent z-10"></div>
                
                {/* Shine effect overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full z-20"></div>
                
                <Image
                  src="/image/edisonnew.jpg"
                  alt="Edison Ade - Tech Entrepreneur"
                  width={600}
                  height={800}
                  className="object-cover h-[580px] w-full transform transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                
                {/* Interactive stats overlay with counter animation */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/95 to-blue-900/10 p-8 z-20 transform transition-transform duration-500 translate-y-4 opacity-90 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center transform transition-transform duration-500 hover:translate-y-[-8px] hover:scale-110">
                      <p className="text-3xl font-bold text-white counter-animate" data-target="15" data-speed="100">15+</p>
                      <p className="text-sm text-blue-100">Years Experience</p>
                    </div>
                    <div className="text-center transform transition-transform duration-500 hover:translate-y-[-8px] hover:scale-110">
                      <p className="text-3xl font-bold text-white counter-animate" data-target="50" data-speed="50">50+</p>
                      <p className="text-sm text-blue-100">Projects</p>
                    </div>
                    <div className="text-center transform transition-transform duration-500 hover:translate-y-[-8px] hover:scale-110">
                      <p className="text-3xl font-bold text-white counter-animate" data-target="95" data-speed="30">95%</p>
                      <p className="text-sm text-blue-100">Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating UI elements with parallax effect */}
              <div className="absolute -left-8 top-20 p-4 rounded-xl backdrop-blur-md bg-white/90 shadow-xl z-30 transform rotate-6 parallax-element transition-transform duration-500 hover:rotate-0 hover:scale-110">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                </div>
                <div className="h-4 w-40 bg-blue-100 rounded mt-2"></div>
                <div className="h-3 w-32 bg-gray-100 rounded mt-2"></div>
                <div className="h-3 w-24 bg-gray-100 rounded mt-2"></div>
              </div>
              
              <div className="absolute -right-6 top-1/3 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl z-30 transform -rotate-3 parallax-element transition-transform duration-500 hover:rotate-0 hover:scale-110">
                <div className="flex space-x-1 mb-2">
                  <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                  <div className="h-2 w-2 rounded-full bg-blue-300"></div>
                  <div className="h-2 w-2 rounded-full bg-blue-200"></div>
                </div>
                <div className="h-10 w-40 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg"></div>
              </div>
              
              {/* Animated status badge */}
              <div className="absolute -bottom-4 right-20 px-5 py-3 rounded-full shadow-xl z-30 bg-gradient-to-r from-green-500 to-emerald-500 transform hover:scale-110 transition-all duration-300">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-white mr-2 animate-pulse"></div>
                  <div className="text-sm font-medium text-white">Available for projects</div>
                </div>
              </div>
              
              {/* Notification popup animation */}
              <div className="absolute top-20 -right-4 max-w-xs bg-white/90 backdrop-blur-md rounded-lg shadow-xl p-4 z-30 transform translate-x-0 animate-slide-in-right">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-lg">🚀</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Latest project launched</p>
                    <p className="mt-1 text-xs text-gray-500">FinTech app secured $500K funding</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mouse scroll indicator */}
        <a href="#services" aria-label="Scroll to explore" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 group cursor-pointer">
          <span className="text-sm text-gray-500 mb-2 group-hover:text-gray-700 transition-colors">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-scroll-down"></div>
          </div>
        </a>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Turn Vision into Reality</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              High-impact services for founders, creators, and businesses ready to build and scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl transition-all p-8 flex flex-col">
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Consulting / Strategy</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Turn vision into a viable roadmap. Ideal for founders stuck in the idea maze or scaling chaos.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Business model validation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Market positioning strategy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Revenue optimization</span>
                </li>
              </ul>
              <Link href="/consulting" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl transition-all p-8 flex flex-col">
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Web & Mobile Builds</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Done-for-you MVPs and digital platforms that grow your business and deliver results.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom web applications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Mobile app development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">SaaS product development</span>
                </li>
              </ul>
              <Link href="/development" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl transition-all p-8 flex flex-col">
              <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Startup Launch Support</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Business setup, go-to-market, and monetization help. Think "business co-pilot" for non-technical founders.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Launch strategy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Marketing & user acquisition</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Growth hacking & scaling</span>
                </li>
              </ul>
              <Link href="/startup-launch" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center">
                Learn more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Replace the Case Studies section with the FeaturedPortfolio component */}
      <FeaturedPortfolio />

      {/* Testimonials
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't take my word for it — hear from the founders and businesses I've worked with.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-gray-600">Founder, TechStartup</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Edison helped us clarify our vision and build a roadmap that made sense. His guidance was invaluable in securing our first round of funding."
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div>
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-gray-600">CEO, GrowthSaaS</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Working with Edison transformed our business. He helped us identify our ideal market and optimize our product for maximum growth."
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Resources Section (Books, Content) */}
      <section className="py-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-indigo-50/30 z-0"></div>
        <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.02] z-0"></div>
        
        {/* Floating elements */}
        <div className="absolute top-40 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-blue-200/10 to-purple-200/10 animate-float-slow z-0"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-gradient-to-tr from-indigo-200/10 to-blue-200/10 animate-float-medium z-0"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 animate-gradient-x inline-block pb-2 relative">
              Explore Deeper
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
        </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Resources, insights, and books to help you on your entrepreneurial journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Latest Insights - Enhanced */}
            <div className="relative perspective-1000">
              {/* Decorative elements */}
              <div className="absolute -left-6 -top-6 w-20 h-20 border border-blue-200/50 rounded-full z-0 animate-float-medium"></div>
              <div className="absolute right-20 -bottom-6 w-12 h-12 bg-indigo-200/30 rounded-xl z-0 animate-float-fast rotate-12"></div>
              
              <div className="relative z-10 transform hover:translate-z-10 transition-all duration-500">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Latest Insights</h3>
                  <Link href="/insights" className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-600 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100/50 group">
                    <span>View all</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
                
                <div className="space-y-8">
                  {posts && posts.slice(0, 3).map((post: any, index: number) => (
                    <Link key={post.id} href={`/insights/${post.slug}`} className="block group">
                      <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 border border-blue-50 hover:border-blue-200 relative overflow-hidden group-hover:translate-y-[-4px] group-hover:translate-x-[2px] transform-gpu">
                        {/* Gradient overlay */}
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-bl-full"></div>
                        
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full"></div>
                        
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Conditional image display */}
                          {post.cover_image && (
                            <div className="h-40 md:w-40 rounded-lg overflow-hidden flex-shrink-0 relative transform transition-all duration-500 group-hover:rotate-1 group-hover:scale-105">
                              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent z-10"></div>
                              <Image
                                src={post.cover_image || "/image/placeholder.jpg"}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          
                          <div className="flex-1">
                            {post.tags && post.tags.length > 0 && (
                              <div className="flex gap-2 mb-3 flex-wrap">
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full inline-flex items-center">
                                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5"></span>
                                  {post.tags[0]}
                                </span>
                              </div>
                            )}
                            
                            <h4 className="font-bold text-xl md:text-2xl mb-3 relative z-10 group-hover:text-blue-700 transition-colors duration-300">{post.title}</h4>
                            
                            <p className="text-gray-600 line-clamp-2 mb-4 relative z-10">
                              {post.content?.replace(/<[^>]*>/g, '').substring(0, 120)}...
                            </p>
                            
                            <div className="flex justify-between items-center text-sm text-gray-500 relative z-10">
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{new Date(post.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}</span>
                              </div>
                              
                              <span className="text-blue-600 font-medium group-hover:text-blue-700 flex items-center">
                                <span className="group-hover:mr-2 transition-all duration-300">Read</span>
                                <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  
                  {(!posts || posts.length === 0) && (
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md border border-blue-50 relative overflow-hidden transform transition-all hover:shadow-lg">
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
                      <div className="flex justify-center mb-6">
                        <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                      </div>
                      <h4 className="font-bold text-xl mb-3 text-center">No insights available yet</h4>
                      <p className="text-gray-600 text-center">Check back soon for fresh content and actionable business insights.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Books & Guides - Enhanced */}
            <div className="relative perspective-1000">
              {/* Decorative elements */}
              <div className="absolute -right-8 -top-10 w-24 h-24 border-2 border-indigo-200/30 rounded-full z-0 animate-float-medium"></div>
              <div className="absolute left-10 -bottom-8 w-16 h-16 bg-blue-200/20 rounded-lg z-0 animate-float-slow rotate-12"></div>
              
              <div className="relative z-10 transform hover:translate-z-10 transition-all duration-500">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Books & Guides</h3>
                  <Link href="/books" className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-600 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100/50 group">
                    <span>View all</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
                
                <div className="space-y-8">
                  {/* Book 1 */}
                  <div className="group">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative border border-blue-50 hover:border-blue-200 transform-gpu group-hover:translate-y-[-4px] group-hover:translate-x-[2px]">
                      {/* Book cover with 3D effect */}
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-64 md:w-1/3 overflow-hidden transform perspective-1000">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent z-10"></div>
                          <div className="h-full w-full transform group-hover:rotate-y-12 transition-transform duration-700 origin-left">
                            <div className="absolute inset-0 shadow-inner bg-gradient-to-r from-black/20 to-transparent"></div>
                            <Image
                              src="/image/pricingbook.webp"
                              alt="Pricing Strategy Book Cover"
                              fill
                              className="object-cover"
                            />
                            
                            {/* Shine effect on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full z-20"></div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
                            <div className="inline-flex px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white text-xs">
                              $4.99
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6 md:p-8 md:w-2/3 relative">
                          {/* Top gradient bar */}
                          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 md:hidden"></div>
                          
                          <h4 className="font-bold text-xl md:text-2xl mb-3 group-hover:text-blue-700 transition-colors duration-300">Pricing Strategy to Help You Win in Business</h4>
                          <p className="text-gray-600 mb-6">Master the art of pricing to boost your business success. Dive into various pricing models, strategies, and customer psychology.</p>
                          
                          <div className="flex flex-wrap gap-3">
                            <Link href="/books/pricing" className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100 group-hover:border-blue-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              Learn more
                            </Link>
                            <Link href="https://buzzedison.gumroad.com/l/pricingstrategy" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              Purchase
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Book 2 */}
                  <div className="group">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative border border-blue-50 hover:border-blue-200 transform-gpu group-hover:translate-y-[-4px] group-hover:translate-x-[2px]">
                      {/* Book cover with 3D effect */}
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-64 md:w-1/3 overflow-hidden transform perspective-1000">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent z-10"></div>
                          <div className="h-full w-full transform group-hover:rotate-y-12 transition-transform duration-700 origin-left">
                            <div className="absolute inset-0 shadow-inner bg-gradient-to-r from-black/20 to-transparent"></div>
                            <Image
                              src="/image/inversion.png"
                              alt="The Art of Inversion Book Cover"
                              fill
                              className="object-cover"
                            />
                            
                            {/* Shine effect on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full z-20"></div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-20">
                            <div className="inline-flex px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white text-xs">
                              $0.99
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6 md:p-8 md:w-2/3 relative">
                          {/* Top gradient bar */}
                          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 md:hidden"></div>
                          
                          <h4 className="font-bold text-xl md:text-2xl mb-3 group-hover:text-blue-700 transition-colors duration-300">The Art of Inversion</h4>
                          <p className="text-gray-600 mb-6">Discover how to solve problems by approaching them backwards. Learn to think differently and find innovative solutions.</p>
                          
                          <div className="flex flex-wrap gap-3">
                            <Link href="/books/inversion" className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100 group-hover:border-blue-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              Learn more
                            </Link>
                            <Link href="https://buzzedison.gumroad.com/l/inversion" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              Purchase
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between bg-white/5 backdrop-blur-sm rounded-xl p-12 border border-white/10 shadow-lg">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Turn Your Idea Into Income?
              </h2>
              <p className="text-xl text-blue-100">
                Let's work together to bring your vision to life and build something that makes an impact.
              </p>
            </div>
            
            <div className="md:w-1/3 space-y-4">
              <Link href="/contact" passHref className="w-full block">
                <Button className="w-full py-4 text-lg bg-white text-blue-700 hover:bg-blue-50 rounded-lg shadow-md flex items-center justify-center">
                  Start a Project <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/contact" passHref className="w-full block">
                <Button variant="outline" className="w-full py-4 text-lg border border-white text-white hover:bg-white/10 rounded-lg flex items-center justify-center bg-blue-600/30">
                  Book a Free Strategy Call
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-blue-100 mt-10">
            <p className="mb-4 md:mb-0 flex items-center">
              <span className="mr-2">★★★★★</span>
              <span>5.0 average rating from 200+ clients</span>
            </p>
            
            <p className="text-blue-100">
              Working with startups and businesses since 2008
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}