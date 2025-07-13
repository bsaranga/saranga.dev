import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from './components/nav'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Saranga B | Site',
    template: '%s | @ saranga.dev',
  },
  description: 'Full-stack .NET specialist passionate about crafting reliable, maintainable software. I thrive on modernizing legacy systems, driving clean code and TDD, and building scalable solutions that last. Problem solver at heart, focused on delivering high-quality, future-ready software.',
  openGraph: {
    title: 'Saranga B Dot Dev',
    description: 'Full-stack .NET specialist passionate about crafting reliable, maintainable software. I thrive on modernizing legacy systems, driving clean code and TDD, and building scalable solutions that last. Problem solver at heart, focused on delivering high-quality, future-ready software.',
    url: baseUrl,
    images: [{
      url: `${baseUrl}/og`,
      width: 1200,
      height: 630,
      alt: 'Saranga B Dot Dev',
    }],
    siteName: 'Saranga B Dot Dev',
    locale: 'en_US',
    type: 'website',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased text-black bg-white dark:text-white dark:bg-black`}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
      <GoogleAnalytics gaId='G-2G4C0986NJ' />
    </html>
  )
}
