export const LOADING_STEPS = [
  'ChatGPT解析中…',
  'Gemini分析中…',
  'GoogleMap分析中…',
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
  { value: 'エステサロン', label: 'エステサロン' },
  { value: '整体院・整骨院', label: '整体院・整骨院' },
  { value: '美容室・ヘアサロン', label: '美容室・ヘアサロン' },
  { value: '飲食店・バー', label: '飲食店・バー' },
  { value: 'その他サロン', label: 'その他サロン' },
] as const;

export type IndustryValue = (typeof INDUSTRIES)[number]['value'];
