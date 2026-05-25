import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "香港保险知识问答 Agent MVP 演示",
  description: "包含平台后台、经纪公司后台与小程序端 Web 预览的前端演示项目。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>{children}</body>
    </html>
  );
}
