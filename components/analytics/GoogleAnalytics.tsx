import Script from 'next/script';
import {
  GA4_MEASUREMENT_ID,
  GA4_SHARED_MEASUREMENT_ID,
} from '@/lib/constants/analytics';

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}');
          gtag('config', '${GA4_SHARED_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
