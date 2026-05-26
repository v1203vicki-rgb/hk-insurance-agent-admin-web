export type NavScope = "platform" | "broker" | "mini";

export type NavItem = {
  href: string;
  label: string;
};

const platformItems: NavItem[] = [
  { href: "/admin", label: "工作台" },
  { href: "/admin/tenants", label: "租户管理" },
  { href: "/admin/users", label: "用户权限" },
  { href: "/admin/documents", label: "公共知识库" },
  { href: "/admin/audit", label: "资料审核" },
  { href: "/admin/products", label: "产品管理" },
  { href: "/admin/promotions", label: "优惠政策" },
  { href: "/admin/faqs", label: "FAQ 管理" },
  { href: "/admin/agent-rules", label: "Agent 配置" },
  { href: "/admin/compliance", label: "合规审核" },
  { href: "/admin/chat-sessions", label: "会话管理" },
  { href: "/admin/analytics", label: "数据看板" },
  { href: "/admin/audit-logs", label: "操作日志" },
  { href: "/admin/dictionary-tags", label: "字典标签" },
];

const brokerItems: NavItem[] = [
  { href: "/broker", label: "公司工作台" },
  { href: "/broker/users", label: "经纪人账号" },
  { href: "/broker/upload", label: "文件上传" },
  { href: "/broker/documents", label: "文件状态" },
  { href: "/broker/chat-sessions", label: "会话记录" },
  { href: "/broker/analytics", label: "数据看板" },
  { href: "/broker/audit-logs", label: "操作日志" },
  { href: "/broker/settings", label: "公司设置" },
];

const miniItems: NavItem[] = [
  { href: "/mini/chat", label: "问答" },
  { href: "/mini/products", label: "产品" },
  { href: "/mini/knowledge", label: "知识库" },
  { href: "/mini/history", label: "记录" },
];

const routeTitles: Array<{ prefix: string; label: string }> = [
  { prefix: "/admin/documents/upload", label: "上传资料" },
  { prefix: "/admin/documents/", label: "文件详情" },
  { prefix: "/admin/documents", label: "公共知识库" },
  { prefix: "/admin/audit/queue", label: "审核队列" },
  { prefix: "/admin/audit", label: "资料审核" },
  { prefix: "/admin/products/companies", label: "保险公司管理" },
  { prefix: "/admin/products/", label: "产品详情" },
  { prefix: "/admin/products", label: "产品列表" },
  { prefix: "/admin/promotions/", label: "优惠详情" },
  { prefix: "/admin/promotions", label: "优惠政策" },
  { prefix: "/admin/faqs/", label: "FAQ 详情" },
  { prefix: "/admin/faqs", label: "FAQ 管理" },
  { prefix: "/admin/agent-rules/test", label: "规则测试" },
  { prefix: "/admin/agent-rules", label: "Agent 配置" },
  { prefix: "/admin/compliance/", label: "合规详情" },
  { prefix: "/admin/compliance", label: "合规审核" },
  { prefix: "/admin/chat-sessions/", label: "会话详情" },
  { prefix: "/admin/chat-sessions", label: "会话管理" },
  { prefix: "/admin/analytics", label: "数据看板" },
  { prefix: "/admin/audit-logs", label: "操作日志" },
  { prefix: "/admin/tenants/", label: "租户详情" },
  { prefix: "/admin/tenants", label: "租户管理" },
  { prefix: "/admin/users/", label: "用户详情" },
  { prefix: "/admin/users", label: "用户权限" },
  { prefix: "/admin/dictionary-tags", label: "字典标签" },
  { prefix: "/admin/common-states", label: "通用状态" },
  { prefix: "/admin", label: "平台管理后台" },
  { prefix: "/broker/upload/success", label: "上传成功" },
  { prefix: "/broker/upload", label: "文件上传" },
  { prefix: "/broker/documents/", label: "文件详情" },
  { prefix: "/broker/documents", label: "文件状态" },
  { prefix: "/broker/chat-sessions/", label: "会话详情" },
  { prefix: "/broker/chat-sessions", label: "会话记录" },
  { prefix: "/broker/analytics", label: "数据看板" },
  { prefix: "/broker/audit-logs", label: "操作日志" },
  { prefix: "/broker/users/", label: "经纪人详情" },
  { prefix: "/broker/users", label: "经纪人账号" },
  { prefix: "/broker/settings", label: "公司设置" },
  { prefix: "/broker", label: "经纪公司后台" },
  { prefix: "/mini/chat", label: "香港保险知识助手" },
  { prefix: "/mini/products/", label: "产品详情" },
  { prefix: "/mini/products", label: "产品页" },
  { prefix: "/mini/compare/select", label: "选择产品" },
  { prefix: "/mini/compare", label: "产品对比" },
  { prefix: "/mini/knowledge/detail", label: "知识详情" },
  { prefix: "/mini/knowledge/category", label: "分类过渡页" },
  { prefix: "/mini/knowledge/", label: "分类问题列表" },
  { prefix: "/mini/knowledge", label: "知识库" },
  { prefix: "/mini/history/", label: "历史详情" },
  { prefix: "/mini/history", label: "历史记录" },
  { prefix: "/mini/upload", label: "上传问答文件" },
  { prefix: "/mini/settings", label: "设置与隐私" },
  { prefix: "/mini/citation/", label: "来源详情" },
  { prefix: "/mini/home", label: "问答首页兼容入口" },
  { prefix: "/mini", label: "小程序端预览" },
  { prefix: "/login", label: "登录页" },
  { prefix: "/", label: "项目入口" },
];

export function getNavItems(scope: NavScope) {
  if (scope === "platform") return platformItems;
  if (scope === "broker") return brokerItems;
  return miniItems;
}

export function getRouteTitle(pathname: string) {
  const matched = routeTitles.find((item) => pathname === item.prefix || pathname.startsWith(item.prefix));
  return matched?.label ?? "页面";
}

export function buildBreadcrumbs(pathname: string) {
  if (pathname.startsWith("/admin")) {
    const items = [{ href: "/admin", label: "平台管理后台" }];
    if (pathname !== "/admin") items.push({ href: pathname, label: getRouteTitle(pathname) });
    return items;
  }

  if (pathname.startsWith("/broker")) {
    const items = [{ href: "/broker", label: "经纪公司后台" }];
    if (pathname !== "/broker") items.push({ href: pathname, label: getRouteTitle(pathname) });
    return items;
  }

  if (pathname.startsWith("/mini")) {
    const items = [{ href: "/mini/chat", label: "小程序端预览" }];
    if (pathname !== "/mini" && pathname !== "/mini/chat") {
      items.push({ href: pathname, label: getRouteTitle(pathname) });
    }
    return items;
  }

  return [{ href: pathname, label: getRouteTitle(pathname) }];
}
