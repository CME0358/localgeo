/** Canonical site URL (no trailing slash). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://localgeo.coaretail.com'
).replace(/\/$/, '');
