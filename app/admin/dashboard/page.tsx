"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Image, Users, Sparkles } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

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
    { label: "Events", count: stats.events, sub: "upcoming + past", href: "/admin/events", color: "#00E5CC", icon: Calendar },
    { label: "Gallery", count: stats.gallery, sub: "magazine moments", href: "/admin/gallery", color: "#00A8FF", icon: Image },
    { label: "Team Members", count: stats.team, sub: "active profiles", href: "/admin/team", color: "#8B5CF6", icon: Users },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar active="/admin/dashboard" />

      <main style={{ flex: 1, padding: "40px", overflowX: "auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700, color: "#F5F5F5", margin: "0 0 6px" }}>
            Dashboard
          </h1>
          <p style={{ fontSize: "13px", color: "#899393", margin: 0 }}>
            Manage your NEXUS Community portal content from here.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          {cards.map((card) => {
            const Icon = card.icon;
            return (
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
                  <Icon style={{ width: "20px", height: "20px", color: card.color, marginBottom: "12px" }} />
                  <div style={{ fontSize: "32px", fontWeight: 800, color: card.color, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
                    {card.count}
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#F5F5F5", margin: "6px 0 2px" }}>{card.label}</div>
                  <div style={{ fontSize: "11px", color: "#899393" }}>{card.sub}</div>
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "24px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 600, color: "#F5F5F5", margin: "0 0 16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Sparkles style={{ width: "14px", height: "14px", color: "#60a5fa" }} />
            Quick Actions
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {[
              { href: "/admin/events", label: "Edit Upcoming Event" },
              { href: "/admin/events", label: "Add Past Event" },
              { href: "/admin/gallery", label: "Edit Gallery Captions" },
              { href: "/admin/team", label: "Add Team Member" },
            ].map((q) => (
              <Link key={q.label} href={q.href} style={{
                padding: "8px 16px", borderRadius: "8px",
                background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)",
                color: "#60a5fa", fontSize: "12px", fontWeight: 600,
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
