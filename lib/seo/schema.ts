import { SITE_URL } from '@/lib/constants/site';
import { buildFaqPageSchema } from '@/lib/faq';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const organizationSchema = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: 'Coa Retail',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [
    'https://www.coaretail.com',
    'https://www.youtube.com/@coaretail',
    'https://twitter.com/CoaRetail',
    'https://www.instagram.com/coa_retail/',
    'https://www.facebook.com/CoARetail',
  ],
};

export const serviceSchema = {
  '@type': 'Service',
  name: 'Local GEO',
  serviceType: 'AI Local Search Optimization',
  url: SITE_URL,
  provider: {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Coa Retail',
  },
  description: 'AI検索時代における地域店舗向けAI推薦最適化サービス',
};

export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, serviceSchema, buildFaqPageSchema()],
};
