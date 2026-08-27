import { defaultLanding } from '@/lib/content/default-landing';
import { SITE_URL } from '@/lib/constants/site';
import { buildFaqPageSchema } from '@/lib/faq';
import { PAGE_DESCRIPTION, SITE_SEO } from '@/lib/seo/metadata';

const ORGANIZATION_ID = 'https://www.coaretail.com/#organization';
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;
const SERVICE_ID = `${SITE_URL}/#service`;
const PRICING_ID = `${SITE_URL}/#pricing`;
const FRAMEWORK_ID = `${SITE_URL}/#framework`;
const DIAGNOSIS_APP_ID = `${SITE_URL}/#diagnosis-app`;
const INDUSTRIES_ID = `${SITE_URL}/#industries`;
const BRAND_ID = `${SITE_URL}/#brand`;

/** 本社サイトのロゴ（public/logo.png は未配置のため本社URLを使用） */
const ORGANIZATION_LOGO = 'https://www.coaretail.com/logo.png';

function parseYenAmount(amount: string): string {
  return amount.replace(/,/g, '');
}

function industryCardDescription(card: (typeof defaultLanding.services.cards)[number]): string {
  const queries = card.queries?.length ? `例：「${card.queries.join('」「')}」` : '';
  return [queries, card.description].filter(Boolean).join(' ');
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

export function buildBrandSchema() {
  return {
    '@type': 'Brand',
    '@id': BRAND_ID,
    name: SITE_SEO.brandName,
    alternateName: ['ARI', 'Agent Readiness Index for Local'],
    description:
      'ChatGPT・Gemini等のAIが店舗・サービスをどの程度発見・理解・推薦できるかを評価する診断フレームワーク。',
    url: SITE_URL,
  };
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
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_SEO.brandNameFull,
    alternateName: [SITE_SEO.title, SITE_SEO.productNameFull],
    description: PAGE_DESCRIPTION,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'ja',
    hasPart: [
      { '@id': WEBPAGE_ID },
      { '@id': `${SITE_URL}/#faq` },
      { '@id': DIAGNOSIS_APP_ID },
      { '@id': INDUSTRIES_ID },
    ],
  };
}

export function buildWebPageSchema() {
  return {
    '@type': 'WebPage',
    '@id': WEBPAGE_ID,
    url: `${SITE_URL}/`,
    name: SITE_SEO.title,
    description: PAGE_DESCRIPTION,
    isPartOf: { '@id': WEBSITE_ID },
    about: [{ '@id': FRAMEWORK_ID }, { '@id': SERVICE_ID }],
    mainEntity: { '@id': DIAGNOSIS_APP_ID },
    publisher: { '@id': ORGANIZATION_ID },
    dateModified: SITE_SEO.dateModified,
    inLanguage: 'ja',
    isAccessibleForFree: true,
  };
}

export function buildEvaluationFrameworkSchema() {
  return {
    '@type': 'DefinedTermSet',
    '@id': FRAMEWORK_ID,
    name: 'Agent Readiness Index Evaluation Framework',
    alternateName: ['Agent Readiness Index', 'ARI', 'Local GEO Evaluation Framework'],
    description:
      '地域店舗のAI検索 readiness を測る評価フレームワーク。ARI Score・AI Visibility・Local GEO Score・SEO/MEO・AI推薦可能性を軸に診断する。',
    hasDefinedTerm: [
      {
        '@type': 'DefinedTerm',
        name: 'Agent Readiness Index',
        alternateName: 'ARI',
        description:
          'ChatGPT・Gemini等のAIが、店舗・サービスをどの程度発見し、理解し、条件に応じて推薦できる状態にあるかを確認する評価の考え方。',
      },
      {
        '@type': 'DefinedTerm',
        name: 'ARI Score',
        description:
          'Agent Readiness Indexに基づく、AI検索上の readiness を0〜100で表す総合スコア。',
      },
      {
        '@type': 'DefinedTerm',
        name: 'AI Visibility Score',
        description:
          'AI検索エンジン上での表示・引用・推薦の可視性を0〜100で評価するスコア。',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Local GEO Score',
        description:
          'ChatGPT・Gemini・AI Overviewを含むAI検索全体での店舗露出・推薦適性を0〜100で評価する総合スコア。',
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
          'Agent Readiness Indexで把握した課題をもとに、店舗情報・Web・FAQ・GBP等を整え、AIに正しく理解・推薦されやすい状態を目指す改善サービス（月額60,000円〜）。',
      },
      {
        '@type': 'DefinedTerm',
        name: 'AI検索対策',
        description:
          'ChatGPT・Gemini・Google AI Overview等において、AIが店舗情報を正しく理解し、比較・推薦できる状態を整える取り組み。',
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
    alternateName: ['Agent Readiness Index 無料診断', '無料AI推薦診断', 'Quick診断'],
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
    name: '対応業種 — AI検索対策',
    numberOfItems: services.cards.length,
    itemListElement: services.cards.map((card, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: card.name,
      description: industryCardDescription(card),
    })),
  };
}

export function buildPricingCatalogSchema() {
  const offers = buildPricingOffersSchema();

  return {
    '@type': 'OfferCatalog',
    '@id': PRICING_ID,
    name: `${SITE_SEO.productName} — ${defaultLanding.pricing.serviceName}`,
    itemListElement: offers.map((offer, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: offer,
    })),
  };
}

export function buildServiceSchema() {
  const { pricing } = defaultLanding;
  const offers = buildPricingOffersSchema();

  return {
    '@type': 'Service',
    '@id': SERVICE_ID,
    name: SITE_SEO.productName,
    alternateName: [
      'Local GEO AI検索改善プラン',
      SITE_SEO.productNameFull,
      pricing.serviceName,
      'Agent Readiness Index for Local',
      'AI検索対策',
      'SEO MEO AI検索最適化',
    ],
    brand: { '@id': BRAND_ID },
    serviceType: 'AI Local Search Optimization',
    url: SITE_URL,
    provider: { '@id': ORGANIZATION_ID },
    description:
      'Agent Readiness Indexで現状を診断し、Local GEOで改善。SEO・MEO・AI検索対策を統合した地域店舗向けAI推薦最適化サービス（月額60,000円〜）。',
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType:
        '歯科医院・クリニック・美容クリニック・エステ・美容室・整体・ジム・飲食店・不動産など地域店舗',
    },
    hasOfferCatalog: { '@id': PRICING_ID },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'JPY',
      lowPrice: parseYenAmount(pricing.paymentOptions.monthly.amount),
      highPrice: parseYenAmount(pricing.paymentOptions.annual.amount),
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
      buildBrandSchema(),
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
