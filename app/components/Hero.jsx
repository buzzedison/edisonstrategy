import Image from 'next/image'
import Link from "next/link"
export default function Hero() {
  return (
    <div className="bg-primary flex items-center justify-center h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 self-center">
            <h1 className="text-white text-4xl font-bold mb-4">Hi, I'm Edison Ade.</h1>
            <p className="text-white text-lg mb-8">I explore, explain, and execute growth strategies for ambitious startups. As an author and consultant, I leverage cutting-edge AI and proven systems to help visionary founders shape their journey to success.</p>
            <Link href="https://demo.com" className="bg-black text-white px-6 py-3 rounded-lg font-medium">Schedule a Free Consultation</Link>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <Image src="/image/logo.png" alt="Edison Ade" width={500} height={500} 
            objectFit="cover" 
            className="absolute bottom-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
