import Image from "next/image";
import Link from "next/link";
// Define the BooksPage component
function BooksPage() {
  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-blue-200 text-center py-16 mb-12">
        <h1 className="text-4xl font-bold mb-4 container mx-auto">Game-Changing Business Insights <br/> from an Expert's Playbook</h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
        Struggling to take your business and leadership skills to the next level? Feel like you've hit a plateau in your professional growth journey?
        
            </p>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mt-4"> With decades of experience under his belt, Edison has published bestselling guides sharing hard-won wisdom on strategy, branding, digital transformation, and more. His books provide concrete frameworks and actionable advice
         to equip today's changemakers with the latest business know-how.</p>
      </div>

      {/* Book Section */}
      <div className="container mx-auto">
        {/* Book 1 */}
        <div className="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-lg mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <Image src="/image/pricingbook.webp" 
            width={500}
            height={700}
            alt="Book Cover 1" className="mx-auto"/>
          </div>
          <div className="md:w-1/2 container mx-auto">
            <h2 className="text-3xl font-bold mx-auto mt-5 md:mt-24">Pricing Strategy to Help You Win in Business</h2>
            <p className="mb-8">Learn how to build a pricing strategy that works. Learn different pricing models and strategies. Learn how to communicate your price to your customers. Understand the Psychology of your customer.</p>
           <Link href="https://buzzedison.gumroad.com/l/pricingstrategy "> <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Get the Book</button></Link>
          </div>
        </div>

        {/* Add more books in a similar format */}
      </div>
    </div>
  );
}

// Export the BooksPage component
export default BooksPage;
