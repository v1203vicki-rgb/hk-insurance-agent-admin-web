import type { ReactNode } from "react";
import { Sidebar } from "../../components/sidebar";

export default function BrokerLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "284px minmax(0, 1fr)", minHeight: "100vh" }}>
      <Sidebar scope="broker" />
      <div>{children}</div>
    </div>
  );
}
