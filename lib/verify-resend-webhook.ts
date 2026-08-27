import crypto from 'node:crypto';

const MAX_AGE_SEC = 300;

function parseSignatures(header: string): string[] {
  return header
    .split(' ')
    .map((part) => part.trim())
    .filter((part) => part.startsWith('v1,'))
    .map((part) => part.slice(3));
}

export function verifyResendWebhook(
  rawBody: string,
  headers: {
    id: string | null;
    timestamp: string | null;
    signature: string | null;
  },
  secret: string,
): void {
  const { id, timestamp, signature } = headers;
  if (!id || !timestamp || !signature) {
    throw new Error('Missing Svix webhook headers');
  }

  const ts = Number.parseInt(timestamp, 10);
  if (!Number.isFinite(ts)) {
    throw new Error('Invalid Svix timestamp');
  }
  const age = Math.abs(Date.now() / 1000 - ts);
  if (age > MAX_AGE_SEC) {
    throw new Error('Svix timestamp too old');
  }

  const keyPart = secret.startsWith('whsec_') ? secret.slice(6) : secret;
  const key = Buffer.from(keyPart, 'base64');
  const signed = `${id}.${timestamp}.${rawBody}`;
  const expected = crypto.createHmac('sha256', key).update(signed).digest('base64');

  const valid = parseSignatures(signature).some((sig) => {
    try {
      const a = Buffer.from(sig);
      const b = Buffer.from(expected);
      return a.length === b.length && crypto.timingSafeEqual(a, b);
    } catch {
      return false;
    }
  });

  if (!valid) {
    throw new Error('Invalid Svix webhook signature');
  }
}
