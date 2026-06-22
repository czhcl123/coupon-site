import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'

export async function GET() {
  const host = 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com'
  const port = 4000
  const user = '4PDGQRfsgPUn2oy.root'
  const password = process.env.TIDB_PASSWORD
  const database = process.env.TIDB_DATABASE || 'coupon_site'

  const results: Record<string, unknown> = {
    env: {
      TIDB_PASSWORD: password ? '***' + password.slice(-4) : 'UNDEFINED',
      TIDB_DATABASE: database,
    },
    connectionTest: null,
    error: null,
  }

  try {
    const conn = await mysql.createConnection({
      host,
      port,
      user,
      password,
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

  return NextResponse.json(results)
}
