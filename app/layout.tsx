import type { Metadata } from 'next';
import './globals.css';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/constants/site';
import { SITE_SEO } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_SEO.title,
  description: SITE_SEO.description,
  keywords: [...SITE_SEO.keywords],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: SITE_SEO.title,
    description: SITE_SEO.description,
    url: '/',
    siteName: SITE_SEO.brandNameFull,
    locale: SITE_SEO.locale,
    type: 'website',
    images: [SITE_SEO.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_SEO.title,
    description: SITE_SEO.description,
    images: [SITE_SEO.ogImage.url],
    site: '@CoaRetail',
  },
  category: 'business',
  applicationName: SITE_SEO.brandNameFull,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className="min-h-screen bg-white font-sans text-base text-[#222222] antialiased">
        <GoogleAnalytics />
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
