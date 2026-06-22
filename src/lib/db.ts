import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com',
  port: 4000,
  user: '4PDGQRfsgPUn2oy.root',
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE || 'coupon_site',
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: false,
  },
  connectTimeout: 10000,
})

export async function query<T = Record<string, unknown>>(sql: string, values?: unknown[]): Promise<T[]> {
  const [rows] = await pool.query(sql, values)
  return rows as T[]
}

export { pool }
