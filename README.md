# HK Insurance Agent Admin Web Share

当前仓库是已部署演示项目的独立分享版，基于 Next.js 构建，保留原有后台页面和 mock 数据，并在此基础上继续增强为更接近可交付的 MVP 演示版。

## 运行方式

```bash
npm install
npm run dev
```

默认本地访问：

- `/`
- `/login`
- `/admin`
- `/broker`
- `/mini/home`

## 演示模式

当前项目默认使用前端 mock 数据演示，不依赖真实 API。

演示账号：

- 平台管理员：`admin@example.com` / `password`
- 经纪公司管理员：`broker-admin@example.com` / `password`
- 经纪人：`broker-user@example.com` / `password`

## 根入口

- `/`
- `/login`
- `/admin`
- `/broker`
- `/mini/home`

## 平台后台主要路由

- `/admin`
- `/admin/tenants`
- `/admin/users`
- `/admin/documents`
- `/admin/documents/[id]`
- `/admin/documents/upload`
- `/admin/audit`
- `/admin/audit/queue`
- `/admin/products`
- `/admin/products/companies`
- `/admin/products/[id]`
- `/admin/promotions`
- `/admin/promotions/[id]`
- `/admin/faqs`
- `/admin/faqs/[id]`
- `/admin/agent-rules`
- `/admin/agent-rules/test`
- `/admin/compliance`
- `/admin/compliance/[id]`
- `/admin/chat-sessions`
- `/admin/chat-sessions/[id]`
- `/admin/analytics`
- `/admin/audit-logs`
- `/admin/dictionary-tags`
- `/admin/common-states`

## 经纪公司后台主要路由

- `/broker`
- `/broker/users`
- `/broker/users/[id]`
- `/broker/upload`
- `/broker/upload/success`
- `/broker/documents`
- `/broker/documents/[id]`
- `/broker/chat-sessions`
- `/broker/chat-sessions/[id]`
- `/broker/analytics`
- `/broker/audit-logs`
- `/broker/settings`

## 小程序端 Web 预览路由

- `/mini`
- `/mini/home`
- `/mini/chat`
- `/mini/knowledge`
- `/mini/knowledge/category`
- `/mini/knowledge/detail`
- `/mini/products`
- `/mini/products/[id]`
- `/mini/compare/select`
- `/mini/compare`
- `/mini/history`
- `/mini/history/[id]`
- `/mini/upload`
- `/mini/settings`
- `/mini/citation/[id]`

## 当前已补的重点能力

- 根入口新增四个卡片：登录、平台后台、经纪公司后台、小程序端预览
- 登录页支持三种演示角色快捷进入
- 前端 mock RBAC：
  - `PLATFORM_ADMIN` 可访问 `/admin/*`
  - `BROKER_ADMIN` 与 `BROKER_USER` 可访问 `/broker/*`
  - `/mini/*` 不需要登录
  - 未登录访问后台会跳 `/login`
  - 非授权访问显示 `/forbidden`
- 小程序端 Web 预览使用手机壳布局
- 所有小程序问答演示答案都带引用来源卡片
- 产品对比页不出现推荐、排名、评分文案
- mock 数据已集中到 `src/data/*`

## 数据文件

- `src/data/mockTenants.ts`
- `src/data/mockUsers.ts`
- `src/data/mockDocuments.ts`
- `src/data/mockProducts.ts`
- `src/data/mockPromotions.ts`
- `src/data/mockFaqs.ts`
- `src/data/mockChatSessions.ts`
- `src/data/mockCompliance.ts`
- `src/data/mockAuditLogs.ts`
- `src/data/mockMini.ts`

## 说明

- 当前项目以演示体验为主，部分旧页面仍保留原有 mock 骨架并持续增量优化
- 现阶段重点是统一布局、权限、演示入口、小程序预览和关键后台流程展示
