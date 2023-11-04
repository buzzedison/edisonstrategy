import Image from "next/image"

function PricingPage() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-2 md:px-24 py-8 md:py-24 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Stop Guessing and Start Winning with Your Pricing Strategy
          </h1>
          <p className="text-xl mb-4">
            Tired of losing sales from poor pricing decisions? <br/> Discover the proven frameworks and data-driven techniques <br/>used by the world's most successful companies to optimize pricing.
          </p>
        </div>
      </section>

      {/* Subsections */}
      <section className="py-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Subsection 1 */}
          <div className="text-center">
            <div className="mb-4">
              <Image src="/image/bestpricing.png" alt="Best pricing" className="mx-auto rounded-2xl" 
              width={300} height={300} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Learn from the Best</h2>
            <p>Discover the pricing secrets and strategies from global giants like Apple, Amazon, and Toyota. Model their framework to develop optimized pricing tailored to your unique business goals.</p>
          </div>
          {/* Subsection 2 */}
          <div className="text-center">
            <div className="mb-4">
            <Image src="/image/behaviorpricing.png" alt="Behavior pricing" className="
            mx-auto rounded-2xl" 
              width={300} height={300} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Leverage Pricing Psychology</h2>
            <p>Explore how your customer's mind works and learn to anticipate their buying behaviors. Craft irresistible offers and price points they can't refuse.</p>
          </div>
          {/* Subsection 3 */}
          <div className="text-center">
            <div className="mb-4">
            <Image src="/image/datapricing.png" alt="Data pricing" className="mx-auto rounded-2xl" 
              width={300} height={300} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Fine-Tune with Data</h2>
            <p>Harness the power of analytics to gain data-backed confidence in your pricing decisions. Continuously refine prices based on real-time market dynamics.</p>
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
          <p className="text-xl mb-4">
            For a limited time, get the Ultimate Guide to Winning Pricing Strategies eBook for just $4.99 (regular $9.99).
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-full transition duration-300 hover:bg-secondary">Get the eBook</button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Optimize Your Pricing Strategy Today</h2>
          <Image src="/image/pricingbook.webp" className=" 
          justify-items-center mx-auto mb-4 gap-10" alt="picing book"
          width={500}
          height={800}/>
          <button className="bg-primary text-white px-8 py-3 rounded-full transition duration-300 hover:bg-secondary">Get the eBook</button>
        </div>
      </section>
    </div>
  );
}

export default PricingPage;
