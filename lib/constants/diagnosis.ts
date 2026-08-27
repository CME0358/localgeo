export const LOADING_STEPS = [
  'ChatGPT解析中…',
  'Gemini分析中…',
  'Googleマップ分析中…',
  'AI Visibility Score生成中…',
] as const;

export const REPORT_LOADING_STEPS = [
  'PDF生成中…',
  'AI分析を統合中…',
  'Visibility Report作成中…',
] as const;

export const LOADING_STEP_MS = 850;
export const REPORT_LOADING_STEP_MS = 450;

export const INDUSTRIES = [
  { value: 'dental', label: '歯科医院' },
  { value: 'clinic', label: 'クリニック・医院' },
  { value: 'beauty_clinic', label: '美容クリニック' },
  { value: 'esthetic', label: 'エステ・美容サロン' },
  { value: 'hair_salon', label: '美容室・理美容' },
  { value: 'chiropractic', label: '整体・整骨院' },
  { value: 'fitness', label: 'フィットネス・パーソナルジム' },
  { value: 'restaurant', label: '飲食店' },
  { value: 'hotel', label: '宿泊施設' },
  { value: 'real_estate', label: '不動産' },
  { value: 'professional_service', label: '士業' },
  { value: 'education', label: 'スクール・教育' },
  { value: 'home_service', label: 'リフォーム・住宅' },
  { value: 'other', label: 'その他' },
] as const;

export type IndustryValue = (typeof INDUSTRIES)[number]['value'];

const INDUSTRY_LABEL_BY_VALUE = Object.fromEntries(
  INDUSTRIES.map((item) => [item.value, item.label]),
) as Record<IndustryValue, string>;

/** API送信用value → 表示用ラベル（レポート・UI） */
export function industryLabel(value: string): string {
  return INDUSTRY_LABEL_BY_VALUE[value as IndustryValue] ?? value;
}
