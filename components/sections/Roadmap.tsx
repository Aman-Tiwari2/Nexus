"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Code2, Users, Trophy, ArrowRight, Star } from "lucide-react";

interface Task {
  category: string;
  tasks: string[];
}

interface RoadmapYear {
  year: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  items: Task[];
}

const roadmapData: RoadmapYear[] = [
  {
    year: "1st Year",
    title: "Build Foundation",
    subtitle: "Focus on fundamentals",
    icon: Brain,
    color: "#f97316", // orange
    items: [
      {
        category: "Programming",
        tasks: [
          "Learn C or Python programming basics",
          "Understand core logic: arrays, strings, loops",
          "Solve basic problems on HackerRank / GeeksforGeeks",
        ],
      },
      {
        category: "Aptitude",
        tasks: [
          "Practice quantitative aptitude & arithmetic",
          "Solve logical reasoning puzzles",
          "Join weekly Nexus aptitude practice sessions",
        ],
      },
      {
        category: "Soft Skills",
        tasks: [
          "Enhance professional English communication",
          "Learn interactive presentation skills",
          "Active participation in Nexus club activities",
        ],
      },
    ],
  },
  {
    year: "2nd Year",
    title: "DSA & Projects",
    subtitle: "Core tech preparation",
    icon: Code2,
    color: "#f97316",
    items: [
      {
        category: "DSA & Core",
        tasks: [
          "Master Linear & Non-Linear DSA (Trees, Graphs)",
          "Implement Recursion, Sorting, and Searching",
          "Solve 150+ problems on LeetCode & GFG",
        ],
      },
      {
        category: "Development",
        tasks: [
          "Pick a specialization (Web, Mobile, AI/ML)",
          "Build 1-2 end-to-end full-stack projects",
          "Version control: learn Git & GitHub team workflows",
        ],
      },
      {
        category: "Competitive Coding",
        tasks: [
          "Participate in monthly Nexus Coding Contests",
          "Start regular Codeforces & CodeChef contests",
          "Target Div 3 / Div 4 level rounds confidently",
        ],
      },
    ],
  },
  {
    year: "3rd Year",
    title: "Internship Preparation",
    subtitle: "Real-world experience",
    icon: Users,
    color: "#fb923c",
    items: [
      {
        category: "Internships",
        tasks: [
          "Apply for summer internships & training roles",
          "Practice mock interview loops with seniors",
          "Leverage Nexus internal placement referrals",
        ],
      },
      {
        category: "Advanced Tech",
        tasks: [
          "Deep dive into Dynamic Programming & Advanced Graphs",
          "Learn System Design basics (High-Level & Low-Level)",
          "Database Management Systems & SQL optimization",
        ],
      },
      {
        category: "Placement Assets",
        tasks: [
          "Build an ATS-optimized 1-page resume",
          "Optimize LinkedIn & GitHub showcase profiles",
          "Core CS fundamentals: OS, Computer Networks",
        ],
      },
    ],
  },
  {
    year: "Final Year",
    title: "Crack Placements",
    subtitle: "Achieve the dream offer",
    icon: Trophy,
    color: "#fb923c",
    items: [
      {
        category: "On-Campus Drive",
        tasks: [
          "Register & prepare for all campus placement drives",
          "Attend intensive Nexus Mock Placement runs",
          "Track dates and technical rounds diligently",
        ],
      },
      {
        category: "Off-Campus Search",
        tasks: [
          "Apply via LinkedIn, Instahyre, Naukri, and careers pages",
          "Target Product-Based Companies & niche startups",
          "Reach out to Nexus alumni network for direct referrals",
        ],
      },
      {
        category: "Final Polish",
        tasks: [
          "Practice behavioral & HR situational answers",
          "Revise top 100 most frequent company questions",
          "Evaluate offers & get post-offer negotiation advice",
        ],
      },
    ],
  },
];

export default function Roadmap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto loop through years
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % roadmapData.length);
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setIsPlaying(false); // Pause auto-play when clicked manually
  };

  const activeYearData = roadmapData[activeIndex];

  return (
    <section
      id="roadmap"
      className="section-padding relative overflow-hidden"
      style={{
        background: "var(--bg-secondary)",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(249,115,22,0.03) 0%, transparent 70%)",
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
            marginBottom: "60px",
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
              maxWidth: "500px",
              lineHeight: 1.6,
            }}
          >
            A comprehensive, battle-tested roadmap designed by placed seniors to guide you from absolute fundamentals to your dream tech offer.
          </p>
        </div>

        {/* The 2x2 Serpentine Road Map Flow */}
        <div className="roadmap-flow-wrapper" style={{ position: "relative", marginBottom: "50px" }}>
          
          {/* Connecting SVG Path for desktop view */}
          <div className="desktop-connector-svg" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
            <svg width="100%" height="100%" viewBox="0 0 1000 380" fill="none" preserveAspectRatio="none">
              {/* Main connecting dashed line */}
              <path
                d="M 230 100 L 770 100 C 880 100, 880 280, 770 280 L 230 280"
                stroke="rgba(249, 115, 22, 0.12)"
                strokeWidth="3"
                strokeDasharray="8,8"
              />
              
              {/* Highlight path with moving glow effect */}
              <motion.path
                d="M 230 100 L 770 100 C 880 100, 880 280, 770 280 L 230 280"
                stroke="url(#glow-grad)"
                strokeWidth="3.5"
                strokeDasharray="16, 24"
                animate={{
                  strokeDashoffset: [0, -80],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <defs>
                <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#fb923c" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Grid Layout mimicking the 2x2 Serpentine flow */}
          <div className="roadmap-grid">
            {roadmapData.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIndex;
              
              // Custom grid positions for serpentine flow:
              // Step 1: Row 1, Col 1
              // Step 2: Row 1, Col 2
              // Step 3: Row 2, Col 2
              // Step 4: Row 2, Col 1
              let gridArea = "";
              if (index === 0) gridArea = "r1-c1";
              if (index === 1) gridArea = "r1-c2";
              if (index === 2) gridArea = "r2-c2";
              if (index === 3) gridArea = "r2-c1";

              return (
                <div
                  key={item.year}
                  onClick={() => handleCardClick(index)}
                  className={`roadmap-card-container ${gridArea} ${isActive ? "active" : ""}`}
                >
                  {/* Decorative glowing card frame */}
                  <div
                    className="roadmap-card"
                    style={{
                      borderColor: isActive ? "var(--accent)" : "var(--border)",
                      boxShadow: isActive ? "var(--shadow-glow)" : "none",
                      background: "var(--bg-primary)",
                      opacity: isActive ? 1 : 0.6,
                    }}
                  >
                    {/* Floating Glow Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGlow"
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          border: "1.5px solid var(--accent)",
                          borderRadius: "16px",
                          boxShadow: "inset 0 0 12px rgba(249, 115, 22, 0.15)",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Left/top orange status bar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: isActive ? "linear-gradient(to right, var(--accent), #fb923c)" : "transparent",
                        borderRadius: "16px 16px 0 0",
                      }}
                    />

                    {/* Step Icon Badge */}
                    <div
                      className="icon-badge"
                      style={{
                        background: isActive ? "rgba(249, 115, 22, 0.15)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${isActive ? "rgba(249, 115, 22, 0.35)" : "rgba(255,255,255,0.08)"}`,
                      }}
                    >
                      <Icon
                        style={{
                          width: "22px",
                          height: "22px",
                          color: isActive ? "var(--accent)" : "var(--text-muted)",
                        }}
                      />
                    </div>

                    {/* Card Meta details */}
                    <div>
                      <div
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 800,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: isActive ? "var(--accent)" : "var(--text-muted)",
                          marginBottom: "4px",
                        }}
                      >
                        {item.year}
                      </div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: isActive ? "var(--text-primary)" : "rgba(255,255,255,0.8)",
                          marginBottom: "4px",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {item.title}
                      </h3>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--text-muted)",
                          fontWeight: 500,
                        }}
                      >
                        {item.subtitle}
                      </div>
                    </div>

                    {/* Auto loop playing bar indicator */}
                    {isActive && isPlaying && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          height: "2px",
                          background: "var(--accent)",
                          borderRadius: "0 0 16px 16px",
                          animation: "progress-fill 4.5s linear infinite",
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Details Area with AnimatePresence */}
        <div
          style={{
            background: "rgba(20, 20, 20, 0.3)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "20px",
            padding: "40px 32px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Header containing year status */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: "24px",
              marginBottom: "32px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Star style={{ color: "var(--accent)", width: "16px", height: "16px", fill: "var(--accent)" }} />
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--accent)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Selected Phase: {activeYearData.year} ({activeYearData.title})
              </span>
            </div>
            {!isPlaying && (
              <button
                onClick={() => setIsPlaying(true)}
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Resume Auto-play ▶
              </button>
            )}
          </div>

          {/* Details Content Panels with fade and slide transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "36px",
              }}
            >
              {activeYearData.items.map((catItem, idx) => (
                <div key={catItem.category} className="details-col">
                  {/* Category Title */}
                  <h4
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--text-primary)",
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
                        background: "var(--accent)",
                      }}
                    />
                    {catItem.category}
                  </h4>

                  {/* Tasks List */}
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {catItem.tasks.map((task, tIdx) => (
                      <motion.li
                        key={tIdx}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: tIdx * 0.08 }}
                        style={{
                          listStyleType: "none",
                          fontSize: "13px",
                          lineHeight: 1.6,
                          color: "var(--text-secondary)",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <ArrowRight
                          style={{
                            width: "12px",
                            height: "12px",
                            color: "var(--accent)",
                            flexShrink: 0,
                            marginTop: "4px",
                          }}
                        />
                        <span>{task}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Embedded Styles for Serpentine grid layout & responsiveness */}
      <style>{`
        /* Desktop grid structure */
        .roadmap-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px 100px;
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
        }

        .roadmap-card-container {
          cursor: pointer;
          display: flex;
          justify-content: center;
        }

        /* Set the serpentine positions */
        .roadmap-grid .r1-c1 { grid-row: 1; grid-column: 1; }
        .roadmap-grid .r1-c2 { grid-row: 1; grid-column: 2; }
        .roadmap-grid .r2-c2 { grid-row: 2; grid-column: 2; }
        .roadmap-grid .r2-c1 { grid-row: 2; grid-column: 1; }

        .roadmap-card {
          position: relative;
          width: 100%;
          max-width: 320px;
          height: 110px;
          padding: 20px;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          display: flex;
          alignItems: center;
          gap: 16px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .roadmap-card-container.active .roadmap-card {
          transform: translateY(-4px);
        }

        .icon-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        /* Auto-play progress bar filling animation */
        @keyframes progress-fill {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        /* Responsive Mobile Layout */
        @media (max-width: 900px) {
          .desktop-connector-svg {
            display: none !important;
          }
          
          .roadmap-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            max-width: 400px;
          }

          .roadmap-grid .r1-c1 { grid-row: auto; grid-column: auto; }
          .roadmap-grid .r1-c2 { grid-row: auto; grid-column: auto; }
          .roadmap-grid .r2-c2 { grid-row: auto; grid-column: auto; }
          .roadmap-grid .r2-c1 { grid-row: auto; grid-column: auto; }

          .roadmap-card {
            max-width: 100%;
            height: auto;
          }
        }
      `}</style>
    </section>
  );
}
