// app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import ProblemSection from './components/ProblemStatement'

export default function Home() {
  return (
    <>
    <div className="w-full">
       {/* Hero Section */}
<section className="w-full bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-32 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div>
      <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
        <span className="block xl:inline">Empowering Founders,</span>{' '}
        <span className="block text-purple-400 xl:inline">Together</span>
      </h1>
      <p className="mt-3 text-base text-purple-200 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl">
        Founders Circle is an exclusive community designed to connect, support, and empower founders throughout their entrepreneurial journeys. Join a collaborative space to share knowledge, navigate challenges, and unlock new opportunities.
      </p>
      <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
        <div className="rounded-md shadow">
          <Link href="https://airtable.com/app6sLDmnMh84vOP4/pagUnNFYcByTVbday/form" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-900 bg-white hover:bg-purple-50 md:py-4 md:text-lg md:px-10">
            Join the Circle
          </Link>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <Link href="#what-we-offer" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-800 hover:bg-purple-700 md:py-4 md:text-lg md:px-10">
            Learn More
          </Link>
        </div>
      </div>
    </div>
    <div className="relative">
      <Image 
        src="/image/founders.png"
        alt="Founders collaborating"
        width={500}
        height={300}
        className="rounded-2xl shadow-xl sm:h-64 md:h-64 lg:w-full lg:h-96 object-cover object-center"
      />
    </div>
  </div>
</section>
    </div>
    <div className="w-full flex pb-12 sm:pb-24 flex-col items-center justify-between px-4 sm:px-24">
  {/* What We Offer Section */}
  <section id="what-we-offer" className="py-12 sm:py-24 pb-0 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">What We Offer</h2>
        <p className="mt-2 text-2xl  leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          A Better Way to Grow Your Startup
        </p>
      </div>

      <div className="mt-8">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {/* Feature items */}
          {[
            {
              title: "Curated Community",
              description: "We hand-select members based on their experience, ambition, and commitment to supporting fellow founders. This ensures a high-quality network of like-minded individuals.",
              icon: (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              ),
            },
            {
              title: "Peer-to-Peer Learning",
              description: "Regular events, workshops, and online forums provide opportunities for founders to share their expertise, learn from each other's experiences, and gain valuable insights.",
              icon: (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              ),
            },
            {
              title: "Expert Guidance",
              description: "Access experienced mentors, investors, and industry leaders who offer guidance, feedback, and support to help you navigate your entrepreneurial journey.",
              icon: (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              ),
            },
            {
              title: "Exclusive Events",
              description: "Attend private gatherings, workshops, and retreats designed to foster deep connections and facilitate collaboration with fellow founders and industry leaders.",
              icon: (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
            },
          ].map((feature, index) => (
            <div key={index} className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                  {feature.icon}
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
</div>
    <section>
<ProblemSection/>
</section>
    <div>
 
         {/* CTA Section */}
      <section className="bg-purple-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to Accelerate Your Startup Journey?</span>
            <span className="block text-purple-200">Join Founders Circle today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="https://airtable.com/app6sLDmnMh84vOP4/pagUnNFYcByTVbday/form" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}