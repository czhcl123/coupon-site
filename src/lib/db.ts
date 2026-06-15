import mysql from 'mysql2/promise'

// 直接用 mysql2 连接 TiDB Cloud，不依赖 Prisma
const pool = mysql.createPool({
  host: 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com',
  port: 4000,
  user: '4PDGQRfsgPUn2oy.root',
  password: 'tOq5TT7xQQHWZMXG',
  database: 'coupon_site',
  ssl: { rejectUnauthorized: true },
})

export async function query<T = Record<string, unknown>>(sql: string, values?: unknown[]): Promise<T[]> {
  const [rows] = await pool.execute(sql, values)
  return rows as T[]
}

export { pool }