import Link from "next/link"

export default function Footer (){

    return (
        <>
        <footer className="bg-gray-900 text-white">

  <div className="max-w-6xl mx-auto px-4 py-12">

    <div className="md:flex md:justify-between">

      <div className="mb-6 md:mb-0">
        <Link href="/" className="text-2xl font-bold">
        Buzzedison
        </Link>  
      </div>

      <nav className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <Link href="/about" className="text-sm font-medium hover:text-gray-100">
          About
        </Link>
        
        <Link href="/blog" className="text-sm font-medium hover:text-gray-100">
       Insight
        </Link>
        
        <Link href="/blog" className="text-sm font-medium hover:text-gray-100">
       Resources
        </Link>
        <Link href="/blog" className="text-sm font-medium hover:text-gray-100">
   Coaching
        </Link>
      </nav>

    </div>

  </div>
  
</footer>
        </>
    )
}