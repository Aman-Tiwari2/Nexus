import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — NEXUS",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#050808", color: "#F5F5F5", fontFamily: "'Inter', sans-serif", minHeight: "100vh", position: "relative" }}>
      {children}
    </div>
  );
}
