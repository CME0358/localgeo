#!/usr/bin/env node
/**
 * Post-deploy IndexNow — wait for production HTTP 200, then submit.
 *
 * Usage:
 *   node scripts/submit-indexnow-post-deploy.mjs [--dry-run] [--skip-wait]
 */
import { INDEXNOW_BASE, SITE_URLS, submitIndexNow } from './lib/indexnow-client.mjs';

const dryRun = process.argv.includes('--dry-run');
const skipWait = process.argv.includes('--skip-wait');

const WAIT_MS = 120_000;
const POLL_MS = 5_000;

/**
 * @param {string} url
 */
async function verifyProductionUrl(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': 'LocalGEO-IndexNow/1.0' },
    });
    return { ok: res.ok, status: res.status };
  } catch (err) {
    return { ok: false, status: 0, error: String(err.message || err) };
  }
}

/**
 * @param {string} url
 */
async function waitForProduction(url) {
  const deadline = Date.now() + WAIT_MS;
  while (Date.now() < deadline) {
    const check = await verifyProductionUrl(url);
    if (check.ok) {
      console.log(`IndexNow production gate PASS (${check.status}) — ${url}`);
      return check;
    }
    console.log(`IndexNow production gate waiting (${check.status || check.error}) — ${url}`);
    await new Promise((resolve) => setTimeout(resolve, POLL_MS));
  }
  console.warn(`IndexNow production gate FAIL — timeout after ${WAIT_MS}ms`);
  return { ok: false, status: 0, reason: 'timeout' };
}

const targetUrl = SITE_URLS[0];

if (!skipWait && !dryRun) {
  const gate = await waitForProduction(targetUrl);
  if (!gate.ok) {
    console.warn('INDEXNOW_FAILED production gate');
    console.log(JSON.stringify({
      status: 'blocked',
      submitted: 0,
      httpStatus: gate.status || null,
      deferred: false,
      blocked: true,
      reason: gate.reason || 'production_gate_failed',
    }));
    process.exit(2);
  }
}

const result = await submitIndexNow(SITE_URLS, { dryRun });
const output = {
  status: result.status,
  submitted: result.submitted ?? 0,
  httpStatus: result.httpStatus ?? null,
  deferred: result.status === 'skipped',
  blocked: result.status === 'rejected' || result.status === 'blocked',
};

console.log(JSON.stringify(output));

if (result.status === 'success' || result.status === 'accepted' || result.status === 'dry_run') {
  console.log(`IndexNow production gate PASS — ${INDEXNOW_BASE}`);
  process.exit(0);
}

if (result.status === 'skipped') {
  process.exit(0);
}

console.warn('INDEXNOW_FAILED', result.status, result.httpStatus || result.reason || '');
process.exit(result.graceful ? 0 : 1);
