import Image from 'next/image'
// import Hero from './components/Hero'
import HeroSection from '@/components/HeroNew';

// import BlogHead from './components/BlogMain'
// import BlogSection from './components/BlogSection'
import AboutSection from './components/AboutNew'
import InsightSection from './components/InsightSection'

export default function Home() {
  return (
   <>

 {/* <Hero/> */}
{/*    
   <BlogHead/>
   <BlogSection/> */}
   <HeroSection/>


<AboutSection/>
<InsightSection/>
   </>
  )
}
