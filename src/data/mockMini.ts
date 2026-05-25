export const miniCitations = [
  {
    id: "mini_citation_1",
    fileName: "A公司高端医疗条款.pdf",
    sourceLevel: "L1 官方条款",
    pageNumber: 12,
    version: "v2026.03",
    publishDate: "2026-03-08",
    effectiveDate: "2026-03-20",
    expiryDate: "",
    isTrainingMaterial: false,
    isExpiredPromotion: false,
  },
  {
    id: "mini_citation_2",
    fileName: "B公司医疗险产品小册子.pdf",
    sourceLevel: "L2 官方小册子",
    pageNumber: 8,
    version: "v2026.02",
    publishDate: "2026-02-16",
    effectiveDate: "2026-02-28",
    expiryDate: "",
    isTrainingMaterial: false,
    isExpiredPromotion: false,
  },
  {
    id: "mini_citation_3",
    fileName: "B公司优惠通告.pdf",
    sourceLevel: "L4 官方通告/优惠",
    pageNumber: 2,
    version: "v2026.02",
    publishDate: "2026-02-10",
    effectiveDate: "2026-02-10",
    expiryDate: "2026-03-31",
    isTrainingMaterial: false,
    isExpiredPromotion: true,
  },
  {
    id: "mini_citation_4",
    fileName: "重疾险销售培训.pptx",
    sourceLevel: "L5 内部培训资料",
    pageNumber: 9,
    version: "v2026.01",
    publishDate: "2026-01-08",
    effectiveDate: "2026-01-08",
    expiryDate: "",
    isTrainingMaterial: true,
    isExpiredPromotion: false,
  },
];

export const miniCategories = [
  { id: "basic", badge: "基", title: "香港保险基础", topics: "监管、投保、冷静期、保费缴付" },
  { id: "ci", badge: "疾", title: "重疾险", topics: "疾病定义、多次赔付、等待期" },
  { id: "savings", badge: "储", title: "储蓄 / 分红险", topics: "现金价值、红利、回本期、收益说明" },
  { id: "medical", badge: "医", title: "医疗险", topics: "住院、垫底费、共同保险、理赔" },
  { id: "loan", badge: "保", title: "保单贷款 / 退保", topics: "贷款、退保价值、注意事项" },
  { id: "cross", badge: "赴", title: "内地客户赴港投保 FAQ", topics: "赴港签署、缴费、核保、理赔" },
];

export const miniHotQuestions = [
  "香港保险冷静期是多久？",
  "储蓄险保证与非保证利益有什么区别？",
  "重疾险多次赔付如何理解？",
  "医疗险垫底费和共同保险有什么不同？",
];

export const miniProducts = [
  { id: "product_2", company: "A公司", name: "尊尚医疗", type: "医疗险", status: "当前启用版本 v2026.03" },
  { id: "product_3", company: "B公司", name: "环球医疗", type: "医疗险", status: "当前启用版本 v2026.02" },
  { id: "product_4", company: "周大福人寿", name: "匠心飞越储蓄保险计划", type: "储蓄险 / 分红险", status: "当前启用版本 v2604" },
  { id: "product_1", company: "A公司", name: "重疾计划", type: "重疾险", status: "当前启用版本 v2026.03" },
];

export const miniHistoryItems = [
  { id: "session_1", title: "香港重疾险和内地重疾险有什么区别？", category: "重疾险", citationCount: 3, risk: "低", time: "10:24" },
  { id: "session_2", title: "A公司和B公司的医疗险哪个更适合我？", category: "产品对比", citationCount: 5, risk: "中：个性化倾向", time: "11:02" },
  { id: "session_3", title: "这个储蓄险第几年回本？", category: "分红险", citationCount: 2, risk: "高：收益类", time: "11:33" },
  { id: "session_4", title: "保单贷款会影响红利吗？", category: "保单贷款", citationCount: 2, risk: "中", time: "12:05" },
];

export const miniFallbackStates = [
  {
    id: "no_source",
    title: "未找到足够依据",
    message: "未在已启用资料中找到足够依据。为避免误导，建议以保险公司官方文件、最新通告或持牌顾问说明为准。",
  },
  {
    id: "personalized",
    title: "个性化建议拒答",
    message: "我可以说明不同产品的资料差异和一般适用场景，但不能基于个人情况作出购买建议。",
  },
  {
    id: "legal",
    title: "法律 / 税务 / 医疗判断拒答",
    message: "涉及法律、税务或医疗判断时，我可以帮助解释资料内容，但不直接下结论，建议咨询专业人士。",
  },
  {
    id: "return_no_official",
    title: "产品收益但无官方来源",
    message: "产品收益、回本期、现金价值类问题必须引用官方文件；当前缺少足够官方依据，不返回实质性结论。",
  },
  {
    id: "expired_promo",
    title: "过期优惠提示",
    message: "该优惠已过期，仅可作为历史资料参考，不能视为当前有效优惠。",
  },
];
