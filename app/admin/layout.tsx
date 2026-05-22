import type { ReactNode } from "react";
import { Sidebar } from "../../components/sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "284px minmax(0, 1fr)", minHeight: "100vh" }}>
      <Sidebar scope="platform" />
      <div>{children}</div>
    </div>
  );
}
