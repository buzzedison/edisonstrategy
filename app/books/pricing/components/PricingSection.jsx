import Image from "next/image";
import Link from "next/link";
export default function PricingSection() {
    return (
        <section className="flex flex-col md:flex-row items-center md:justify-between bg-secondary text-white p-8">
           
            <div className="md:w-1/2 mb-8 md:mb-0 ml-0 md:ml-24">
                <h2 className="text-4xl font-bold mb-4 ">Ready to revolutionize your pricing strategy and unlock new growth opportunities?</h2>
                <p className="mb-6">
                    Don't miss out on this indispensable resource that will help you reshape your business's future. Get your copy today and embrace the power of pricing!
                </p>
                <Link href="https://buzzedison.gumroad.com/l/pricingstrategy">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Get Your Copy Today
                </button>
                </Link>
            </div>
            <div className="md:w-1/2">
                <div className="flex justify-center mb-4">
                    <Image 
                        src="/image/pricingbook.webp" 
                        width={500}
                        height={700}
                        layout="responsive"
                        alt="Winning Pricing Strategy"
                    />
                </div>
            </div>
        </section>
    );
}
