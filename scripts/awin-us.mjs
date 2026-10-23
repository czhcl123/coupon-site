import fs from 'node:fs';

const arr = JSON.parse(fs.readFileSync('C:/Users/CL/AppData/Local/Temp/opencode/awin-directory.json', 'utf8'));
console.log('sample keys:', Object.keys(arr[0]).join(', '));
console.log('sample entry:', JSON.stringify(arr[0]).slice(0, 500));

const us = arr.filter((p) => p.currencyCode === 'USD');
console.log('\nUSD advertisers:', us.length);

const candidates = ['wayfair','chewy','etsy','ebay','home depot',"lowe's","lowes",'macy','kohl','best buy','bestbuy','newegg','expedia','hotels.com','priceline','kayak','walmart','target','costco','sephora','ulta','nike','adidas','asos','shein','temu','nordstrom','bloomingdale','rei','backcountry','iherb','vitacost','zappos','overstock','bed bath','petco','petsmart','walgreens','cvs','groupon','rakuten','samsung','dell','lenovo','hp.com','sonos','vitamix','dyson','skims','gymshark','fabletics','lululemon','under armour','columbia','patagonia','nordstrom rack','saks','neiman','shopbop','revolve','farfetch','ssense','yesstyle','romwe','lightinthebox','gearbest','banggood','dhgate','aliexpress'];
const hits = us.filter((p) => candidates.some((w) => (p.name || '').toLowerCase().includes(w)));
console.log('candidate hits:', hits.length);
for (const p of hits) console.log(`- ${p.name} | id=${p.id} | ${p.displayUrl || ''}`);

// 随机抽样 25 个 USD 商家，看整体质量
const step = Math.floor(us.length / 25);
console.log('\n--- random USD sample ---');
for (let i = 0; i < us.length; i += step) {
  const p = us[i];
  console.log(`- ${p.name} | id=${p.id} | ${(p.displayUrl || '').slice(0, 60)}`);
}
