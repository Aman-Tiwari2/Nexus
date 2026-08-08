"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Code2, Users, Trophy, Star, CheckCircle2, ArrowRight } from "lucide-react";

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
}

const roadmapData: RoadmapPhase[] = [
  {
    phaseNum: "01",
    year: "Phase 1",
    title: "Start — Get Connected",
    subtitle: "Join & Understand Nexus",
    icon: Brain,
    color: "#38bdf8", // Electric Cyan
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
    color: "#818cf8", // Indigo Blue
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
    color: "#2dd4bf", // Glowing Teal
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
    color: "#60a5fa", // Vivid Sky Blue
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
    color: "#a78bfa", // Purple Accent
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

  // Auto-advance tabs
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

  return (
    <section
      id="roadmap"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1 }}>
        <div className="section-tag">Learning Path</div>

        {/* Section Header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "48px",
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
            <span style={{ color: "var(--accent)" }}>Roadmap</span>
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "14px",
              marginTop: "16px",
              maxWidth: "540px",
              lineHeight: 1.6,
            }}
          >
            A 5-phase structured journey designed to help students connect, learn, participate, grow, and explore opportunities beyond the classroom.
          </p>
        </div>

        {/* ── 5-Step Connected Progress Stepper Track ── */}
        <div className="roadmap-stepper-container" style={{ marginBottom: "36px" }}>
          {/* Progress Connecting Laser Line */}
          <div className="stepper-line-bg" />
          <div
            className="stepper-line-active"
            style={{
              width: `${(activeIndex / (roadmapData.length - 1)) * 100}%`,
              background: `linear-gradient(90deg, #38bdf8, ${activePhase.color})`,
            }}
          />

          <div className="stepper-nodes-grid">
            {roadmapData.map((item, idx) => {
              const Icon = item.icon;
              const isActive = idx === activeIndex;
              const isPast = idx < activeIndex;

              return (
                <button
                  key={item.phaseNum}
                  onClick={() => handlePhaseClick(idx)}
                  className={`stepper-node-btn ${isActive ? "active" : ""} ${isPast ? "past" : ""}`}
                >
                  <div
                    className="node-circle"
                    style={{
                      borderColor: isActive
                        ? item.color
                        : isPast
                        ? `${item.color}80`
                        : "rgba(255,255,255,0.12)",
                      background: isActive
                        ? `${item.color}25`
                        : isPast
                        ? "rgba(18,20,26,0.95)"
                        : "var(--bg-card)",
                      boxShadow: isActive ? `0 0 20px ${item.color}40` : "none",
                    }}
                  >
                    {isPast ? (
                      <CheckCircle2 style={{ width: "16px", height: "16px", color: item.color }} />
                    ) : (
                      <Icon
                        style={{
                          width: "16px",
                          height: "16px",
                          color: isActive ? item.color : "var(--text-muted)",
                        }}
                      />
                    )}
                  </div>

                  <div className="node-text">
                    <span className="node-phase" style={{ color: isActive ? item.color : "var(--text-muted)" }}>
                      PHASE {item.phaseNum}
                    </span>
                    <span className="node-title" style={{ color: isActive ? "#ffffff" : "var(--text-secondary)" }}>
                      {item.title.split("—")[0].trim()}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active Phase Showcase Card ── */}
        <div
          style={{
            background: "rgba(16, 18, 24, 0.92)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${activePhase.color}40`,
            borderRadius: "20px",
            padding: "36px 32px",
            position: "relative",
            overflow: "hidden",
            boxShadow: `0 16px 40px rgba(0,0,0,0.5), inset 0 1px 0 ${activePhase.color}25`,
            transition: "border-color 0.4s, box-shadow 0.4s",
          }}
        >
          {/* Top subtle accent gradient bar */}
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
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: `${activePhase.color}20`,
                  border: `1px solid ${activePhase.color}45`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ActiveIcon style={{ width: "20px", height: "20px", color: activePhase.color }} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "11px",
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
                    fontSize: "clamp(20px, 2.5vw, 26px)",
                    fontWeight: 800,
                    color: "#ffffff",
                    margin: 0,
                    letterSpacing: "-0.01em",
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
                  background: `${activePhase.color}20`,
                  border: `1px solid ${activePhase.color}45`,
                  padding: "6px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Auto-play Journey ▶
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
                          padding: "14px 16px",
                          borderRadius: "10px",
                          background: "rgba(255,255,255,0.025)",
                          border: `1px solid ${activePhase.color}20`,
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "12px",
                        }}
                      >
                        <ArrowRight
                          style={{
                            width: "14px",
                            height: "14px",
                            color: activePhase.color,
                            flexShrink: 0,
                            marginTop: "3px",
                          }}
                        />
                        <span style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#e2e8f0", fontWeight: 500 }}>
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

      {/* Embedded CSS for Stepper Track */}
      <style>{`
        .roadmap-stepper-container {
          position: relative;
          padding: 20px 0;
        }

        .stepper-line-bg {
          position: absolute;
          top: 38px;
          left: 5%;
          right: 5%;
          height: 2px;
          background: rgba(255, 255, 255, 0.08);
          z-index: 0;
        }

        .stepper-line-active {
          position: absolute;
          top: 38px;
          left: 5%;
          height: 2px;
          z-index: 1;
          transition: width 0.4s ease-out, background 0.4s ease-out;
        }

        .stepper-nodes-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .stepper-node-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          text-align: center;
          padding: 0;
        }

        .node-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .node-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .node-phase {
          font-size: 9.5px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .node-title {
          font-size: 12px;
          font-weight: 700;
          line-height: 1.3;
          max-width: 140px;
          transition: color 0.3s;
        }

        @media (max-width: 768px) {
          .stepper-line-bg, .stepper-line-active {
            display: none;
          }

          .stepper-nodes-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .stepper-node-btn {
            flex-direction: row;
            align-items: center;
            padding: 10px 14px;
            border-radius: 10px;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.06);
          }

          .stepper-node-btn.active {
            background: rgba(255,255,255,0.05);
          }

          .node-text {
            align-items: flex-start;
          }

          .node-title {
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
}
