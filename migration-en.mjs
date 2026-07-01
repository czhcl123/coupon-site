// Migration: Convert coupon-site DB to English-first
// - Delete Chinese pet brands and their coupons
// - Translate Category.name to English
// - Translate Merchant.description to English (English brands only)
// - Translate Coupon.title to English (English brand coupons)
// - Run: cd D:\SEO\coupon-site && node --env-file=.env migration-en.mjs

import mysql from 'mysql2/promise'

const HOST = process.env.TIDB_HOST || 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com'
const PORT = parseInt(process.env.TIDB_PORT || '4000')
const USER = process.env.TIDB_USER || '4PDGQRfsgPUn2oy.root'
const PASSWORD = process.env.TIDB_PASSWORD || ''
const DATABASE = process.env.TIDB_DATABASE || 'coupon_site'

if (!PASSWORD) { console.error('❌ TIDB_PASSWORD not set'); process.exit(1) }

const pool = mysql.createPool({
  host: HOST,
  port: PORT,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false },
  connectTimeout: 10000,
})

// ========== TRANSLATIONS ==========

const CATEGORY_TRANSLATIONS = {
  '时尚服饰': 'Fashion',
  '电子产品': 'Electronics',
  '旅行酒店': 'Travel & Hotel',
  '美妆护肤': 'Beauty & Skincare',
  '食品生鲜': 'Food & Fresh',
  '订阅服务': 'Subscription Services',
}

const MERCHANT_DESCRIPTIONS = {
  'Nike':           'Global leader in athletic footwear, apparel, and equipment.',
  'Adidas':         'German multinational corporation, one of the world\'s largest sportswear brands.',
  'ASOS':           'British online fashion and cosmetics retailer targeting young adults.',
  'Amazon':         'World\'s largest online marketplace, offering everything from books to electronics.',
  'Best Buy':       'Leading US consumer electronics retailer with expert tech support.',
  'Booking.com':    'World\'s largest online travel reservation platform, with 28+ million listings.',
  'Expedia':        'Global online travel booking platform for flights, hotels, car rentals, and packages.',
  'Nordstrom':      'US-based luxury department store chain with full-price and off-price offerings.',
  'SHEIN':          'Chinese fast-fashion e-commerce platform shipping to 220+ countries.',
  'Sephora':        'Global beauty retailer carrying 340+ brands across skincare, makeup, and fragrance.',
  'Steam':          'Leading digital game distribution platform by Valve, with 132M+ monthly active users.',
  'Target':         'US general merchandise retailer known for style and value across 2,000+ stores.',
  'Temu':           'International online marketplace operated by PDD Holdings, offering ultra-low prices.',
  'Ulta Beauty':    'US beauty retailer with 25,000+ products across prestige, mass, and salon brands.',
  'Walmart':        'World\'s largest company by revenue, operating 10,500+ stores worldwide.',
}

// Coupon title translations — cover the major patterns from DB
const COUPON_TRANSLATIONS = {
  '全站20%OFF': '20% OFF Sitewide',
  '会员专享20%OFF': 'Exclusive 20% OFF for Members',
  '学生享15%OFF': '15% OFF for Students',
  '会员专享30%OFF': 'Exclusive 30% OFF for Members',
  '全站25%OFF': '25% OFF Sitewide',
  '家居用品20%OFF': '20% OFF Home Goods',
  '酒店预订15%OFF': '15% OFF on Hotel Bookings',
  'VIP会员25%OFF': '25% OFF for VIP Members',
  '酒店预订25%OFF': '25% OFF on Hotel Bookings',
  '新用户50%OFF': '50% OFF for New Users',
  '机票满1000减50': 'Save ¥50 on Flights ¥1000+',
  '满1000减100': 'Spend ¥1000, Save ¥100',
  '满599免运费': 'Free Shipping on ¥599+',
  '时尚单品15%OFF': '15% OFF Fashion Items',
  '满50免运费': 'Free Shipping on ¥50+',
  '指定商品立减50': '¥50 OFF Selected Items',
  '满75免运费': 'Free Shipping on ¥75+',
  '电脑专场最高享8折': 'Up to 20% OFF Electronics',
  '生鲜区10%OFF': '10% OFF Fresh Produce',
  '新用户首单15%OFF': '15% OFF First Order',
  '夏季服饰专区7折起': 'Summer Styles from 30% OFF',
  '新用户首单10%OFF': '10% OFF First Order',
  '新用户15%OFF': '15% OFF for New Users',
  'Prime会员10%OFF': '10% OFF for Prime Members',
  '冬促25%OFF': '25% OFF Winter Sale',
  '自动回购专享15%OFF': '15% OFF Auto-Reorder Subscribers',
  '满49免运费': 'Free Shipping on ¥49+',
  '团购15%OFF': '15% OFF Group Buy',
  '春季特卖最高享80%OFF': 'Spring Sale — Up to 20% OFF',
  '新人首单10%OFF': '10% OFF First Order',
  '首次预订立减200元': '¥200 OFF First Booking',
  '满50减10': 'Spend ¥50, Save ¥10',
  '线上购物满100减15': 'Spend ¥100 Online, Save ¥15',
  '满99减30': 'Spend ¥99, Save ¥30',
  '美妆专场3折起': 'Beauty Event — From 70% OFF',
  '全站低至2折': 'Up to 80% OFF Sitewide',
  '电子设备专区8折起': 'Electronics from 20% OFF',
  '食品杂货最高8折': 'Up to 20% OFF Groceries',
  '指定款5折清仓': '50% OFF Clearance Items',
  '季末大促低至5折': 'End-of-Season Sale — From 50% OFF',
  '满99免运费': 'Free Shipping on ¥99+',
  '全站满199减30': 'Spend ¥199, Save ¥30',
  '全场满200减20': 'Spend ¥200, Save ¥20',
  '图书满100减15': 'Spend ¥100 on Books, Save ¥15',
  '全站满149减25': 'Spend ¥149, Save ¥25',
  '全场满128减18': 'Spend ¥128, Save ¥18',
  '首诊立减30元优惠券': '¥30 OFF First Vet Visit',
  '新会员满99减30': '¥30 OFF for New Members',
  '会员满300减30': '¥30 OFF on ¥300+ Spend',
  '新店开业满100减50': '¥50 OFF Grand Opening',
  '处方粮专区8折优惠': '20% OFF Prescription Pet Food',
  '猫爬架专区低至7折': 'Cat Trees from 30% OFF',
  '疫苗套餐8折优惠': '20% OFF Vaccination Package',
  '狗粮专区满149减30': 'Spend ¥149 on Dog Food, Save ¥30',
  '宠物洗护服务立减15元': '¥15 OFF Pet Grooming Services',
  '猫咪用品专区5折起': 'Cat Supplies from 50% OFF',
  '全站满99减12': 'Spend ¥99, Save ¥12',
}

// ========== MIGRATION STEPS ==========

async function step1_deleteChinesePetBrands() {
  console.log('\n📍 STEP 1: Delete Chinese pet brands + their coupons')
  // Find brands with Chinese chars using LIKE (TiDB REGEXP doesn't support \x{4e00})
  const [chineseBrands] = await pool.query(`
    SELECT id, name, slug FROM Merchant
    WHERE name LIKE '%宠%' OR name LIKE '%商%' OR name LIKE '%宠%'
       OR name LIKE '%波%' OR name LIKE '%万%' OR name LIKE '%皇%'
       OR name LIKE '%爱%' OR name LIKE '%猫%' OR name LIKE '%Go%'
       OR name LIKE '%Paw%' OR name LIKE '%Go%' OR name LIKE '%物%'
  `)
  if (chineseBrands.length === 0) {
    console.log('  ✅ No Chinese brands found')
    return 0
  }
  console.log(`  Found ${chineseBrands.length} Chinese brands:`)
  chineseBrands.forEach(b => console.log(`    - ${b.name} (${b.slug})`))

  const brandIds = chineseBrands.map(b => b.id)
  // Delete their coupons first
  const [couponDel] = await pool.query(`DELETE FROM Coupon WHERE merchantId IN (?)`, [brandIds])
  console.log(`  Deleted ${couponDel.affectedRows} orphaned coupons`)
  // Then delete the brands
  const [brandDel] = await pool.query(`DELETE FROM Merchant WHERE id IN (?)`, [brandIds])
  console.log(`  Deleted ${brandDel.affectedRows} brands`)
  return chineseBrands.length
}

async function step2_translateCategories() {
  console.log('\n📍 STEP 2: Translate Category.name → English')
  let total = 0
  for (const [zh, en] of Object.entries(CATEGORY_TRANSLATIONS)) {
    const [r] = await pool.query(`UPDATE Category SET name = ? WHERE name = ?`, [en, zh])
    if (r.affectedRows > 0) {
      console.log(`  ✅ "${zh}" → "${en}"`)
      total += r.affectedRows
    }
  }
  console.log(`  Total: ${total} categories updated`)
}

async function step3_translateMerchantDescriptions() {
  console.log('\n📍 STEP 3: Translate Merchant.description → English')
  let total = 0
  for (const [name, desc] of Object.entries(MERCHANT_DESCRIPTIONS)) {
    const [r] = await pool.query(`UPDATE Merchant SET description = ? WHERE name = ?`, [desc, name])
    if (r.affectedRows > 0) {
      console.log(`  ✅ ${name}: ${desc.slice(0, 60)}...`)
      total += r.affectedRows
    }
  }
  console.log(`  Total: ${total} merchants updated`)
}

async function step4_translateCoupons() {
  console.log('\n📍 STEP 4: Translate Coupon.title → English')
  let total = 0
  let missed = 0
  // Get all current coupons
  const [coupons] = await pool.query(`SELECT id, title FROM Coupon`)
  for (const c of coupons) {
    const en = COUPON_TRANSLATIONS[c.title]
    if (en) {
      await pool.query(`UPDATE Coupon SET title = ? WHERE id = ?`, [en, c.id])
      total++
    } else {
      missed++
    }
  }
  console.log(`  Translated: ${total}`)
  console.log(`  Missed (no mapping, left as-is): ${missed}`)
}

async function step5_reportRemaining() {
  console.log('\n📍 STEP 5: Final report')
  const [m] = await pool.query(`SELECT COUNT(*) as n FROM Merchant`)
  const [c] = await pool.query(`SELECT COUNT(*) as n FROM Coupon`)
  const [cat] = await pool.query(`SELECT COUNT(*) as n FROM Category`)
  console.log(`  Merchants: ${m[0].n}`)
  console.log(`  Coupons: ${c[0].n}`)
  console.log(`  Categories: ${cat[0].n}`)

  // Show any remaining Chinese titles (using LIKE)
  const [zhCoupons] = await pool.query(`
    SELECT title FROM Coupon
    WHERE title LIKE '%专享%' OR title LIKE '%OFF%' OR title LIKE '%免运%'
       OR title LIKE '%新人%' OR title LIKE '%首单%' OR title LIKE '%专享%'
       OR title LIKE '%满%' OR title LIKE '%新用户%'
    LIMIT 20
  `)
  if (zhCoupons.length > 0) {
    console.log(`\n  ⚠️ Remaining Chinese coupon titles:`)
    zhCoupons.forEach(c => console.log(`    - ${c.title}`))
  } else {
    console.log(`  ✅ All coupon titles are now English`)
  }
}

async function main() {
  console.log('🚀 Starting English migration for coupon-site')
  console.log(`📡 Connected to: ${HOST}:${PORT}/${DATABASE}`)

  try {
    await step1_deleteChinesePetBrands()
    await step2_translateCategories()
    await step3_translateMerchantDescriptions()
    await step4_translateCoupons()
    await step5_reportRemaining()
    console.log('\n🎉 Migration complete!\n')
  } catch (err) {
    console.error('\n❌ Migration failed:', err.message)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

main()