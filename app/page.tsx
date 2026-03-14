import Link from 'next/link';
import Image from 'next/image';
import { getLandingPageContent } from '@/lib/landingPage';

export default async function Home() {
  const landingContent = await getLandingPageContent();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": landingContent.seo.personName,
    "url": landingContent.seo.websiteUrl,
    "sameAs": landingContent.seo.socialLinks,
    "jobTitle": landingContent.seo.jobTitle,
    "worksFor": {
      "@type": "Organization",
      "name": landingContent.seo.organizationName,
    },
    "description": landingContent.seo.description,
  };

  return (
    <div className="min-h-screen bg-white text-[#1c1c1c] selection:bg-zinc-200 antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* Hero Section */}
        <section className="px-6 lg:px-8 pt-20 lg:pt-24 mb-24 lg:mb-40">
          <div className="max-w-[76rem] mx-auto rounded-none overflow-hidden flex flex-col md:flex-row shadow-sm">
            {/* Left Content Area */}
            <div className="flex-1 bg-[#f4f2ec] px-8 py-16 lg:px-20 lg:py-28 flex flex-col justify-center text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight mb-6">
                {landingContent.hero.titleLine1} <br className="hidden lg:block"/>
                <span className="italic">{landingContent.hero.emphasizedTitle}</span>
                {landingContent.hero.titleLine3 ? (
                  <>
                    <br className="hidden lg:block"/>
                    <span>{landingContent.hero.titleLine3}</span>
                  </>
                ) : null}
              </h1>
              <p className="text-base font-sans text-zinc-700 mb-10 max-w-md mx-auto md:mx-0 leading-relaxed font-normal">
                {landingContent.hero.description}
              </p>
              <div>
                <Link href={landingContent.hero.primaryCta.href} className="inline-flex items-center justify-center bg-[#1c1c1c] text-white px-10 py-4 rounded-full text-[13px] tracking-wide font-sans font-medium hover:bg-black transition-all duration-300 min-w-[240px]">
                  {landingContent.hero.primaryCta.label}
                </Link>
              </div>
            </div>

            {/* Right Image Area */}
            <div className="md:w-5/12 relative min-h-[400px] lg:min-h-full">
               {/* We use the portrait image from the CMS if available, or a fallback. 
                   We subtly increase contrast but keep its natural color */}
              {landingContent.hero.portraitImageUrl && (
                <Image
                  src={landingContent.hero.portraitImageUrl}
                  alt={landingContent.hero.portraitAlt || "Portrait"}
                  fill
                  className="object-cover object-top contrast-[1.05]"
                  priority
                />
              )}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-32 lg:mb-48 relative">
          <div className="mb-16 lg:mb-24">
            <h2 className="text-4xl lg:text-[56px] font-serif text-[#1c1c1c] leading-[1.1] tracking-tight">
              Clear Plan.<br/>
              Better Results.
            </h2>
          </div>

          <div className="flex flex-col gap-12 lg:gap-16 relative">
            {/* The subtle vertical connecting line on desktop */}
            <div className="absolute left-[2.2rem] top-8 bottom-12 w-[1px] bg-zinc-200 hidden md:block"></div>
            
            {landingContent.frameworksSection.frameworks.map((fw, idx) => (
              <div key={idx} className="flex items-start gap-8 lg:gap-12 relative z-10 group">
                {/* Visual Icon (Placeholder SVG styling to match design) */}
                <div className="hidden md:flex w-[4.5rem] h-[4.5rem] bg-white rounded-full border border-zinc-200 items-center justify-center shrink-0 shadow-sm relative z-10">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                     {idx === 0 && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
                     {idx === 1 && <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>}
                     {idx === 2 && <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>}
                     {/* Fallbacks if more than 3 */}
                     {idx > 2 && <circle cx="12" cy="12" r="10" />}
                   </svg>
                </div>
                
                <div className="flex-1 lg:pt-1">
                  <div className="flex items-baseline lg:items-center gap-4 lg:gap-8 mb-2">
                    <span className="text-5xl lg:text-7xl font-serif italic text-[#1c1c1c] tracking-tighter">
                      &rsquo;0<span className="text-amber-700/80">{idx + 1}</span>.
                    </span>
                    <h3 className="text-xl lg:text-2xl font-serif text-[#1c1c1c]">{fw.title}</h3>
                  </div>
                  <p className="text-[15px] font-sans text-zinc-600 leading-relaxed font-normal lg:pl-[6.5rem] max-w-xl">
                    {fw.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resources Section */}
        <section className="max-w-[76rem] mx-auto px-6 lg:px-8 pb-32 lg:pb-48">
          <h2 className="text-3xl lg:text-[40px] font-serif text-[#1c1c1c] text-center mb-12 lg:mb-16 tracking-tight">
            {landingContent.contentHubSection.title}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {landingContent.contentHubSection.items.map((item, idx) => {
              // Assigning actual images from /public/image/ folder for each card
              const defaultImage = idx === 0 
                ? "/image/pricingbook.webp" 
                : idx === 1 
                  ? "/image/edisonabout.jpg" 
                  : "/image/systems-illustration.png";
              
              return (
                <div key={idx} className="bg-white rounded-2xl p-4 lg:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-zinc-100 flex flex-col h-full group hover:-translate-y-1 transition-transform duration-300">
                  <div className="aspect-[4/3] bg-zinc-100 rounded-xl mb-6 overflow-hidden relative">
                    {defaultImage ? (
                      <Image src={defaultImage} alt={item.title} fill className="object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="absolute inset-0 bg-zinc-200/50 flex items-center justify-center">
                          <svg className="w-12 h-12 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                            <line x1="9" y1="9" x2="15" y2="9"></line>
                            <line x1="9" y1="13" x2="15" y2="13"></line>
                            <line x1="9" y1="17" x2="12" y2="17"></line>
                          </svg>
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] font-sans text-zinc-500 mb-2 uppercase tracking-widest">Resource</div>
                  <h3 className="text-xl font-serif text-[#1c1c1c] mb-3">{item.title}</h3>
                  <p className="text-[14px] font-sans text-zinc-600 leading-relaxed mb-8 flex-grow">
                    {item.description}
                  </p>
                  <Link href={item.href} className="text-[10px] font-sans font-bold tracking-[0.15em] uppercase text-[#1c1c1c] hover:text-zinc-500 transition-colors flex items-center">
                    {item.ctaLabel} &rarr;
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
