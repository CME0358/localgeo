import type { LandingPageContent } from '@/lib/types/content';

export const defaultLanding: LandingPageContent = {
  meta: {
    title: 'Agent Readiness Index™｜SEO・MEO・AI検索対策 — Local GEO™',
  },
  nav: {
    logo: 'Agent Readiness',
    logoAccent: 'Index',
    links: [
      { label: '課題', href: '#problem' },
      { label: '比較', href: '#comparison' },
      { label: 'AI診断', href: '#diagnosis' },
      { label: '料金', href: '#pricing' },
      { label: '無料AI診断', href: '#diagnosis', variant: 'cta' },
    ],
  },
  hero: {
    eyebrow: 'Agent Readiness Index™ · AI Search Readiness for Local Business',
    titleLines: ['SEO・MEO対策だけでは、', 'もう', '。', 'これからは', 'される店舗へ。'],
    titleAccent: '不十分',
    titleAiText: 'AIに推薦',
    titleAiHighlightLines: ['AIに', '推薦'],
    subtitleLines: [
      'ChatGPT・Gemini・Google AI Overviewが、',
      '店舗やサービスを比較し、推薦する時代。',
      'SEOやGoogleマップの順位だけでなく、',
      'AIに正しく理解・評価される状態が',
      '重要になっています。',
    ],
    platformBadges: [
      'ChatGPT 店舗集客',
      'Gemini 対応',
      'AI Overview 対応',
      'Googleマップ 最適化',
    ],
    primaryCta: { label: '🔍 無料AI推薦診断', href: '#diagnosis' },
    secondaryCta: { label: '詳しく見る →', href: '#comparison' },
    visual: {
      dashboardTitle: 'Agent Readiness Dashboard',
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
        { value: '94', label: 'AI Visibility' },
        { value: '87', label: 'ARI Score' },
      ],
    },
  },
  problem: {
    eyebrow: '問題提起',
    titleLines: ['こんな検索が、', 'もう始まっています。'],
    subtitleLines: [
      'ユーザーはもはや「検索結果の一覧を比較」しません。',
      'ChatGPTやGeminiが直接「おすすめ店舗」を答える、AI検索対策の時代です。',
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
    eyebrow: 'SEO・MEO対策とAI検索対策の違い',
    titleLines: ['検索で「見つかる」だけでは、', 'AIに「選ばれる」とは限らない。'],
    subtitleLines: [
      '従来のSEO・MEO対策では、Google検索やGoogleマップで見つけてもらうための最適化が中心でした。',
      '一方、AI検索では、「AIが店舗やサービスをどう理解し、比較し、推薦するか」という視点が重要になります。',
    ],
    old: {
      label: '⬛ 従来のSEO / MEO',
      title: '検索・マップで見つけてもらう',
      items: [
        { text: 'Google検索での表示' },
        { text: 'Googleマップ上での順位' },
        { text: 'Googleビジネスプロフィールの整備' },
        { text: '口コミ・評価の管理' },
        { text: 'Webコンテンツ / SEO' },
      ],
      footer: '↓ ユーザーが複数を見比べる前提の戦略',
    },
    new: {
      label: '✦ Agent Readiness Index™',
      title: 'AIに理解・比較・推薦される状態を確認',
      items: [
        { text: 'AI検索上のVisibility確認' },
        { text: '店舗・サービス情報の理解性' },
        { text: 'ChatGPT / Gemini等での推薦状況' },
        { text: 'FAQ・コンテンツのAI理解性' },
        { text: '予約・問い合わせ導線の確認' },
      ],
      footer: 'ARIで現状を診断し、Local GEO™で改善',
    },
  },
  services: {
    eyebrow: '業種別 店舗 AI検索対策',
    titleLines: ['あなたの業種に特化した', 'AI推薦戦略を設計。'],
    cards: [
      {
        icon: '🦷',
        iconVariant: 'blue',
        name: '歯科医院',
        queries: ['近くで土曜診療している歯医者', 'インプラントに強い歯科'],
        description:
          '診療内容・地域・診療時間・専門性などが、AIに正しく理解され、推薦候補になっているかを確認。',
      },
      {
        icon: '🏥',
        iconVariant: 'green',
        name: 'クリニック・医院',
        queries: ['駅近で予約が取りやすいクリニック', '小児科に対応している医院'],
        description:
          '診療科目・地域・アクセス・予約導線などが、AI検索上で正しく伝わっているかを確認。',
      },
      {
        icon: '💉',
        iconVariant: 'pink',
        name: '美容クリニック',
        queries: ['ダーマペンが評判の美容クリニック', '初回カウンセリング無料のクリニック'],
        description:
          '施術内容・料金・実績・地域などが、AIに正しく理解され、比較候補になっているかを確認。',
      },
      {
        icon: '💆‍♀️',
        iconVariant: 'pink',
        name: 'エステ・美容サロン',
        queries: ['毛穴ケアが評判の近くのエステ', '初回体験ができる美容サロン'],
        description:
          '施術メニュー・悩み別対応・地域・口コミなどが、AI推薦候補として認識されているかを確認。',
      },
      {
        icon: '✂️',
        iconVariant: 'green',
        name: '美容室・ヘアサロン',
        queries: ['縮毛矯正が得意な近くの美容室', 'メンズカットが評判のサロン'],
        description:
          '技術・スタイル・スタイリスト・立地などが、AI検索上で正しく伝わっているかを確認。',
      },
      {
        icon: '🦴',
        iconVariant: 'blue',
        name: '整体・整骨院',
        queries: ['肩こりに対応している近くの整体', '産後ケアができる整骨院'],
        description:
          '症状・施術内容・地域・特徴をAIが正しく理解できる状態を確認。',
      },
      {
        icon: '🏋️',
        iconVariant: 'green',
        name: 'パーソナルジム・フィットネス',
        queries: ['初心者向けの近くのパーソナルジム', '女性向けで通いやすいジム'],
        description:
          '対象ユーザー・目的・料金・立地などが、AI検索上で正しく伝わっているかを確認。',
      },
      {
        icon: '🍽️',
        iconVariant: 'pink',
        name: '飲食店',
        queries: ['デート向けの静かなレストラン', '子連れOKの近くのカフェ'],
        description:
          '料理ジャンル・雰囲気・立地・予約導線などが、AIに正しく理解され、推薦候補になっているかを確認。',
      },
      {
        icon: '🏠',
        iconVariant: 'blue',
        name: '不動産・地域サービス',
        queries: ['駅近の賃貸マンションを探している', '地域密着の修繕業者を探している'],
        description:
          'エリア・サービス内容・強み・問い合わせ導線などが、AI検索上で正しく伝わっているかを確認。',
      },
    ],
  },
  competition: {
    eyebrow: '競合比較',
    titleLines: ['AIは、どの店舗を', '推薦しているか？'],
    subtitleLines: [
      '今この瞬間も、競合がChatGPTやGoogleマップ経由で集客し続けています。',
      '差は、じわじわと広がっていきます。',
    ],
    headers: ['確認項目', 'あなたの店舗', '競合A', '競合B\nAI推薦されている競合'],
    competitorBCta: {
      label: 'あなたの店舗はAIからどう見えている？無料AI推薦診断で確認',
      href: '#diagnosis',
    },
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
        label: 'Googleマップ広告最適化',
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
    subtitle: '実際のChatGPT検索結果ベースで、AI検索上の表示・推薦状況の変化を公開します。',
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
        'Googleマップ広告最適化',
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
      '表示状況とスコアを無料で診断。店舗 AI検索対策の第一歩に。',
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
    titleLines: ['シンプルな', '月払い・年払い。'],
    subtitleLines: [
      'SEO・MEO・AI検索対策を含む契約・運用・レポートまで全て込み。',
      '余計なオプションや隠れコストは一切ありません。',
    ],
    badge: '✦ Agent Readiness Index™ for Local',
    serviceName: 'Full Protocol Plan',
    currency: '¥',
    paymentOptions: {
      monthly: {
        label: '月払い',
        amount: '60,000',
        per: '/ 月額（税別） · 12ヶ月契約',
      },
      annual: {
        label: '年払い',
        amount: '600,000',
        per: '/ 年額（税別） · 一括請求',
        discountLabel: '約17%OFF',
        discountNote: '月払い12ヶ月分（¥720,000）比 · 2ヶ月分お得',
      },
    },
    features: [
      'Local GEO™戦略設計',
      'Googleマップ最適化（MEO対策）',
      'AI推薦対策（ChatGPT/Gemini）',
      'AI引用・エンティティ強化',
      'FAQ構造化（Schema markup）',
      '口コミ収集・最適化設計',
      'Googleマップ広告最適化',
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
      'MEO対策の費用感も含め、診断後に担当者よりご提案いたします。',
      '他社MEO対策からの乗り換えもご相談ください。',
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
    brand: 'Agent Readiness',
    brandAccent: 'Index',
    companyName: '合同会社コア・リテール（CoaRetail G.K.）',
    companyUrl: 'https://www.coaretail.com',
    privacyLabel: 'プライバシーポリシー',
    privacyUrl: 'https://www.coaretail.com/lp_privacy',
    copyright: '© 2026 CoaRetail G.K. All rights reserved.',
  },
};

/** @deprecated use defaultLanding */
export const defaultLandingContent = defaultLanding;
