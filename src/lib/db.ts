import mysql from 'mysql2/promise'

let _pool: mysql.Pool | null = null

function createPool() {
  let host: string, port: number, user: string, password: string, database: string

  const url = process.env.DATABASE_URL
  if (url) {
    try {
      const u = new URL(url)
      host = u.hostname
      port = parseInt(u.port || '3306')
      user = u.username
      password = u.password
      database = u.pathname.slice(1)
    } catch {
      // fallback to individual env vars
      host = process.env.TIDB_HOST || 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com'
      port = parseInt(process.env.TIDB_PORT || '4000')
      user = process.env.TIDB_USER || '4PDGQRFsPUn2oy.root'
      password = process.env.TIDB_PASSWORD || ''
      database = process.env.TIDB_DATABASE || 'coupon_site'
    }
  } else {
    host = process.env.TIDB_HOST || 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com'
    port = parseInt(process.env.TIDB_PORT || '4000')
    user = process.env.TIDB_USER || '4PDGQRFsPUn2oy.root'
    password = process.env.TIDB_PASSWORD || ''
    database = process.env.TIDB_DATABASE || 'coupon_site'
  }

  return mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false },
    connectTimeout: 10000,
  })
}

function getPool() {
  if (!_pool) {
    _pool = createPool()
  }
  return _pool
}

export async function query<T = Record<string, unknown>>(sql: string, values?: unknown[]): Promise<T[]> {
  const pool = getPool()
  const [rows] = await pool.query(sql, values)
  return rows as T[]
}

export { getPool as pool }
