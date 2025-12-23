// app/layout.tsx
import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import NavbarNew from './components/MyNav';
import Footer from './components/Footer';
import GoogleAnalytics from "./components/GoogleAnalytics";
import { AuthProvider } from '../lib/authContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: {
    default: 'Buzzedison | Build a Business That Scales with Smart Systems',
    template: '%s | Buzzedison'
  },
  description: 'Buzzedison helps founders grow their business with AI and smart systems. Learn how to save time, scale faster, and build something that lasts.',
  keywords: ['business growth', 'smart systems', 'scaling a startup', 'founder systems', 'business strategy', 'AI automation'],
  authors: [{ name: 'Buzzedison' }],
  creator: 'Buzzedison',
  publisher: 'Buzzedison',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.buzzedison.com',
    title: 'Buzzedison | Build Your Legacy. Scale Your Impact.',
    description: 'Expert guidance for leaders to build profitable and purposeful businesses. Discover strategies for sustainable growth and effective leadership.',
    images: [
      {
        url: 'https://www.buzzedison.com/edisonnewb.jpg',
        width: 1200,
        height: 630,
        alt: 'Buzzedison - Empowering Leaders',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@buzzedison',
    creator: '@buzzedison',
    title: 'Buzzedison | Build Your Legacy. Scale Your Impact.',
    description: 'Expert guidance for leaders to build profitable and purposeful businesses. Discover strategies for sustainable growth and effective leadership.',
    images: ['https://www.buzzedison.com/edisonnewb.jpg'],
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
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',

  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
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