import type { Metadata } from 'next';
import './globals.css';
import { defaultLanding } from '@/lib/content/default-landing';

const title = defaultLanding.meta.title;
const description =
  'ChatGPT・Gemini・AI Overviewに推薦される店舗へ。Local GEO™診断とGEO Search Protocol™ for Local。';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://localgeo.coaretail.com',
    siteName: 'GEO Search Protocol for Local',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className="min-h-screen bg-white font-sans text-base text-[#222222] antialiased">{children}</body>
    </html>
  );
}
