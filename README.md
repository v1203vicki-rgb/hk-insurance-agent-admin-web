# HK Insurance Agent Admin Web Share

当前仓库是已部署演示项目的独立分享版，基于 `Next.js` 构建，保留现有后台页面与 mock 数据，并持续增强为更接近可交付的 MVP 演示版。

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
- `/mini/chat`

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
- `/mini/chat`

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
- `/mini/chat`
- `/mini/products`
- `/mini/products/[id]`
- `/mini/compare/select`
- `/mini/compare`
- `/mini/knowledge`
- `/mini/knowledge/[category]`
- `/mini/knowledge/category`
- `/mini/knowledge/detail`
- `/mini/history`
- `/mini/history/[id]`
- `/mini/upload`
- `/mini/settings`
- `/mini/citation/[id]`
- `/mini/home`

说明：

- `/mini` 默认跳转到 `/mini/chat`
- `/mini/home` 为兼容旧链接保留，当前会跳转到 `/mini/chat`
- `/mini/knowledge/category` 和 `/mini/knowledge/detail` 为兼容旧链接保留

## 当前已实现的重点能力

- 根入口包含 4 个入口卡片：登录、平台后台、经纪公司后台、小程序端预览
- 登录页支持 3 种演示角色快捷进入
- 前端 mock RBAC：
  - `PLATFORM_ADMIN` 可访问 `/admin/*`
  - `BROKER_ADMIN` 与 `BROKER_USER` 可访问 `/broker/*`
  - `/mini/*` 不需要登录
  - 未登录访问后台会跳转 `/login`
  - 非授权访问显示 `/forbidden`
- 小程序端 Web 预览改为“经纪人移动端香港保险知识问答助手”
- 小程序端默认首页为 `/mini/chat`
- 小程序端 TabBar 调整为：问答 / 产品 / 知识库 / 记录
- 问答页支持：
  - 快捷提问模板
  - 上传问答文件底部抽屉
  - 复制完整回答
  - 复制客户版回答
  - 查看来源
  - 继续追问
- 产品页支持：
  - 搜索
  - 筛选
  - 加入对比
  - 浮动对比栏
- 产品对比页不出现推荐、排名、评分文案
- 所有小程序问答演示回答都带引用来源卡片
- mock 数据集中到 `src/data/*`

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

- 当前项目以演示体验为主，部分旧页面仍保留原有 mock 骨架并持续做增量优化
- 当前重点是统一布局、权限、演示入口、小程序问答助手体验和关键后台流程展示
