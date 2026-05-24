import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import fontkit from '@pdf-lib/fontkit';
import type { PDFFont, PDFPage } from 'pdf-lib';
import type { PDFDocument } from 'pdf-lib';
import type { DiagnosisResult } from '@/lib/types/diagnosis';
import { buildReportAnalysis } from '@/lib/pdf/report-analysis';

const BLOCK_DIR = join(
  process.cwd(),
  'node_modules/@fontsource/noto-sans-jp/files',
);

type RgbColor = ReturnType<typeof import('pdf-lib').rgb>;

let blockBytesCache: Map<number, Uint8Array> | null = null;
const parsedBlockCache = new Map<number, ReturnType<typeof fontkit.create>>();
const codePointBlockCache = new Map<number, number>();

function loadBlockFiles(): Map<number, Uint8Array> {
  if (blockBytesCache) return blockBytesCache;

  const map = new Map<number, Uint8Array>();
  if (!existsSync(BLOCK_DIR)) {
    blockBytesCache = map;
    return map;
  }

  for (const file of readdirSync(BLOCK_DIR)) {
    const match = file.match(/^noto-sans-jp-(\d+)-400-normal\.woff2$/);
    if (!match) continue;
    map.set(Number(match[1]), readFileSync(join(BLOCK_DIR, file)));
  }

  blockBytesCache = map;
  return map;
}

function parsedBlock(id: number) {
  const files = loadBlockFiles();
  const bytes = files.get(id);
  if (!bytes) return null;

  let font = parsedBlockCache.get(id);
  if (!font) {
    font = fontkit.create(bytes);
    parsedBlockCache.set(id, font);
  }
  return font;
}

export function resolveBlockId(codePoint: number): number {
  const cached = codePointBlockCache.get(codePoint);
  if (cached !== undefined) return cached;

  for (const id of loadBlockFiles().keys()) {
    const font = parsedBlock(id);
    if (font?.hasGlyphForCodePoint(codePoint)) {
      codePointBlockCache.set(codePoint, id);
      return id;
    }
  }

  codePointBlockCache.set(codePoint, 0);
  return 0;
}

export function collectBlockIds(...texts: string[]): Set<number> {
  const ids = new Set<number>();
  for (const text of texts) {
    for (const ch of text) {
      ids.add(resolveBlockId(ch.codePointAt(0)!));
    }
  }
  return ids;
}

export async function embedJapaneseBlockFonts(
  pdfDoc: PDFDocument,
  blockIds: Set<number>,
): Promise<Map<number, PDFFont>> {
  pdfDoc.registerFontkit(fontkit);
  const files = loadBlockFiles();
  const fonts = new Map<number, PDFFont>();

  await Promise.all(
    [...blockIds].map(async (id) => {
      const bytes = files.get(id);
      if (!bytes) return;
      fonts.set(id, await pdfDoc.embedFont(bytes));
    }),
  );

  return fonts;
}

export function collectReportTexts(data: DiagnosisResult): string[] {
  const analysis = buildReportAnalysis(data);
  return [
    '店舗情報',
    '診断日時:',
    '総評',
    '詳細分析',
    '競合比較 · 改善提案',
    '改善ポイント',
    'Local GEO TM 改善提案',
    data.shopName,
    `${data.area} · ${data.industry}`,
    analysis.overall,
    ...Object.values(analysis.page2).flatMap((block) => [
      `${block.score}点`,
      block.label,
      block.text,
    ]),
    ...Object.entries(analysis.page2).flatMap(([title, block]) => [
      title,
      `${title} — ${block.score}点 (${block.label})`,
      block.text,
    ]),
    `ChatGPT表示分析 (${analysis.page3.chatgpt.score}点)`,
    analysis.page3.chatgpt.text,
    `Gemini表示分析 (${analysis.page3.gemini.score}点)`,
    analysis.page3.gemini.text,
    '競合比較',
    analysis.page3.competitor.text,
    ...analysis.page3.improvements.map((item, i) => `${i + 1}. ${item}`),
    analysis.page3.localGeoProposal,
  ];
}

function jpFontForChar(jpFonts: Map<number, PDFFont>, ch: string): PDFFont {
  const font = jpFonts.get(resolveBlockId(ch.codePointAt(0)!));
  if (!font) throw new Error(`Missing font block for character: ${ch}`);
  return font;
}

export function measureJpText(text: string, size: number, jpFonts: Map<number, PDFFont>): number {
  let width = 0;
  for (const ch of text) {
    width += jpFontForChar(jpFonts, ch).widthOfTextAtSize(ch, size);
  }
  return width;
}

export function wrapJpLines(
  text: string,
  size: number,
  maxWidth: number,
  jpFonts: Map<number, PDFFont>,
): string[] {
  const lines: string[] = [];
  let line = '';

  for (const ch of text) {
    const test = line + ch;
    if (measureJpText(test, size, jpFonts) > maxWidth && line) {
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  }

  if (line) lines.push(line);
  return lines;
}

export function drawJpText(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  size: number,
  jpFonts: Map<number, PDFFont>,
  color: RgbColor,
): number {
  let cx = x;
  for (const ch of text) {
    const font = jpFontForChar(jpFonts, ch);
    page.drawText(ch, { x: cx, y, size, font, color });
    cx += font.widthOfTextAtSize(ch, size);
  }
  return cx;
}

export function drawJpLines(
  page: PDFPage,
  lines: string[],
  x: number,
  y: number,
  size: number,
  jpFonts: Map<number, PDFFont>,
  color: RgbColor,
  lineHeight = size * 1.5,
): number {
  let cy = y;
  for (const line of lines) {
    drawJpText(page, line, x, cy, size, jpFonts, color);
    cy -= lineHeight;
  }
  return cy;
}
