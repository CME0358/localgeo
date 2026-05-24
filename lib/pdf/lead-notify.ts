import type { LeadPayload, NotifyChannelResult, ReportLeadPayload } from '@/lib/types/diagnosis';

const MAX_FIELD = 300;

export function clamp(str: unknown, max = MAX_FIELD): string {
  const s = String(str ?? '').trim();
  return s.length > max ? s.slice(0, max) : s;
}

export async function notifyAirtable(payload: LeadPayload | ReportLeadPayload): Promise<NotifyChannelResult> {
  const url = process.env.AIRTABLE_WEBHOOK_URL?.trim();
  if (!url) {
    console.warn('[lead-notify] AIRTABLE_WEBHOOK_URL が未設定');
    return { channel: 'airtable', skipped: true };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Local-GEO-LP/1.0',
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Airtable HTTP ${res.status}: ${text.slice(0, 200)}`);
  return { channel: 'airtable', ok: true };
}

export async function notifySlack(text: string): Promise<NotifyChannelResult> {
  const url = process.env.SLACK_WEBHOOK_URL?.trim();
  if (!url) {
    console.warn('[lead-notify] SLACK_WEBHOOK_URL が未設定');
    return { channel: 'slack', skipped: true };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  const body = await res.text();
  if (!res.ok) throw new Error(`Slack HTTP ${res.status}: ${body.slice(0, 200)}`);
  return { channel: 'slack', ok: true };
}

export function buildSlackDiagnosisLeadMessage(payload: LeadPayload): string {
  const jst = new Date(payload.timestamp).toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
  });
  const lines = [
    '🔍 *Local GEO — 無料AI推薦スコア診断*',
    `・店舗名：${payload.shopName}`,
    `・地域：${payload.area}`,
    `・業種：${payload.industry}`,
    `・日時：${jst}`,
  ];
  if (payload.pageUrl) lines.push(`・ページ：${payload.pageUrl}`);
  return lines.join('\n');
}

export function buildSlackReportMessage(payload: ReportLeadPayload): string {
  const jst = new Date(payload.timestamp || payload.analyzedAt).toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
  });
  const lines = [
    '📊 *Local GEO — AI Visibility Report 取得*',
    `・メール：${payload.email}`,
    `・店舗名：${payload.shopName}`,
    `・地域：${payload.area}`,
    `・業種：${payload.industry}`,
    `・Local GEO Score：${payload.localGeoScore}`,
    `・AI Visibility Score：${payload.aiVisibilityScore}`,
    `・日時：${jst}`,
  ];
  if (payload.contactName) lines.splice(2, 0, `・担当者：${payload.contactName}`);
  return lines.join('\n');
}

export interface ParsedLeadPayload {
  ok: true;
  payload: LeadPayload;
}

export interface ParsedLeadError {
  ok: false;
  error: string;
}

export function buildLeadPayload(body: Record<string, unknown>): ParsedLeadPayload | ParsedLeadError {
  const shopName = clamp(body.shopName);
  const area = clamp(body.area);
  const industry = clamp(body.industry);

  if (!shopName || !area || !industry) {
    return { ok: false, error: 'shopName, area, industry は必須です' };
  }

  const timestamp = body.timestamp ? clamp(body.timestamp, 64) : new Date().toISOString();

  return {
    ok: true,
    payload: {
      shopName,
      area,
      industry,
      timestamp,
      source: 'local-geo-lp',
      formName: '無料AI推薦スコア診断',
      pageUrl: clamp(body.pageUrl ?? '', 500) || null,
    },
  };
}
