#!/usr/bin/env node
/**
 * IndexNow submission CLI for localgeo.coaretail.com
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs [--dry-run] <url> [<url>...]
 *   node scripts/submit-indexnow.mjs --full-site [--dry-run]
 */
import { SITE_URLS, submitIndexNow } from './lib/indexnow-client.mjs';

const dryRun = process.argv.includes('--dry-run');
const fullSite = process.argv.includes('--full-site');
const urls = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));

if (fullSite) {
  console.log(`IndexNow full-site: ${SITE_URLS.length} URL(s)`);
  const result = await submitIndexNow(SITE_URLS, { dryRun });
  console.log(JSON.stringify({
    status: result.status,
    submitted: result.submitted ?? 0,
    httpStatus: result.httpStatus ?? null,
    deferred: result.status === 'skipped',
    blocked: result.status === 'rejected',
  }));
  if (result.status === 'rejected') process.exit(1);
  process.exit(0);
}

if (!urls.length) {
  console.error('Usage: node scripts/submit-indexnow.mjs [--dry-run] <url> [<url>...]');
  console.error('       node scripts/submit-indexnow.mjs --full-site [--dry-run]');
  process.exit(1);
}

const result = await submitIndexNow(urls, { dryRun });

if (result.status === 'rejected') {
  for (const item of result.rejected || []) {
    console.error(`REJECTED: ${item.url} — ${item.reason}`);
  }
  process.exit(1);
}

if (result.status === 'skipped' && result.reason?.includes('INDEXNOW_KEY')) {
  console.warn('IndexNow: SKIPPED — INDEXNOW_KEY not configured');
  process.exit(0);
}

process.exit(0);
