
import Link from "next/link"
// Define the WorkShowcase component
function WorkShowcase() {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">My Work</h1>

        {/* Card Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Card 1 - Project */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Crowdpen</h2>
            <h3 className="text-xl mb-2">A platform for creators</h3>
            <p className="mb-4">A visionary platform designed to empower African creators by providing a space to showcase their work, earn from their 
            creativity, and connect with like-minded individuals. </p>
            <h4 className="font-bold mb-2">Founder, Software Architect</h4>
            <p className="mb-4">
                Manage the overall development of the Crowdpen platform.
            </p>
            <h4 className="font-bold mb-2">Check it out</h4>
            <Link href="https://www.crowdpen.co" className="mb-4 text-secondary hover:text-black">Join the Waiting List</Link>
          </div>

          {/* Card 2 - Company */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Bloop Global LLC</h2>
            <h3 className="text-xl mb-2">We hunt big ideas and help them win</h3>
            <p className="mb-4">Guide visionary startups by illuminating strategy, defining winning plans, markets, and roadmaps. We help build 
            winning products every step of the way from brainstorming to launch.</p>
            <h4 className="font-bold mb-2">Managing Consultant</h4>
            <p className="mb-4">Provide Strategic direction for operations in USA, UK, Ghana & Nigeria</p>
            <Link href="https://www.bloopglobal.com" className="mb-4 text-secondary hover:text-black"> <h4 className="font-bold mb-2">View Website</h4></Link>
            <Link href="https://www.bloopglobal.com/games" className="mb-4 text-primary hover:text-black font-bold"> <p className="mb-4">Play Business Games for free.</p></Link>
          </div>

            {/* Card 1 - Project */}
            {/* <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Alibaba Cloud + Raza</h2>
            <h3 className="text-xl mb-2">Fractional CMO + Digital Transformation Specialist. </h3>
Web development, Animations, Sales Funnel, Webinars
            <h4 className="font-bold mb-2">Consulting</h4>
            <p className="mb-4">Details about coaching and mentoring provided during the project.</p>
            <h4 className="font-bold mb-2">Portfolio</h4>
            <p className="mb-4">Links to website projects or other related portfolio items.</p>
          </div> */}

          {/* Card 2 - Company */}
          {/* <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Training and Coaching</h2>
            <h3 className="text-xl mb-2">Subheading</h3>
            <p className="mb-4">Description of the work done at the company, roles, achievements, and impact.</p>
            <h4 className="font-bold mb-2">Coaching & Mentoring</h4>
            <p className="mb-4">Details about coaching and mentoring provided during the tenure.</p>
            <h4 className="font-bold mb-2">Portfolio</h4>
            <p className="mb-4">Links to website projects or other related portfolio items.</p>
          </div> */}

            {/* Card 1 - Project */}
            {/* <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Arizona State University</h2>
            <h3 className="text-xl mb-2">Subheading</h3>
            <p className="mb-4">Description of the project including goals, technologies used, and outcomes.</p>
            <h4 className="font-bold mb-2">Coaching & Mentoring</h4>
            <p className="mb-4">Details about coaching and mentoring provided during the project.</p>
            <h4 className="font-bold mb-2">Portfolio</h4>
            <p className="mb-4">Links to website projects or other related portfolio items.</p>
          </div> */}

          {/* Card 2 - Company */}
          {/* <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Founder Institute</h2>
            <h3 className="text-xl mb-2">Subheading</h3>
            <p className="mb-4">Description of the work done at the company, roles, achievements, and impact.</p>
            <h4 className="font-bold mb-2">Coaching & Mentoring</h4>
            <p className="mb-4">Details about coaching and mentoring provided during the tenure.</p>
            <h4 className="font-bold mb-2">Portfolio</h4>
            <p className="mb-4">Links to website projects or other related portfolio items.</p>
          </div> */}

          

        </div>

      </div>
    </div>
  );
}

// Export the WorkShowcase component
export default WorkShowcase;
