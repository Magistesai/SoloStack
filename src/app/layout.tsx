import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { tools } from '@/lib/data';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'https://solostack-ten.vercel.app';

export const metadata: Metadata = {
  title: { default: 'SoloStack — The Solo Founder Toolkit', template: '%s — SoloStack' },
  description: `Opinionated, curated tools for founders who build alone. ${tools.length}+ tools rated by solo-founder fit.`,
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName: 'SoloStack',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
