export type AiSignalIcon =
  | 'google-map'
  | 'faq'
  | 'reviews'
  | 'mention'
  | 'entity'
  | 'local';

export interface AiSignal {
  title: string;
  description: string;
  icon: AiSignalIcon;
}

export const AI_SIGNALS: AiSignal[] = [
  {
    icon: 'google-map',
    title: 'GoogleMap情報',
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
  eyebrow: 'AI検索時代の構造変化',
  titleLines: ['GoogleMap順位だけでは、', '選ばれなくなる。'],
  meoIntro: '従来のMEOでは、',
  meoFocusItems: ['GoogleMap順位', '口コミ数', 'GBP運用'],
  meoFocusSuffix: 'が中心でした。',
  aiIntro: 'しかしAI検索では、',
  aiFocus: '“AIが店舗をどう理解しているか”',
  aiFocusSuffix: 'が重要になります。',
  aiSignalsTitleLines: ['AIは、', 'こんな情報を見ています。'],
  aiSignalsFooterLines: ['AIが、', '“おすすめ店舗”', 'を選び始めています。'],
  flowSteps: ['検索', 'AIが店舗を理解', 'AIが推薦', '来店'],
  old: {
    label: '⬛ 従来のMEO',
    title: '検索後の戦い',
    items: [
      'GoogleMap上での順位競争',
      'GBP（Googleビジネスプロフィール）の運用',
      '口コミ件数・評価の管理',
      '写真・営業時間の最新化',
    ],
    footer: '↓ ユーザーが複数を見比べる前提の戦略',
  },
  new: {
    label: '✦ GEO Search Protocol™',
    title: 'AIに選ばれる戦い',
    items: [
      'AI検索最適化・エンティティ強化',
      'ChatGPT / Gemini への引用設計',
      'AI Overview対応のFAQ構造化',
      'GoogleMap広告との統合最適化',
    ],
    footer: '→ AIが「あなたの店舗」を推薦するよう設計',
  },
} as const;
