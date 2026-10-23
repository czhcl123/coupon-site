import fs from 'node:fs';
const arr = JSON.parse(fs.readFileSync('C:/Users/CL/AppData/Local/Temp/opencode/awin-directory.json', 'utf8'));

const checks = ['nike', 'asos', 'adidas us', 'sephora us', 'walmart', 'target', 'amazon', 'best buy', 'booking.com', 'expedia', 'nordstrom', 'ulta', 'shein', 'temu', 'lululemon', 'under armour', 'aliexpress', 'iherb', 'steam', 'samsung us', 'apple', 'ebay', 'etsy', 'wayfair', 'chewy', 'groupon us'];
for (const q of checks) {
  const m = arr.filter((p) => (p.name || '').toLowerCase().includes(q));
  const us = m.filter((p) => p.currencyCode === 'USD');
  console.log(`\n[${q}] total=${m.length} USD=${us.length}`);
  for (const p of us.slice(0, 6)) console.log(`   US: ${p.name} | id=${p.id} | ${p.primaryRegion?.name || ''} | ${p.status}`);
  for (const p of m.filter((x) => x.currencyCode !== 'USD').slice(0, 3)) console.log(`   other: ${p.name} | id=${p.id} | ${p.currencyCode}`);
}
