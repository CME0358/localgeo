export type AiSignalIcon =
  | 'google-map'
  | 'faq'
  | 'reviews'
  | 'mention'
  | 'entity'
  | 'local'
  | 'organic';

export interface AiSignal {
  title: string;
  description: string;
  icon: AiSignalIcon;
}

export const AI_SIGNALS: AiSignal[] = [
  {
    icon: 'organic',
    title: 'オーガニック検索',
    description: 'Google検索・地域キーワード・公式サイトでの表示と評価。',
  },
  {
    icon: 'google-map',
    title: 'Googleマップ情報',
    description: '営業時間・カテゴリ・位置情報など、店舗基本情報の整合性。',
  },
  {
    icon: 'faq',
    title: 'FAQ構造',
    description: 'AIが理解しやすい質問・回答設計。',
  },
  {
    icon: 'reviews',
    title: '口コミ内容',
    description: 'AIは、口コミ数だけではなく“内容”も理解しています。',
  },
  {
    icon: 'mention',
    title: '外部Mention',
    description: 'Web上での店舗言及や情報引用状況。',
  },
  {
    icon: 'entity',
    title: '店舗エンティティ',
    description: '店舗情報の一貫性や認識されやすさ。',
  },
  {
    icon: 'local',
    title: '地域情報整合性',
    description: 'エリア情報や地域文脈との関連性。',
  },
];

export const COMPARISON_SECTION = {
  eyebrow: 'オーガニック検索対策とAI検索対策の違い',
  titleLines: ['検索で「見つかる」だけでは、', 'AIに「選ばれる」とは限らない。'],
  meoIntro:
    'オーガニック検索対策（SEO・MEO）では、Google検索やGoogleマップで見つけてもらうための最適化が中心です。',
  meoFocusItems: [] as string[],
  meoFocusSuffix: '',
  aiIntro: '一方、AI検索対策では、',
  aiFocus: '「AIが店舗やサービスをどう理解し、比較し、推薦するか」',
  aiFocusSuffix: 'という視点が重要になります。SEO・MEOに加えて、両方を整えることが重要です。',
  aiSignalsTitleLines: ['AIは、', 'こんな情報を見ています。'],
  aiSignalsFooterLines: ['AIが、', '“おすすめ店舗”', 'を選び始めています。'],
  flowSteps: ['検索', 'AIが店舗を理解', 'AIが推薦', '来店'],
  old: {
    label: '⬛ オーガニック検索対策（SEO・MEO）',
    title: '検索・マップで見つけてもらう',
    items: [
      'Google検索での表示・順位',
      'Googleマップ上での順位（MEO）',
      'Googleビジネスプロフィール（GBP）整備',
      '口コミ・評価の管理',
      '公式サイト / ローカルSEOコンテンツ',
      '地域キーワード・店舗名検索の最適化',
      '構造化データ（Schema markup）',
    ],
    footer: '↓ ユーザーが複数を見比べる前提の戦略',
  },
  new: {
    label: '✦ Agent Readiness Index™',
    title: 'AIに理解・比較・推薦される状態を確認',
    items: [
      'AI検索上のVisibility確認',
      '店舗・サービス情報の理解性',
      'ChatGPT / Gemini等での推薦状況',
      'FAQ・コンテンツのAI理解性',
      '予約・問い合わせ導線の確認',
    ],
    footer: 'ARIで現状を診断し、Local GEO™で改善',
  },
} as const;
