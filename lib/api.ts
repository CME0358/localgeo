import {
  LOADING_STEP_MS,
  LOADING_STEPS,
  REPORT_LOADING_STEP_MS,
  REPORT_LOADING_STEPS,
} from '@/lib/constants/diagnosis';
import { mockAnalyze } from '@/lib/mock';
import type {
  DiagnosisInput,
  DiagnosisResult,
  LeadPayload,
  NotifyChannelResult,
  ReportRequest,
} from '@/lib/types/diagnosis';

export type DiagnosisStepCallback = (stepIndex: number, stepLabel: string) => void;

export interface FetchDiagnosisOptions {
  useMock?: boolean;
  onStep?: DiagnosisStepCallback;
}

export async function fetchDiagnosis(
  input: DiagnosisInput,
  options: FetchDiagnosisOptions = {},
): Promise<DiagnosisResult> {
  const { useMock = false, onStep } = options;
  const stepCallback: DiagnosisStepCallback = onStep ?? (() => {});

  if (useMock) {
    return mockAnalyze(input, stepCallback, {
      loadingSteps: LOADING_STEPS,
      loadingStepMs: LOADING_STEP_MS,
    });
  }

  for (let i = 0; i < LOADING_STEPS.length; i++) {
    stepCallback(i, LOADING_STEPS[i] ?? '');
    await new Promise((resolve) => setTimeout(resolve, LOADING_STEP_MS * 0.5));
  }

  const res = await fetch('/api/diagnose', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const json = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(json.error ?? `診断APIエラー: ${res.status}`);
  }

  return res.json() as Promise<DiagnosisResult>;
}

export interface NotifyLeadPayload {
  shopName: string;
  area: string;
  industry: string;
  timestamp?: string;
  pageUrl?: string;
}

export async function notifyLead(payload: NotifyLeadPayload): Promise<void> {
  try {
    await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shopName: payload.shopName,
        area: payload.area,
        industry: payload.industry,
        timestamp: payload.timestamp ?? new Date().toISOString(),
        pageUrl: payload.pageUrl ?? (typeof window !== 'undefined' ? window.location.href : undefined),
      }),
    });
  } catch (err) {
    console.warn('[notifyLead]', err);
  }
}

export interface SendReportResponse {
  ok: boolean;
  emailSent?: boolean;
  emailSkipped?: boolean;
  stepMailTriggered?: boolean;
  channels?: NotifyChannelResult[];
  error?: string;
  detail?: string;
}

export async function sendReport(
  formData: Pick<ReportRequest, 'email' | 'contactName' | 'shopName'> & {
    area: string;
    industry: string;
    diagnosis: DiagnosisResult;
    pageUrl?: string;
  },
  onReportStep?: DiagnosisStepCallback,
): Promise<SendReportResponse> {
  const stepCallback = onReportStep ?? (() => {});
  let stepIndex = 0;
  stepCallback(stepIndex, REPORT_LOADING_STEPS[0] ?? '');

  const stepTimer = setInterval(() => {
    stepIndex += 1;
    if (stepIndex < REPORT_LOADING_STEPS.length) {
      stepCallback(stepIndex, REPORT_LOADING_STEPS[stepIndex] ?? '');
    }
  }, REPORT_LOADING_STEP_MS);

  try {
    const res = await fetch('/api/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        contactName: formData.contactName || undefined,
        shopName: formData.shopName,
        area: formData.area,
        industry: formData.industry,
        diagnosis: formData.diagnosis,
        pageUrl:
          formData.pageUrl ??
          (typeof window !== 'undefined' ? window.location.href : undefined),
      }),
    });

    const json = (await res.json().catch(() => ({}))) as SendReportResponse;

    if (!res.ok) {
      throw new Error(json.error ?? json.detail ?? '送信に失敗しました');
    }

    if (!json.emailSent) {
      throw new Error(
        json.emailSkipped
          ? 'メール送信設定が未完了です。しばらくしてから再度お試しください。'
          : 'メールの送付に失敗しました',
      );
    }

    return json;
  } finally {
    clearInterval(stepTimer);
  }
}

export type { LeadPayload, ReportRequest };
