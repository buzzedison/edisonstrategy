import Image from 'next/image'

import HeroSection from '@/components/HeroNew';
import AboutSection from './components/AboutNew';
import InsightSection from './components/InsightSection';

export default function Home() {
  return (
   <>
    
      <HeroSection />
      <AboutSection />
      <InsightSection />
      </>
  );
}
