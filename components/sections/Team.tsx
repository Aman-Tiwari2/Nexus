"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, ArrowRight, UserCheck } from "lucide-react";
import { teamMembers } from "@/data/team";

function LinkedInIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const categories = [
  { id: "all", name: "All Members", color: "#f97316" },
  { id: "leadership", name: "Leadership & Core", color: "#fbbf24" },
  { id: "technical", name: "Technical Team", color: "#60a5fa" },
  { id: "content_pr", name: "Content & PR", color: "#ec4899" },
  { id: "social_media", name: "Social Media", color: "#10b981" },
];

function getMemberCategory(role: string) {
  const r = role.toLowerCase();
  if (r.includes("founder") || r.includes("community")) return { id: "leadership", name: "Leadership & Core", color: "#fbbf24" };
  if (r.includes("technical")) return { id: "technical", name: "Technical Team", color: "#60a5fa" };
  if (r.includes("content") || r.includes("event")) return { id: "content_pr", name: "Content & PR", color: "#ec4899" };
  if (r.includes("social")) return { id: "social_media", name: "Social Media", color: "#10b981" };
  return { id: "technical", name: "Core Team", color: "#f97316" };
}

export default function Team() {
  const [activeTab, setActiveTab] = useState("all");
  const [members, setMembers] = useState(teamMembers);

  useEffect(() => {
    fetch("/api/admin/team")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMembers(data);
        }
      })
      .catch(() => {});
  }, []);

  const filteredMembers = activeTab === "all"
    ? members
    : members.filter((m) => getMemberCategory(m.role).id === activeTab);

  return (
    <section id="team" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      {/* Background ambient radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1 }}>
        {/* ── Header ── */}
        <div style={{ marginBottom: "40px" }}>
          <div className="section-tag">Community Builders</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
              marginTop: "8px",
            }}
          >
            <h2
              className="heading-display"
              style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}
            >
              Meet the<br />
              <span style={{ color: "var(--accent)" }}>People Behind Nexus</span>
            </h2>

            <div style={{ fontSize: "13px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "8px" }}>
              <UserCheck style={{ width: "16px", height: "16px", color: "var(--accent)" }} />
              <span>{members.length} Active Team Members</span>
            </div>
          </div>
        </div>

        {/* ── Interactive Category Filter Pills ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "40px",
            paddingBottom: "12px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            const count = cat.id === "all"
              ? members.length
              : members.filter((m) => getMemberCategory(m.role).id === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 18px",
                  borderRadius: "999px",
                  fontSize: "12.5px",
                  fontWeight: isActive ? 700 : 500,
                  background: isActive ? `${cat.color}18` : "rgba(255,255,255,0.02)",
                  color: isActive ? cat.color : "var(--text-secondary)",
                  border: `1px solid ${isActive ? `${cat.color}50` : "var(--border)"}`,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? `0 4px 16px ${cat.color}20` : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                  }
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: cat.color,
                    display: "inline-block",
                  }}
                />
                {cat.name}
                <span
                  style={{
                    fontSize: "10px",
                    padding: "1px 7px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.06)",
                    color: isActive ? cat.color : "var(--text-muted)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Scroll & Staggered Reveal Team Grid ── */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: "20px",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredMembers.map((member, idx) => {
              const catInfo = getMemberCategory(member.role);
              const initials = member.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2);

              return (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, delay: (idx % 6) * 0.06, ease: "easeOut" }}
                  whileHover={{
                    y: -6,
                    borderColor: `${catInfo.color}50`,
                    boxShadow: `0 16px 36px ${catInfo.color}15`,
                  }}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "16px",
                    transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Top: Header with Avatar & Category Badge */}
                  <div>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "16px" }}>
                      {/* Avatar with Glow Ring */}
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <div
                          style={{
                            position: "absolute",
                            inset: "-2px",
                            borderRadius: "50%",
                            background: `linear-gradient(135deg, ${catInfo.color}, transparent)`,
                            opacity: 0.6,
                          }}
                        />
                        <div
                          style={{
                            position: "relative",
                            width: "52px",
                            height: "52px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            background: "var(--bg-elevated)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            fontWeight: 800,
                            color: "var(--text-primary)",
                          }}
                        >
                          {member.photo ? (
                            <img
                              src={member.photo}
                              alt={member.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          ) : (
                            <span>{initials}</span>
                          )}
                        </div>
                      </div>

                      {/* Domain Badge */}
                      <span
                        style={{
                          fontSize: "9.5px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: "4px 10px",
                          borderRadius: "999px",
                          background: `${catInfo.color}15`,
                          color: catInfo.color,
                          border: `1px solid ${catInfo.color}30`,
                        }}
                      >
                        {catInfo.name.split(" ")[0]}
                      </span>
                    </div>

                    {/* Member Name */}
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        lineHeight: 1.25,
                        marginBottom: "4px",
                      }}
                    >
                      {member.name}
                    </h3>

                    {/* Role */}
                    <p
                      style={{
                        fontSize: "12.5px",
                        fontWeight: 600,
                        color: catInfo.color,
                        marginBottom: "4px",
                      }}
                    >
                      {member.role}
                    </p>

                    {/* Branch & Year */}
                    <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "14px" }}>
                      {member.branch} · {member.year}
                    </p>

                    {/* Bio */}
                    {member.bio && (
                      <p
                        style={{
                          fontSize: "12.5px",
                          lineHeight: 1.6,
                          color: "var(--text-secondary)",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          marginBottom: "16px",
                        } as React.CSSProperties}
                      >
                        {member.bio}
                      </p>
                    )}

                    {/* Skill Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {member.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          style={{
                            fontSize: "10.5px",
                            padding: "3px 9px",
                            borderRadius: "999px",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid var(--border)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span style={{ fontSize: "10.5px", padding: "3px 6px", color: "var(--text-muted)" }}>
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer: Social Links + Profile Button */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "14px",
                      borderTop: "1px solid var(--border)",
                      marginTop: "12px",
                    }}
                  >
                    {/* Social icons */}
                    <div style={{ display: "flex", gap: "6px" }}>
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} LinkedIn`}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            border: "1px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--text-muted)",
                            transition: "all 0.18s ease",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "#0A66C2";
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(10,102,194,0.4)";
                            (e.currentTarget as HTMLElement).style.background = "rgba(10,102,194,0.1)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                          }}
                        >
                          <LinkedInIcon size={12} />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} GitHub`}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            border: "1px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--text-muted)",
                            transition: "all 0.18s ease",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                          }}
                        >
                          <Github size={12} />
                        </a>
                      )}
                      {member.social.email && (
                        <a
                          href={`mailto:${member.social.email}`}
                          aria-label={`Email ${member.name}`}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            border: "1px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--text-muted)",
                            transition: "all 0.18s ease",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                          }}
                        >
                          <Mail size={12} />
                        </a>
                      )}
                    </div>

                    {/* View Profile link */}
                    <Link
                      href={`/team/${member.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "11.5px",
                        fontWeight: 600,
                        color: catInfo.color,
                        padding: "6px 12px",
                        borderRadius: "8px",
                        background: `${catInfo.color}10`,
                        border: `1px solid ${catInfo.color}25`,
                        transition: "all 0.18s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = catInfo.color;
                        (e.currentTarget as HTMLElement).style.color = "#0c0c0c";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = `${catInfo.color}10`;
                        (e.currentTarget as HTMLElement).style.color = catInfo.color;
                      }}
                    >
                      Profile
                      <ArrowRight style={{ width: "11px", height: "11px" }} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
