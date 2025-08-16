import Image from 'next/image' 
import Link from 'next/link'

const Navbar = () => {

  return (
    <nav className="shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center">
            <div className="flex-shrink-0">
            <Link href="/"> <Image 
                src="/image/logo.svg" 
                alt="Company Logo"
                width={120}
                height={90} 
              />
              </Link> 
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                
                <Link 
                  href="/work"
                  className="hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                 My Work
                </Link>

                <Link
                  href="/books"
                  className="hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Books   
                </Link>

                <Link
                  href="/coaching"
                  className="hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                Coaching  
                </Link>
                <Link
                  href="/courses"
                  className="hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
            Courses
                </Link>

                <Link
                  href="/resources"
                  className="hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                Resources 
                </Link>

              
                {/* other links */}

              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              
              <Link
                href="/signup"
                className="rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 px-5 py-2"  
              >
                Sign Up
              </Link>
              
              <Link
                href="/login"
                className="rounded-md text-sm font-medium text-blue-500 bg-white hover:text-white hover:bg-blue-500 px-5 py-2 ml-2"
              >
                Login
              </Link>

            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar