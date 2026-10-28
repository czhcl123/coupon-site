import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

// 仅在设置了 ADMIN_TOKEN 时才开放；未设置则直接 404（默认安全）
export async function GET(req: Request) {
  const expected = process.env.ADMIN_TOKEN
  if (!expected) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const provided = req.headers.get('x-admin-token') || ''
  if (provided !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = process.env.DATABASE_URL
  const tidbPw = process.env.TIDB_PASSWORD

  // 只暴露掩码后的形态，绝不回显原始 DATABASE_URL / 密码
  const maskedUrl = (() => {
    if (!url) return null
    try {
      const u = new URL(url)
      if (u.password) u.password = '***' + u.password.slice(-4)
      return u.toString()
    } catch {
      return 'invalid-url'
    }
  })()

  const result: Record<string, unknown> = {
    masked_DATABASE_URL: maskedUrl,
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
