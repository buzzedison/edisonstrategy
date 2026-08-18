// app/layout.tsx
import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter, EB_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import NavbarNew from './components/MyNav';
import Footer from './components/Footer';
import GoogleAnalytics from "./components/GoogleAnalytics";
import { AuthProvider } from '../lib/authContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const garamond = EB_Garamond({ subsets: ['latin'], variable: '--font-garamond' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.buzzedison.com'),
  title: {
    default: 'Edison Ade | Build Beyond Founder-Dependent Growth',
    template: '%s | Buzzedison'
  },
  description: 'Edison Ade helps founders replace founder-dependent growth with clearer strategy, smarter systems, and products built to scale.',
  keywords: ['Edison Ade', 'founder strategy', 'business systems', 'startup growth', 'founder operating systems', 'strategy partner'],
  authors: [{ name: 'Edison Ade', url: 'https://www.buzzedison.com/about' }],
  creator: 'Edison Ade',
  publisher: 'Buzzedison',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.buzzedison.com',
    siteName: 'Buzzedison',
    title: 'Your Business Has Outgrown Guesswork',
    description: 'Strategy and operating partnership for founders with traction who need clearer priorities, stronger systems, and products built to scale.',
    images: [
      {
        url: '/image/edisonnewb.jpg',
        width: 1200,
        height: 630,
        alt: 'Edison Ade, founder, operator and strategy partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@buzzedison',
    creator: '@buzzedison',
    title: 'Your Business Has Outgrown Guesswork',
    description: 'Strategy and operating partnership for founders with traction who need clearer priorities, stronger systems, and products built to scale.',
    images: ['/image/edisonnewb.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${garamond.variable} ${jakarta.variable}`}>
      <body className={jakarta.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        )}
        <AuthProvider>
          <NavbarNew />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
