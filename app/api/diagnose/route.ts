import { NextResponse } from 'next/server';
import { buildMockResult } from '@/lib/mock';
import type {
  DiagnosisInput,
  DiagnosisInsight,
  DiagnosisResult,
} from '@/lib/types/diagnosis';

function insightFromScore(v: number): DiagnosisInsight {
  if (v >= 70) return { status: 'good', label: '良好' };
  if (v >= 40) return { status: 'warn', label: '改善余地あり' };
  return { status: 'bad', label: '要対策' };
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

interface PlacesData {
  placeId: string;
  name: string;
  address: string;
  rating: number | null;
  reviewCount: number;
  website: string | null;
  googleMapsUri: string | null;
  businessStatus: string | null;
  types: string[];
  editorialSummary: string | null;
}

interface OpenAIAnalysis {
  localGeoScore: number;
  aiVisibilityScore: number;
  faqOptimizationRate: number;
  googleMapOptimizationRate: number;
  aiRecommendationPotential: number;
  aiCitationScore: number;
  reviewsScore: number;
  summary: string;
}

async function fetchPlacesData(input: DiagnosisInput, apiKey: string): Promise<PlacesData | null> {
  const textQuery = [input.shopName, input.area, input.industry].filter(Boolean).join(' ');
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': [
        'places.id',
        'places.displayName',
        'places.formattedAddress',
        'places.rating',
        'places.userRatingCount',
        'places.websiteUri',
        'places.googleMapsUri',
        'places.businessStatus',
        'places.types',
        'places.editorialSummary',
      ].join(','),
    },
    body: JSON.stringify({
      textQuery,
      languageCode: 'ja',
      regionCode: 'JP',
      maxResultCount: 1,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Places API error ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    places?: Array<{
      id?: string;
      displayName?: { text?: string };
      formattedAddress?: string;
      rating?: number;
      userRatingCount?: number;
      websiteUri?: string;
      googleMapsUri?: string;
      businessStatus?: string;
      types?: string[];
      editorialSummary?: { text?: string };
    }>;
  };

  const place = data.places?.[0];
  if (!place) return null;

  return {
    placeId: place.id ?? '',
    name: place.displayName?.text || input.shopName,
    address: place.formattedAddress || input.area,
    rating: place.rating ?? null,
    reviewCount: place.userRatingCount ?? 0,
    website: place.websiteUri || null,
    googleMapsUri: place.googleMapsUri || null,
    businessStatus: place.businessStatus || null,
    types: place.types || [],
    editorialSummary: place.editorialSummary?.text || null,
  };
}

function scoreGoogleMapFromPlaces(places: PlacesData | null): number {
  if (!places) return 25;
  let score = 35;
  if (places.rating != null) score += Math.round((places.rating / 5) * 25);
  if (places.reviewCount >= 50) score += 20;
  else if (places.reviewCount >= 10) score += 12;
  else if (places.reviewCount >= 1) score += 6;
  if (places.website) score += 10;
  if (places.editorialSummary) score += 5;
  if (places.businessStatus === 'OPERATIONAL') score += 5;
  return clamp(score, 12, 92);
}

function scoreReviewsFromPlaces(places: PlacesData | null): number {
  if (!places) return 20;
  const ratingPart = places.rating != null ? (places.rating / 5) * 50 : 15;
  const countPart = clamp(Math.log10(places.reviewCount + 1) * 22, 0, 35);
  return clamp(Math.round(ratingPart + countPart), 12, 95);
}

async function analyzeWithOpenAI(
  input: DiagnosisInput,
  places: PlacesData | null,
  apiKey: string,
  model: string,
): Promise<OpenAIAnalysis> {
  const systemPrompt = `あなたはLocal GEO（地域店舗のAI検索最適化）診断アナリストです。
入力された店舗情報とGoogle Placesデータをもとに、0-100の整数スコアをJSONのみで返してください。
効能・医療の断定は避け、GEO/店舗集客の観点で評価すること。

返却JSONスキーマ（このキーのみ）:
{
  "localGeoScore": number,
  "aiVisibilityScore": number,
  "faqOptimizationRate": number,
  "googleMapOptimizationRate": number,
  "aiRecommendationPotential": number,
  "aiCitationScore": number,
  "reviewsScore": number,
  "summary": string
}`;

  const userPayload = {
    shopName: input.shopName,
    area: input.area,
    industry: input.industry,
    places: places || { note: 'Places API で店舗未特定' },
  };

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: JSON.stringify(userPayload, null, 2) },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) throw new Error('OpenAI returned empty content');

  const parsed = JSON.parse(raw) as Record<string, unknown>;
  const pick = (key: string, fallback: number) =>
    clamp(Math.round(Number(parsed[key]) || fallback), 12, 95);

  const googleMapFromPlaces = scoreGoogleMapFromPlaces(places);
  const reviewsFromPlaces = scoreReviewsFromPlaces(places);

  return {
    localGeoScore: pick('localGeoScore', 45),
    aiVisibilityScore: pick('aiVisibilityScore', 40),
    faqOptimizationRate: pick('faqOptimizationRate', 35),
    googleMapOptimizationRate: pick('googleMapOptimizationRate', googleMapFromPlaces),
    aiRecommendationPotential: pick('aiRecommendationPotential', 38),
    aiCitationScore: pick('aiCitationScore', 32),
    reviewsScore: pick('reviewsScore', reviewsFromPlaces),
    summary: typeof parsed.summary === 'string' ? parsed.summary : '',
  };
}

function mergeDiagnosisResult(
  input: DiagnosisInput,
  analysis: OpenAIAnalysis,
  places: PlacesData | null,
): DiagnosisResult {
  const {
    localGeoScore,
    aiVisibilityScore,
    faqOptimizationRate,
    googleMapOptimizationRate,
    aiRecommendationPotential,
    aiCitationScore,
    reviewsScore,
  } = analysis;

  return {
    shopName: places?.name || input.shopName,
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
    meta: {
      provider: 'places+openai',
      version: '1.0',
      placeId: places?.placeId || null,
      placeFound: Boolean(places),
    },
  };
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'JSON が不正です' }, { status: 400 });
  }

  const shopName = String(body.shopName ?? '').trim();
  const area = String(body.area ?? '').trim();
  const industry = String(body.industry ?? '').trim();

  if (!shopName || !area || !industry) {
    return NextResponse.json({ error: 'shopName, area, industry は必須です' }, { status: 400 });
  }

  const input: DiagnosisInput = { shopName, area, industry };
  const placesKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  const openaiModel = process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini';

  if (!placesKey || !openaiKey) {
    return NextResponse.json(buildMockResult(input));
  }

  try {
    const places = await fetchPlacesData(input, placesKey);
    const analysis = await analyzeWithOpenAI(input, places, openaiKey, openaiModel);
    return NextResponse.json(mergeDiagnosisResult(input, analysis, places));
  } catch (err) {
    console.error('[diagnose]', err);
    return NextResponse.json(
      {
        error: '診断処理に失敗しました',
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 502 },
    );
  }
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
