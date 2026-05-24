export interface DiagnosisInput {
  shopName: string;
  area: string;
  industry: string;
}

export type InsightStatus = 'good' | 'warn' | 'bad';

export interface DiagnosisInsight {
  status: InsightStatus;
  label: string;
}

export interface DiagnosisScores {
  localGeoScore: number;
  aiVisibilityScore: number;
  faqOptimizationRate: number;
  googleMapOptimizationRate: number;
  aiRecommendationPotential: number;
}

export interface DiagnosisRadar {
  localGeo: number;
  aiVisibility: number;
  faq: number;
  googleMap: number;
  aiCitation: number;
  reviews: number;
  recommendation: number;
}

export interface DiagnosisInsights {
  aiCitation: DiagnosisInsight;
  reviews: DiagnosisInsight;
  aiRecommendation: DiagnosisInsight;
}

export interface DiagnosisMeta {
  provider: string;
  version: string;
  placeId?: string | null;
  placeFound?: boolean;
}

export interface DiagnosisResult {
  shopName: string;
  area: string;
  industry: string;
  analyzedAt: string;
  scores: DiagnosisScores;
  radar: DiagnosisRadar;
  insights: DiagnosisInsights;
  meta: DiagnosisMeta;
}

export type DiagnosisState =
  | 'idle'
  | 'loading'
  | 'results'
  | 'error'
  | 'report-loading'
  | 'report-complete';

export interface LeadPayload {
  shopName: string;
  area: string;
  industry: string;
  timestamp: string;
  source: string;
  formName: string;
  pageUrl: string | null;
}

export interface ReportLeadPayload extends LeadPayload {
  email: string;
  contactName: string | null;
  localGeoScore: number;
  aiVisibilityScore: number;
  faqOptimizationRate: number;
  googleMapOptimizationRate: number;
  aiRecommendationPotential: number;
  analyzedAt: string;
}

export interface ReportRequest {
  email: string;
  contactName?: string;
  shopName?: string;
  area: string;
  industry: string;
  diagnosis: DiagnosisResult;
  pageUrl?: string;
}

export interface NotifyChannelResult {
  channel: string;
  ok?: boolean;
  skipped?: boolean;
  error?: string;
}
