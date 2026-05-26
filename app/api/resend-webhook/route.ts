// app/api/resend-webhook/route.ts
// localgeo (Next.js App Router)
// Resend webhook → Slack #geo-search-protocol 通知
// 対象: geo-lp-2md5 (aiscan.coaretail.com) / localgeo (localgeo.coaretail.com) 両方から受信

import { NextRequest, NextResponse } from 'next/server';

// Resendのイベントペイロード型
interface ResendWebhookPayload {
  type: string;
  data: {
    email_id?: string;
    id?: string;
    from?: string;
    to?: string | string[];
    subject?: string;
    created_at?: string;
    // Resendがカスタムtagsを付けてる場合
    tags?: Record<string, string>;
  };
}

// どのサービスからのWebhookか識別
function detectService(req: NextRequest, payload: ResendWebhookPayload): string {
  const referer = req.headers.get('referer') || '';
  const origin = req.headers.get('origin') || '';
  const source = req.nextUrl.searchParams.get('source') || '';

  // クエリパラメータで明示指定（Resend Webhook URLに ?source=geo-lp などを付ける）
  if (source === 'geo-lp') return '📊 GEO LP (aiscan.coaretail.com)';
  if (source === 'localgeo') return '📍 LocalGEO (localgeo.coaretail.com)';

  // タグで識別（Resendのメール送信時に tags を付けている場合）
  const serviceTag = payload.data?.tags?.service;
  if (serviceTag === 'geo-lp') return '📊 GEO LP (aiscan.coaretail.com)';
  if (serviceTag === 'localgeo') return '📍 LocalGEO (localgeo.coaretail.com)';

  // fromアドレスで識別（フォールバック）
  const from = payload.data?.from || '';
  if (from.includes('aiscan') || from.includes('geo-lp')) return '📊 GEO LP (aiscan.coaretail.com)';
  if (from.includes('localgeo')) return '📍 LocalGEO (localgeo.coaretail.com)';

  return '🔔 GEO Search Protocol';
}

export async function POST(req: NextRequest) {
  try {
    const payload: ResendWebhookPayload = await req.json();

    // email.delivered のみ処理
    if (payload.type !== 'email.delivered') {
      return NextResponse.json({ message: `Ignored: ${payload.type}` }, { status: 200 });
    }

    const { data } = payload;
    const to = Array.isArray(data?.to) ? data.to.join(', ') : (data?.to ?? '(不明)');
    const subject = data?.subject ?? '(件名なし)';
    const from = data?.from ?? '(送信元不明)';
    const emailId = data?.email_id ?? data?.id ?? '(IDなし)';
    const deliveredAt = data?.created_at
      ? new Date(data.created_at).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
      : new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

    const service = detectService(req, payload);

    const slackPayload = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '✅ メール配信完了',
            emoji: true,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*サービス*: ${service}`,
          },
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*宛先*\n${to}` },
            { type: 'mrkdwn', text: `*送信元*\n${from}` },
          ],
        },
        {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: `*件名*\n${subject}` },
            { type: 'mrkdwn', text: `*配信日時*\n${deliveredAt}` },
          ],
        },
        {
          type: 'context',
          elements: [
            { type: 'mrkdwn', text: `Email ID: \`${emailId}\`` },
          ],
        },
        { type: 'divider' },
      ],
    };

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!slackWebhookUrl) {
      console.error('SLACK_WEBHOOK_URL is not set');
      return NextResponse.json({ error: 'SLACK_WEBHOOK_URL not configured' }, { status: 500 });
    }

    const slackRes = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackPayload),
    });

    if (!slackRes.ok) {
      const errText = await slackRes.text();
      console.error('Slack error:', errText);
      return NextResponse.json({ error: 'Slack notification failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
