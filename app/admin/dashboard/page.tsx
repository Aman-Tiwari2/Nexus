"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "⬡" },
  { href: "/admin/events", label: "Events", icon: "📅" },
  { href: "/admin/gallery", label: "Gallery", icon: "🖼" },
  { href: "/admin/team", label: "Team", icon: "👥" },
];

function Sidebar({ active }: { active: string }) {
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
      <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "10px",
            background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px",
          }}>⬡</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#F5F5F5", lineHeight: 1.2 }}>NEXUS</div>
            <div style={{ fontSize: "10px", color: "#899393", letterSpacing: "0.1em" }}>ADMIN PANEL</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {NAV.map((item) => {
          const isActive = active === item.href;
          return (
            <Link key={item.href} href={item.href} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "10px 12px", borderRadius: "8px", marginBottom: "2px",
              background: isActive ? "rgba(249,115,22,0.1)" : "transparent",
              color: isActive ? "#f97316" : "#899393",
              fontSize: "13px", fontWeight: isActive ? 600 : 400,
              textDecoration: "none",
              borderLeft: isActive ? "2px solid #f97316" : "2px solid transparent",
              transition: "all 0.15s",
            }}>
              <span style={{ fontSize: "15px" }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" target="_blank" style={{
          display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px",
          borderRadius: "8px", color: "#899393", fontSize: "12px",
          textDecoration: "none", marginBottom: "4px",
          transition: "color 0.15s",
        }}>
          ↗ View Live Site
        </Link>
        <button onClick={logout} style={{
          width: "100%", padding: "9px 12px", borderRadius: "8px", border: "none",
          background: "rgba(239,68,68,0.08)", color: "#ef4444", fontSize: "12px",
          cursor: "pointer", textAlign: "left",
        }}>
          ⎋ Sign Out
        </button>
      </div>
    </aside>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState({ events: 0, gallery: 0, team: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/events").then((r) => r.json()),
      fetch("/api/admin/gallery").then((r) => r.json()),
      fetch("/api/admin/team").then((r) => r.json()),
    ]).then(([ev, ga, tm]) => {
      setStats({
        events: (ev.past?.length ?? 0) + (ev.upcoming ? 1 : 0),
        gallery: Array.isArray(ga) ? ga.length : 0,
        team: Array.isArray(tm) ? tm.length : 0,
      });
    });
  }, []);

  const cards = [
    { label: "Events", count: stats.events, sub: "upcoming + past", href: "/admin/events", color: "#00E5CC", icon: "📅" },
    { label: "Gallery", count: stats.gallery, sub: "magazine moments", href: "/admin/gallery", color: "#00A8FF", icon: "🖼" },
    { label: "Team Members", count: stats.team, sub: "active profiles", href: "/admin/team", color: "#8B5CF6", icon: "👥" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar active="/admin/dashboard" />

      <main style={{ flex: 1, padding: "40px", overflowX: "auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700, color: "#F5F5F5", margin: "0 0 6px" }}>
            Dashboard
          </h1>
          <p style={{ fontSize: "13px", color: "#899393", margin: 0 }}>
            Manage your NEXUS Community portal content from here.
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          {cards.map((card) => (
            <Link key={card.href} href={card.href} style={{ textDecoration: "none" }}>
              <div style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px", padding: "24px", cursor: "pointer",
                transition: "border-color 0.2s, background 0.2s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${card.color}40`;
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "12px" }}>{card.icon}</div>
                <div style={{ fontSize: "32px", fontWeight: 800, color: card.color, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
                  {card.count}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#F5F5F5", margin: "6px 0 2px" }}>{card.label}</div>
                <div style={{ fontSize: "11px", color: "#899393" }}>{card.sub}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#F5F5F5", margin: "0 0 16px" }}>Quick Actions</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {[
              { href: "/admin/events", label: "Edit Upcoming Event" },
              { href: "/admin/events", label: "Add Past Event" },
              { href: "/admin/gallery", label: "Edit Gallery Captions" },
              { href: "/admin/team", label: "Add Team Member" },
            ].map((q) => (
              <Link key={q.label} href={q.href} style={{
                padding: "8px 16px", borderRadius: "8px",
                background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)",
                color: "#f97316", fontSize: "12px", fontWeight: 600,
                textDecoration: "none", transition: "background 0.15s",
              }}>
                {q.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export { Sidebar };
