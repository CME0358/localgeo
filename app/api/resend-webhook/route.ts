// Resend webhook → Slack（段階3: メール配信完了）
// Webhook URL 例: .../api/resend-webhook?source=localgeo または ?source=geo-lp

import { NextRequest, NextResponse } from 'next/server';
import {
  buildSlackStage3Delivered,
  detectSlackServiceFromResend,
  slackServiceLabel,
} from '@/lib/slack-messages';
import type { SlackServiceKey } from '@/lib/slack-messages';

interface ResendWebhookPayload {
  type: string;
  data: {
    email_id?: string;
    id?: string;
    from?: string;
    to?: string | string[];
    subject?: string;
    created_at?: string;
    tags?: Record<string, string>;
  };
}

function resolveServiceLabel(
  req: NextRequest,
  payload: ResendWebhookPayload,
): string {
  const detected = detectSlackServiceFromResend({
    querySource: req.nextUrl.searchParams.get('source'),
    tagService: payload.data?.tags?.service,
    from: payload.data?.from,
  });
  if (detected === 'localgeo' || detected === 'geo-lp') {
    return slackServiceLabel(detected as SlackServiceKey);
  }
  return String(detected);
}

export async function POST(req: NextRequest) {
  try {
    const payload: ResendWebhookPayload = await req.json();

    if (payload.type !== 'email.delivered') {
      return NextResponse.json({ message: `Ignored: ${payload.type}` }, { status: 200 });
    }

    const { data } = payload;
    const to = Array.isArray(data?.to) ? data.to.join(', ') : (data?.to ?? '(不明)');
    const subject = data?.subject ?? '(件名なし)';
    const from = data?.from ?? '(送信元不明)';
    const emailId = data?.email_id ?? data?.id ?? undefined;
    const deliveredAt = data?.created_at
      ? new Date(data.created_at).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
      : new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });

    const serviceLabel = resolveServiceLabel(req, payload);
    const text = buildSlackStage3Delivered({
      service: serviceLabel,
      to,
      from,
      subject,
      deliveredAt,
      emailId,
      sessionId: data?.tags?.sessionId ?? null,
    });

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL?.trim();
    if (!slackWebhookUrl) {
      console.error('[resend-webhook] SLACK_WEBHOOK_URL is not set');
      return NextResponse.json({ error: 'SLACK_WEBHOOK_URL not configured' }, { status: 500 });
    }

    const slackRes = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!slackRes.ok) {
      const errText = await slackRes.text();
      console.error('[resend-webhook] Slack error:', errText);
      return NextResponse.json({ error: 'Slack notification failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[resend-webhook]', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
