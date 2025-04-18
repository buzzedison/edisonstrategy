'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { groq } from 'next-sanity'
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import { Button } from "@/components/ui/button"

interface PortfolioItem {
  _id: string
  title: string
  slug: {
    current: string
  }
  client: string
  excerpt: string
  mainImage: {
    asset: {
      _ref: string
      _type: string
    }
  }
  category: string
  projectDate: string
  featured: boolean
}

export default function FeaturedPortfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const query = groq`*[_type == "portfolio" && featured == true] | order(projectDate desc)[0...3] {
          _id,
          title,
          slug,
          client,
          excerpt,
          mainImage,
          category,
          projectDate,
          featured
        }`
        
        const data = await client.fetch(query)
        setPortfolioItems(data)
      } catch (error) {
        console.error('Error fetching portfolio items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioItems()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!portfolioItems.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No featured portfolio items available.</p>
      </div>
    )
  }

  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Results That Speak</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how I've helped founders and businesses achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <Link
              key={item._id}
              href={`/portfolio/${item.slug.current}`}
              className="group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={urlFor(item.mainImage).url()}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{item.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {item.category}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-blue-600 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/portfolio" passHref>
            <Button variant="outline" className="px-8 py-4 text-lg">
              View Full Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
} 