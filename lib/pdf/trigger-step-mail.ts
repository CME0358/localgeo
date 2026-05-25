const STEP_MAIL_EVENT = process.env.RESEND_STEP_MAIL_EVENT?.trim() || 'pdf.report_requested';

export interface StepMailPayload {
  email: string;
  contactName: string | null;
  shopName: string;
  area: string;
  industry: string;
  localGeoScore: number;
  aiVisibilityScore: number;
}

export interface StepMailTriggerResult {
  ok: boolean;
  skipped?: boolean;
  error?: string;
}

/** PDF送付成功後に Resend Automation（Day1〜7）を開始する */
export async function triggerStepMailSequence(
  payload: StepMailPayload,
): Promise<StepMailTriggerResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn('[step-mail] RESEND_API_KEY が未設定 — スキップ');
    return { ok: false, skipped: true };
  }

  const res = await fetch('https://api.resend.com/events/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: STEP_MAIL_EVENT,
      email: payload.email,
      payload: {
        contactName: payload.contactName ?? '',
        shopName: payload.shopName,
        area: payload.area,
        industry: payload.industry,
        localGeoScore: payload.localGeoScore,
        aiVisibilityScore: payload.aiVisibilityScore,
      },
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    return {
      ok: false,
      error: `Resend event HTTP ${res.status}: ${text.slice(0, 200)}`,
    };
  }

  return { ok: true };
}
