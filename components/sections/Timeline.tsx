"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Code2, Users2, Rocket, Calendar, Flag, CheckCircle, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

const milestones = [
  {
    id: "hackallite",
    year: "Earlier",
    icon: Code2,
    color: "#a78bfa",
    glowColor: "rgba(167,139,250,0.15)",
    borderColor: "rgba(167,139,250,0.3)",
    title: "Founded as hackallite",
    subtitle: "Inception & Local Bootcamps",
    description: "Started with a core vision to build practical technical capabilities in college students, organizing hands-on coding bootcamps and local programming sessions.",
    highlights: ["Organized first offline coding bootcamps", "Built core coding peer group", "Established student mentorship framework"],
    statsLabel: "Initial Community",
    statsValue: "100+ Students",
  },
  {
    id: "rebrand",
    year: "2025",
    icon: Users2,
    color: "#60a5fa",
    glowColor: "rgba(96,165,250,0.15)",
    borderColor: "rgba(96,165,250,0.3)",
    title: "Rebranded to Nexus & Team Hiring",
    subtitle: "Scaling Operations & Core Team",
    description: "Officially rebranded to Nexus Community to build a full-fledged placement ecosystem. Recruited our core team of developers, coordinators, and domain leads.",
    highlights: ["Formed 4 core domain teams", "Launched structured hiring drives", "Established official college partnership"],
    statsLabel: "Team Expansion",
    statsValue: "25+ Core Leads",
  },
  {
    id: "vexta",
    year: "2025",
    icon: Rocket,
    color: "#60a5fa",
    glowColor: "rgba(96,165,250,0.15)",
    borderColor: "rgba(96,165,250,0.3)",
    title: "Website Launch: Vexta Platform",
    description: "Built and launched our proprietary portal, Vexta. A specialized online testing suite where students compete in real-time Aptitude, English, and Coding rounds.",
    subtitle: "Proprietary Testing Suite",
    highlights: ["Real-time online evaluation engine", "Live leadboards & scorecards", "5,000+ test attempts completed"],
    statsLabel: "Platform Volume",
    statsValue: "5,000+ Tests",
  },
  {
    id: "drives",
    year: "2025",
    icon: Award,
    color: "#fbbf24",
    glowColor: "rgba(251,191,36,0.15)",
    borderColor: "rgba(251,191,36,0.3)",
    title: "Grand Placement Drives & Goodies",
    subtitle: "Community Hackathons & Rewards",
    description: "Hosted massive community placement challenges. Hundreds of participants joined to compete, winning tech goodies, verified certificates, and cash prizes.",
    highlights: ["Distributed ₹50k+ in prizes & goodies", "Mock placement round simulations", "Direct senior referral linkages"],
    statsLabel: "Participations",
    statsValue: "800+ Competitors",
  },
  {
    id: "hacknexus",
    year: "2026",
    icon: Calendar,
    color: "#ec4899",
    glowColor: "rgba(236,72,153,0.15)",
    borderColor: "rgba(236,72,153,0.3)",
    title: "HackNexus 2026 & Nexus Mobile App",
    subtitle: "Gamified Placement Learning",
    description: "Prepping for our flagship HackNexus 2026 hackathon. Actively coding the Nexus mobile app to offer gamified DSA and aptitude practice anywhere.",
    highlights: ["24-hour flagship 200+ dev hackathon", "Mobile app with daily streaks & quizzes", "Sponsor & employer partnerships"],
    statsLabel: "Target Reach",
    statsValue: "1,500+ Active",
  },
  {
    id: "future",
    year: "Future",
    icon: Flag,
    color: "#34d399",
    glowColor: "rgba(52,211,153,0.15)",
    borderColor: "rgba(52,211,153,0.3)",
    title: "Scaling to Country-Level",
    subtitle: "National Placement Ecosystem",
    description: "Our ultimate mission is to bring the Nexus ecosystem to a national scale, helping students across India master placement preparation.",
    highlights: ["Multi-college chapter expansions", "National level hackathon circuits", "AI-driven personalized learning roadmaps"],
    statsLabel: "Vision Scale",
    statsValue: "Pan-India Reach",
  },
];

const impactStats = [
  { label: "Community", value: "Growing", color: "#a78bfa", icon: Users2 },
  { label: "Initiatives", value: "Student-Led", color: "#60a5fa", icon: Sparkles },
  { label: "Established", value: "Since 2022", color: "#ec4899", icon: TrendingUp },
];

export default function Timeline() {
  const [activeIdx, setActiveIdx] = useState(2); // default to Vexta Launch
  const activeItem = milestones[activeIdx];
  const ActiveIcon = activeItem.icon;

  return (
    <section
      id="timeline"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Dynamic ambient color glow matching active milestone */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-5%",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${activeItem.glowColor} 0%, transparent 65%)`,
          filter: "blur(90px)",
          transition: "background 0.5s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "52px" }}>
          <div className="section-tag">Our Evolution</div>
          <h2
            className="heading-display"
            style={{ fontSize: "clamp(36px, 5.5vw, 68px)", marginTop: "8px" }}
          >
            How We<br />
            <span style={{ color: "var(--accent)" }}>Evolved & Grew</span>
          </h2>
        </div>

        {/* 2-Column Responsive Layout (Fills both left and right completely!) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
            alignItems: "start",
          }}
          className="timeline-main-grid"
        >
          {/* ── Left Column: Milestone List ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {milestones.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeIdx === idx;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  whileHover={{ x: 4 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px 20px",
                    borderRadius: "14px",
                    border: `1px solid ${isActive ? item.borderColor : "var(--border)"}`,
                    background: isActive ? `${item.glowColor}` : "rgba(255,255,255,0.015)",
                    boxShadow: isActive ? `0 8px 24px ${item.glowColor}` : "none",
                    cursor: "pointer",
                    transition: "all 0.22s ease",
                  }}
                >
                  {/* Icon Circle */}
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: isActive ? `${item.color}25` : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isActive ? item.color : "var(--border)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Icon style={{ width: "18px", height: "18px", color: isActive ? item.color : "var(--text-muted)" }} />
                  </div>

                  {/* Text Meta */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: item.color,
                        }}
                      >
                        {item.year}
                      </span>
                      {isActive && (
                        <span
                          style={{
                            fontSize: "9px",
                            padding: "2px 7px",
                            borderRadius: "999px",
                            background: item.color,
                            color: "#0c0c0c",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          Selected
                        </span>
                      )}
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "15px",
                        fontWeight: 700,
                        color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                        lineHeight: 1.25,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Right Column: Active Milestone Showcase & Community Impact Grid ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Active Milestone Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  padding: "28px",
                  borderRadius: "18px",
                  border: `1px solid ${activeItem.borderColor}`,
                  background: "var(--bg-card)",
                  boxShadow: `0 16px 48px ${activeItem.glowColor}`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Header Tag + Year */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "12px",
                        background: `${activeItem.color}20`,
                        border: `1.5px solid ${activeItem.color}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ActiveIcon style={{ width: "20px", height: "20px", color: activeItem.color }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: activeItem.color,
                        }}
                      >
                        {activeItem.year} Milestone
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        {activeItem.subtitle}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "6px 14px",
                      borderRadius: "999px",
                      background: `${activeItem.color}15`,
                      border: `1px solid ${activeItem.color}35`,
                      color: activeItem.color,
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    {activeItem.statsValue}
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "22px",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    lineHeight: 1.25,
                    marginBottom: "12px",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {activeItem.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "var(--text-secondary)",
                    marginBottom: "24px",
                  }}
                >
                  {activeItem.description}
                </p>

                {/* Highlights List */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginBottom: "2px",
                    }}
                  >
                    Key Highlights
                  </div>
                  {activeItem.highlights.map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <CheckCircle style={{ width: "14px", height: "14px", color: activeItem.color, flexShrink: 0 }} />
                      <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Vibrant Community Impact Stats Grid (4 Boxes) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
              }}
            >
              {impactStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, borderColor: `${stat.color}50` }}
                    style={{
                      padding: "16px 18px",
                      borderRadius: "14px",
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.02)",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: `${stat.color}15`,
                        border: `1px solid ${stat.color}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon style={{ width: "17px", height: "17px", color: stat.color }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "18px",
                          fontWeight: 800,
                          color: "var(--text-primary)",
                          lineHeight: 1.1,
                        }}
                      >
                        {stat.value}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .timeline-main-grid {
            grid-template-columns: 1.1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
