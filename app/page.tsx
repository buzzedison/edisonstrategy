import Image from 'next/image'
import MastermindSection from './components/MastermindSection';
import AboutSection from './components/AboutNew';
// import HeroMain from './components/HeroMain';
import HeroServe from './components/HeroServe';

export default function Home() {
  return (
   <>
    {/* <HeroMain/> */}
    <HeroServe/>
    <AboutSection />
    <MastermindSection/>
   </>
  );
}
