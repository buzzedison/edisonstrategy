import Image from "next/image";
import Link from "next/link";
import Inversion from "../books/components/Inversion";

// Define the BooksPage component using arrow function syntax
const BooksPage = () => (
  <div className="bg-gray-100 min-h-screen pb-12">
    {/* Hero Section */}
    <section className="bg-blue-200 text-center py-16 mb-12 shadow-md">
      <h1 className="text-5xl font-bold mb-6 container mx-auto">
        Game-Changing Business Insights
      </h1>
      <h2 className="text-3xl mb-4 container mx-auto">
        from an Expert's Playbook
      </h2>
      <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
        Struggling to take your business and leadership skills to the next level? 
        Feel like you've hit a plateau in your professional growth journey?
      </p>
      <p className="text-xl text-gray-700 max-w-4xl mx-auto mt-4 leading-relaxed">
        With decades of experience, Edison has published bestselling guides sharing 
        hard-won wisdom on strategy, branding, digital transformation, and more. 
        His books provide concrete frameworks and actionable advice to equip today's 
        changemakers with the latest business know-how.
      </p>
    </section>

    {/* Main Content Section */}
    <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Book Section */}
      <div className="group">
        <article className="bg-white p-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 h-full flex flex-col justify-between">
          <div>
            <div className="mb-6 overflow-hidden rounded-lg">
              <Image 
                src="/image/pricingbook.webp" 
                width={500}
                height={700}
                layout="responsive"
                alt="Book Cover 1" 
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Pricing Strategy to Help You Win in Business
            </h2>
            <p className="mb-6 text-gray-600">
              Learn how to build a pricing strategy that works. Understand different pricing models 
              and strategies, and how to communicate your price to your customers. 
              Understand the Psychology of your customer.
            </p>
          </div>
          <div>
            <Link href="/books/pricing" className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-800 transition-colors duration-300 ease-in-out mb-4">
              Learn More
            </Link>
            <Link href="https://buzzedison.gumroad.com/l/pricingstrategy" className="bg-black text-white py-2 mx-0  md:mx-2 px-4 rounded hover:bg-secondary transition-colors duration-300 ease-in-out">
              Get the Book
            </Link>
          </div>
        </article>
      </div>

      {/* Inversion Component */}
      <div className="bg-white p-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 h-full flex items-center justify-center">
        <Inversion />
      </div>
    </section>
  </div>
);

export default BooksPage;
