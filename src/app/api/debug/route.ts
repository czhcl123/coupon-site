import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET() {
  // Read directly from DATABASE_URL (same as db.ts)
  const url = process.env.DATABASE_URL
  const password = process.env.TIDB_PASSWORD

  const results: Record<string, unknown> = {
    has_DATABASE_URL: !!url,
    has_TIDB_PASSWORD: !!password,
    url_host: url ? new URL(url).hostname : null,
    url_user: url ? new URL(url).username : null,
    url_password_last4: url ? new URL(url).password.slice(-4) : null,
    tidb_password_last4: password ? password.slice(-4) : null,
    connectionTest: null,
    error: null,
  }

  // Try connection using same approach as db.ts
  let host: string, port: number, user: string, dbPassword: string, database: string

  if (url) {
    try {
      const u = new URL(url)
      host = u.hostname
      port = parseInt(u.port || '3306')
      user = u.username
      dbPassword = u.password
      database = u.pathname.slice(1)
    } catch (e) {
      results.parseError = String(e)
      host = port = user = dbPassword = database = ''
    }
  } else {
    host = 'not set'
    port = user = dbPassword = database = ''
  }

  if (host && user && dbPassword) {
    try {
      const conn = await mysql.createConnection({
        host,
        port,
        user,
        password: dbPassword,
        database,
        ssl: { rejectUnauthorized: false },
        connectTimeout: 10000,
      })
      const [rows] = await conn.query('SELECT 1 as test')
      results.connectionTest = rows
      await conn.end()
    } catch (e: unknown) {
      const err = e as Record<string, unknown>
      results.error = {
        code: err.code,
        message: err.message,
        errno: err.errno,
        sqlMessage: err.sqlMessage,
        address: err.address,
        port: err.port,
      }
    }
  }

  return NextResponse.json(results)
}
