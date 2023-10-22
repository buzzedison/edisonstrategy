import Link from 'next/link';

export default function FreeTools() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 ">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8">Free Business Tools</h1>

      <p className="mt-4 text-lg text-center text-gray-600 mb-12">
        Jump-start your startup with these essential freebies!
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card title="Free Pricing Calculator">
          Unlock the secrets to optimal pricing.
        </Card>

        <Card title="Free Fundraising Pitch Deck eBook">
          Craft a pitch deck that investors can't resist.
        </Card>

        <Card title="Free Pricing Guide">
          Become a master of pricing strategies.
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="flex flex-col justify-between p-8 bg-white rounded-lg shadow-md transition hover:shadow-lg hover:bg-gray-50">
      <div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h3>
        <p className="text-gray-600">{children}</p>
      </div>

      <Link href="/pricingcalculator">
        <div className="mt-4 text-center bg-indigo-500 text-white rounded-md py-2 cursor-pointer transition hover:bg-indigo-600">
          Try it now
        </div>
      </Link>
    </div>
  );
}
