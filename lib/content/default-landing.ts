import type { LandingPageContent } from '@/lib/types/content';

export const defaultLanding: LandingPageContent = {
  meta: {
    title: 'GEO Search Protocol™ for Local | AI推薦時代のローカル最適化',
  },
  nav: {
    logo: 'GEO Search',
    logoAccent: 'Protocol',
    links: [
      { label: '課題', href: '#problem' },
      { label: '比較', href: '#comparison' },
      { label: 'AI診断', href: '#diagnosis' },
      { label: '料金', href: '#pricing' },
      { label: '無料AI診断', href: '#diagnosis', variant: 'cta' },
    ],
  },
  hero: {
    eyebrow: 'AI Search Era · 2026',
    titleLines: ['MEOだけでは、', 'もう', '。', 'これからは', 'される店舗へ。'],
    titleAccent: '不十分',
    titleAiText: 'AIに推薦',
    titleAiHighlightLines: ['AIに', '推薦'],
    subtitleLines: [
      'ChatGPT・Gemini・Google AI Overviewが',
      '「おすすめ店舗」を表示する時代。',
      '今までのGoogleMapの順位だけでは、',
      '選ばれなくなってしまいます。',
    ],
    platformBadges: [
      'ChatGPT 対応',
      'Gemini 対応',
      'AI Overview 対応',
      'GoogleMap 最適化',
    ],
    primaryCta: { label: '🔍 無料AI推薦診断', href: '#diagnosis' },
    secondaryCta: { label: '詳しく見る →', href: '#comparison' },
    visual: {
      dashboardTitle: 'AI Visibility Dashboard',
      queryLabel: 'ChatGPT — 検索クエリ',
      queryText: '「渋谷でおすすめのエステサロンを教えて」',
      results: [
        {
          rank: 1,
          name: 'Beauty Salon Lumière',
          meta: '恵比寿 · エステ · ★4.9',
          badge: 'AI推薦',
          featured: true,
        },
        {
          rank: 2,
          name: 'TOTAL BEAUTY SALON',
          meta: '渋谷 · フェイシャル',
        },
        {
          rank: 3,
          name: 'Salon de Belle',
          meta: '原宿 · フェイシャル',
        },
      ],
      scores: [
        { value: '94', label: 'AI Visibility Score' },
        { value: '87', label: 'GEO Score' },
      ],
    },
  },
  problem: {
    eyebrow: '問題提起',
    titleLines: ['こんな検索が、', 'もう始まっています。'],
    subtitleLines: [
      'ユーザーはもはや「検索結果の一覧を比較」しません。',
      'AIが直接「おすすめ店舗」を答える時代になっています。',
    ],
    browserQuery: '🔍 「近くの評判が良い整体院 渋谷区」',
    traditionalLabel: '📋 従来の検索結果',
    traditionalResults: [
      {
        url: 'https://example-seitai.com',
        title: '渋谷区の整体院 ○○整体院｜口コミ多数',
        description:
          '渋谷区で人気の整体院。肩こり・腰痛・産後ケア対応。予約はこちらから…',
      },
      {
        url: 'https://another-seitai.co.jp',
        title: '△△整骨院 渋谷｜施術メニュー一覧',
        description:
          '国家資格者在籍。各種保険対応。渋谷駅徒歩3分。初回限定割引あり…',
      },
    ],
    traditionalNote: '↑ ユーザーは比較することに疲れています',
    aiLabel: '🤖 AI推薦 (ChatGPT / Gemini)',
    aiBrandName: 'AI回答',
    aiAnswer:
      '渋谷区で評判の良い整体院をご紹介します。「さくら整体院」は口コミ評価が高く、腰痛専門の施術が好評です。「Healio整骨院」も渋谷駅近くで国家資格者在籍、保険対応も可能です。',
    aiAnswerHighlights: ['「さくら整体院」', '「Healio整骨院」'],
    shopCards: [
      {
        icon: '🌸',
        name: 'さくら整体院',
        meta: '渋谷区 · ★4.9 · 口コミ247件',
        badge: 'AI推薦',
        featured: true,
      },
      {
        icon: '💆',
        name: 'Healio整骨院',
        meta: '渋谷 · ★4.7 · 保険対応',
      },
    ],
  },
  comparison: {
    eyebrow: 'AI検索時代の構造変化',
    titleLines: ['GoogleMap順位だけでは、', '選ばれなくなる。'],
    subtitleLines: [
      '従来のMEOでは、GoogleMap順位・口コミ数・GBP運用が中心でした。',
      'しかしAI検索では、“AIが店舗をどう理解しているか”が重要になります。',
    ],
    old: {
      label: '⬛ 従来のMEO',
      title: '検索後の戦い',
      items: [
        { text: 'GoogleMap上での順位競争' },
        { text: 'GBP（Googleビジネスプロフィール）の運用' },
        { text: '口コミ件数・評価の管理' },
        { text: '写真・営業時間の最新化' },
      ],
      footer: '↓ ユーザーが複数を見比べる前提の戦略',
    },
    new: {
      label: '✦ GEO Search Protocol™',
      title: 'AIに選ばれる戦い',
      items: [
        { text: 'AI検索最適化・エンティティ強化' },
        { text: 'ChatGPT / Gemini への引用設計' },
        { text: 'AI Overview対応のFAQ構造化' },
        { text: 'GoogleMap広告との統合最適化' },
      ],
      footer: '→ AIが「あなたの店舗」を推薦するよう設計',
    },
  },
  services: {
    eyebrow: '業種別 対応メニュー',
    titleLines: ['あなたの業種に特化した', 'AI推薦戦略を設計。'],
    cards: [
      {
        icon: '💆‍♀️',
        iconVariant: 'pink',
        name: 'エステサロン',
        description:
          '「肌荒れ」「毛穴ケア」「痩身」など悩み別のAI引用設計で、検索意図に完全マッチした推薦を実現。',
        features: [
          '「渋谷 おすすめエステ」AI推薦対策',
          'ビフォーアフター口コミの構造化',
          '施術別FAQ / Schema markup',
          'AI推薦スコア月次モニタリング',
        ],
      },
      {
        icon: '🦴',
        iconVariant: 'blue',
        name: '整体・整骨院',
        description:
          '「腰痛」「肩こり」「産後ケア」など症状別のAI認識を最適化し、地域No.1の推薦ポジションを確立。',
        features: [
          '「近くの整体」AI推薦ポジション強化',
          '症状別FAQ構造化（腰痛・肩こり等）',
          '保険対応・国家資格 エンティティ強化',
          'GoogleMap広告との統合最適化',
        ],
      },
      {
        icon: '✂️',
        iconVariant: 'green',
        name: '美容室',
        description:
          '「縮毛矯正」「カラーリング」「トリートメント」などスタイル別のAI引用設計で指名検索を促進。',
        features: [
          'スタイル・技術別AI推薦最適化',
          'スタイリスト別エンティティ構築',
          '写真・口コミのAI認識最適化',
          'SNS連携AI Visibility強化',
        ],
      },
    ],
  },
  competition: {
    eyebrow: '競合比較',
    titleLines: ['AIは、どの店舗を', '推薦しているか？'],
    subtitleLines: [
      '今この瞬間も、競合がAIに推薦され続けています。',
      '差は、じわじわと広がっていきます。',
    ],
    headers: ['確認項目', 'あなたの店舗', '競合A', '競合B（GEO導入済）'],
    rows: [
      {
        label: 'ChatGPTへの表示・推薦',
        yours: 'no',
        competitorA: 'partial',
        competitorB: 'yes',
      },
      {
        label: 'Gemini AIでの推薦',
        yours: 'no',
        competitorA: 'no',
        competitorB: 'yes',
      },
      {
        label: 'Google AI Overviewへの表示',
        yours: 'no',
        competitorA: 'partial',
        competitorB: 'yes',
      },
      {
        label: 'FAQ構造化（AI引用設計）',
        yours: 'no',
        competitorA: 'no',
        competitorB: 'yes',
      },
      {
        label: 'GoogleMap広告最適化',
        yours: 'partial',
        competitorA: 'partial',
        competitorB: 'yes',
      },
      {
        label: '月次AI Visibilityレポート',
        yours: 'no',
        competitorA: 'no',
        competitorB: 'yes',
      },
    ],
  },
  caseStudy: {
    eyebrow: '導入事例',
    titleLines: ['AI検索時代、', '"選ばれる店舗"は', '変わり始めています。'],
    subtitle: '実際の検索結果ベースで、対策の有無による差分を公開します。',
    badge: 'CASE — 「恵比寿 地下バー」ChatGPT検索結果',
    images: [
      {
        url: '/images/case-secret-hp.png',
        alt: 'Bar SECRET 公式サイト',
        caption: '🌐 対象店舗 HP — Bar SECRET',
        browserUrl: 'barsecret.tokyo',
      },
      {
        url: '/images/case-chatgpt-bar.png',
        alt: 'ChatGPT 恵比寿 地下バー 検索結果',
        caption: '🤖 ChatGPT検索結果 — 実名で推薦表示',
        browserUrl: 'chatgpt.com',
        zoomable: true,
      },
    ],
    storeInfo: {
      storeName: 'Bar SECRET',
      area: '(東京・恵比寿)',
      outcome: '→「おすすめ」として推薦表示を獲得',
    },
    before: {
      title: '導入前',
      items: [
        '飲食系ポータル・SNSでのPRのみ',
        'AI検索での推薦表示なし',
        '来店会話でAIの発展スピードを実感',
        'ChatGPT/Gemini経由来店なし',
      ],
    },
    after: {
      title: '導入後',
      items: [
        'HPリニューアル＋Local GEO™導入',
        'FAQ構造・AI理解用コンテンツ設計',
        '「おすすめ」として推薦表示を獲得',
        'GoogleMap広告最適化',
      ],
    },
    quote: {
      label: 'VOICE — オーナーコメント',
      lead: '「流入ではなく、意思決定の質が変わった」',
      bodyParagraphs: [
        '従来飲食系ポータルサイトやSNSでの発信でしかPRを行なっておらず、来店頂くお客様との会話の中からAIの発展スピードを痛感させられていたところ、Local GEO™のお話を頂き、HPリニューアルと同時にLocal GEO™を施しました。',
        'Local GEO™を施してから僅か2週間足らずで「ChatGPTを見てきたんですけど」というお客様が来店。この反応スピードには大変驚きました。',
        '激戦区でもある東京・恵比寿のバーでもLocal GEO™を施すと新規集客に繋がるという事が実証できた事、この激戦区・恵比寿の地で集客チャネルが手に入った事、大変感謝しております。',
      ],
    },
    results: {
      title: '実績サマリー',
      metrics: [
        {
          label: '施策',
          value: 'HP＋Local GEO™',
          description: '2026年4月',
        },
        {
          label: '結果',
          value: 'AI推薦表示',
          description: '獲得',
        },
        {
          label: '反応',
          value: '来店発生',
          description: 'ChatGPT経由',
        },
      ],
    },
    compare: [
      {
        variant: 'yes',
        title: 'Local GEO™ 対策あり',
        items: [
          '✓ 店名が表示される',
          '✓ 文脈で紹介される',
          '✓ 来店導線が成立',
        ],
      },
      {
        variant: 'no',
        title: 'Local GEO™ 対策なし',
        items: [
          '✗ 店名が出ない',
          '✗ 抽象カテゴリ扱い',
          '✗ 導線が存在しない',
        ],
      },
    ],
  },
  diagnosis: {
    eyebrow: '無料AI推薦診断',
    titleLines: ['あなたの店舗は、', 'AIに推薦されていますか？'],
    subtitleLines: [
      '店舗情報を入力するだけで、ChatGPT・Gemini・AI Overviewへの',
      '表示状況とスコアを無料で診断します。',
    ],
    form: {
      title: '無料AI推薦スコア診断',
      subtitle: '店舗名・地域・業種を入力するだけ。約30秒でスコアを表示。',
      fields: [],
      submitLabel: '🔍 AI推薦スコアを無料診断する',
      footnote: '診断結果はこの場で表示されます。完全無料・登録不要。',
    },
    dashboard: {
      idleLabel: '待機中',
      idleTitle: '診断結果がここに表示されます',
      reportBadge: 'PDFレポート',
      reportTitle: '詳細レポートをメールで受け取る',
      reportDesc: 'スコア詳細・改善提案をPDFでお届けします。',
      reportList: ['AI Visibility Score', '競合比較', '改善優先度'],
      reportSubmitLabel: 'レポートを送信',
      reportLoadingTitle: 'レポート生成中…',
      reportCompleteTitle: '送信完了',
      reportCompleteSub: 'メールをご確認ください。',
    },
  },
  pricing: {
    eyebrow: '料金プラン',
    titleLines: ['シンプルな', '月額プラン一択。'],
    subtitleLines: [
      '契約・運用・レポートまで全て込み。',
      '余計なオプションや隠れコストは一切ありません。',
    ],
    badge: '✦ GEO Search Protocol™ for Local',
    serviceName: 'Full Protocol Plan',
    currency: '¥',
    amount: '50,000',
    per: '/ 月額（税別） · 12ヶ月契約',
    features: [
      'Local GEO™戦略設計',
      'GoogleMap最適化',
      'AI推薦対策（ChatGPT/Gemini）',
      'AI引用・エンティティ強化',
      'FAQ構造化（Schema markup）',
      '口コミ収集・最適化設計',
      'GoogleMap広告最適化',
      '月次AI診断レポート',
      'Zoom月次MTG（20分）',
      '専任担当者アサイン',
    ],
    cta: {
      label: '無料診断を申し込む → AI推薦を獲得する',
      href: '#diagnosis',
    },
    noteLines: [
      '※ まずは無料のAI推薦診断からお気軽にどうぞ。',
      '診断後、担当者よりご提案いたします。',
    ],
  },
  finalCta: {
    titleLines: ['"検索される店舗"ではなく、', 'へ。'],
    titleHighlight: '"AIに推薦される店舗"',
    subtitleLines: [
      'まずは無料のAI推薦診断で、',
      '現状のスコアと改善余地をご確認ください。',
    ],
    primaryCta: {
      label: '🔍 無料AI推薦診断を始める',
      href: '#diagnosis',
    },
    secondaryCta: {
      label: '📞 Zoom無料相談を予約',
      href: 'https://www.coaretail.com/geo_schedule',
    },
  },
  footer: {
    brand: 'GEO Search',
    brandAccent: 'Protocol',
    companyName: '合同会社コア・リテール（CoaRetail G.K.）',
    companyUrl: 'https://www.coaretail.com',
    privacyLabel: 'プライバシーポリシー',
    privacyUrl: 'https://www.coaretail.com/lp_privacy',
    copyright: '© 2026 CoaRetail G.K. All rights reserved.',
  },
};

/** @deprecated use defaultLanding */
export const defaultLandingContent = defaultLanding;
