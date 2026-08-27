/**
 * Slack 通知の段階ラベル（localgeo / geo-lp 共通文言）
 *
 * 【段階1】診断開始 — メール未取得
 * 【段階2】レポート送付 — メール取得済
 * 【段階3】メール配信完了（Resend webhook）
 */

export const SLACK_STAGE = {
  diagnosis: '【段階1】診断開始 — メール未取得',
  report: '【段階2】レポート送付 — メール取得済',
  delivered: '【段階3】メール配信完了',
} as const;

export type SlackServiceKey = 'localgeo' | 'geo-lp';

const SERVICE_LABELS: Record<SlackServiceKey, string> = {
  localgeo: '📍 Local GEO (localgeo.coaretail.com)',
  'geo-lp': '📊 GEO LP (aiscan.coaretail.com)',
};

export function slackServiceLabel(key: SlackServiceKey): string {
  return SERVICE_LABELS[key];
}

function formatJst(isoOrDate?: string): string {
  const d = isoOrDate ? new Date(isoOrDate) : new Date();
  return d.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
}

export interface DiagnosisSlackFields {
  service: SlackServiceKey;
  shopName: string;
  area: string;
  industry: string;
  timestamp?: string;
  sessionId?: string | null;
  pageUrl?: string | null;
}

export function buildSlackStage1Diagnosis(fields: DiagnosisSlackFields): string {
  const lines = [
    `🔍 *${SLACK_STAGE.diagnosis}*`,
    `*サービス*: ${slackServiceLabel(fields.service)}`,
    `・店舗名：${fields.shopName}`,
    `・地域：${fields.area}`,
    `・業種：${fields.industry}`,
    `・日時：${formatJst(fields.timestamp)}`,
  ];
  if (fields.sessionId) lines.push(`・sessionId：\`${fields.sessionId}\``);
  if (fields.pageUrl) lines.push(`・ページ：${fields.pageUrl}`);
  return lines.join('\n');
}

export interface ReportSlackFields {
  service: SlackServiceKey;
  email: string;
  shopName: string;
  area: string;
  industry: string;
  localGeoScore?: number;
  aiVisibilityScore?: number;
  contactName?: string | null;
  timestamp?: string;
  sessionId?: string | null;
}

export function buildSlackStage2Report(fields: ReportSlackFields): string {
  const lines = [
    `📊 *${SLACK_STAGE.report}*`,
    `*サービス*: ${slackServiceLabel(fields.service)}`,
    `・メール：${fields.email}`,
    `・店舗名：${fields.shopName}`,
    `・地域：${fields.area}`,
    `・業種：${fields.industry}`,
  ];
  if (fields.contactName) lines.splice(4, 0, `・担当者：${fields.contactName}`);
  if (fields.localGeoScore != null) lines.push(`・Local GEO Score：${fields.localGeoScore}`);
  if (fields.aiVisibilityScore != null) lines.push(`・AI Visibility Score：${fields.aiVisibilityScore}`);
  lines.push(`・日時：${formatJst(fields.timestamp)}`);
  if (fields.sessionId) lines.push(`・sessionId：\`${fields.sessionId}\``);
  return lines.join('\n');
}

export interface DeliveredSlackFields {
  service: SlackServiceKey | string;
  to: string;
  from: string;
  subject: string;
  deliveredAt: string;
  emailId?: string;
  sessionId?: string | null;
}

export function buildSlackStage3Delivered(fields: DeliveredSlackFields): string {
  const serviceLine =
    fields.service === 'localgeo' || fields.service === 'geo-lp'
      ? slackServiceLabel(fields.service)
      : String(fields.service);

  const lines = [
    `✅ *${SLACK_STAGE.delivered}*`,
    `*サービス*: ${serviceLine}`,
    `・宛先：${fields.to}`,
    `・送信元：${fields.from}`,
    `・件名：${fields.subject}`,
    `・配信日時：${fields.deliveredAt}`,
  ];
  if (fields.sessionId) lines.push(`・sessionId：\`${fields.sessionId}\``);
  if (fields.emailId) lines.push(`・Email ID：\`${fields.emailId}\``);
  return lines.join('\n');
}

/** Resend webhook / タグ / from からサービスを推定 */
export function detectSlackServiceFromResend(input: {
  querySource?: string | null;
  tagService?: string | null;
  from?: string | null;
}): SlackServiceKey | string {
  const { querySource, tagService, from } = input;
  if (querySource === 'geo-lp' || tagService === 'geo-lp') return 'geo-lp';
  if (querySource === 'localgeo' || tagService === 'localgeo') return 'localgeo';
  const f = from || '';
  if (f.includes('aiscan') || f.includes('geo-lp')) return 'geo-lp';
  if (f.includes('localgeo')) return 'localgeo';
  return '🔔 Agent Readiness Index';
}
