// Resend webhook → Slack（段階3: メール配信完了）
// Webhook URL 例: .../api/resend-webhook?source=localgeo または ?source=geo-lp

import { NextRequest, NextResponse } from 'next/server';
import {
  buildSlackStage3Delivered,
  detectSlackServiceFromResend,
  slackServiceLabel,
} from '@/lib/slack-messages';
import type { SlackServiceKey } from '@/lib/slack-messages';
import { verifyResendWebhook } from '@/lib/verify-resend-webhook';

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
    const rawBody = await req.text();
    const webhookSecret = process.env.RESEND_WEBHOOK_SECRET?.trim();
    if (!webhookSecret) {
      console.error('[resend-webhook] RESEND_WEBHOOK_SECRET is not set');
      return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }
    verifyResendWebhook(rawBody, {
      id: req.headers.get('svix-id'),
      timestamp: req.headers.get('svix-timestamp'),
      signature: req.headers.get('svix-signature'),
    }, webhookSecret);

    const payload: ResendWebhookPayload = JSON.parse(rawBody);

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
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('Svix') || message.includes('signature') || message.includes('webhook')) {
      console.error('[resend-webhook] unauthorized:', message);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('[resend-webhook]', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
