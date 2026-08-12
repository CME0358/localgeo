import type { Metadata } from 'next';
import './globals.css';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/constants/site';
import { defaultLanding } from '@/lib/content/default-landing';

const title = defaultLanding.meta.title;
const description =
  'MEO対策だけでは不十分な時代に。ChatGPT・Gemini・AI OverviewでAI推薦されやすい店舗を設計。エステ・整体・美容室対応。Googleマップ最適化も込み。月額60,000円〜。';

const ogImage = {
  url: '/images/geo-before-after.png',
  width: 800,
  height: 446,
  alt: 'GEO対策のBefore/After — AIが店舗を指名推薦する状態へ',
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'GEO Search Protocol for Local',
    locale: 'ja_JP',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage.url],
  },
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
