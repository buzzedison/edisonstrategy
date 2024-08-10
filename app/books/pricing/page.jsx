import Head from 'next/head';

import Link from 'next/link';
import HeroPricing from './components/HeroPricing';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import BenefitsSection from './components/BenefitsSection';
import CTASection from './components/CtaSection';
export default function PricingStrategy() {
    return (
        <>
            <Head>
                <title>Pricing Strategy Book</title>
                <meta name="description" content="Learn about effective pricing strategies to transform your business." />
            </Head>

            <main>
                <HeroPricing/>
                <ProblemSection/>
                <SolutionSection/>
                <BenefitsSection/>
                <CTASection/>
              
              
                
            </main>

          
        </>
    );
}
