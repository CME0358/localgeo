const STEP_MAIL_EVENT = process.env.RESEND_STEP_MAIL_EVENT?.trim() || 'pdf.report_requested';

function resolveEventsApiKey(): string | undefined {
  return (
    process.env.RESEND_EVENTS_API_KEY?.trim() ||
    process.env.RESEND_AUTOMATION_API_KEY?.trim() ||
    process.env.RESEND_API_KEY?.trim()
  );
}

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

function parseStepMailError(status: number, text: string): string {
  if (status === 401 && text.includes('restricted_api_key')) {
    return 'Resend APIキーが Sending access のみです。Automations には Full access キー（RESEND_EVENTS_API_KEY）が必要です';
  }
  return `Resend event HTTP ${status}: ${text.slice(0, 200)}`;
}

function buildEventPayload(payload: StepMailPayload): Record<string, string | number> {
  // Resend Dashboard の events.send 例と同一キー・型
  return {
    area: payload.area,
    industry: payload.industry,
    shopName: payload.shopName,
    contactName: payload.contactName ?? '',
    localGeoScore: payload.localGeoScore,
    aiVisibilityScore: payload.aiVisibilityScore,
  };
}

/** PDF送付成功後に Resend Automation（Day1〜7）を開始する */
export async function triggerStepMailSequence(
  payload: StepMailPayload,
): Promise<StepMailTriggerResult> {
  const apiKey = resolveEventsApiKey();
  if (!apiKey) {
    console.warn('[step-mail] RESEND_EVENTS_API_KEY / RESEND_API_KEY が未設定 — スキップ');
    return { ok: false, skipped: true };
  }

  // resend.events.send({ event, email, payload }) と同等の REST 呼び出し
  const body = {
    event: STEP_MAIL_EVENT,
    email: payload.email,
    payload: buildEventPayload(payload),
  };

  const res = await fetch('https://api.resend.com/events/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  // 成功は 202 Accepted
  if (res.status !== 202) {
    const error = parseStepMailError(res.status, text);
    console.error('[step-mail]', error, body.event, body.email);
    return { ok: false, error };
  }

  return { ok: true };
}
