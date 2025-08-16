import PriceNav from './components/PriceNav';

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="pricing-layout">
          <PriceNav />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
