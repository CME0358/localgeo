export interface AiSignal {
  title: string;
  description: string;
}

export const AI_SIGNALS: AiSignal[] = [
  {
    title: 'GoogleMap情報',
    description: '営業時間・カテゴリ・位置情報など、店舗基本情報の整合性。',
  },
  {
    title: 'FAQ構造',
    description: 'AIが理解しやすい質問・回答設計。',
  },
  {
    title: '口コミ内容',
    description: 'AIは、口コミ数だけではなく“内容”も理解しています。',
  },
  {
    title: '外部Mention',
    description: 'Web上での店舗言及や情報引用状況。',
  },
  {
    title: '店舗エンティティ',
    description: '店舗情報の一貫性や認識されやすさ。',
  },
  {
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
    label: '⬛ 従来MEO',
    title: '検索後の戦い',
    items: ['GoogleMap順位競争', 'GBP運用', '口コミ管理'],
    footer: '↓ 検索後の競争',
  },
  new: {
    label: '✦ Local GEO™',
    title: 'AIに選ばれる戦い',
    items: [
      'AI理解最適化',
      'AI引用設計',
      'FAQ構造化',
      'エンティティ強化',
      'AI推薦最適化',
    ],
    footer: '↓ AIに選ばれる競争',
  },
} as const;
