/** サイト共通 SEO メタデータ（layout / schema / OGP の単一ソース） */
export const SITE_SEO = {
  /** ブランド */
  brandName: 'Agent Readiness Index',
  brandNameFull: 'Agent Readiness Index for Local',
  productName: 'Local GEO',
  productNameFull: 'Local GEO™',

  /** document title（ブラウザタブ・OG title） */
  title:
    'Agent Readiness Index™｜SEO・MEO・AI検索対策 — Local GEO™',

  /** meta description */
  description:
    'Agent Readiness Index™でAI検索上の現状を無料診断。SEO・MEOに加え、ChatGPT・Gemini・AI Overviewで推薦されやすい店舗へ。歯科・クリニック・エステ・整体・美容室ほか9業種対応。Local GEO™月額60,000円〜。',

  /** OGP / Twitter */
  ogImage: {
    url: '/images/geo-before-after.png',
    width: 800,
    height: 446,
    alt: 'Agent Readiness Index — AI検索で推薦される店舗への改善イメージ',
  },

  /** 検索キーワード（参考。主要KWDは title / description に含める） */
  keywords: [
    'Agent Readiness Index',
    'ARI',
    'AI検索対策',
    'SEO',
    'MEO',
    'Local GEO',
    'GEO対策',
    'ChatGPT 店舗集客',
    'Gemini 店舗',
    'AI Overview',
    'Googleマップ 最適化',
    '無料AI診断',
    '歯科医院 SEO',
    'クリニック MEO',
    'エステ AI検索',
  ],

  locale: 'ja_JP',
  dateModified: '2026-08-27',
} as const;

export const PAGE_DESCRIPTION = SITE_SEO.description;
