-- ============================================================
-- 优惠总动员 · 数据库 Schema（SQL 版，可直接用于数据库创建）
-- ============================================================

-- 商家表
CREATE TABLE "Merchant" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_id(),
  "name" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL,
  "logo" TEXT,
  "affiliateUrl" TEXT,
  "website" TEXT,
  "description" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- 分类表
CREATE TABLE "Category" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_id(),
  "name" TEXT NOT NULL,
  "slug" TEXT UNIQUE NOT NULL
);

-- 商家-分类 多对多
CREATE TABLE "_CategoryToMerchant" (
  "A" TEXT NOT NULL REFERENCES "Category"(id) ON DELETE CASCADE,
  "B" TEXT NOT NULL REFERENCES "Merchant"(id) ON DELETE CASCADE,
  PRIMARY KEY ("A", "B")
);

-- 优惠券表
CREATE TABLE "Coupon" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_id(),
  "code" TEXT,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "discountType" TEXT NOT NULL DEFAULT 'PERCENT',
  "discountValue" TEXT NOT NULL,
  "minPurchase" NUMERIC(10,2),
  "maxDiscount" NUMERIC(10,2),
  "startsAt" TIMESTAMP,
  "expiresAt" TIMESTAMP,
  "isExclusive" BOOLEAN DEFAULT FALSE,
  "isVerified" BOOLEAN DEFAULT FALSE,
  "clickCount" INT DEFAULT 0,
  "successCount" INT DEFAULT 0,
  "status" TEXT DEFAULT 'ACTIVE',
  "merchantId" TEXT NOT NULL REFERENCES "Merchant"(id),
  "categoryId" TEXT REFERENCES "Category"(id),
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- 索引
CREATE INDEX "Coupon_merchantId_idx" ON "Coupon"("merchantId");
CREATE INDEX "Coupon_status_expiresAt_idx" ON "Coupon"("status", "expiresAt");

-- ============================================================
-- 种子数据
-- ============================================================

-- 分类
INSERT INTO "Category" (id, name, slug) VALUES
  (gen_random_id(), '时尚服饰', 'fashion'),
  (gen_random_id(), '电子产品', 'electronics'),
  (gen_random_id(), '旅行酒店', 'travel'),
  (gen_random_id(), '美妆护肤', 'beauty'),
  (gen_random_id(), '食品生鲜', 'food'),
  (gen_random_id(), '订阅服务', 'subscription');

-- 商家
INSERT INTO "Merchant" (id, name, slug, logo, affiliateUrl, website, description) VALUES
  ('m_nike', 'Nike', 'nike', 'https://logo.clearbit.com/nike.com', 'https://www.nike.com/?afmc=1&cid=Affiliate', 'https://www.nike.com', '全球领先的运动品牌'),
  ('m_asos', 'ASOS', 'asos', 'https://logo.clearbit.com/asos.com', 'https://www.asos.com/?afmc=1', 'https://www.asos.com', '英国时尚电商'),
  ('m_bestbuy', 'Best Buy', 'bestbuy', 'https://logo.clearbit.com/bestbuy.com', 'https://www.bestbuy.com/?afmc=1', 'https://www.bestbuy.com', '美国电子产品零售巨头'),
  ('m_booking', 'Booking.com', 'booking-com', 'https://logo.clearbit.com/booking.com', 'https://www.booking.com/?afmc=1', 'https://www.booking.com', '全球最大在线旅行预订平台');

-- 优惠券
INSERT INTO "Coupon" (id, code, title, discountType, discountValue, minPurchase, isExclusive, isVerified, status, merchantId) VALUES
  ('c_nike1', 'NIKE20', '会员专享20%OFF', 'PERCENT', '20', NULL, TRUE, TRUE, 'ACTIVE', 'm_nike'),
  ('c_nike2', 'FREESHIP', '满599免运费', 'FREE_SHIP', '0', '599', FALSE, TRUE, 'ACTIVE', 'm_nike'),
  ('c_asos1', 'FIRST10', '新人首单10%OFF', 'PERCENT', '10', NULL, FALSE, TRUE, 'ACTIVE', 'm_asos'),
  ('c_asos2', NULL, '季末大促低至5折', 'PERCENT_OFF', '50', NULL, FALSE, FALSE, 'ACTIVE', 'm_asos'),
  ('c_bestbuy1', 'TECH100', '满1000减100', 'FIXED', '100', '1000', FALSE, TRUE, 'ACTIVE', 'm_bestbuy'),
  ('c_booking1', 'TRAVEL15', '酒店预订15%OFF', 'PERCENT', '15', NULL, TRUE, TRUE, 'ACTIVE', 'm_booking'),
  ('c_booking2', NULL, '首次预订立减200元', 'FIXED', '200', NULL, FALSE, TRUE, 'ACTIVE', 'm_booking');