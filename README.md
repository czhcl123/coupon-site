# 🏷️ 优惠总动员 — 折扣卷聚合网站

基于 Next.js + PostgreSQL + Prisma 的优惠券聚合平台。

---

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 配置数据库
复制环境变量文件：
```bash
cp .env.example .env.local
```
编辑 `.env.local`，填入你的 PostgreSQL 连接串。

推荐免费 PostgreSQL：
- **Supabase**：https://supabase.com（免费 500MB）
- **Railway**：https://railway.app
- **Render**：https://render.com

### 3. 初始化数据库
```bash
npx prisma generate   # 生成 Prisma Client
npx prisma db push    # 推送 schema 到数据库
```

### 4. 播种示例数据
```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' src/lib/seed.ts
```

### 5. 启动开发服务器
```bash
npm run dev
```
打开 http://localhost:3000

---

## 📁 项目结构

```
src/
├── app/
│   ├── page.tsx           # 首页（优惠券列表）
│   ├── admin/
│   │   └── page.tsx      # 管理后台
│   └── api/
│       ├── coupons/      # 优惠券 API
│       ├── merchants/     # 商家 API
│       └── admin/coupons/ # 管理 API
├── lib/
│   ├── seed.ts           # 种子数据脚本
│   └── prisma.ts         # Prisma 客户端
└── components/           # UI 组件（后续扩展）
```

---

## 🔧 数据库 Schema

**Merchant（商家）**：id, name, slug, logo, affiliateUrl, website, description
**Category（分类）**：id, name, slug
**Coupon（优惠券）**：id, code, title, description, discountType, discountValue, minPurchase, expiresAt, isExclusive, isVerified, clickCount, status

---

## 💰 变现方式

1. **联盟链接**：在商家表填入 affiliateUrl，用户点击后跳转到商家页面并带上追踪参数
2. **广告位**：侧边栏/顶部展示 Google AdSense 广告
3. **付费置顶**：商家付费让自己的优惠券置顶
4. **付费收录**：向商家收取展示费

---

## 📊 数据来源

| 方式 | 说明 |
|------|------|
| **手动录入** | 管理后台手动添加 |
| **商家官方** | 直接联系品牌方获取官方优惠 |
| **联盟 API** | CJ Affiliate / Awin / Rakuten |
| **用户提交** | UGC 表单 + 人工审核 |

---

## 🌐 部署

### Vercel（免费）
```bash
npm i -g vercel
vercel
```
在 Vercel Dashboard 配置环境变量 `DATABASE_URL`。

---

## ✅ 待办功能

- [ ] SEO 结构化数据（Schema: Coupon）
- [ ] 订阅邮件提醒（过期前通知）
- [ ] 用户提交表单
- [ ] 热门商家轮播图
- [ ] 折扣码自动测试（Honey 风格）
- [ ] 多语言支持