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
    'Agent Readiness Index™・Local GEO™・',
    'SEO / MEO・AI検索対策について、',
    'よくいただく質問をまとめました。',
  ],
} as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'AI検索対策とは何ですか？',
    lead:
      'AI検索対策とは、ChatGPT・Gemini・Google AI Overviewなど、AIが店舗やサービスを比較・推薦する環境に向けて、情報を整える取り組みです。',
    bullets: [
      'AIが参照しやすいFAQ・構造化データの整備',
      '店舗・サービス内容の明確化',
      '公式情報と第三者情報の整合性向上',
    ],
    closing:
      'SEO・MEO対策が「検索やマップで見つけてもらう」ための施策であるのに対し、AI検索対策は「AIが正しく理解し、比較・推薦できる状態」を確認・改善する視点を加えます。どちらも店舗集客の重要な基盤です。',
  },
  {
    question: 'SEO・MEO対策との違いは何ですか？',
    lead:
      'SEO・MEO対策は、Google検索やGoogleマップで店舗を「見つけてもらう」ための施策です。AI検索対策では、AIが情報を正しく理解し、比較・推薦できる状態も確認します。',
    bullets: [
      'SEO / MEO：Google検索・マップ順位・GBP・口コミなど',
      'AI検索対策：FAQ構造化・エンティティ強化・AI引用設計など',
    ],
    closing:
      'Local GEO™は、SEO・MEO対策とAI検索対策の両方を統合して支援します。SEO・MEOは依然として重要な基盤です。',
  },
  {
    question: 'Agent Readiness Index™とは何ですか？',
    lead:
      'Agent Readiness Index™は、ChatGPTやGeminiなどのAIが、店舗・企業・サービスをどの程度発見し、内容を理解し、ユーザーの条件に応じて推薦できる状態にあるかを確認する評価の考え方です。',
    bullets: [
      'AI検索上のVisibility（表示・引用状況）',
      '店舗・サービス情報の理解性',
      '競合との比較・推薦候補としての位置づけ',
    ],
    closing:
      '無料AI推薦診断では、この考え方に沿って現状スコアと改善ポイントを可視化します。',
  },
  {
    question: 'Local GEO™とは何ですか？',
    lead:
      'Local GEO™は、Agent Readiness Index™等で把握したAI検索上の課題をもとに、店舗情報、Webコンテンツ、FAQ、Googleビジネスプロフィール等を整理し、AIに正しく理解・推薦されやすい状態を目指す改善サービスです。',
    bullets: [
      'AI理解最適化',
      'FAQ構造化',
      'Googleマップ最適化（MEO）',
      'エンティティ強化',
    ],
    closing:
      '従来のSEO・MEOに加え、AI検索時代の店舗集客を支援する月額60,000円の改善サービスです。',
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
      'Local GEO™では、これらの改善をAgent Readiness Index™の診断結果に沿って支援します。',
  },
  {
    question: 'Googleマップ集客とAI検索対策はどう関係しますか？',
    lead:
      'Googleマップ集客（MEO対策）は、地域検索で店舗を見つけてもらう従来型の集客導線です。AI検索対策は、ChatGPTなどで店舗が比較・推薦される新しい導線への対応です。',
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
      'Full Protocol Plan（SEO・MEO・AI検索対策を含む契約・運用・レポート込み）の料金は以下の通りです。',
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
      'SEO・MEOとAI検索の横断的な情報設計',
      'FAQ構造化・スキーママークアップ',
      'AI露出の継続モニタリング',
    ],
    closing:
      'などは専門知識と運用工数が必要になることがあります。Local GEO™は、これらを体系的に支援したい店舗向けのサービスです。',
  },
  {
    question: 'MEO対策会社を選ぶポイントは？',
    lead:
      'MEO対策会社・AI検索対策支援を選ぶ際は、以下の点を確認することをおすすめします。',
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
    bullets: [
      '歯科医院・クリニック・美容クリニック',
      'エステ・美容サロン・美容室',
      '整体・整骨院・パーソナルジム',
      '飲食店・不動産・地域サービス',
    ],
    closing:
      '宿泊施設・士業・スクールなど、その他の地域密着型店舗についてもご相談ください。',
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
