"use client";

import { useState, useEffect } from "react";
import { Code2, Users2, Rocket, Award, Flag, CheckCircle2, ArrowDown, Sparkles, TrendingUp } from "lucide-react";

const points = [
  {
    number: "01",
    id: "point-1",
    year: "Earlier",
    icon: Code2,
    color: "#a78bfa",
    title: "Nexus Founding & Vision",
    subtitle: "Inception & Student Bootcamps",
    description: "Founded in 2025 as an elite student technical community to foster innovation, peer learning, hands-on software engineering, and placement excellence.",
    highlights: ["Organized first offline coding bootcamps", "Built core coding peer group", "Established student mentorship framework"],
    statsValue: "100+ Students",
  },
  {
    number: "02",
    id: "point-2",
    year: "2025",
    icon: Users2,
    color: "#60a5fa",
    title: "Nexus & Core Team Formation",
    subtitle: "Building the Foundation Team",
    description: "Assembled a dedicated core team of developers, coordinators, and domain leads to drive Nexus forward. Structured the community into focused teams to deliver real impact.",
    highlights: ["Recruited passionate developers and coordinators", "Defined team roles across tech, content, and PR", "Established leadership and mentorship pipeline"],
    statsValue: "20 Active Members",
  },
  {
    number: "03",
    id: "point-3",
    year: "2025",
    icon: Rocket,
    color: "#38bdf8",
    title: "Website Launch: Vexta Suite",
    subtitle: "Proprietary Testing Engine",
    description: "Built and launched our proprietary portal, Vexta. A specialized online testing suite where students compete in real-time Aptitude, English, and Coding rounds.",
    highlights: ["Real-time online evaluation engine", "Live leaderboards & scorecards", "Online test & evaluation suite"],
    statsValue: "Vexta Platform",
  },
  {
    number: "04",
    id: "point-4",
    year: "2025",
    icon: Award,
    color: "#fbbf24",
    title: "Grand Placement Drives & Goodies",
    subtitle: "Community Challenges & Rewards",
    description: "Hosted massive community placement challenges. Hundreds of participants joined to compete, winning tech goodies, verified certificates, and cash prizes.",
    highlights: ["Distributed prizes, goodies & certificates", "Mock placement round simulations", "Direct senior referral linkages"],
    statsValue: "Placement Drives",
  },
  {
    number: "05",
    id: "point-5",
    year: "2026 & Beyond",
    icon: Flag,
    color: "#ec4899",
    title: "HackNexus & Pan-India Scale",
    subtitle: "National Placement Ecosystem",
    description: "Prepping for our flagship HackNexus 2026 hackathon while expanding the Nexus ecosystem across colleges in India with AI-driven learning roadmaps.",
    highlights: ["24-hour flagship hackathon", "Mobile app with daily streaks & quizzes", "Pan-India college chapter expansions"],
    statsValue: "Pan-India Reach",
  },
];

const evolutionBadges = [
  { label: "Growing Community", icon: Users2, color: "#60a5fa" },
  { label: "Student-Led Initiatives", icon: Sparkles, color: "#a78bfa" },
  { label: "Since 2025", icon: TrendingUp, color: "#ec4899" },
];

export default function Timeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePoint = points[activeIdx];

  useEffect(() => {
    const handleScroll = () => {
      let closestIdx = 0;
      let minDistance = Infinity;
      const viewportCenter = window.innerHeight / 2;

      points.forEach((_, idx) => {
        const el = document.getElementById(`story-point-${idx}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIdx = idx;
          }
        }
      });
      setActiveIdx(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="timeline"
      className="section-padding relative"
      style={{ background: "#050811", minHeight: "100vh", paddingBottom: "140px", overflow: "visible" }}
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "5%",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${activePoint.color}14 0%, transparent 70%)`,
          filter: "blur(140px)",
          transition: "background 0.8s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1, overflow: "visible" }}>
        <div className="scrollytelling-grid">

          {/* ── LEFT COLUMN: Permanently Sticky Header Block ── */}
          <div className="scrollytelling-left-sticky">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="section-tag" style={{ color: "var(--accent)" }}>
                <Sparkles style={{ width: "13px", height: "13px", display: "inline", marginRight: "6px" }} />
                Our Evolution
              </div>

              <h2
                className="heading-display"
                style={{ fontSize: "clamp(38px, 4.8vw, 62px)", lineHeight: 1.12, marginTop: "2px" }}
              >
                How We<br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #ec4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Evolved & Grew
                </span>
              </h2>

              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "var(--text-secondary)",
                  maxWidth: "400px",
                  marginBottom: "6px",
                }}
              >
                From a local student-led bootcamps initiative to a full-fledged placement ecosystem, explore our step-by-step evolution below as you scroll.
              </p>

              {/* Evolution Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                {evolutionBadges.map((badge) => {
                  const BIcon = badge.icon;
                  return (
                    <div
                      key={badge.label}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "5px 12px",
                        borderRadius: "999px",
                        background: `${badge.color}12`,
                        border: `1px solid ${badge.color}30`,
                        color: badge.color,
                        fontSize: "11.5px",
                        fontWeight: 700,
                      }}
                    >
                      <BIcon style={{ width: "13px", height: "13px" }} />
                      <span>{badge.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Indicator */}
              <div style={{ maxWidth: "340px", marginTop: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: activePoint.color, transition: "color 0.3s ease" }}>
                    Milestone {activePoint.number} of 0{points.length}
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                    Scroll to explore
                    <ArrowDown style={{ width: "12px", height: "12px", color: activePoint.color }} />
                  </span>
                </div>

                <div
                  style={{
                    height: "4px",
                    width: "100%",
                    borderRadius: "999px",
                    background: "rgba(255, 255, 255, 0.08)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${((activeIdx + 1) / points.length) * 100}%`,
                      background: activePoint.color,
                      borderRadius: "999px",
                      transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Separate Unboxed Milestones (No Connecting Line) ── */}
          <div className="scrollytelling-right-separate">
            {points.map((pt, idx) => {
              const Icon = pt.icon;
              const isActive = activeIdx === idx;

              return (
                <div
                  key={pt.id}
                  id={`story-point-${idx}`}
                  style={{
                    position: "relative",
                    paddingBottom: idx === points.length - 1 ? "0px" : "120px",
                    opacity: isActive ? 1 : 0.22,
                    transform: isActive ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Top Header Row: Separate Icon Circle + Step Number + Year Badge */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      {/* Standalone Glowing Icon Badge */}
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "14px",
                          background: `${pt.color}15`,
                          border: `1.5px solid ${pt.color}${isActive ? "60" : "25"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: pt.color,
                          boxShadow: isActive ? `0 0 28px ${pt.color}40` : "none",
                          transition: "all 0.4s ease",
                        }}
                      >
                        <Icon style={{ width: "22px", height: "22px" }} />
                      </div>

                      {/* Large Step Number */}
                      <span
                        style={{
                          fontSize: "36px",
                          fontFamily: "var(--font-display)",
                          fontWeight: 900,
                          color: pt.color,
                          lineHeight: 1,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {pt.number}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 800,
                          padding: "5px 14px",
                          borderRadius: "999px",
                          background: `${pt.color}15`,
                          color: pt.color,
                          border: `1px solid ${pt.color}35`,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        {pt.year}
                      </span>
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 800,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: pt.color,
                      marginBottom: "6px",
                    }}
                  >
                    {pt.subtitle}
                  </div>

                  {/* Main Title (Unboxed, bold typography) */}
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(26px, 2.6vw, 36px)",
                      fontWeight: 800,
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.65)",
                      lineHeight: 1.25,
                      marginBottom: "14px",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {pt.title}
                  </h3>

                  {/* Description Copy */}
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.8,
                      color: "var(--text-secondary)",
                      marginBottom: "20px",
                      maxWidth: "540px",
                    }}
                  >
                    {pt.description}
                  </p>

                  {/* Key Highlights (Standalone left accent glow bar) */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      paddingLeft: "18px",
                      borderLeft: `3px solid ${isActive ? pt.color : "rgba(255,255,255,0.08)"}`,
                      transition: "border-color 0.4s ease",
                    }}
                  >
                    {pt.highlights.map((h, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <CheckCircle2 style={{ width: "16px", height: "16px", color: pt.color, flexShrink: 0 }} />
                        <span style={{ fontSize: "14px", color: "var(--text-primary)", fontWeight: 500 }}>
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Subtle Accent Divider Line between separate points */}
                  {idx < points.length - 1 && (
                    <div
                      style={{
                        height: "1px",
                        width: "100%",
                        background: "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, transparent 80%)",
                        marginTop: "48px",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── Responsive CSS ── */}
      <style>{`
        .scrollytelling-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 50px;
        }

        .scrollytelling-right-separate {
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 1024px) {
          .scrollytelling-grid {
            grid-template-columns: 1fr 1.25fr !important;
            gap: 80px !important;
            align-items: flex-start !important;
          }

          .scrollytelling-left-sticky {
            position: sticky !important;
            top: 140px !important;
            align-self: flex-start !important;
            height: auto !important;
            z-index: 10;
          }

          .scrollytelling-right-separate {
            padding-top: 10px;
          }
        }
      `}</style>
    </section>
  );
}
