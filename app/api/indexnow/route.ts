import { NextResponse } from 'next/server';
import { submitIndexNowFromServer } from '@/lib/seo/indexnow';

export const dynamic = 'force-dynamic';

export async function POST() {
  const result = await submitIndexNowFromServer();
  const ok =
    result.status === 'success' ||
    result.status === 'accepted' ||
    result.status === 'skipped';

  return NextResponse.json(result, {
    status: ok ? 200 : result.status === 'key_verification_failed' ? 503 : 502,
  });
}
