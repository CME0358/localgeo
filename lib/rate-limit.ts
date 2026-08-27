import { NextResponse } from 'next/server';

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;

type Bucket = { count: number; windowStart: number };

const buckets = new Map<string, Bucket>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

export function rateLimitOrNull(request: Request, route: string): NextResponse | null {
  const key = `${route}:${clientIp(request)}`;
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket || now - bucket.windowStart >= WINDOW_MS) {
    bucket = { count: 0, windowStart: now };
  }
  bucket.count += 1;
  buckets.set(key, bucket);

  if (bucket.count > MAX_PER_WINDOW) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  return null;
}

export function clampField(value: unknown, maxLen: number): string {
  const t = String(value ?? '').trim();
  return t.length > maxLen ? t.slice(0, maxLen) : t;
}
