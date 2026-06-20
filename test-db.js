const mysql = require('mysql2/promise');
(async () => {
  const pool = mysql.createPool({
    host: 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com',
    port: 4000,
    user: '4PDGQRfsgPUn2oy.root',
    password: 'tOq5TT7xQQHWZMXG',
    database: 'coupon_site',
    ssl: { rejectUnauthorized: true }
  });
  const [rows] = await pool.execute('SELECT COUNT(*) as cnt FROM Coupon WHERE status="ACTIVE"');
  console.log('ACTIVE coupons:', rows[0].cnt);
  const [m] = await pool.execute('SELECT COUNT(*) as cnt FROM Merchant');
  console.log('Merchants:', m[0].cnt);
  await pool.end();
})().catch(e => console.error('ERROR:', e.message));
