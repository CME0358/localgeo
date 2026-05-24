import type { DiagnosisResult } from '@/lib/types/diagnosis';

type ScoreTier = 'high' | 'mid' | 'low';

function tier(score: number): ScoreTier {
  if (score >= 70) return 'high';
  if (score >= 40) return 'mid';
  return 'low';
}

function tierLabel(score: number): string {
  const t = tier(score);
  if (t === 'high') return '良好';
  if (t === 'mid') return '改善余地あり';
  return '要対策';
}

export interface ReportAnalysisBlock {
  score: number;
  label: string;
  text: string;
}

export interface ReportAnalysisPage3 {
  chatgpt: { score: number; text: string };
  gemini: { score: number; text: string };
  competitor: { text: string };
  improvements: string[];
  localGeoProposal: string;
}

export interface ReportAnalysis {
  overall: string;
  page1: {
    localGeoScore: number;
    aiVisibilityScore: number;
    localGeoLabel: string;
    visibilityLabel: string;
    overall: string;
  };
  page2: {
    faq: ReportAnalysisBlock;
    googleMap: ReportAnalysisBlock;
    aiCitation: ReportAnalysisBlock;
    reviews: ReportAnalysisBlock;
  };
  page3: ReportAnalysisPage3;
}

export function buildReportAnalysis(data: DiagnosisResult): ReportAnalysis {
  const s = data.scores;
  const local = s.localGeoScore;
  const visibility = s.aiVisibilityScore;
  const faq = s.faqOptimizationRate;
  const gmap = s.googleMapOptimizationRate;
  const citation = data.radar?.aiCitation ?? 0;
  const reviews = data.radar?.reviews ?? 0;
  const recommendation = s.aiRecommendationPotential;

  const overall =
    local >= 70 && visibility >= 70
      ? `${data.shopName}はAI検索において一定の露出基盤があります。詳細レポートの改善提案を実行することで、推薦獲得の余地をさらに広げられます。`
      : local >= 40 || visibility >= 40
        ? `${data.shopName}はAI検索での認知に改善余地があります。FAQ・GoogleMap・構造化情報の最適化により、スコア向上が見込めます。`
        : `${data.shopName}は現状、AI検索での推薦獲得に向けた基盤整備が必要です。Local GEO™施策により、段階的な改善が可能です。`;

  return {
    overall,
    page1: {
      localGeoScore: local,
      aiVisibilityScore: visibility,
      localGeoLabel: tierLabel(local),
      visibilityLabel: tierLabel(visibility),
      overall,
    },
    page2: {
      faq: {
        score: faq,
        label: tierLabel(faq),
        text:
          faq >= 70
            ? 'FAQ構造は比較的整備されています。地域名・業種キーワードを含むQ&Aの追加で、AI引用率の向上が期待できます。'
            : faq >= 40
              ? 'FAQページの不足、またはAIが引用しやすい形式（質問→簡潔な回答）になっていない可能性があります。'
              : 'FAQが未整備、またはAIが参照しにくい形式です。構造化FAQの設置を最優先で検討してください。',
      },
      googleMap: {
        score: gmap,
        label: tierLabel(gmap),
        text:
          gmap >= 70
            ? 'Google Business Profileの基本情報・カテゴリ・写真は整備されています。口コミ返信と投稿頻度の最適化でさらに強化可能です。'
            : gmap >= 40
              ? 'GBPの情報更新・カテゴリ設定・口コミ数に改善余地があります。AI Overview連動の観点から優先対策を推奨します。'
              : 'GoogleMap上の店舗情報が不十分な可能性が高いです。プロフィール完成度の向上が急務です。',
      },
      aiCitation: {
        score: citation,
        label: tierLabel(citation),
        text:
          citation >= 70
            ? 'Web上の情報がAIに引用されやすい状態に近づいています。公式サイトとGBPの情報整合性を維持してください。'
            : citation >= 40
              ? 'AIが参照する情報源（公式サイト・GBP・第三者メディア）での言及が限定的です。'
              : 'AI引用に必要な構造化コンテンツと外部シグナルが不足しています。',
      },
      reviews: {
        score: reviews,
        label: tierLabel(reviews),
        text:
          reviews >= 70
            ? '口コミの量と質は競合比較で優位に立てる水準です。返信率と最新性の維持を継続してください。'
            : reviews >= 40
              ? '口コミ数または評価に改善余地があります。AI推薦は口コミシグナルを重視する傾向があります。'
              : '口コミが少ない、または評価が低い状態です。GBP口コミ獲得施策が優先課題です。',
      },
    },
    page3: {
      chatgpt: {
        score: Math.round(visibility * 0.95 + citation * 0.05),
        text:
          visibility >= 50
            ? 'ChatGPT検索において、地域×業種クエリでの言及可能性は中程度以上です。'
            : 'ChatGPT検索結果での店舗言及は限定的です。構造化データとFAQ整備が有効です。',
      },
      gemini: {
        score: Math.round(visibility * 0.9 + gmap * 0.1),
        text:
          gmap >= 50
            ? 'Gemini / AI OverviewはGoogleMapシグナルを参照するため、GBP最適化との相性は良好です。'
            : 'Gemini表示にはGoogleMap情報の充実が不可欠です。GBP改善が最優先です。',
      },
      competitor: {
        text: `${data.area}エリアの${data.industry}業種では、AI推薦を獲得している競合が先行している可能性があります。Local GEO Score ${local}点は、同業種平均と比較して${local >= 55 ? '平均以上' : '平均以下'}の推定です。`,
      },
      improvements: [
        faq < 60 ? 'FAQページの新設・構造化（地域名+業種キーワードを含むQ&A）' : null,
        gmap < 60 ? 'Google Business Profileの情報完成度向上（カテゴリ・説明文・写真）' : null,
        citation < 60 ? '公式サイトの構造化マークアップ（LocalBusiness / FAQPage）' : null,
        reviews < 60 ? '口コミ獲得・返信率の改善' : null,
        recommendation < 60 ? 'AI推薦向けコンテンツ（比較・選び方・地域特化情報）の追加' : null,
      ].filter((item): item is string => item !== null),
      localGeoProposal:
        'GEO Search Protocol™ for Local では、AI露出診断→情報設計→優先3項目の実装を伴走型で支援します。まずはGBP・FAQ・構造化データの3点セットから着手することを推奨します。',
    },
  };
}
