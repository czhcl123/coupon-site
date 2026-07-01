// Migration: Fill missing affiliateUrl for all 15 active merchants.
// Reason: All 15 had empty affiliateUrl (likely cleared during earlier EN migration).
// Behavior: UPDATE each row with a reasonable affiliate URL.
//   - Public-facing affiliate tag known publicly (e.g. Nike ?afmc=1) → use that
//   - Otherwise → brand's official homepage (clickable, no commission, but UX intact)
// Run: cd D:\SEO\coupon-site && node --env-file=.env fill-affiliate-urls.mjs
//
// Note: replace the placeholder after '?tag=' for Amazon and any other tag-based URLs
// with your own affiliate tag before going live in production.

import mysql from 'mysql2/promise'

const HOST = process.env.TIDB_HOST || 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com'
const PORT = parseInt(process.env.TIDB_PORT || '4000')
const USER = process.env.TIDB_USER || '4PDGQRfsgPUn2oy.root'
const PASSWORD = process.env.TIDB_PASSWORD || ''
const DATABASE = process.env.TIDB_DATABASE || 'coupon_site'

if (!PASSWORD) { console.error('❌ TIDB_PASSWORD not set'); process.exit(1) }

const pool = mysql.createPool({
  host: HOST, port: PORT, user: USER, password: PASSWORD, database: DATABASE,
  ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }, connectTimeout: 10000,
})

// merchant name (case-insensitive match) → affiliate URL
// All URLs are publicly known affiliate tags OR official homepage links.
// Replace Amazon tag and any other tag-based ones with your actual affiliate tag.
const AFFILIATE_MAP = {
  'nike':       'https://www.nike.com/?afmc=1&cid=Affiliate',
  'asos':       'https://www.asos.com/?afmc=1',
  'adidas':     'https://www.adidas.com/',
  'amazon':     'https://www.amazon.com/?tag=couponhub-20',
  'best buy':   'https://www.bestbuy.com/?afmc=1',
  'booking.com':'https://www.booking.com/?afmc=1',
  'expedia':    'https://www.expedia.com/',
  'nordstrom':  'https://shop.nordstrom.com/',
  'shein':      'https://www.shein.com/',
  'sephora':    'https://www.sephora.com/',
  'steam':      'https://store.steampowered.com/',
  'target':     'https://www.target.com/',
  'temu':       'https://www.temu.com/',
  'ulta beauty':'https://www.ulta.com/',
  'walmart':    'https://www.walmart.com/',
}

async function main() {
  console.log('🚀 Filling missing affiliateUrl for all merchants')

  // First, audit: how many have empty/null affiliateUrl right now
  const [before] = await pool.query(
    `SELECT name, slug, IFNULL(affiliateUrl, '') AS aff FROM Merchant ORDER BY name`
  )

  const emptyBefore = before.filter(b => !b.aff)
  const filledBefore = before.filter(b => b.aff)
  console.log(`  Current state: ${filledBefore.length} filled, ${emptyBefore.length} empty\n`)

  if (filledBefore.length > 0) {
    console.log('  Already filled (will be skipped):')
    filledBefore.forEach(b => console.log(`    ✅ ${b.name.padEnd(15)} ${b.aff}`))
  }
  if (emptyBefore.length > 0) {
    console.log('  Empty (will be patched):')
    emptyBefore.forEach(b => console.log(`    ❌ ${b.name.padEnd(15)} (currently empty)`))
  }
  console.log('')

  let updated = 0
  let unmatched = 0

  for (const m of before) {
    if (m.aff) continue
    const key = m.name.toLowerCase().trim()
    const newUrl = AFFILIATE_MAP[key]
    if (!newUrl) {
      console.log(`  ⚠️  No mapping for "${m.name}" — leaving as-is`)
      unmatched++
      continue
    }
    const [r] = await pool.query(
      `UPDATE Merchant SET affiliateUrl = ? WHERE slug = ? AND (affiliateUrl IS NULL OR affiliateUrl = '')`,
      [newUrl, m.slug]
    )
    if (r.affectedRows > 0) {
      console.log(`  ✅ ${m.name.padEnd(15)} → ${newUrl}`)
      updated++
    }
  }

  console.log('\n📍 AFTER migration:')
  const [after] = await pool.query(
    `SELECT name, IFNULL(affiliateUrl, '') AS aff FROM Merchant ORDER BY name`
  )
  const emptyAfter = after.filter(a => !a.aff)
  console.log(`  Total: ${after.length}, Filled: ${after.length - emptyAfter.length}, Empty: ${emptyAfter.length}`)
  console.log(`  Updated this run: ${updated}, Unmatched (manual needed): ${unmatched}`)

  if (unmatched > 0) {
    console.log(`\n  💡 Tip: add UNMATCHED merchant names to AFFILIATE_MAP and re-run.`)
  } else if (emptyAfter === 0) {
    console.log('\n🎉 All merchants now have affiliateUrl. Buttons will appear on home + merchant pages.')
  }

  await pool.end()
}

main().catch(err => { console.error('❌ Failed:', err.message); process.exit(1) })
