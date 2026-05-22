import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "香港保险知识问答后台",
  description: "平台和经纪公司后台原型",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body>
        {children}
      </body>
    </html>
  );
}
