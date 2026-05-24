import { NextResponse } from 'next/server';
import { generateReportPdf } from '@/lib/pdf/generate-pdf';
import {
  buildSlackReportMessage,
  clamp,
  notifyAirtable,
  notifySlack,
} from '@/lib/pdf/lead-notify';
import type { DiagnosisResult, NotifyChannelResult, ReportLeadPayload } from '@/lib/types/diagnosis';

export const maxDuration = 60;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ValidatedReportRequest {
  ok: true;
  email: string;
  contactName: string | null;
  data: DiagnosisResult;
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

  return { ok: true, email, contactName, data };
}

interface EmailSendResult {
  ok?: boolean;
  skipped?: boolean;
}

async function sendReportEmail(
  email: string,
  contactName: string | null,
  shopName: string,
  pdfBuffer: Buffer,
): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim() || 'Local GEO <reports@coaretail.com>';

  if (!apiKey) {
    console.warn('[pdf] RESEND_API_KEY が未設定 — メール送信スキップ');
    return { skipped: true };
  }

  const greeting = contactName ? `${contactName} 様` : 'ご担当者 様';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: `AI Visibility Report — ${shopName}`,
      html: `
        <div style="font-family:sans-serif;color:#0D1B3E;max-width:560px;margin:0 auto;">
          <p>${greeting}</p>
          <p><strong>${shopName}</strong> の AI Visibility Report をお送りします。</p>
          <p>添付 PDF に、Local GEO Score・AI Visibility・改善ポイントをまとめています。</p>
          <p style="color:#8899BB;font-size:13px;">GEO Search Protocol™ for Local</p>
        </div>
      `,
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
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { email, contactName, data } = parsed;
  const scores = data.scores;

  try {
    const pdfBuffer = await generateReportPdf(data);

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
      source: 'local-geo-lp',
      formName: 'AI Visibility Report',
      pageUrl: clamp(body.pageUrl ?? '', 500) || null,
    };

    const [emailResult, airtableResult, slackResult] = await Promise.allSettled([
      sendReportEmail(email, contactName, data.shopName, pdfBuffer),
      notifyAirtable(leadPayload),
      notifySlack(buildSlackReportMessage(leadPayload)),
    ]);

    if (emailResult.status === 'rejected') {
      console.error('[pdf] email failed', emailResult.reason);
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

    return NextResponse.json({
      ok: true,
      emailSent: Boolean(emailValue.ok),
      emailSkipped: Boolean(emailValue.skipped),
      channels,
    });
  } catch (err) {
    console.error('[pdf]', err);
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
