import type { ReactNode } from "react";
import { ConsoleLayout } from "../../components/console-layout";

export default function BrokerLayout({ children }: { children: ReactNode }) {
  return <ConsoleLayout scope="broker">{children}</ConsoleLayout>;
}
