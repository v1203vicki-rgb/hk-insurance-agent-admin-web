import type { ReactNode } from "react";
import { ConsoleLayout } from "../../components/console-layout";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <ConsoleLayout scope="platform">{children}</ConsoleLayout>;
}
