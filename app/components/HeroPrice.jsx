import Image from 'next/image'

export default function Hero() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 bg-primary to-indigo-500 justify-items-center md:justify-items-start">
      <div className="ml-2 md:ml-12 h-screen  flex items-center order-2 md:order-1">
  
        <div className="max-w-3xl mx-auto p-4 md:p-8 text-center md:text-left">
  
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-6">
            Discover the Secrets to Pricing Success
          </h1>
  
          <p className="text-white text-lg mb-8">
            Unlock proven strategies to drive profits and beat the competition
          </p>
  
          <div className="flex justify-center md:justify-start">
            <button className="bg-white text-indigo-500 rounded-lg px-6 py-3 mr-4 shadow-md hover:shadow-xl transition duration-200">
              Get the Book Today
            </button>
            
            <button className="bg-transparent border border-white text-white rounded-lg px-6 py-3 shadow-md hover:shadow-xl transition duration-200">
              Learn More
            </button>
          </div>
  
        </div>  
        
      </div>
<div className="order-1 md:order-2 mb-0 sm:mb-4"> 
       <Image 
  src="/image/pricingbook.webp"
  width={500} 
  height={500}
  className="md:w-full h-full md:h-3/4 mt-0 md:mt-24" 
/>
</div>
      </div>
    )
  
  }
