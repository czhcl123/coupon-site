import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET() {
  const url = process.env.DATABASE_URL
  const tidbPw = process.env.TIDB_PASSWORD

  const result: Record<string, unknown> = {
    raw_DATABASE_URL: url,
    raw_TIDB_PASSWORD: tidbPw ? '***' + tidbPw.slice(-4) : null,
    parsed: null as Record<string, string> | null,
    connectionTest: null,
    error: null,
  }

  if (url) {
    try {
      const u = new URL(url)
      result.parsed = {
        host: u.hostname,
        port: u.port || '3306',
        user: u.username,
        password: u.password ? '***' + u.password.slice(-6) : null,
        database: u.pathname.slice(1),
        query: u.search,
      }
    } catch (e) {
      result.parsed = { parseError: String(e) }
    }
  }

  // Test connection using db.ts approach
  let host = '', port = 3306, user = '', password = '', database = ''

  if (url) {
    try {
      const u = new URL(url)
      host = u.hostname
      port = parseInt(u.port || '3306')
      user = u.username
      password = u.password
      database = u.pathname.slice(1)
    } catch {
      // use defaults
    }
  }

  if (host && user && password) {
    try {
      const conn = await mysql.createConnection({
        host, port, user, password, database,
        ssl: { rejectUnauthorized: false },
        connectTimeout: 10000,
      })
      const [rows] = await conn.query('SELECT 1 as test')
      result.connectionTest = rows
      await conn.end()
    } catch (e: unknown) {
      const err = e as Record<string, unknown>
      result.error = {
        code: err.code,
        message: err.message,
        errno: err.errno,
        sqlMessage: err.sqlMessage,
      }
    }
  }

  return NextResponse.json(result)
}
