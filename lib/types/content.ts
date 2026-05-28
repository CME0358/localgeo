export type ComparisonStatus = 'yes' | 'no' | 'partial';

export interface NavLink {
  label: string;
  href: string;
  variant?: 'default' | 'cta';
}

export interface HeroVisualResult {
  rank: number;
  name: string;
  meta: string;
  badge?: string;
  featured?: boolean;
}

export interface HeroVisualScore {
  value: string;
  label: string;
}

export interface TraditionalSearchResult {
  url: string;
  title: string;
  description: string;
}

export interface AiShopCard {
  icon: string;
  name: string;
  meta: string;
  badge?: string;
  featured?: boolean;
}

export interface ComparisonListItem {
  text: string;
}

export interface ServiceCard {
  icon: string;
  iconVariant: 'pink' | 'blue' | 'green';
  name: string;
  description: string;
  features: string[];
}

export interface CompetitionRow {
  label: string;
  yours: ComparisonStatus;
  competitorA: ComparisonStatus;
  competitorB: ComparisonStatus;
}

export interface CaseImage {
  url: string;
  alt: string;
  caption: string;
  browserUrl: string;
  zoomable?: boolean;
}

export interface CaseMetric {
  label: string;
  value: string;
  description: string;
  featured?: boolean;
}

export interface CaseCompareBox {
  variant: 'yes' | 'no';
  title: string;
  items: string[];
}

export interface DiagnosisFormField {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export interface DiagnosisDashboardCopy {
  idleLabel: string;
  idleTitle: string;
  reportBadge: string;
  reportTitle: string;
  reportDesc: string;
  reportList: string[];
  reportSubmitLabel: string;
  reportLoadingTitle: string;
  reportCompleteTitle: string;
  reportCompleteSub: string;
}

export interface LandingPageContent {
  meta: {
    title: string;
  };
  nav: {
    logo: string;
    logoAccent: string;
    links: NavLink[];
  };
  hero: {
    eyebrow: string;
    titleLines: string[];
    titleAccent: string;
    titleAiText: string;
    titleAiHighlightLines: string[];
    subtitleLines: string[];
    platformBadges: string[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    visual: {
      dashboardTitle: string;
      queryLabel: string;
      queryText: string;
      results: HeroVisualResult[];
      scores: HeroVisualScore[];
    };
  };
  problem: {
    eyebrow: string;
    titleLines: string[];
    subtitleLines: string[];
    browserQuery: string;
    traditionalLabel: string;
    traditionalResults: TraditionalSearchResult[];
    traditionalNote: string;
    aiLabel: string;
    aiBrandName: string;
    aiAnswer: string;
    aiAnswerHighlights: string[];
    shopCards: AiShopCard[];
  };
  comparison: {
    eyebrow: string;
    titleLines: string[];
    subtitleLines: string[];
    old: {
      label: string;
      title: string;
      items: ComparisonListItem[];
      footer: string;
    };
    new: {
      label: string;
      title: string;
      items: ComparisonListItem[];
      footer: string;
    };
  };
  services: {
    eyebrow: string;
    titleLines: string[];
    cards: ServiceCard[];
  };
  competition: {
    eyebrow: string;
    titleLines: string[];
    subtitleLines: string[];
    headers: [string, string, string, string];
    rows: CompetitionRow[];
  };
  caseStudy: {
    eyebrow: string;
    titleLines: string[];
    subtitle: string;
    badge: string;
    images: CaseImage[];
    storeInfo: {
      storeName: string;
      area: string;
      outcome: string;
    };
    before: { title: string; items: string[] };
    after: { title: string; items: string[] };
    quote: {
      label: string;
      lead: string;
      bodyParagraphs: string[];
    };
    results: {
      title: string;
      metrics: CaseMetric[];
    };
    compare: CaseCompareBox[];
  };
  diagnosis: {
    eyebrow: string;
    titleLines: string[];
    subtitleLines: string[];
    form: {
      title: string;
      subtitle: string;
      fields: DiagnosisFormField[];
      submitLabel: string;
      footnote: string;
    };
    dashboard: DiagnosisDashboardCopy;
  };
  pricing: {
    eyebrow: string;
    titleLines: string[];
    subtitleLines: string[];
    badge: string;
    serviceName: string;
    currency: string;
    paymentOptions: {
      monthly: {
        label: string;
        amount: string;
        per: string;
      };
      annual: {
        label: string;
        amount: string;
        per: string;
        discountLabel: string;
        discountNote: string;
      };
    };
    features: string[];
    cta: { label: string; href: string };
    noteLines: string[];
  };
  finalCta: {
    titleLines: string[];
    titleHighlight: string;
    subtitleLines: string[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  footer: {
    brand: string;
    brandAccent: string;
    companyName: string;
    companyUrl: string;
    privacyLabel: string;
    privacyUrl: string;
    copyright: string;
  };
  /** Regional overrides — keyed by region slug (e.g. "shibuya") */
  regional?: Record<string, Partial<LandingPageContent>>;
  /** Industry overrides — keyed by industry value */
  industry?: Record<string, Partial<LandingPageContent>>;
}
