import type { ReactNode } from "react";
import { MiniLocaleProvider } from "../../components/mini-locale";

export default function MiniLayout({ children }: { children: ReactNode }) {
  return <MiniLocaleProvider>{children}</MiniLocaleProvider>;
}
