import { NextResponse } from 'next/server';
import { rateLimitOrNull } from '@/lib/rate-limit';
import {
  buildLeadPayload,
  buildSlackDiagnosisLeadMessage,
  notifyAirtable,
  notifySlack,
} from '@/lib/pdf/lead-notify';
import type { NotifyChannelResult } from '@/lib/types/diagnosis';

function pickHeader(request: Request, key: string): string | null {
  return request.headers.get(key) || request.headers.get(key.toLowerCase()) || null;
}

function logRequest(tag: string, request: Request, data: Record<string, unknown>) {
  console.log(tag, {
    vercelId: pickHeader(request, 'x-vercel-id'),
    forwardedFor: pickHeader(request, 'x-forwarded-for'),
    userAgent: pickHeader(request, 'user-agent'),
    ...data,
  });
}

export async function POST(request: Request): Promise<NextResponse> {
  const limited = rateLimitOrNull(request, 'send');
  if (limited) return limited;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'JSON が不正です' }, { status: 400 });
  }

  const parsed = buildLeadPayload(body);
  if (!parsed.ok) {
    logRequest('[send] invalid', request, { error: parsed.error });
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { payload } = parsed;
  logRequest('[send] start', request, {
    sessionId: payload.sessionId ?? null,
    shopName: payload.shopName,
    area: payload.area,
    industry: payload.industry,
    timestamp: payload.timestamp,
  });
  const results = await Promise.allSettled([
    notifyAirtable(payload),
    notifySlack(buildSlackDiagnosisLeadMessage(payload)),
  ]);

  const channels: NotifyChannelResult[] = results.map((result, index) => {
    const name = index === 0 ? 'airtable' : 'slack';
    if (result.status === 'fulfilled') return result.value;
    console.error(`[send] ${name} failed`, result.reason);
    return {
      channel: name,
      ok: false,
      error: String(result.reason instanceof Error ? result.reason.message : result.reason),
    };
  });

  const anyOk = channels.some((c) => c.ok);
  const allSkipped = channels.every((c) => c.skipped);

  if (allSkipped) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Airtable / Slack の Webhook URL が未設定です',
        channels,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: anyOk, channels }, { status: anyOk ? 200 : 502 });
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
