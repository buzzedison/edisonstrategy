import Link from "next/link"
import Image from "next/image"
// Define the AboutSection component
function AboutSection() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          
          {/* Image Section */}
          <div className="lg:mt-0 lg:flex-shrink-0 relative w-full" style={{ paddingBottom: '120%' , paddingTop:'30%'}}>
            <Image className="rounded-lg shadow-lg object-cover w-full h-96 sm:h-96" 
            src="/image/edisonnew.png"
         fill={true}
             alt="Edison Ade" />
          </div>
          
          {/* Text Section */}
          <div className="mt-12 lg:mt-0">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mt-2 md:mt-24">
              About Edison Ade
            </h2>
            <p className="mt-6 text-lg text-gray-500">
              Edison Ade is a startup growth strategist who empowers founders to rapidly scale their companies. With proven systems and mindset coaching, he provides startups with a blueprint for sustainable growth.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Beyond startups, Edison is passionate about developing leaders and helping people maximize their potential through communication, emotional intelligence and self-management training.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              He also builds custom web and mobile applications for startups. Get in touch if you need an app to accelerate your business.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              With an enthusiastic belief in human potential, Edison equips change agents with the tools to make their mark.
            </p>
            <div className="mt-8">
              <Link href="https://airtable.com/appyQ1Xz7zt3o456g/shrrb6Nwgw8ERvBff" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-light hover:text-black">
                Let's Connect
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

// Export the AboutSection component
export default AboutSection;
