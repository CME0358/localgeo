#!/usr/bin/env node
/**
 * RESEND_API_KEY の有効性を確認する。
 * 使い方: npm run check:resend（.env.local を読み込む）
 */
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

function loadEnvLocal() {
  const path = join(process.cwd(), '.env.local');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1);
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const apiKey = process.env.RESEND_API_KEY?.trim();
if (!apiKey) {
  console.error('❌ RESEND_API_KEY が未設定です（.env.local を確認）');
  process.exit(1);
}

const res = await fetch('https://api.resend.com/domains', {
  headers: { Authorization: `Bearer ${apiKey}` },
});
const body = await res.text();

if (res.ok) {
  console.log('✅ RESEND_API_KEY は有効です');
  process.exit(0);
}

console.error(`❌ RESEND_API_KEY が無効です (HTTP ${res.status})`);
console.error(body.slice(0, 300));
console.error('\n→ Resend Dashboard (https://resend.com/api-keys) で再発行');
console.error('→ 本番 Vercel の RESEND_API_KEY を .env.local にコピー');
process.exit(1);
