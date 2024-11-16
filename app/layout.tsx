// app/layout.tsx
import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavbarNew from './components/MyNav';
import Footer from './components/Footer';
import GoogleAnalytics from "./components/GoogleAnalytics";
import { AuthProvider } from '../lib/authContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Buzzedison | Empowering Leaders to Build Profitable Businesses',
    template: '%s | Buzzedison'
  },
  description: 'Buzzedison empowers leaders to build profitable businesses with purpose. Expert guidance in leadership, business strategy, and sustainable growth.',
  keywords: ['leadership', 'business strategy', 'profitable business', 'entrepreneurship', 'sustainable growth'],
  authors: [{ name: 'Buzzedison' }],
  creator: 'Buzzedison',
  publisher: 'Buzzedison',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.buzzedison.com',
   
    title: 'Buzzedison | Empowering Leaders to Build Profitable Businesses',
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
    title: 'Buzzedison | Empowering Leaders to Build Profitable Businesses',
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
    <html lang="en">
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        )}
        <AuthProvider>
          <NavbarNew/>
          {children}
          <Footer/>
        </AuthProvider>
      </body>
    </html>
  );
}