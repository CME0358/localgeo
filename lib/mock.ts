import type { DiagnosisInput, DiagnosisInsight, DiagnosisResult } from '@/lib/types/diagnosis';

function hashSeed(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function insightFromScore(v: number): DiagnosisInsight {
  if (v >= 70) return { status: 'good', label: '良好' };
  if (v >= 40) return { status: 'warn', label: '改善余地あり' };
  return { status: 'bad', label: '要対策' };
}

export type MockAnalyzeStepCallback = (stepIndex: number, stepLabel: string) => void;

export interface MockAnalyzeOptions {
  loadingSteps: readonly string[];
  loadingStepMs: number;
}

export async function mockAnalyze(
  input: DiagnosisInput,
  onStep: MockAnalyzeStepCallback,
  options: MockAnalyzeOptions,
): Promise<DiagnosisResult> {
  for (let i = 0; i < options.loadingSteps.length; i++) {
    onStep(i, options.loadingSteps[i] ?? '');
    await new Promise((resolve) => setTimeout(resolve, options.loadingStepMs));
  }

  const seed = hashSeed(input.shopName + input.area + input.industry);
  const r = (offset: number) => clamp(18 + ((seed + offset * 17) % 65), 12, 88);

  const localGeoScore = r(1);
  const aiVisibilityScore = r(2);
  const faqOptimizationRate = r(3);
  const googleMapOptimizationRate = r(4);
  const aiCitationScore = r(5);
  const reviewsScore = r(6);
  const aiRecommendationPotential = r(7);

  return {
    shopName: input.shopName,
    area: input.area,
    industry: input.industry,
    analyzedAt: new Date().toISOString(),
    scores: {
      localGeoScore,
      aiVisibilityScore,
      faqOptimizationRate,
      googleMapOptimizationRate,
      aiRecommendationPotential,
    },
    radar: {
      localGeo: localGeoScore,
      aiVisibility: aiVisibilityScore,
      faq: faqOptimizationRate,
      googleMap: googleMapOptimizationRate,
      aiCitation: aiCitationScore,
      reviews: reviewsScore,
      recommendation: aiRecommendationPotential,
    },
    insights: {
      aiCitation: insightFromScore(aiCitationScore),
      reviews: insightFromScore(reviewsScore),
      aiRecommendation: insightFromScore(aiRecommendationPotential),
    },
    meta: { provider: 'mock', version: '1.0' },
  };
}

export function buildMockResult(input: DiagnosisInput): DiagnosisResult {
  const seed = hashSeed(input.shopName + input.area + input.industry);
  const r = (offset: number) => clamp(18 + ((seed + offset * 17) % 65), 12, 88);

  const localGeoScore = r(1);
  const aiVisibilityScore = r(2);
  const faqOptimizationRate = r(3);
  const googleMapOptimizationRate = r(4);
  const aiCitationScore = r(5);
  const reviewsScore = r(6);
  const aiRecommendationPotential = r(7);

  return {
    shopName: input.shopName,
    area: input.area,
    industry: input.industry,
    analyzedAt: new Date().toISOString(),
    scores: {
      localGeoScore,
      aiVisibilityScore,
      faqOptimizationRate,
      googleMapOptimizationRate,
      aiRecommendationPotential,
    },
    radar: {
      localGeo: localGeoScore,
      aiVisibility: aiVisibilityScore,
      faq: faqOptimizationRate,
      googleMap: googleMapOptimizationRate,
      aiCitation: aiCitationScore,
      reviews: reviewsScore,
      recommendation: aiRecommendationPotential,
    },
    insights: {
      aiCitation: insightFromScore(aiCitationScore),
      reviews: insightFromScore(reviewsScore),
      aiRecommendation: insightFromScore(aiRecommendationPotential),
    },
    meta: { provider: 'mock', version: '1.0' },
  };
}
