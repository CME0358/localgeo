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
    'MEO対策・GEO対策・',
    'AI検索対策について、',
    'よくいただく質問をまとめました。',
  ],
} as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'MEO対策とは何ですか？',
    lead:
      'MEO対策（Map Engine Optimization）とは、GoogleマップやGoogle検索で店舗情報を見つけてもらいやすくするための取り組みです。主な内容は、',
    bullets: [
      'Googleビジネスプロフィール（GBP）の情報整備',
      'Googleマップ上の順位・表示改善',
      '口コミの獲得と返信',
      '店舗情報の正確性・一貫性の維持',
    ],
    closing:
      '地域で店舗を探すユーザーに、Googleマップ経由で発見されやすくすることを目的とします。',
  },
  {
    question: 'MEO対策とGEO対策の違いは何ですか？',
    lead:
      'MEO対策は、GoogleマップやGoogle検索で店舗を「発見されやすくする」施策です。一方、GEO対策（AI検索対策）は、ChatGPTやGeminiなどのAIサービスが店舗情報を「理解・比較・推薦しやすい状態」に整える施策です。',
    bullets: [
      'MEO：Googleマップ順位・GBP・口コミなど',
      'GEO：FAQ構造化・エンティティ強化・AI引用設計など',
    ],
    closing:
      'Local GEO™は、店舗集客の観点からMEO対策とGEO対策の両方を統合して支援します。MEO対策は依然として重要な基盤です。',
  },
  {
    question: 'GEO対策・AI検索対策とは何ですか？',
    lead:
      'GEO対策（Generative Engine Optimization）・AI検索対策とは、ChatGPT・Gemini・Google AI Overviewなど、生成AIによる検索・推薦環境に向けて店舗情報を整える取り組みです。',
    bullets: [
      'AIが参照しやすいFAQ・構造化データの整備',
      '店舗・サービス内容の明確化',
      '公式情報と第三者情報の整合性向上',
    ],
    closing:
      '表示や順位を保証するものではありませんが、AIが店舗を理解し、比較候補として扱われやすい情報環境を目指します。',
  },
  {
    question: 'Local GEO™とは何ですか？',
    lead:
      'Local GEO™は、合同会社コア・リテールが提供する、地域店舗向けのMEO対策・GEO対策（AI検索最適化）サービスです。Googleマップ最適化に加え、',
    bullets: [
      'AI理解最適化',
      'FAQ構造化',
      'AI引用対策',
      'Googleマップ最適化',
      'エンティティ強化',
    ],
    closing:
      'などを通じて、従来のローカルSEOに加え、AI検索時代の店舗集客を支援します。',
  },
  {
    question: 'ChatGPTにおすすめの店舗として表示されるには？',
    lead:
      'ChatGPTなどのAI検索での表示・推薦を保証するものではありません。ただし、以下の整備により、AIが店舗情報を理解しやすい状態を目指せます。',
    bullets: [
      '公式サイト・GBPの情報を明確に整備する',
      'FAQを構造化し、サービス内容を理解しやすくする',
      '口コミや第三者情報との整合性を高める',
    ],
    closing:
      'Local GEO™では、これらの改善をGEO Search Protocol™ for Localに沿って支援します。',
  },
  {
    question: 'Googleマップ集客とAI検索対策はどう関係しますか？',
    lead:
      'Googleマップ集客（MEO対策）は、地域検索で店舗を見つけてもらう従来型の集客導線です。AI検索対策（GEO対策）は、ChatGPTなどで店舗が比較・推薦される新しい導線への対応です。',
    bullets: [
      'Googleマップ：発見・来店検索の入口',
      'AI検索：比較・おすすめ検索の入口',
    ],
    closing:
      '両方の情報基盤（GBP・公式サイト・FAQなど）を整えることで、店舗集客の選択肢を広げられます。',
  },
  {
    question: 'Local GEOの料金はいくらですか？',
    lead:
      'Full Protocol Plan（MEO対策・GEO対策を含む契約・運用・レポート込み）の料金は以下の通りです。',
    bullets: [
      '月払い：60,000円/月（税別）· 12ヶ月契約',
      '年払い：600,000円/年（税別）· 一括請求（約17%OFF）',
    ],
    closing:
      '余計なオプションや隠れコストはありません。詳細はページ内の料金セクションをご確認ください。',
  },
  {
    question: 'MEO対策やAI検索対策は自分でもできますか？',
    lead:
      'GBPの基本情報更新や口コミ返信など、基本的な情報メンテナンスは店舗側でも可能です。一方、',
    bullets: [
      'MEOとGEOの横断的な情報設計',
      'FAQ構造化・スキーママークアップ',
      'AI露出の継続モニタリング',
    ],
    closing:
      'などは専門知識と運用工数が必要になることがあります。Local GEO™は、これらを体系的に支援したい店舗向けのサービスです。',
  },
  {
    question: 'MEO対策会社を選ぶポイントは？',
    lead:
      'MEO対策会社・GEO対策会社を選ぶ際は、以下の点を確認することをおすすめします。',
    bullets: [
      '提供内容（GBP運用・口コミ・サイト・AI対策など）が明確か',
      'レポート内容と改善提案の透明性',
      'ビジネス資産（GBP・サイト）の所有権・アクセス権',
      'AI検索の変化への対応方針があるか',
      '順位・表示の保証など非現実的な約束をしていないか',
    ],
    closing:
      'Local GEO™が適合するかどうかは、無料AI推薦診断で現状を確認したうえでご判断いただけます。',
  },
  {
    question: 'どんな業種・店舗が対象ですか？',
    lead: '現在は主に、地域検索との相性が強い以下の店舗業種へ対応しています。',
    bullets: ['エステサロン', '整体・整骨院', '美容室', '飲食店・バー'],
    closing:
      '歯科医院・クリニック・フィットネスなど、その他の地域密着型店舗についてもご相談ください。',
  },
  {
    question: 'どうやって始められますか？',
    lead:
      'まずはページ下部の無料AI推薦診断で、店舗のLocal GEO Scoreと改善ポイントを確認できます。診断後、',
    bullets: [
      '改善レポートの確認',
      'Zoomでの情報交換（希望者）',
      'Full Protocol Planのご契約',
    ],
    closing: 'という流れで開始します。診断は無料で、契約の義務はありません。',
  },
  {
    question: '無料AI推薦診断では何が分かりますか？',
    lead: '無料診断では、',
    bullets: [
      'Local GEO Score',
      'AI Visibility Score',
      'FAQ最適化状況',
      'Googleマップ最適化率',
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
