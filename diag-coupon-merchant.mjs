// 快速诊断:coupon.merchantId 是否对得上 merchant.id
import mysql from 'mysql2/promise'

const HOST = process.env.TIDB_HOST || 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com'
const PORT = parseInt(process.env.TIDB_PORT || '4000')
const USER = process.env.TIDB_USER || '4PDGQRfsgPUn2oy.root'
const PASSWORD = process.env.TIDB_PASSWORD || ''
const DATABASE = process.env.TIDB_DATABASE || 'coupon_site'

const pool = mysql.createPool({
  host: HOST, port: PORT, user: USER, password: PASSWORD, database: DATABASE,
  ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false }, connectTimeout: 10000,
})

const [m] = await pool.query(`SELECT id, name, slug FROM Merchant ORDER BY name`)
const [c] = await pool.query(`SELECT id, title, merchantId FROM Coupon ORDER BY title LIMIT 20`)

const merchantMap = new Map(m.map(x => [x.id, x]))
const orphanIds = new Set()

console.log('Merchants:', m.length)
console.log('Coupons:', c.length)
console.log('---')
for (const cp of c) {
  const mInfo = merchantMap.get(cp.merchantId)
  const ok = mInfo ? '✅' : '❌ ORPHAN'
  console.log(`${ok}  [${cp.merchantId.padEnd(15)}] ${cp.title.slice(0, 35).padEnd(35)} → ${mInfo ? mInfo.slug : 'MISSING'}`)
  if (!mInfo) orphanIds.add(cp.merchantId)
}

const [orphans] = await pool.query(`SELECT DISTINCT merchantId FROM Coupon WHERE merchantId NOT IN (SELECT id FROM Merchant)`)
console.log('\n=== Orphan merchantIds ===')
console.log(orphans)

await pool.end()