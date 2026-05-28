import { defaultLanding } from '@/lib/content/default-landing';
import { SITE_URL } from '@/lib/constants/site';
import { buildFaqPageSchema } from '@/lib/faq';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const SERVICE_ID = `${SITE_URL}/#service`;
const PRICING_ID = `${SITE_URL}/#pricing`;

/** 本社サイトのロゴ（public/logo.png は未配置のため本社URLを使用） */
const ORGANIZATION_LOGO = 'https://www.coaretail.com/logo.png';

function parseYenAmount(amount: string): string {
  return amount.replace(/,/g, '');
}

function buildPricingOffersSchema() {
  const { pricing } = defaultLanding;
  const { monthly, annual } = pricing.paymentOptions;
  const monthlyPrice = parseYenAmount(monthly.amount);
  const annualPrice = parseYenAmount(annual.amount);

  return [
    {
      '@type': 'Offer',
      name: `${pricing.serviceName}（${monthly.label}）`,
      price: monthlyPrice,
      priceCurrency: 'JPY',
      description: monthly.per,
      url: `${SITE_URL}/#pricing`,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: monthlyPrice,
        priceCurrency: 'JPY',
        unitText: 'MONTH',
        billingDuration: 'P1M',
        valueAddedTaxIncluded: false,
      },
    },
    {
      '@type': 'Offer',
      name: `${pricing.serviceName}（${annual.label}）`,
      price: annualPrice,
      priceCurrency: 'JPY',
      description: `${annual.per} · ${annual.discountLabel} · ${annual.discountNote}`,
      url: `${SITE_URL}/#pricing`,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: annualPrice,
        priceCurrency: 'JPY',
        unitText: 'YEAR',
        billingDuration: 'P1Y',
        valueAddedTaxIncluded: false,
      },
    },
  ];
}

export function buildOrganizationSchema() {
  const { footer } = defaultLanding;

  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: '合同会社コア・リテール',
    alternateName: ['Coa Retail', 'CoaRetail G.K.', footer.companyName],
    url: footer.companyUrl,
    logo: ORGANIZATION_LOGO,
    sameAs: [
      footer.companyUrl,
      'https://www.youtube.com/@coaretail',
      'https://twitter.com/CoaRetail',
      'https://www.instagram.com/coa_retail/',
      'https://www.facebook.com/CoARetail',
    ],
  };
}

export function buildPricingCatalogSchema() {
  const offers = buildPricingOffersSchema();

  return {
    '@type': 'OfferCatalog',
    '@id': PRICING_ID,
    name: defaultLanding.pricing.serviceName,
    itemListElement: offers.map((offer, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: offer,
    })),
  };
}

export function buildServiceSchema() {
  const { pricing, meta } = defaultLanding;
  const offers = buildPricingOffersSchema();

  return {
    '@type': 'Service',
    '@id': SERVICE_ID,
    name: pricing.serviceName,
    alternateName: ['Local GEO', 'GEO Search Protocol for Local', meta.title],
    serviceType: 'AI Local Search Optimization',
    url: SITE_URL,
    provider: {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: '合同会社コア・リテール',
    },
    description: 'AI検索時代における地域店舗向けAI推薦最適化サービス',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'JPY',
      offerCount: String(offers.length),
      offers,
    },
  };
}

/** @deprecated buildStructuredData() を利用してください */
export const organizationSchema = buildOrganizationSchema();
/** @deprecated buildStructuredData() を利用してください */
export const serviceSchema = buildServiceSchema();
/** @deprecated buildStructuredData() を利用してください */
export const pricingCatalogSchema = buildPricingCatalogSchema();

export function buildStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildOrganizationSchema(),
      buildServiceSchema(),
      buildPricingCatalogSchema(),
      buildFaqPageSchema(),
    ],
  };
}

export const structuredData = buildStructuredData();
