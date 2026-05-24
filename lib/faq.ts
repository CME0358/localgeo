import { SITE_URL } from '@/lib/constants/site';

export interface FaqItem {
  question: string;
  lead: string;
  bullets?: string[];
  closing?: string;
}

export const FAQ_SECTION = {
  eyebrow: 'FAQ',
  title: 'よくある質問',
  subtitleLines: [
    'Local GEO™や',
    'AI検索対策について、',
    'よくいただく質問をまとめました。',
  ],
} as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Local GEO™とは何ですか？',
    lead:
      'Local GEO™とは、ChatGPT・Gemini・Google AI Overview時代に向けた「AI検索最適化」サービスです。従来のMEO対策に加え、',
    bullets: [
      'AI理解最適化',
      'FAQ構造化',
      'AI引用対策',
      'GoogleMap最適化',
      'エンティティ強化',
    ],
    closing:
      'などを通じて、AIに「おすすめ店舗」として認識されやすい状態を目指します。',
  },
  {
    question: 'MEO対策との違いは何ですか？',
    lead:
      'MEOは主に、GoogleMap順位を上げるための施策です。一方Local GEO™は、「AIが店舗をどう理解・推薦するか」までを含めて最適化します。これからの検索では、順位だけではなく、',
    bullets: ['AI推薦', 'AI Overview', 'ChatGPT表示'],
    closing: 'などへの対応が重要になると考えています。',
  },
  {
    question: 'ChatGPTやGeminiに本当に表示されますか？',
    lead:
      'AI検索の表示ロジックは非公開のため、表示を保証するものではありません。ただし、',
    bullets: [
      'FAQ構造化',
      'GoogleMap情報整備',
      'AI引用設計',
      'エンティティ強化',
    ],
    closing:
      'などを行うことで、AIが店舗情報を理解しやすい状態を目指します。',
  },
  {
    question: 'どんな業種に対応していますか？',
    lead: '現在は主に、',
    bullets: ['エステサロン', '整体・整骨院', '美容室', '飲食店・バー'],
    closing:
      'など、地域検索との相性が強い店舗業種へ対応しています。今後さらに対応業種を拡大予定です。',
  },
  {
    question: '無料AI推薦診断では何が分かりますか？',
    lead: '無料診断では、',
    bullets: [
      'Local GEO Score',
      'AI Visibility Score',
      'FAQ最適化状況',
      'GoogleMap最適化率',
      'AI推薦可能性',
    ],
    closing:
      'などを分析し、AI検索時代における店舗Visibilityを可視化します。診断後は、改善ポイントや競合比較も確認できます。',
  },
];

export function faqItemToPlainText(item: FaqItem): string {
  const segments = [item.lead];

  if (item.bullets?.length) {
    segments.push(item.bullets.join('、'));
  }

  if (item.closing) {
    segments.push(item.closing);
  }

  return segments.join('');
}

export function buildFaqPageSchema() {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqItemToPlainText(item),
      },
    })),
  };
}
