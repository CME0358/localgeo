import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import type { DiagnosisResult } from '@/lib/types/diagnosis';
import { collectBlockIds, collectReportTexts, embedJapaneseBlockFonts } from '@/lib/pdf/jp-font-blocks';

/** A4 landscape */
export const PAGE_WIDTH = 841.89;
export const PAGE_HEIGHT = 595.28;
export const MARGIN = 50;
export const HEADER_H = 72;
export const CONTENT_W = PAGE_WIDTH - MARGIN * 2;
export const CONTENT_TOP = PAGE_HEIGHT - HEADER_H - 28;

export const NAVY = rgb(0.051, 0.106, 0.243);
export const ACCENT = rgb(0.106, 0.337, 0.69);
export const MUTED = rgb(0.533, 0.6, 0.733);
export const WHITE = rgb(1, 1, 1);
export const CARD = rgb(0.086, 0.125, 0.251);
export const WARN = rgb(0.957, 0.263, 0.212);

export interface ReportFonts {
  latin: PDFFont;
  jp: Map<number, PDFFont>;
}

export async function loadReportFonts(
  pdfDoc: PDFDocument,
  extraTexts: string[] = [],
): Promise<ReportFonts> {
  const blockIds = collectBlockIds(...extraTexts);
  const [latin, jp] = await Promise.all([
    pdfDoc.embedFont(StandardFonts.Helvetica),
    embedJapaneseBlockFonts(pdfDoc, blockIds),
  ]);
  return { latin, jp };
}

export function collectEducationTexts(data: DiagnosisResult): string[] {
  return collectReportTexts(data);
}

export function fillPageBg(page: PDFPage): void {
  const { width, height } = page.getSize();
  page.drawRectangle({ x: 0, y: 0, width, height, color: NAVY });
}

export function drawHeader(page: PDFPage, fonts: ReportFonts): void {
  const { width, height } = page.getSize();
  page.drawRectangle({ x: 0, y: height - HEADER_H, width, height: HEADER_H, color: NAVY });
  page.drawText('GEO Search Protocol TM', {
    x: MARGIN,
    y: height - 44,
    size: 10,
    font: fonts.latin,
    color: WHITE,
  });
  page.drawText('AI Visibility Report', {
    x: MARGIN,
    y: height - 58,
    size: 8,
    font: fonts.latin,
    color: ACCENT,
  });
}

export function addLandscapePage(pdfDoc: PDFDocument): PDFPage {
  return pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
}
