// Awin 探测脚本 — 只读，不改任何数据
// 用法：node scripts/awin-probe.mjs
// token 放 .env.local（或 .env）的 AWIN_API_TOKEN=...，不要提交、不要贴进对话
// 所有输出都会把 token 替换成 [TOKEN]，避免误打印

import fs from 'node:fs';
import path from 'node:path';

const PUBLISHER_ID = '3126487';

function loadEnv() {
  const out = {};
  for (const name of ['.env.local', '.env']) {
    const p = path.join(process.cwd(), name);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && out[m[1]] === undefined) out[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
    }
  }
  return out;
}

const env = loadEnv();
const token = env.AWIN_API_TOKEN || process.env.AWIN_API_TOKEN;

if (!token) {
  console.log('缺少 AWIN_API_TOKEN');
  console.log('写到 D:\\SEO\\coupon-site\\.env.local，格式：AWIN_API_TOKEN=你的token');
  process.exit(2);
}

const redact = (s) => String(s).split(token).join('[TOKEN]');
const log = (...a) => console.log(redact(a.join(' ')));
const H = { Authorization: `Bearer ${token}`, Accept: 'application/json' };

async function get(url, as = 'json') {
  const r = await fetch(url, { headers: H });
  const text = await r.text();
  if (!r.ok) return { ok: false, status: r.status, body: text.slice(0, 300) };
  return { ok: true, status: r.status, body: as === 'json' ? JSON.parse(text) : text };
}

const base = `https://api.awin.com/publishers/${PUBLISHER_ID}`;

for (const rel of ['joined', 'pending', 'suspended']) {
  const res = await get(`${base}/programmes?relationship=${rel}`);
  if (!res.ok) {
    log(`${rel}: HTTP ${res.status} :: ${res.body.replace(/\s+/g, ' ')}`);
    continue;
  }
  const list = Array.isArray(res.body) ? res.body : [];
  log(`\n=== ${rel} (${list.length}) ===`);
  for (const p of list) {
    const name = p.name ?? p.programmeName ?? '(no name)';
    const id = p.id ?? p.programmeId ?? '';
    const cur = p.currencyCode ?? p.currency ?? '';
    let pct = p.commissionRange ?? p.commission ?? '';
    if (typeof pct === 'object' && pct !== null) pct = JSON.stringify(pct);
    log(`- ${String(name).padEnd(26)} id=${String(id).padEnd(8)} ${cur} ${pct}`);
  }
}

const feed = await get(`https://productdata.awin.com/datafeed/list/apikey/${token}`, 'text');
if (!feed.ok) {
  log(`\nproduct feed list: HTTP ${feed.status} :: ${feed.body.replace(/\s+/g, ' ')}`);
} else {
  const lines = feed.body.split(/\r?\n/).filter(Boolean);
  log(`\n=== product data feeds (${lines.length} 行) ===`);
  for (const l of lines.slice(0, 10)) log('- ' + l.slice(0, 200));
}
