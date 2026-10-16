// A1 止血:停用全部 seed 占位券(假码,status ACTIVE→INVALID,可逆)
// 运行: cd D:\SEO\coupon-site && node --env-file=.env scripts/deactivate-fake-coupons.mjs
import mysql from 'mysql2/promise';

const url = new URL(process.env.DATABASE_URL);
const conn = await mysql.createConnection({
  host: url.hostname,
  port: Number(url.port || 4000),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, ''),
  ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
});

const [before] = await conn.query("SELECT status, COUNT(*) n FROM Coupon GROUP BY status");
console.log('BEFORE:', JSON.stringify(before));

const [res] = await conn.query("UPDATE Coupon SET status='INVALID' WHERE status='ACTIVE'");
console.log('deactivated (ACTIVE→INVALID):', res.affectedRows);

const [after] = await conn.query("SELECT status, COUNT(*) n FROM Coupon GROUP BY status");
console.log('AFTER:', JSON.stringify(after));

await conn.end();
