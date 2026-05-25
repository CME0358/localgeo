import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { PDFDocument } from 'pdf-lib';
import type { DiagnosisResult } from '@/lib/types/diagnosis';
import { generateReportPdf } from '@/lib/pdf/generate-pdf';
import { appendEducationTemplatePages } from '@/lib/pdf/education-template-pages';

const DYNAMIC_PAGE_COUNT = 3;
const EDUCATION_PAGE_COUNT = 4;

/** デフォルト: lib/pdf/templates/education-4pages.pdf */
const DEFAULT_EDUCATION_TEMPLATE = join(
  process.cwd(),
  'lib/pdf/templates/education-4pages.pdf',
);

function resolveEducationTemplatePath(): string | null {
  const fromEnv = process.env.MERGE_PDF_TEMPLATE_PATH?.trim();
  if (fromEnv) return fromEnv;
  if (existsSync(DEFAULT_EDUCATION_TEMPLATE)) return DEFAULT_EDUCATION_TEMPLATE;
  return null;
}

/**
 * 診断3ページ + 教育テンプレ4ページ = 7ページ PDF
 *
 * MERGE_PDF_TEMPLATE_PATH が設定されている場合、
 * プログラム生成の4ページの代わりに外部PDF（4ページ）をマージする。
 */
export async function generateFullReportPdf(data: DiagnosisResult): Promise<Buffer> {
  const dynamicBuffer = await generateReportPdf(data);
  const dynamicDoc = await PDFDocument.load(dynamicBuffer);
  const merged = await PDFDocument.create();

  const dynamicPages = await merged.copyPages(
    dynamicDoc,
    Array.from({ length: Math.min(DYNAMIC_PAGE_COUNT, dynamicDoc.getPageCount()) }, (_, i) => i),
  );
  for (const page of dynamicPages) {
    merged.addPage(page);
  }

  const externalTemplate = resolveEducationTemplatePath();
  if (externalTemplate) {
    const templateBytes = readFileSync(externalTemplate);
    const templateDoc = await PDFDocument.load(templateBytes);
    const indices = Array.from(
      { length: Math.min(EDUCATION_PAGE_COUNT, templateDoc.getPageCount()) },
      (_, i) => i,
    );
    const templatePages = await merged.copyPages(templateDoc, indices);
    for (const page of templatePages) {
      merged.addPage(page);
    }
  } else {
    await appendEducationTemplatePages(merged, data);
  }

  return Buffer.from(await merged.save({ useObjectStreams: true }));
}
