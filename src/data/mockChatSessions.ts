import type { ChatSessionRecord } from "./types";

export const mockChatSessions: ChatSessionRecord[] = [
  {
    id: "session_1",
    tenantId: "tenant_1",
    tenantName: "港华保险经纪",
    clientAnonymousId: "client_7Q2A9",
    language: "ZH_HANS",
    source: "MINI_PROGRAM",
    createdAt: "2026-05-25 10:24",
    expiresAt: "2026-11-25 10:24",
    category: "重疾险",
    riskType: "NORMAL",
    citationIds: ["citation_doc_1_p5", "citation_doc_1_p12", "citation_doc_1_p18"],
    uploads: [],
    messages: [
      { id: "msg_1", role: "USER", content: "香港重疾险和内地重疾险有什么区别？" },
      {
        id: "msg_2",
        role: "ASSISTANT",
        content: "以下说明基于已启用资料整理，重点从监管、条款定义和等待期角度做客观说明。",
        structuredAnswer: {
          shortConclusion: "香港重疾险与内地重疾险在条款定义、披露方式和投保流程上存在差异。",
          details: ["香港产品更强调以官方条款和演示页为准。", "等待期、早期疾病定义和核保流程可能不同。"],
          scenarios: ["适合先理解保障范围、等待期和冷静期。"],
          cautions: ["不同公司定义不同，需按具体产品文件核对。"],
        },
        citationIds: ["citation_doc_1_p5", "citation_doc_1_p12"],
        riskType: "NORMAL",
      },
    ],
    riskHandlingRecords: [{ time: "2026-05-25 10:26", action: "系统判定", result: "低风险", note: "正常知识问答" }],
  },
  {
    id: "session_2",
    tenantId: "tenant_1",
    tenantName: "港华保险经纪",
    clientAnonymousId: "client_8P1LM",
    language: "ZH_HANS",
    source: "MINI_PROGRAM",
    createdAt: "2026-05-25 11:02",
    expiresAt: "2026-11-25 11:02",
    category: "产品对比",
    riskType: "PERSONALIZED_ADVICE",
    citationIds: ["citation_doc_2_p8", "citation_doc_2_p12", "citation_doc_3_p8", "citation_doc_3_p12", "citation_doc_5_p2"],
    uploads: [{ id: "upload_1", fileName: "医疗计划书.pdf", fileType: "PDF", status: "UPLOADED", expiresAt: "2026-06-25 11:02" }],
    messages: [
      { id: "msg_3", role: "USER", content: "A公司和B公司的医疗险哪个更适合我？" },
      {
        id: "msg_4",
        role: "ASSISTANT",
        content: "我可以说明资料差异和一般适用场景，但不能基于个人情况作购买建议。",
        structuredAnswer: {
          shortConclusion: "以下仅列资料差异，不构成购买建议。",
          details: ["A产品年度限额更高，B产品覆盖区域更聚焦。"],
          comparisonTable: [
            { dimension: "保障地区", left: "全球", right: "亚洲及指定地区" },
            { dimension: "年度限额", left: "HKD 30M", right: "HKD 25M" },
            { dimension: "优惠状态", left: "当前无已启用优惠", right: "历史优惠已过期" },
          ],
          scenarios: ["可用于理解保障地区、病房级别和网络医院差异。"],
          cautions: ["实际适用性需结合预算与已有保障。", "B公司历史优惠已过期。"],
          riskNotice: "涉及个人情况时仅能做资料解释，不能作购买建议。",
        },
        citationIds: ["citation_doc_2_p8", "citation_doc_2_p12", "citation_doc_3_p8", "citation_doc_3_p12", "citation_doc_5_p2"],
        riskType: "PERSONALIZED_ADVICE",
      },
    ],
    riskHandlingRecords: [{ time: "2026-05-25 11:05", action: "人工复核", result: "保留提示", note: "个性化建议拒答模板生效" }],
  },
  {
    id: "session_3",
    tenantId: "tenant_2",
    tenantName: "湾区财富顾问",
    clientAnonymousId: "client_2B7XK",
    language: "ZH_HANS",
    source: "MINI_PROGRAM",
    createdAt: "2026-05-25 11:33",
    expiresAt: "2026-11-25 11:33",
    category: "储蓄险 / 分红险",
    riskType: "BENEFIT_OR_RETURN",
    citationIds: ["citation_doc_4_p14"],
    uploads: [],
    messages: [
      { id: "msg_5", role: "USER", content: "这个储蓄险第几年回本？" },
      {
        id: "msg_6",
        role: "ASSISTANT",
        content: "关于回本期、收益、现金价值这类问题，必须以官方文件为准；如果缺少官方依据，不返回实质结论。",
        structuredAnswer: {
          shortConclusion: "当前仅能确认本产品包含非保证利益，不能据此推断具体回本年期。",
          details: ["回本期受保费、缴费期、红利实现率影响。"],
          scenarios: ["适合先查看官方利益演示或费率说明。"],
          cautions: ["没有官方利益演示页时，不应推断回本时间。"],
          riskNotice: "收益/回本类问题需引用官方文件。",
        },
        citationIds: ["citation_doc_4_p14"],
        riskType: "BENEFIT_OR_RETURN",
      },
    ],
    riskHandlingRecords: [{ time: "2026-05-25 11:35", action: "系统判定", result: "高风险", note: "收益类问题需官方来源" }],
  },
];

export const miniChatFallbackStates = [
  {
    id: "fallback_no_source",
    title: "未找到足够依据",
    message: "未在已启用资料中找到足够依据。为避免误导，建议以保险公司官方文件、最新通告或持牌顾问说明为准。",
  },
  {
    id: "fallback_personalized",
    title: "个性化建议拒答",
    message: "我可以说明不同产品的资料差异和一般适用场景，但不能基于个人情况作出购买建议。",
  },
  {
    id: "fallback_legal",
    title: "法律 / 税务 / 医疗判断拒答",
    message: "涉及法律、税务或医疗判断时，我可以帮助解释资料内容，但不直接下结论，建议咨询专业人士。",
  },
  {
    id: "fallback_return",
    title: "收益类问题缺少官方来源",
    message: "产品收益、回本期、现金价值类问题必须引用官方文件；当前缺少足够官方依据，不返回实质结论。",
  },
  {
    id: "fallback_expired_promo",
    title: "过期优惠提示",
    message: "该优惠已过期，仅可作为历史资料参考，不能视为当前有效优惠。",
  },
];

