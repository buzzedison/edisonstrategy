import Image from 'next/image'
import MastermindSection from './components/MastermindSection';

import HeroSection from '@/components/HeroNew';
import AboutSection from './components/AboutNew';
// import InsightSection from './components/InsightSection';
import HeroMain from './components/HeroMain';

export default function Home() {
  return (
   <>
    <HeroMain/>
   
      <AboutSection />
   
      <MastermindSection/>
      <HeroSection />
      {/* <InsightSection /> */}
      </>
  );
}
