import { defaultLanding } from '@/lib/content/default-landing';
import { SITE_URL } from '@/lib/constants/site';
import { buildFaqPageSchema } from '@/lib/faq';

const ORGANIZATION_ID = 'https://www.coaretail.com/#organization';
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;
const SERVICE_ID = `${SITE_URL}/#service`;
const PRICING_ID = `${SITE_URL}/#pricing`;
const FRAMEWORK_ID = `${SITE_URL}/#framework`;
const DIAGNOSIS_APP_ID = `${SITE_URL}/#diagnosis-app`;
const INDUSTRIES_ID = `${SITE_URL}/#industries`;

const PAGE_DESCRIPTION =
  'ChatGPT・Gemini・AI Overviewに推薦される店舗へ。Local GEO™診断とGEO Search Protocol™ for Local。';

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
      `${footer.companyUrl}/geo`,
      SITE_URL,
      'https://www.youtube.com/@coaretail',
      'https://twitter.com/CoaRetail',
      'https://www.instagram.com/coa_retail/',
      'https://www.facebook.com/CoARetail',
    ],
  };
}

export function buildWebSiteSchema() {
  const { meta } = defaultLanding;

  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: meta.title,
    description: PAGE_DESCRIPTION,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'ja',
    hasPart: [
      { '@id': WEBPAGE_ID },
      { '@id': `${SITE_URL}/#faq` },
      { '@id': DIAGNOSIS_APP_ID },
    ],
  };
}

export function buildWebPageSchema() {
  const { meta } = defaultLanding;

  return {
    '@type': 'WebPage',
    '@id': WEBPAGE_ID,
    url: `${SITE_URL}/`,
    name: meta.title,
    description: PAGE_DESCRIPTION,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': SERVICE_ID },
    mainEntity: { '@id': SERVICE_ID },
    publisher: { '@id': ORGANIZATION_ID },
    dateModified: '2026-06-12',
    inLanguage: 'ja',
    isAccessibleForFree: true,
  };
}

export function buildEvaluationFrameworkSchema() {
  return {
    '@type': 'DefinedTermSet',
    '@id': FRAMEWORK_ID,
    name: 'Local GEO Evaluation Framework',
    description:
      '地域店舗のAI検索露出を測る評価フレームワーク。Local GEO Score・AI Visibility Score・FAQ/GoogleMap最適化・AI推薦可能性を軸に診断する。',
    hasDefinedTerm: [
      {
        '@type': 'DefinedTerm',
        name: 'Local GEO Score',
        description:
          'ChatGPT・Gemini・AI Overviewを含むAI検索全体での店舗露出・推薦適性を0〜100で評価する総合スコア。',
      },
      {
        '@type': 'DefinedTerm',
        name: 'AI Visibility Score',
        description:
          'AI検索エンジン上での表示・引用・推薦の可視性を0〜100で評価するスコア。',
      },
      {
        '@type': 'DefinedTerm',
        name: 'FAQ Optimization Rate',
        description:
          'AI引用に適したFAQ構造化・Schema markupの整備度を0〜100で評価する指標。',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Google Map Optimization Rate',
        description:
          'Googleビジネスプロフィール・地図情報・口コミ整合性の最適化度を0〜100で評価する指標。',
      },
      {
        '@type': 'DefinedTerm',
        name: 'AI Recommendation Potential',
        description:
          '「おすすめ店舗」としてAIに推薦される可能性を0〜100で評価する指標。',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Local GEO',
        description:
          'MEO（GoogleMap順位対策）を超え、AIが店舗を理解・引用・推薦しやすい状態を設計するAI検索最適化。GEO Search Protocol™ for Localの中核コンセプト。',
      },
    ],
  };
}

export function buildDiagnosisApplicationSchema() {
  const { diagnosis } = defaultLanding;

  return {
    '@type': 'SoftwareApplication',
    '@id': DIAGNOSIS_APP_ID,
    name: diagnosis.form.title,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: `${SITE_URL}/#diagnosis`,
    description: diagnosis.form.subtitle,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
      availability: 'https://schema.org/InStock',
    },
    provider: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': FRAMEWORK_ID },
  };
}

export function buildIndustriesSchema() {
  const { services } = defaultLanding;

  return {
    '@type': 'ItemList',
    '@id': INDUSTRIES_ID,
    name: '対応業種',
    numberOfItems: services.cards.length,
    itemListElement: services.cards.map((card, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: card.name,
      description: card.description,
    })),
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
    provider: { '@id': ORGANIZATION_ID },
    description: 'AI検索時代における地域店舗向けAI推薦最適化サービス',
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: '地域店舗・サロン・飲食店・クリニック',
    },
    hasOfferCatalog: { '@id': PRICING_ID },
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
      buildWebSiteSchema(),
      buildWebPageSchema(),
      buildEvaluationFrameworkSchema(),
      buildDiagnosisApplicationSchema(),
      buildIndustriesSchema(),
      buildServiceSchema(),
      buildPricingCatalogSchema(),
      buildFaqPageSchema(),
    ],
  };
}

export const structuredData = buildStructuredData();
