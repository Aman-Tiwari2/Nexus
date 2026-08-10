"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Calendar, Image, Users, FileText, ExternalLink, LogOut } from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
];

export default function AdminSidebar({ active }: { active: string }) {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin");
  };

  return (
    <aside style={{
      width: "220px", minHeight: "100vh", background: "rgba(255,255,255,0.02)",
      borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex",
      flexDirection: "column", flexShrink: 0, position: "sticky", top: 0,
    }}>
      <div style={{ padding: "20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/admin/dashboard" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src="/images/nexus_logo.png" alt="Nexus" style={{ height: "28px", objectFit: "contain" }} />
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#F5F5F5", lineHeight: 1.2 }}>NEXUS</div>
            <div style={{ fontSize: "9px", color: "#899393", letterSpacing: "0.12em", fontWeight: 600 }}>ADMIN PANEL</div>
          </div>
        </Link>
      </div>

      <nav style={{ flex: 1, padding: "14px 10px" }}>
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.href;
          return (
            <Link key={item.href} href={item.href} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "9px 12px", borderRadius: "8px", marginBottom: "2px",
              background: isActive ? "rgba(96,165,250,0.1)" : "transparent",
              color: isActive ? "#60a5fa" : "#899393",
              fontSize: "13px", fontWeight: isActive ? 600 : 400,
              textDecoration: "none",
              borderLeft: isActive ? "2px solid #60a5fa" : "2px solid transparent",
              transition: "all 0.15s",
            }}>
              <Icon style={{ width: "16px", height: "16px" }} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "14px 10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" target="_blank" style={{
          display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px",
          borderRadius: "8px", color: "#899393", fontSize: "12px",
          textDecoration: "none", marginBottom: "4px", transition: "color 0.15s",
        }}>
          <ExternalLink style={{ width: "14px", height: "14px" }} />
          View Live Site
        </Link>
        <button onClick={logout} style={{
          width: "100%", padding: "9px 12px", borderRadius: "8px", border: "none",
          background: "rgba(239,68,68,0.08)", color: "#ef4444", fontSize: "12px",
          cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: "8px",
        }}>
          <LogOut style={{ width: "14px", height: "14px" }} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
