export class ResendError extends Error {
  readonly statusCode: number;
  readonly resendMessage: string;

  constructor(statusCode: number, resendMessage: string) {
    super(`Resend HTTP ${statusCode}: ${resendMessage}`);
    this.name = 'ResendError';
    this.statusCode = statusCode;
    this.resendMessage = resendMessage;
  }

  get isAuthError(): boolean {
    return (
      this.statusCode === 401 ||
      (this.statusCode === 400 &&
        /api key is invalid|invalid api key|invalid.*api key/i.test(this.resendMessage))
    );
  }

  get isRecipientError(): boolean {
    return this.statusCode === 422 && /invalid `to` field/i.test(this.resendMessage);
  }
}

function parseResendErrorBody(text: string): string {
  try {
    const json = JSON.parse(text) as { message?: string };
    return json.message ?? text.slice(0, 200);
  } catch {
    return text.slice(0, 200);
  }
}

export async function assertResendApiKey(apiKey: string): Promise<void> {
  const res = await fetch('https://api.resend.com/domains', {
    method: 'GET',
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (res.ok) return;

  const text = await res.text();
  throw new ResendError(res.status, parseResendErrorBody(text));
}

export interface ResendEmailAttachment {
  filename: string;
  content: string;
}

export interface SendResendEmailInput {
  apiKey: string;
  from: string;
  to: string[];
  subject: string;
  html: string;
  tags?: { name: string; value: string }[];
  attachments?: ResendEmailAttachment[];
}

export async function sendResendEmail(input: SendResendEmailInput): Promise<void> {
  await assertResendApiKey(input.apiKey);

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${input.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: input.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      tags: input.tags,
      attachments: input.attachments,
    }),
  });

  if (res.ok) return;

  const text = await res.text();
  throw new ResendError(res.status, parseResendErrorBody(text));
}

export function resendErrorToUserMessage(error: unknown): string {
  if (!(error instanceof ResendError)) {
    return error instanceof Error ? error.message : 'メールの送付に失敗しました';
  }

  if (error.isAuthError) {
    return 'メール送信サービスの認証に失敗しました。RESEND_API_KEY を Resend Dashboard で再発行し、.env.local（ローカル）または Vercel 環境変数に設定してください。';
  }

  if (error.isRecipientError) {
    return 'このメールアドレスには送信できません。実在するメールアドレスを入力してください。';
  }

  return `メールの送付に失敗しました（${error.resendMessage}）`;
}
