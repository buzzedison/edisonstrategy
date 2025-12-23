import { supabase } from '../lib/supabaseClient';
import { ArrowRight, CheckCircle, Users, Code, Rocket, Heart, Dumbbell, BookOpen, TrendingUp, Target, Sparkles, Brain, Zap, Download, FileText, Calculator, Wallet } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroSection from './components/HeroSection';
// import BentoGrid from './components/BentoGrid';
import BooksSection from './components/BooksSection';
import TestimonialSlider from './components/TestimonialSlider';
import CTASection from './components/CTASection';
import Link from 'next/link';

// Fetch posts from Supabase
const fetchPosts = async () => {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
  return posts;
};

export default async function Home() {
  const posts = await fetchPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Edison Ade",
    "url": "https://www.buzzedison.com",
    "sameAs": [
      "https://twitter.com/buzzedison",
      "https://linkedin.com/in/buzzedison"
    ],
    "jobTitle": "Business & Systems Strategist",
    "worksFor": {
      "@type": "Organization",
      "name": "The Enterprise Village"
    },
    "description": "Business strategist helping founders use smart systems to grow faster and build something that lasts."
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-charcoal selection:text-brand-stone">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Section */}
      <HeroSection />

      {/* Strategic Frameworks Section - SEO Driven */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Systems That Scale",
                desc: "Build a business that grows with you. I help you set up your operations so everything stays stable as you add more customers.",
                icon: <TrendingUp className="w-5 h-5" />
              },
              {
                title: "Smart Workflows",
                desc: "Work faster and better. I show you how to blend efficient processes into your daily tasks so your team can get more done.",
                icon: <Brain className="w-5 h-5" />
              },
              {
                title: "Long-Term Growth",
                desc: "Plan for the future. We build your business on a solid foundation so it lasts for years, no matter what happens in the market.",
                icon: <Target className="w-5 h-5" />
              }
            ].map((item, idx) => (
              <div key={idx} className="group">
                <div className="w-12 h-12 rounded-2xl bg-brand-stone flex items-center justify-center text-brand-charcoal mb-6 group-hover:bg-brand-charcoal group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium text-brand-charcoal mb-4 font-serif">{item.title}</h3>
                <p className="text-brand-muted leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section - Strategic Library */}
      <BooksSection />

      {/* Social Proof / Testimonials */}
      <TestimonialSlider />

      {/* Tools & Services - Bento Grid (Hidden) */}
      {/* <BentoGrid /> */}

      {/* Meet Edison Section - Refined */}
      <section id="meet-edison" className="py-32 px-6 lg:px-8 bg-brand-stone overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Left Content */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-1.5 bg-white border border-gray-100 rounded-full text-[10px] font-bold tracking-widest text-brand-muted uppercase mb-12">
                <Users className="h-3.5 w-3.5 mr-2" />
                My Story
              </div>

              <h2 className="text-4xl md:text-5xl font-medium text-brand-charcoal mb-10 tracking-tight font-serif leading-tight">
                Helping Founders <span className="italic text-gray-400">Build the Future.</span>
              </h2>

              <div className="relative mb-12 pl-8 border-l border-gray-200">
                <p className="text-xl md:text-2xl font-serif italic text-brand-charcoal leading-relaxed">
                  "Simple systems grow faster. I help you turn complicated ideas into a clear plan that works every day."
                </p>
              </div>

              <p className="text-lg text-brand-muted leading-relaxed mb-8 font-light">
                I work with tech and business to help people reach their full potential.
                With my work leading <span className="font-medium text-brand-charcoal">The Enterprise Village</span> and <span className="font-medium text-brand-charcoal">Bloop Global</span>,
                I help founders turn their big ideas into real businesses that work.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                {['Scaling Strategy', 'Business Design', 'AI Systems', 'Team Performance'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 bg-white text-brand-muted border border-gray-100 rounded-full text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <Link href="/about">
                <Button className="bg-brand-charcoal hover:bg-black text-white px-10 py-7 rounded-full text-lg transition-all shadow-sm hover:shadow-lg">
                  Read the Full Story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Right Image - Refined Portrait */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative">
              <div className="relative h-[700px] w-full rounded-[2.5rem] overflow-hidden shadow-sm border border-white/50">
                <Image
                  src="/image/edisonaboutnew.jpg"
                  alt="Edison Ade"
                  fill
                  className="object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/30 via-transparent to-transparent" />

                {/* Minimalist Stats */}
                <div className="absolute bottom-10 left-10 right-10 bg-white/80 backdrop-blur-md border border-white/40 p-10 rounded-[2rem] text-brand-charcoal">
                  <div className="grid grid-cols-3 gap-8 text-center">
                    <div>
                      <p className="text-2xl font-medium font-serif">15+</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Years</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium font-serif">$5M+</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Raised</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium font-serif">10k+</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Impact</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Insights Section - Magazine Style */}
      <section className="py-32 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-gray-100 pb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center px-4 py-1.5 bg-brand-stone border border-gray-100 rounded-full text-[10px] font-bold tracking-widest text-brand-muted uppercase mb-8">
                <BookOpen className="h-3.5 w-3.5 mr-2" />
                Latest Articles
              </div>
              <h2 className="text-5xl md:text-6xl font-medium text-brand-charcoal tracking-tight font-serif leading-tight">
                Market <br />
                <span className="text-gray-400">Insights</span>
              </h2>
            </div>
            <Link href="/insights" className="hidden md:flex items-center text-lg font-medium text-brand-charcoal hover:text-brand-gold transition-colors group">
              View All Articles <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
            {posts && posts.map((post: any) => (
              <article key={post.id} className="group flex flex-col h-full cursor-pointer">
                <Link href={`/insights/${post.slug}`} className="block overflow-hidden rounded-[2rem] mb-8 relative border border-gray-100 shadow-sm">
                  {post.cover_image ? (
                    <div className="relative h-80 w-full overflow-hidden">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale hover:grayscale-0"
                      />
                    </div>
                  ) : (
                    <div className="h-80 w-full bg-brand-stone flex items-center justify-center">
                      <FileText className="h-10 w-10 text-brand-muted" />
                    </div>
                  )}
                </Link>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4 text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                    <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                    <span>5 min read</span>
                  </div>

                  <h3 className="text-2xl font-medium text-brand-charcoal mb-4 group-hover:text-brand-gold transition-colors leading-snug font-serif">
                    <Link href={`/insights/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-brand-muted mb-8 line-clamp-3 leading-relaxed font-light">
                    {post.content?.replace(/<[^>]*>/g, '').substring(0, 140)}...
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <Link href={`/insights/${post.slug}`} className="inline-flex items-center text-brand-charcoal font-medium group-hover:text-brand-gold transition-colors">
                      Read Article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Refined */}
      <CTASection />
    </div>
  );
}