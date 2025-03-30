'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { Button } from "@/components/ui/button"

// Define portfolio item type
interface PortfolioItem {
  _id: string
  title: string
  slug: {
    current: string
  }
  client?: string
  excerpt: string
  mainImage: any
  categories?: {
    _id: string
    title: string
    color: string
  }[]
  projectDate: string
  featured: boolean
}

export default function FeaturedPortfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        // Fetch featured portfolio items
        const portfolioData = await client.fetch(groq`
          *[_type == "portfolio" && featured == true] | order(order asc) [0...3] {
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
        console.error('Error fetching featured portfolio data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <section className="py-20 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Results That Speak</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how I've helped founders and businesses achieve their goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading state
            <>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </>
          ) : portfolioItems && portfolioItems.length > 0 ? (
            // Portfolio items
            portfolioItems.map((item) => (
              <Link 
                href={`/portfolio/${item.slug.current}`} 
                key={item._id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  {item.mainImage && (
                    <Image
                      src={urlFor(item.mainImage).url()}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <div className="p-6">
                  {item.categories && item.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.categories.slice(0, 2).map((category) => (
                        <span
                          key={category._id}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: category.color ? `${category.color}20` : '#e5e7eb',
                            color: category.color || '#374151'
                          }}
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  {item.client && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Client:</span> {item.client}
                    </p>
                  )}
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.excerpt}</p>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-blue-600 font-medium flex items-center group-hover:underline">
                      View case study <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // Fallback content if no portfolio items exist
            <>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 bg-blue-900/20"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">FinTech Startup MVP</h3>
                  <p className="text-gray-600 mb-4">
                    Built and launched an MVP in 6 weeks that secured $500K in seed funding.
                  </p>
                  <span className="text-blue-600 font-semibold hover:text-blue-700 flex items-center">
                    View case study <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 bg-blue-900/20"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">E-commerce Platform Redesign</h3>
                  <p className="text-gray-600 mb-4">
                    Increased conversion rates by 37% through UX optimization and technical improvements.
                  </p>
                  <span className="text-blue-600 font-semibold hover:text-blue-700 flex items-center">
                    View case study <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 bg-blue-900/20"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">SaaS Growth Strategy</h3>
                  <p className="text-gray-600 mb-4">
                    Helped scale monthly recurring revenue from $12K to $78K in just 9 months.
                  </p>
                  <span className="text-blue-600 font-semibold hover:text-blue-700 flex items-center">
                    View case study <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </>
          )}
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