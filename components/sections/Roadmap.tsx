"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Code2, Users, Trophy, Star, CheckCircle2, ArrowRight, Sparkles, Compass } from "lucide-react";

interface Task {
  category: string;
  tasks: string[];
}

interface RoadmapPhase {
  phaseNum: string;
  year: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  items: Task[];
  // SVG relative positions (%) along the winding path line
  x: number;
  y: number;
}

const roadmapData: RoadmapPhase[] = [
  {
    phaseNum: "01",
    year: "Phase 1",
    title: "Start — Get Connected",
    subtitle: "Join & Understand Nexus",
    icon: Brain,
    color: "#38bdf8",
    x: 8,
    y: 50,
    items: [
      {
        category: "Community Onboarding",
        tasks: [
          "Join the community through official Discord & portal channels",
          "Meet peers and connect with active student members",
          "Understand how Nexus works and explore available resources",
        ],
      },
    ],
  },
  {
    phaseNum: "02",
    year: "Phase 2",
    title: "Learn — Build Skills",
    subtitle: "Workshops & Learning",
    icon: Code2,
    color: "#818cf8",
    x: 29,
    y: 21,
    items: [
      {
        category: "Skill Development",
        tasks: [
          "Participate in technical workshops and hands-on bootcamps",
          "Engage in structured coding & aptitude practice activities",
          "Attend regular peer learning and domain review sessions",
        ],
      },
    ],
  },
  {
    phaseNum: "03",
    year: "Phase 3",
    title: "Participate — Take Initiative",
    subtitle: "Events & Challenges",
    icon: Users,
    color: "#2dd4bf",
    x: 50,
    y: 78,
    items: [
      {
        category: "Active Engagement",
        tasks: [
          "Join community coding challenges, hackathons, and contests",
          "Take part in community projects and technical initiatives",
          "Contribute to team activities and student-led events",
        ],
      },
    ],
  },
  {
    phaseNum: "04",
    year: "Phase 4",
    title: "Grow — Learn from Others",
    subtitle: "Mentorship & Guidance",
    icon: Trophy,
    color: "#60a5fa",
    x: 71,
    y: 50,
    items: [
      {
        category: "Peer Mentorship",
        tasks: [
          "Connect with placed seniors and experienced domain leads",
          "Share preparation experiences and real interview insights",
          "Seek 1-on-1 guidance for academic and career navigation",
        ],
      },
    ],
  },
  {
    phaseNum: "05",
    year: "Phase 5",
    title: "Explore — Opportunities",
    subtitle: "Prepare for the Future",
    icon: Star,
    color: "#a78bfa",
    x: 92,
    y: 50,
    items: [
      {
        category: "Career Preparation",
        tasks: [
          "Use available community resources, roadmaps, and archives",
          "Practice problem-solving, ATS resume building, and interview loops",
          "Utilize community support to prepare for future opportunities",
        ],
      },
    ],
  },
];

export default function Roadmap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance path nodes
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % roadmapData.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePhaseClick = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
  };

  const activePhase = roadmapData[activeIndex];
  const ActiveIcon = activePhase.icon;

  // Active path line progress calculation
  const activePercent = (activeIndex / (roadmapData.length - 1)) * 100;

  return (
    <section
      id="roadmap"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          right: "-5%",
          width: "550px",
          height: "550px",
          background: `radial-gradient(circle, ${activePhase.color}15 0%, transparent 70%)`,
          filter: "blur(90px)",
          transition: "background 0.8s ease",
          zIndex: 0,
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1 }}>
        <div className="section-tag">
          <Compass style={{ width: "13px", height: "13px", display: "inline", marginRight: "6px" }} />
          Learning Path
        </div>

        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "44px",
          }}
        >
          <h2
            className="heading-display"
            style={{
              fontSize: "clamp(38px, 5.5vw, 64px)",
              lineHeight: 1.0,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            Year-wise<br />
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Interactive Roadmap
            </span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "14.5px",
              marginTop: "16px",
              maxWidth: "560px",
              lineHeight: 1.7,
            }}
          >
            Explore our 5-phase interactive journey. Click any node on the path line to inspect the roadmap objectives.
          </p>
        </div>

        {/* ── INTERACTIVE CURVED PATH ANIMATION SECTION ── */}
        <div className="roadmap-path-container" style={{ position: "relative", width: "100%", marginBottom: "50px" }}>
          
          {/* SVG Animated Path (Winding Bezier Curve for Desktop) */}
          <div className="svg-path-wrapper">
            <svg
              viewBox="0 0 1000 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "auto", overflow: "visible" }}
            >
              {/* Defs for gradients */}
              <defs>
                <linearGradient id="pathGradientBg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.15" />
                </linearGradient>

                <linearGradient id="pathGradientActive" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="25%" stopColor="#818cf8" />
                  <stop offset="50%" stopColor="#2dd4bf" />
                  <stop offset="75%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>

                {/* Pulsing light effect filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Path Line */}
              <path
                d="M 80 90 C 180 20, 290 20, 390 90 C 490 160, 610 160, 710 90 C 810 20, 890 20, 920 90"
                stroke="url(#pathGradientBg)"
                strokeWidth="4"
                strokeDasharray="8 6"
                strokeLinecap="round"
              />

              {/* Animated Active Glowing Path Line */}
              <motion.path
                d="M 80 90 C 180 20, 290 20, 390 90 C 490 160, 610 160, 710 90 C 810 20, 890 20, 920 90"
                stroke="url(#pathGradientActive)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: (activeIndex + 1) / roadmapData.length }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              />

            </svg>
          </div>

          {/* Interactive Path Nodes Grid Overlay */}
          <div className="path-nodes-overlay">
            {roadmapData.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;

              return (
                <div
                  key={item.phaseNum}
                  onClick={() => handlePhaseClick(idx)}
                  className={`path-node-item ${isActive ? "active" : ""} ${isPast ? "past" : ""}`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                  }}
                >
                  {/* Outer Pulsing Ring when Active */}
                  {isActive && (
                    <motion.div
                      layoutId="pulseRing"
                      className="active-pulse-ring"
                      style={{ borderColor: item.color, boxShadow: `0 0 25px ${item.color}` }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}

                  {/* Node Icon Circle */}
                  <div
                    className="node-icon-circle"
                    style={{
                      background: isActive
                        ? item.color
                        : isPast
                        ? "#0f1624"
                        : "#0f1624",
                      borderColor: isActive
                        ? item.color
                        : isPast
                        ? item.color
                        : "rgba(255,255,255,0.15)",
                      boxShadow: isActive ? `0 0 30px ${item.color}80` : "none",
                    }}
                  >
                    {isPast ? (
                      <CheckCircle2 style={{ width: "18px", height: "18px", color: item.color }} />
                    ) : (
                      <Icon
                        style={{
                          width: "18px",
                          height: "18px",
                          color: isActive ? "#ffffff" : item.color,
                        }}
                      />
                    )}
                  </div>

                  {/* Node Label & Phase Tag */}
                  <div className="node-tooltip-label">
                    <span className="node-phase-tag" style={{ color: item.color }}>
                      {item.year}
                    </span>
                    <span className="node-title-tag" style={{ color: isActive ? "#ffffff" : "var(--text-secondary)" }}>
                      {item.title.split("—")[0].trim()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ── Active Phase Showcase Card ── */}
        <div
          style={{
            background: "rgba(16, 18, 24, 0.92)",
            backdropFilter: "blur(14px)",
            border: `1.5px solid ${activePhase.color}45`,
            borderRadius: "24px",
            padding: "36px 32px",
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 30px ${activePhase.color}15`,
            transition: "all 0.4s ease",
          }}
        >
          {/* Top glowing gradient accent bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: `linear-gradient(90deg, ${activePhase.color}, transparent 85%)`,
            }}
          />

          {/* Phase Header Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "20px",
              marginBottom: "28px",
              flexWrap: "wrap",
              gap: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: `${activePhase.color}20`,
                  border: `1.5px solid ${activePhase.color}50`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 0 20px ${activePhase.color}30`,
                }}
              >
                <ActiveIcon style={{ width: "22px", height: "22px", color: activePhase.color }} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: activePhase.color,
                  }}
                >
                  {activePhase.year} · {activePhase.subtitle}
                </div>
                <h3
                  style={{
                    fontSize: "clamp(22px, 2.5vw, 28px)",
                    fontWeight: 800,
                    color: "#ffffff",
                    margin: 0,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {activePhase.title}
                </h3>
              </div>
            </div>

            {!isPlaying && (
              <button
                onClick={() => setIsPlaying(true)}
                style={{
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: "#ffffff",
                  background: `${activePhase.color}25`,
                  border: `1px solid ${activePhase.color}50`,
                  padding: "7px 16px",
                  borderRadius: "999px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Sparkles style={{ width: "12px", height: "12px", color: activePhase.color }} />
                Auto-play Path
              </button>
            )}
          </div>

          {/* Dynamic Content Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {activePhase.items.map((catItem) => (
                <div key={catItem.category}>
                  <h4
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: activePhase.color,
                      marginBottom: "18px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: activePhase.color,
                      }}
                    />
                    {catItem.category}
                  </h4>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "14px",
                    }}
                  >
                    {catItem.tasks.map((task, tIdx) => (
                      <div
                        key={tIdx}
                        style={{
                          padding: "16px 18px",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.025)",
                          border: `1px solid ${activePhase.color}25`,
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                        }}
                      >
                        <ArrowRight
                          style={{
                            width: "15px",
                            height: "15px",
                            color: activePhase.color,
                            flexShrink: 0,
                            marginTop: "2px",
                          }}
                        />
                        <span style={{ fontSize: "14px", lineHeight: 1.6, color: "#e2e8f0", fontWeight: 500 }}>
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Interactive Path Animation CSS ── */}
      <style>{`
        .roadmap-path-container {
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .svg-path-wrapper {
          width: 100%;
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          z-index: 1;
        }

        .path-nodes-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }

        .path-node-item {
          position: absolute;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          pointer-events: auto;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .node-icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          z-index: 3;
        }

        .path-node-item:hover .node-icon-circle {
          transform: scale(1.15);
        }

        .active-pulse-ring {
          position: absolute;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: 2px solid;
          pointer-events: none;
          animation: pulseHalo 2s infinite ease-in-out;
          top: -7px;
          left: 50%;
          margin-left: -29px;
        }

        @keyframes pulseHalo {
          0% { transform: scale(0.9); opacity: 0.9; }
          50% { transform: scale(1.25); opacity: 0.3; }
          100% { transform: scale(0.9); opacity: 0.9; }
        }

        .node-tooltip-label {
          position: absolute;
          top: 52px;
          display: flex;
          flex-direction: column;
          align-items: center;
          white-space: nowrap;
          text-align: center;
        }

        .node-phase-tag {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .node-title-tag {
          font-size: 12.5px;
          font-weight: 700;
          margin-top: 1px;
        }

        /* Mobile Responsive Adjustments */
        @media (max-width: 768px) {
          .roadmap-path-container {
            height: auto;
            margin-bottom: 24px !important;
          }

          .svg-path-wrapper {
            display: none;
          }

          .path-nodes-overlay {
            position: relative;
            inset: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
          }

          .path-node-item {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            flex-direction: row;
            gap: 14px;
            padding: 12px 16px;
            border-radius: 12px;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.08);
            width: 100%;
          }

          .active-pulse-ring {
            display: none;
          }

          .node-tooltip-label {
            position: relative;
            top: auto;
            align-items: flex-start;
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
}
