// Awin 申请状态监视 — 只读
// 用法：node scripts/awin-watch.mjs
// 输出：joined / pending / rejected 三组商家 + 变化提示

import fs from 'node:fs';
import path from 'node:path';

const PUBLISHER_ID = '3126487';
const STATE = path.join('C:/Users/CL/AppData/Local/Temp/opencode', 'awin-state.json');

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

const token = loadEnv().AWIN_API_TOKEN;
if (!token) { console.log('缺少 AWIN_API_TOKEN'); process.exit(2); }
const H = { Authorization: `Bearer ${token}`, Accept: 'application/json' };

const snap = {};
for (const rel of ['joined', 'pending', 'rejected']) {
  const r = await fetch(`https://api.awin.com/publishers/${PUBLISHER_ID}/programmes?relationship=${rel}`, { headers: H });
  if (!r.ok) { console.log(`${rel}: HTTP ${r.status}`); snap[rel] = []; continue; }
  const arr = await r.json();
  snap[rel] = arr.map((p) => ({ id: p.id, name: p.name, cur: p.currencyCode }));
}

let prev = {};
if (fs.existsSync(STATE)) { try { prev = JSON.parse(fs.readFileSync(STATE, 'utf8')); } catch { prev = {}; } }

for (const rel of ['joined', 'pending', 'rejected']) {
  const list = snap[rel] || [];
  console.log(`\n=== ${rel} (${list.length}) ===`);
  for (const p of list) console.log(`- ${p.name} | id=${p.id} | ${p.cur}`);
  const before = new Set((prev[rel] || []).map((p) => p.id));
  const added = list.filter((p) => !before.has(p.id));
  if (Object.keys(prev).length && added.length) {
    console.log('  ★ 新增: ' + added.map((p) => p.name).join(', '));
  }
}

fs.writeFileSync(STATE, JSON.stringify(snap, null, 2));
console.log('\n状态已保存，下次运行会标出变化。');
