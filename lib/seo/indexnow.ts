import { SITE_URL } from '@/lib/constants/site';

const INDEXNOW_HOST = 'localgeo.coaretail.com';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const KEY_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;

export const INDEXNOW_SITE_URLS = [`${SITE_URL}/`] as const;

function validateKey(key: string | undefined): key is string {
  if (!key) return false;
  return KEY_PATTERN.test(key);
}

export async function verifyIndexNowKeyFile(key: string) {
  const keyFileUrl = `${SITE_URL}/${key}.txt`;
  const res = await fetch(keyFileUrl, { cache: 'no-store' });
  if (!res.ok) {
    return { ok: false as const, status: res.status, keyFileUrl };
  }
  const body = (await res.text()).trim();
  return {
    ok: body === key,
    status: res.status,
    keyFileUrl,
    bodyMatch: body === key,
  };
}

export async function submitIndexNowFromServer() {
  const key = process.env.INDEXNOW_KEY;
  if (!validateKey(key)) {
    return {
      status: 'skipped' as const,
      reason: !key ? 'INDEXNOW_KEY is empty' : 'INDEXNOW_KEY format invalid',
      submitted: 0,
      httpStatus: null,
    };
  }

  const keyFile = await verifyIndexNowKeyFile(key);
  if (!keyFile.ok) {
    return {
      status: 'key_verification_failed' as const,
      reason: 'IndexNow key file not reachable or content mismatch',
      submitted: 0,
      httpStatus: keyFile.status,
      keyFileUrl: keyFile.keyFileUrl,
    };
  }

  const payload = {
    host: INDEXNOW_HOST,
    key,
    keyLocation: `${SITE_URL}/${key}.txt`,
    urlList: [...INDEXNOW_SITE_URLS],
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  const classification =
    res.status === 200
      ? 'success'
      : res.status === 202
        ? 'accepted'
        : res.status === 403
          ? 'key_verification_failed'
          : 'error';

  return {
    status: classification,
    submitted: res.ok ? payload.urlList.length : 0,
    httpStatus: res.status,
    urls: payload.urlList,
    keyFileUrl: keyFile.keyFileUrl,
  };
}
