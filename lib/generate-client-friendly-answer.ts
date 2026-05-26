import type { LocalizedText, MiniLocale, MiniSession } from "@/src/data";
import { getLocalizedText } from "@/src/data";

export function generateClientFriendlyAnswer(
  answer: NonNullable<MiniSession["messages"][number]["structuredAnswer"]>,
  locale: MiniLocale,
) {
  const lines: string[] = [];

  lines.push(getLocalizedText(answer.shortConclusion, locale));

  const highlights = answer.details.slice(0, 3).map((item) => `- ${resolve(item, locale)}`);
  if (highlights.length) lines.push("", ...highlights);

  const cautions = answer.cautions.slice(0, 1).map((item) => `注意：${resolve(item, locale)}`);
  if (cautions.length) lines.push("", ...cautions);

  lines.push("", locale === "ZH_HANT" ? "僅供了解，具體以官方文件及持牌顧問說明為準。" : "仅供了解，具体以官方文件及持牌顾问说明为准。");

  return lines.join("\n");
}

function resolve(text: LocalizedText, locale: MiniLocale) {
  return getLocalizedText(text, locale);
}
