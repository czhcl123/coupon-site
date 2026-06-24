import mysql from 'mysql2/promise'

function parseDatabaseUrl(url: string) {
  const u = new URL(url)
  return {
    host: u.hostname,
    port: parseInt(u.port || '3306'),
    user: u.username,
    password: u.password,
    database: u.pathname.slice(1),
  }
}

let _pool: mysql.Pool | null = null

function getPool() {
  if (!_pool) {
    const url = process.env.DATABASE_URL
    if (!url) throw new Error('DATABASE_URL environment variable is not set')
    const cfg = parseDatabaseUrl(url)
    _pool = mysql.createPool({
      host: cfg.host,
      port: cfg.port,
      user: cfg.user,
      password: cfg.password,
      database: cfg.database,
      ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false },
      connectTimeout: 10000,
    })
  }
  return _pool
}

export async function query<T = Record<string, unknown>>(sql: string, values?: unknown[]): Promise<T[]> {
  const pool = getPool()
  const [rows] = await pool.query(sql, values)
  return rows as T[]
}

export { getPool as pool }
