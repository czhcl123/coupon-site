import fs from 'node:fs';

const env = fs.readFileSync('.env.local', 'utf8');
const tok = (env.match(/^AWIN_API_TOKEN=(.*)$/m) || [])[1].trim();
const H = { Authorization: `Bearer ${tok}`, Accept: 'application/json' };

const r = await fetch('https://api.awin.com/publishers/3126487/programmes?relationship=notjoined', { headers: H });
const arr = await r.json();
console.log('directory size:', arr.length);

const byCur = {};
for (const p of arr) byCur[p.currencyCode || '?'] = (byCur[p.currencyCode || '?'] || 0) + 1;
console.log('by currency:', JSON.stringify(Object.entries(byCur).sort((a, b) => b[1] - a[1]).slice(0, 12)));

const want = ['nike', 'asos', 'adidas', 'sephora', 'walmart', 'target', 'booking', 'expedia', 'best buy', 'bestbuy', 'steam', 'temu', 'shein', 'nordstrom', 'ulta', 'amazon', 'ebay', 'etsy', 'shopee', 'aliexpress', 'argos', 'currys', 'john lewis', 'very.co.uk', 'jd sports', 'boohoo', 'river island', 'new look', 'm&s', 'marks'];
const hits = arr.filter((p) => want.some((w) => (p.name || '').toLowerCase().includes(w)));
console.log('\nkeyword hits:', hits.length);
for (const p of hits.slice(0, 40)) console.log(`- ${p.name} | id=${p.id} | ${p.currencyCode} | ${p.displayUrl || ''}`);

fs.writeFileSync('C:/Users/CL/AppData/Local/Temp/opencode/awin-directory.json', JSON.stringify(arr));
console.log('\nsaved directory snapshot');
