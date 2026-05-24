import { NextResponse } from 'next/server';
import {
  buildLeadPayload,
  buildSlackDiagnosisLeadMessage,
  notifyAirtable,
  notifySlack,
} from '@/lib/pdf/lead-notify';
import type { NotifyChannelResult } from '@/lib/types/diagnosis';

export async function POST(request: Request): Promise<NextResponse> {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'JSON が不正です' }, { status: 400 });
  }

  const parsed = buildLeadPayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { payload } = parsed;
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
