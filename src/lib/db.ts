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

const url = process.env.DATABASE_URL!
const cfg = parseDatabaseUrl(url)

const pool = mysql.createPool({
  host: cfg.host,
  port: cfg.port,
  user: cfg.user,
  password: cfg.password,
  database: cfg.database,
  ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false },
  connectTimeout: 10000,
})

export async function query<T = Record<string, unknown>>(sql: string, values?: unknown[]): Promise<T[]> {
  const [rows] = await pool.query(sql, values)
  return rows as T[]
}

export { pool }
