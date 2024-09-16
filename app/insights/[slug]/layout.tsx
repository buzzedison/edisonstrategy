// app/insights/[slug]/layout.tsx
import NavbarNew from '../../components/MyNav';
import Footer from '../../components/Footer';

interface SlugLayoutProps {
  children: React.ReactNode;
}

export default function SlugLayout({ children }: SlugLayoutProps) {
  return (
    <html lang="en">
      <body>
        <NavbarNew />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
