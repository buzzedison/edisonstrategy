'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { ArrowUpRight, Filter, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// Define portfolio item type
interface PortfolioItem {
  _id: string
  title: string
  slug: {
    current: string
  }
  client: string
  excerpt: string
  mainImage: any
  categories: {
    _id: string
    title: string
    color: string
  }[]
  projectDate: string
  featured: boolean
}

// Define category type
interface Category {
  _id: string
  title: string
  color: string
}

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const categoriesData = await client.fetch(groq`
          *[_type == "category"] {
            _id,
            title,
            color
          }
        `)
        setCategories(categoriesData)

        const portfolioData = await client.fetch(groq`
          *[_type == "portfolio"] | order(featured desc, projectDate desc) {
            _id,
            title,
            slug,
            client,
            excerpt,
            mainImage,
            "categories": categories[]->{ _id, title, color },
            projectDate,
            featured
          }
        `)
        setPortfolioItems(portfolioData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredItems = selectedCategory
    ? portfolioItems.filter(item =>
      item.categories?.some(category => category._id === selectedCategory)
    )
    : portfolioItems

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
              Strategic Repository
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-8xl font-serif font-bold text-brand-charcoal tracking-tight leading-[0.9] mb-12"
            >
              Selected <br />
              <span className="text-gray-400 italic font-normal">Works.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-brand-muted font-light leading-relaxed max-w-2xl"
            >
              A curated collection of strategic interventions, system builds, and leadership shifts I've engineered across global markets.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-y border-gray-100 py-6 px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40">
            <Filter className="w-3.5 h-3.5" />
            Filter by Domain
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-500 border",
                selectedCategory === null
                  ? "bg-brand-charcoal text-white border-brand-charcoal shadow-lg shadow-brand-charcoal/10"
                  : "bg-white text-brand-muted border-gray-100 hover:border-brand-charcoal hover:text-brand-charcoal"
              )}
            >
              Collective
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-500 border",
                  selectedCategory === category._id
                    ? "bg-brand-charcoal text-white border-brand-charcoal shadow-lg shadow-brand-charcoal/10"
                    : "bg-white text-brand-muted border-gray-100 hover:border-brand-charcoal hover:text-brand-charcoal"
                )}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-8 pb-40">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="w-10 h-10 text-brand-charcoal/20 animate-spin" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-muted">Retaining Data...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-40">
              <p className="text-2xl font-serif italic text-brand-muted">No strategic markers found in this domain.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    layout
                    key={item._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                  >
                    <Link
                      href={`/portfolio/${item.slug.current}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-[3rem] mb-12 bg-brand-stone/30">
                        {item.mainImage && (
                          <Image
                            src={urlFor(item.mainImage).url()}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                            <ArrowUpRight className="w-8 h-8 text-brand-charcoal" />
                          </div>
                        </div>
                        {item.featured && (
                          <div className="absolute top-8 left-8 bg-brand-gold text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                            Anchor Project
                          </div>
                        )}
                      </div>

                      <div className="px-4">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">
                            {new Date(item.projectDate).getFullYear()}
                          </span>
                          <div className="w-12 h-[1px] bg-brand-stone" />
                          <div className="flex flex-wrap gap-2">
                            {item.categories?.map((cat) => (
                              <span key={cat._id} className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                                {cat.title}
                              </span>
                            ))}
                          </div>
                        </div>

                        <h3 className="text-4xl font-serif font-bold text-brand-charcoal mb-4 group-hover:text-brand-gold transition-colors duration-500">
                          {item.title}
                        </h3>

                        <p className="text-brand-muted font-light leading-relaxed max-w-lg mb-8 line-clamp-2">
                          {item.excerpt}
                        </p>

                        <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-charcoal/40 group-hover:text-brand-charcoal transition-colors">
                          Examine Strategy <div className="w-8 h-[1px] bg-brand-stone transition-all duration-700 group-hover:w-16 group-hover:bg-brand-charcoal" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* Narrative CTA */}
      <section className="py-40 bg-brand-charcoal relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-gold/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif italic text-white/90 leading-tight mb-16">
            "Results are the noise made by efficient systems. I don't build projects; I build outcomes."
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-8 group">
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-xs">Architect Your Evolution</span>
            <div className="w-20 h-[1px] bg-brand-gold/30 group-hover:w-40 group-hover:bg-brand-gold transition-all duration-700" />
            <ArrowUpRight className="w-6 h-6 text-brand-gold" />
          </Link>
        </div>
      </section>
    </div>
  )
}