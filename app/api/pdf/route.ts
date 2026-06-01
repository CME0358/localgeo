import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { generateFullReportPdf } from '@/lib/pdf/merge-report-pdf';
import {
  buildSlackReportMessage,
  clamp,
  notifyAirtable,
  notifySlack,
} from '@/lib/pdf/lead-notify';
import { buildReportEmailContent } from '@/lib/pdf/report-email';
import { triggerStepMailSequence } from '@/lib/pdf/trigger-step-mail';
import type { DiagnosisResult, NotifyChannelResult, ReportLeadPayload } from '@/lib/types/diagnosis';

export const maxDuration = 60;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hashEmail(email: string): string {
  // PIIをログに残さない。検索用に短縮ハッシュのみ。
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex').slice(0, 16);
}

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

interface ValidatedReportRequest {
  ok: true;
  email: string;
  contactName: string | null;
  data: DiagnosisResult;
  sessionId: string | null;
}

interface ValidationError {
  ok: false;
  error: string;
}

function validateRequest(body: Record<string, unknown>): ValidatedReportRequest | ValidationError {
  const email = clamp(body.email, 200);
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: '有効なメールアドレスを入力してください' };
  }

  const diagnosis = body.diagnosis as DiagnosisResult | undefined;
  if (!diagnosis?.scores) {
    return { ok: false, error: '診断データが不正です' };
  }

  const shopName = clamp(body.shopName || diagnosis.shopName);
  const area = clamp(body.area || diagnosis.area);
  const industry = clamp(body.industry || diagnosis.industry);
  const contactName = clamp(body.contactName ?? '', 100) || null;
  const sessionId = clamp(body.sessionId ?? '', 96) || null;

  if (!shopName || !area || !industry) {
    return { ok: false, error: '店舗情報が不足しています' };
  }

  const data: DiagnosisResult = {
    ...diagnosis,
    shopName,
    area,
    industry,
    analyzedAt: diagnosis.analyzedAt || new Date().toISOString(),
  };

  return { ok: true, email, contactName, data, sessionId };
}

interface EmailSendResult {
  ok?: boolean;
  skipped?: boolean;
}

async function sendReportEmail(
  email: string,
  contactName: string | null,
  data: DiagnosisResult,
  pdfBuffer: Buffer,
  sessionId: string | null,
): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim() || 'Local GEO <reports@coaretail.com>';

  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('RESEND_API_KEY が未設定です（Vercel Environment Variables を確認）');
    }
    console.warn('[pdf] RESEND_API_KEY が未設定 — メール送信スキップ');
    return { skipped: true };
  }

  const { subject, html } = buildReportEmailContent(data, contactName);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject,
      html,
      tags: [
        { name: 'service', value: 'localgeo' },
        ...(sessionId ? [{ name: 'sessionId', value: sessionId }] : []),
      ],
      attachments: [
        {
          filename: 'AI-Visibility-Report.pdf',
          content: pdfBuffer.toString('base64'),
        },
      ],
    }),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(`Resend HTTP ${res.status}: ${text.slice(0, 200)}`);
  return { ok: true };
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'JSON が不正です' }, { status: 400 });
  }

  const parsed = validateRequest(body);
  if (!parsed.ok) {
    logRequest('[pdf] invalid', request, { error: parsed.error });
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { email, contactName, data, sessionId } = parsed;
  const scores = data.scores;
  logRequest('[pdf] start', request, {
    sessionId,
    emailHash: hashEmail(email),
    shopName: data.shopName,
    area: data.area,
    industry: data.industry,
    analyzedAt: data.analyzedAt,
  });

  try {
    const pdfBuffer = await generateFullReportPdf(data);

    const leadPayload: ReportLeadPayload = {
      email,
      contactName,
      shopName: data.shopName,
      area: data.area,
      industry: data.industry,
      localGeoScore: scores.localGeoScore,
      aiVisibilityScore: scores.aiVisibilityScore,
      faqOptimizationRate: scores.faqOptimizationRate,
      googleMapOptimizationRate: scores.googleMapOptimizationRate,
      aiRecommendationPotential: scores.aiRecommendationPotential,
      analyzedAt: data.analyzedAt,
      timestamp: new Date().toISOString(),
      sessionId: sessionId ?? undefined,
      source: 'local-geo-lp',
      formName: 'AI Visibility Report',
      pageUrl: clamp(body.pageUrl ?? '', 500) || null,
    };

    const [emailResult, airtableResult, slackResult] = await Promise.allSettled([
      sendReportEmail(email, contactName, data, pdfBuffer, sessionId),
      notifyAirtable(leadPayload),
      notifySlack(buildSlackReportMessage(leadPayload)),
    ]);

    if (emailResult.status === 'rejected') {
      logRequest('[pdf] email_failed', request, {
        sessionId,
        emailHash: hashEmail(email),
        message:
          emailResult.reason instanceof Error ? emailResult.reason.message : String(emailResult.reason),
      });
      return NextResponse.json(
        {
          ok: false,
          error: 'レポートのメール送付に失敗しました',
          detail: String(
            emailResult.reason instanceof Error ? emailResult.reason.message : emailResult.reason,
          ),
        },
        { status: 502 },
      );
    }

    const channels: NotifyChannelResult[] = [airtableResult, slackResult].map((result, i) => {
      const name = i === 0 ? 'airtable' : 'slack';
      if (result.status === 'fulfilled') return result.value;
      console.error(`[pdf] ${name} failed`, result.reason);
      return { channel: name, ok: false };
    });

    const emailValue = emailResult.value;
    logRequest('[pdf] email_result', request, {
      sessionId,
      emailHash: hashEmail(email),
      ok: Boolean(emailValue.ok),
      skipped: Boolean(emailValue.skipped),
    });

    let stepMailTriggered = false;
    let stepMailError: string | undefined;
    if (emailValue.ok) {
      const stepMailResult = await triggerStepMailSequence({
        email,
        contactName,
        shopName: data.shopName,
        area: data.area,
        industry: data.industry,
        localGeoScore: scores.localGeoScore,
        aiVisibilityScore: scores.aiVisibilityScore,
      });
      if (stepMailResult.ok) {
        stepMailTriggered = true;
      } else if (!stepMailResult.skipped) {
        stepMailError = stepMailResult.error;
        console.error('[pdf] step mail trigger failed', stepMailResult.error);
      }
    }

    return NextResponse.json({
      ok: true,
      emailSent: Boolean(emailValue.ok),
      emailSkipped: Boolean(emailValue.skipped),
      stepMailTriggered,
      ...(stepMailError ? { stepMailError } : {}),
      channels,
    });
  } catch (err) {
    logRequest('[pdf] error', request, {
      sessionId,
      emailHash: hashEmail(email),
      message: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      {
        ok: false,
        error: 'レポート生成に失敗しました',
        detail: err instanceof Error ? err.message : String(err),
      },
      { status: 502 },
    );
  }
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
