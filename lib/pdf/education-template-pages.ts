/**
 * 教育・危機訴求テンプレート（4ページ）
 * 診断結果3ページの後にマージして送付する。
 * 構成: 危機フック → 原因 → 放置リスク → 改善ロードマップ＋サービス
 */
import { PDFDocument } from 'pdf-lib';
import type { DiagnosisResult } from '@/lib/types/diagnosis';
import {
  ACCENT,
  CARD,
  CONTENT_TOP,
  CONTENT_W,
  MARGIN,
  WARN,
  WHITE,
  addLandscapePage,
  drawHeader,
  fillPageBg,
  loadReportFonts,
  type ReportFonts,
} from '@/lib/pdf/pdf-layout';
import { drawJpLines, drawJpText, wrapJpLines } from '@/lib/pdf/jp-font-blocks';

function drawSectionTitle(page: ReturnType<typeof addLandscapePage>, fonts: ReportFonts, title: string, y: number): number {
  drawJpText(page, title, MARGIN, y, 16, fonts.jp, WHITE);
  return y - 28;
}

function drawBulletList(
  page: ReturnType<typeof addLandscapePage>,
  fonts: ReportFonts,
  items: string[],
  x: number,
  y: number,
  maxWidth: number,
): number {
  let cursor = y;
  for (const item of items) {
    cursor = drawJpLines(
      page,
      wrapJpLines(`・${item}`, 11, maxWidth, fonts.jp),
      x,
      cursor,
      11,
      fonts.jp,
      WHITE,
      16,
    );
    cursor -= 8;
  }
  return cursor;
}

async function buildEducationDoc(data: DiagnosisResult): Promise<PDFDocument> {
  const pdfDoc = await PDFDocument.create();
  const texts = [
    data.shopName,
    data.area,
    data.industry,
    'AI検索時代、御社は比較候補に入っていますか？',
    'FAQ不足',
    'エンティティ不足',
    'Mention不足',
    '地域関連性不足',
    '知らないうちに負ける',
    'GEO Search Protocol',
  ];
  const fonts = await loadReportFonts(pdfDoc, texts);

  // E1 — 危機フック（自分ごと化）
  const e1 = addLandscapePage(pdfDoc);
  fillPageBg(e1);
  drawHeader(e1, fonts);
  let y = drawSectionTitle(
    e1,
    fonts,
    `AI検索時代、${data.shopName}は比較候補に入っていますか？`,
    CONTENT_TOP,
  );
  y = drawJpLines(
    e1,
    wrapJpLines(
      '「AI検索時代」と言われても、多くの店舗は他人事のままです。しかし検索の入口はすでに変わっています。ChatGPT・Gemini・Perplexityが「おすすめ店舗」を先に提示する流れが当たり前になりつつあります。',
      12,
      CONTENT_W,
      fonts.jp,
    ),
    MARGIN,
    y,
    12,
    fonts.jp,
    WHITE,
    18,
  );
  y -= 16;
  e1.drawRectangle({ x: MARGIN, y: y - 72, width: CONTENT_W, height: 72, color: CARD });
  drawJpText(e1, `${data.shopName} · ${data.area} · ${data.industry}`, MARGIN + 16, y - 28, 13, fonts.jp, ACCENT);
  drawJpText(
    e1,
    '御社名を入力した時点で、これは「自分の店」の話になります。',
    MARGIN + 16,
    y - 52,
    11,
    fonts.jp,
    WHITE,
  );

  // E2 — なぜ表示されないのか
  const e2 = addLandscapePage(pdfDoc);
  fillPageBg(e2);
  drawHeader(e2, fonts);
  y = drawSectionTitle(e2, fonts, 'なぜAI検索に表示されないのか', CONTENT_TOP);
  y = drawBulletList(e2, fonts, [
    'FAQ不足 — AIが引用できるQ&A構造がない',
    'エンティティ不足 — 店舗名・地域・業種の関連付けが弱い',
    'Mention不足 — Web上で第三者言及・構造化シグナルが少ない',
    `地域関連性不足 — 「${data.area} × ${data.industry}」文脈での情報が薄い`,
  ], MARGIN, y, CONTENT_W);
  y -= 12;
  drawJpText(e2, 'MEO（GoogleMap順位）だけでは不十分な理由', MARGIN, y, 13, fonts.jp, ACCENT);
  y -= 22;
  drawJpLines(
    e2,
    wrapJpLines(
      'AI検索はMap順位だけでなく、FAQ・構造化データ・エンティティ理解を総合して「比較候補」を選びます。Mapは整っていても、AI比較段階で脱落する店舗が増えています。',
      11,
      CONTENT_W,
      fonts.jp,
    ),
    MARGIN,
    y,
    11,
    fonts.jp,
    WHITE,
    16,
  );

  // E3 — 放置リスク（恐怖）
  const e3 = addLandscapePage(pdfDoc);
  fillPageBg(e3);
  drawHeader(e3, fonts);
  y = drawSectionTitle(e3, fonts, 'このまま放置すると起こること', CONTENT_TOP);
  y = drawBulletList(e3, fonts, [
    '比較候補から外れる — AIが先に競合だけを提示する',
    'AI推薦されない — 「おすすめ」検索の主戦場から脱落',
    '知らないうちに負ける — 来店・予約の入口が競合に固定化',
    '半年後に挽回コストが増大 — 先行者がエンティティを占有',
  ], MARGIN, y, CONTENT_W);
  y -= 8;
  e3.drawRectangle({ x: MARGIN, y: y - 56, width: CONTENT_W, height: 56, color: CARD });
  drawJpText(
    e3,
    `現状スコア: Local GEO ${data.scores.localGeoScore} / AI Visibility ${data.scores.aiVisibilityScore}`,
    MARGIN + 16,
    y - 24,
    11,
    fonts.jp,
    WARN,
  );
  drawJpText(
    e3,
    '数値が低いほど、AI比較フェーズでの不利が固定化しやすくなります。',
    MARGIN + 16,
    y - 44,
    10,
    fonts.jp,
    WHITE,
  );

  // E4 — 改善ロードマップ＋サービス（ここで初めて提案）
  const e4 = addLandscapePage(pdfDoc);
  fillPageBg(e4);
  drawHeader(e4, fonts);
  y = drawSectionTitle(e4, fonts, '改善ロードマップ（優先順）', CONTENT_TOP);
  y = drawBulletList(e4, fonts, [
    'GBP・GoogleMap情報の完成度向上',
    'FAQ構造化（地域名＋業種キーワード）',
    'LocalBusiness / FAQPage スキーマ markup',
    'AI引用向けコンテンツ（比較・選び方・地域特化）',
    '月次AI露出レポートで可視化・継続改善',
  ], MARGIN, y, CONTENT_W * 0.58);
  const rightX = MARGIN + CONTENT_W * 0.62;
  let ry = CONTENT_TOP - 28;
  e4.drawRectangle({ x: rightX, y: ry - 120, width: CONTENT_W * 0.38, height: 120, color: ACCENT });
  drawJpText(e4, 'GEO Search Protocol', rightX + 12, ry - 24, 9, fonts.jp, WHITE);
  drawJpText(e4, 'TM for Local', rightX + 12, ry - 38, 9, fonts.jp, WHITE);
  drawJpText(e4, '月額 ¥60,000 / 年払い ¥600,000', rightX + 12, ry - 64, 14, fonts.jp, WHITE);
  drawJpText(e4, '（12ヶ月契約）', rightX + 12, ry - 82, 9, fonts.jp, WHITE);
  drawJpLines(
    e4,
    wrapJpLines('無料相談: coaretail.com/geo_schedule', 9, CONTENT_W * 0.36, fonts.jp),
    rightX + 12,
    ry - 104,
    9,
    fonts.jp,
    WHITE,
    12,
  );

  return pdfDoc;
}

/** 教育テンプレ4ページのみ（Buffer） */
export async function generateEducationTemplatePdf(data: DiagnosisResult): Promise<Buffer> {
  const doc = await buildEducationDoc(data);
  return Buffer.from(await doc.save({ useObjectStreams: true }));
}

/** 既存 PDFDocument に教育4ページを追加 */
export async function appendEducationTemplatePages(
  pdfDoc: PDFDocument,
  data: DiagnosisResult,
): Promise<void> {
  const eduDoc = await buildEducationDoc(data);
  const pages = await pdfDoc.copyPages(eduDoc, eduDoc.getPageIndices());
  for (const page of pages) {
    pdfDoc.addPage(page);
  }
}
