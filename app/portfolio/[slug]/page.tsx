import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'

// Import Lucide icons
import { ArrowLeft, Calendar, Globe, Tag, Award, Briefcase } from 'lucide-react'

// Define components for the PortableText
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="relative w-full h-96 my-8 overflow-hidden rounded-lg">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || ' '}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
            className="object-cover"
          />
          {value.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
              {value.caption}
            </div>
          )}
        </div>
      )
    },
    callout: ({ value }: any) => {
      const typeStyles: Record<string, string> = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
      }
      
      const style = typeStyles[value.type] || typeStyles.info
      
      return (
        <div className={`p-4 my-4 border-l-4 rounded ${style}`}>
          <p>{value.content}</p>
        </div>
      )
    },
  },
}

// Generate static metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params
  
  try {
    const portfolio = await client.fetch(
      groq`*[_type == "portfolio" && slug.current == $slug][0]{
        title,
        excerpt,
        "mainImageUrl": mainImage.asset->url
      }`,
      { slug }
    )
    
    if (!portfolio) {
      return {
        title: 'Not Found',
        description: 'The page you are looking for does not exist.'
      }
    }
    
    return {
      title: `${portfolio.title} | Portfolio`,
      description: portfolio.excerpt,
      openGraph: portfolio.mainImageUrl
        ? {
            images: [{ url: portfolio.mainImageUrl }],
          }
        : undefined,
    }
  } catch (error) {
    console.error('Error fetching portfolio metadata:', error)
    return {
      title: 'Portfolio',
    }
  }
}

// Get portfolio item by slug
async function getPortfolio(slug: string) {
  try {
    return await client.fetch(
      groq`*[_type == "portfolio" && slug.current == $slug][0]{
        _id,
        title,
        client,
        excerpt,
        body,
        mainImage,
        gallery,
        "categories": categories[]->{ _id, title, slug, color },
        projectDate,
        projectURL,
        technologies,
        services,
        results,
        testimonial
      }`,
      { slug }
    )
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return null
  }
}

// Format date
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })
}

export default async function PortfolioItem({ params }: { params: { slug: string } }) {
  const portfolio = await getPortfolio(params.slug)
  
  if (!portfolio) {
    notFound()
  }
  
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Back link */}
      <Link 
        href="/portfolio" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Portfolio
      </Link>
      
      {/* Hero section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{portfolio.title}</h1>
        
        {portfolio.client && (
          <p className="text-xl text-gray-700 mb-6">
            <span className="font-medium">Client:</span> {portfolio.client}
          </p>
        )}
        
        <p className="text-xl text-gray-600 max-w-4xl mb-8">{portfolio.excerpt}</p>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {portfolio.categories?.map((category: any) => (
            <span
              key={category._id}
              className="px-3 py-1 text-sm rounded-full"
              style={{
                backgroundColor: category.color ? `${category.color}20` : '#e5e7eb',
                color: category.color || '#374151'
              }}
            >
              {category.title}
            </span>
          ))}
        </div>
        
        {portfolio.mainImage && (
          <div className="relative w-full h-[60vh] rounded-xl overflow-hidden">
            <Image
              src={urlFor(portfolio.mainImage).url()}
              alt={portfolio.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              className="object-cover"
            />
          </div>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main content */}
        <div className="lg:w-2/3">
          {/* Body content */}
          <div className="prose prose-lg max-w-none mb-12">
            <PortableText value={portfolio.body} components={ptComponents} />
          </div>
          
          {/* Results section (if available) */}
          {portfolio.results && portfolio.results.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <Award className="text-blue-600 mr-3 h-7 w-7" />
                Key Results
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.results.map((result: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{result.value}</div>
                    <div className="font-medium text-gray-800 mb-2">{result.metric}</div>
                    <p className="text-gray-600 text-sm">{result.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Testimonial (if available) */}
          {portfolio.testimonial && portfolio.testimonial.quote && (
            <div className="mb-16 bg-blue-50 p-8 rounded-lg border-l-4 border-blue-500">
              <blockquote className="text-xl italic text-gray-800 mb-4">
                "{portfolio.testimonial.quote}"
              </blockquote>
              <div className="font-medium">
                {portfolio.testimonial.name}
                {portfolio.testimonial.role && (
                  <span className="text-gray-600">
                    {' '}
                    — {portfolio.testimonial.role}
                    {portfolio.testimonial.company && `, ${portfolio.testimonial.company}`}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Gallery (if available) */}
          {portfolio.gallery && portfolio.gallery.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolio.gallery.map((image: any, index: number) => (
                  <div key={index} className="relative h-80 rounded-lg overflow-hidden">
                    <Image
                      src={urlFor(image).url()}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="object-cover"
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                        {image.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
            <h2 className="text-xl font-bold mb-6 pb-4 border-b">Project Details</h2>
            
            {/* Project date */}
            {portfolio.projectDate && (
              <div className="mb-6">
                <div className="flex items-center text-gray-700 font-medium mb-2">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Completed
                </div>
                <div>{formatDate(portfolio.projectDate)}</div>
              </div>
            )}
            
            {/* Project URL */}
            {portfolio.projectURL && (
              <div className="mb-6">
                <div className="flex items-center text-gray-700 font-medium mb-2">
                  <Globe className="h-5 w-5 mr-2 text-blue-600" />
                  Website
                </div>
                <a 
                  href={portfolio.projectURL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {portfolio.projectURL.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            
            {/* Services provided */}
            {portfolio.services && portfolio.services.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center text-gray-700 font-medium mb-2">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                  Services Provided
                </div>
                <div className="flex flex-wrap gap-2">
                  {portfolio.services.map((service: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-white px-3 py-1 text-sm rounded-full border border-gray-200"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Technologies used */}
            {portfolio.technologies && portfolio.technologies.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center text-gray-700 font-medium mb-2">
                  <Tag className="h-5 w-5 mr-2 text-blue-600" />
                  Technologies Used
                </div>
                <div className="flex flex-wrap gap-2">
                  {portfolio.technologies.map((tech: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-blue-50 px-3 py-1 text-sm rounded-full border border-blue-100 text-blue-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-700 mb-4">Interested in similar results for your business?</p>
              <a 
                href="/contact" 
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
              >
                Let's Work Together
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 