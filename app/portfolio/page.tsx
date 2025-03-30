'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

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
        // Fetch all categories
        const categoriesData = await client.fetch(groq`
          *[_type == "category"] {
            _id,
            title,
            color
          }
        `)
        setCategories(categoriesData)

        // Fetch all portfolio items with their categories
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

  // Filter portfolio items by selected category
  const filteredItems = selectedCategory
    ? portfolioItems.filter(item => 
        item.categories?.some(category => category._id === selectedCategory)
      )
    : portfolioItems

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our diverse collection of projects where we've helped clients achieve their business goals through strategic solutions and innovative approaches.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          All Projects
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setSelectedCategory(category._id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category._id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            style={
              selectedCategory === category._id && category.color
                ? { backgroundColor: category.color }
                : {}
            }
          >
            {category.title}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No projects found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Link 
              href={`/portfolio/${item.slug.current}`} 
              key={item._id}
              className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-60 w-full">
                {item.mainImage && (
                  <Image
                    src={urlFor(item.mainImage).url()}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {item.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.categories?.map((category) => (
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
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                
                {item.client && (
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">Client:</span> {item.client}
                  </p>
                )}
                
                <p className="text-gray-600 mb-4 line-clamp-2">{item.excerpt}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(item.projectDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                  <span className="text-blue-600 font-medium text-sm group-hover:underline">
                    View Case Study
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 