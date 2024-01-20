import Head from 'next/head';
import PricingSection from './components/PricingSection';
import Link from 'next/link';
export default function PricingStrategy() {
    return (
        <>
            <Head>
                <title>Pricing Strategy Book</title>
                <meta name="description" content="Learn about effective pricing strategies to transform your business." />
            </Head>

            <main>
                <section className="bg-gray-100 text-center py-24">
                    <h1 className="text-4xl font-bold mt-4 lg:mt-12">Unleash the Power of Pricing</h1>
                    <p className="text-xl mt-4">Transform your business strategy with effective pricing techniques</p>
                    <div className="mt-8">
                        <Link 
                          href="https://www.amazon.com/Winning-Pricing-Strategy-ideal-market-ebook/dp/B09HMZCTXK" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded mx-2"
                        >
                            Buy on Amazon
                        </Link>
                        <Link
                          href="https://buzzedison.gumroad.com/l/pricingstrategy" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mx-2"
                        >
                            Buy on Gumroad
                        </Link>
                    </div>
                </section>

                <section className="container mx-auto p-8 py-4 lg:py-24">
                    <article className="mb-8">
                        <h2 className="text-2xl font-semibold">Debunk Pricing Myths</h2>
                        <p>Cut through the confusion and dispel the myths surrounding pricing.</p>
                    </article>
                    <article className="mb-8">
                        <h2 className="text-2xl font-semibold">Master the Art of Pricing</h2>
                        <p>Dive deep into the world of pricing and understand the logic behind successful models.</p>
                    </article>
                    <article className="mb-8">
                        <h2 className="text-2xl font-semibold">Navigate the Pricing Evolution</h2>
                        <p>Adapt to the ever-changing landscape of pricing with ease.</p>
                    </article>
                </section>

               

                <section>

                    <PricingSection/>
                </section>
            </main>

          
        </>
    );
}
