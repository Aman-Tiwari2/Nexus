"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Terminal, Code, Cpu, Trophy, Sparkles } from "lucide-react";

// Mock student placement data
interface PlacementCard {
  name: string;
  company: string;
  logoColor: string;
  avatarBg: string;
  initials: string;
  role: string;
  delay: number;
  radiusX: number;
  radiusY: number;
  speed: number;
}

const PLACEMENTS: PlacementCard[] = [
  {
    name: "Alumni Mentor",
    company: "LinkedIn",
    logoColor: "#0077b5",
    avatarBg: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    initials: "AM",
    role: "SDE @ LinkedIn",
    delay: 0,
    radiusX: 185,
    radiusY: 100,
    speed: 0.22,
  },
  {
    name: "Full Stack Developer",
    company: "Amazon",
    logoColor: "#ff9900",
    avatarBg: "linear-gradient(135deg, #2f81ff, #2036b3)",
    initials: "FD",
    role: "Cloud Engineer",
    delay: 1.5,
    radiusX: 195,
    radiusY: 90,
    speed: -0.18,
  },
  {
    name: "Placement Lead",
    company: "Deloitte",
    logoColor: "#86bc25",
    avatarBg: "linear-gradient(135deg, #10b981, #047857)",
    initials: "PL",
    role: "Tech Consultant",
    delay: 3.0,
    radiusX: 175,
    radiusY: 110,
    speed: 0.15,
  },
  {
    name: "Core Tech Lead",
    company: "Google",
    logoColor: "#ea4335",
    avatarBg: "linear-gradient(135deg, #ec4899, #be185d)",
    initials: "CL",
    role: "SWE Intern",
    delay: 4.5,
    radiusX: 190,
    radiusY: 95,
    speed: -0.12,
  },
];

// Orbiting language badges
const BADGES = [
  { name: "JS", color: "#f7df1e", text: "black" },
  { name: "Py", color: "#3776ab", text: "white" },
  { name: "C++", color: "#00599c", text: "white" },
  { name: "Java", color: "#f89820", text: "white" },
];

// Custom compiler typing lines
const codeLines = {
  Python: [
    "class NexusStudent:",
    "    def __init__(self):",
    "        self.skills = ['DSA', 'WebDev']",
    "        self.placed = False",
    "    def train(self):",
    "        self.skills.append('System Design')",
    "        self.placed = True",
    "student = NexusStudent()",
    "student.train()",
    "print('Status: PLACED! 🎉')"
  ],
  "C++": [
    "#include <iostream>",
    "using namespace std;",
    "int main() {",
    "    string skill = \"Data Structures\";",
    "    bool crackedPlacement = true;",
    "    if (crackedPlacement) {",
    "        cout << \"NEXUS Lead placed!\" << endl;",
    "    }",
    "    return 0;",
    "}"
  ],
  Java: [
    "public class NexusPrep {",
    "    public static void main(String[] args) {",
    "        int problemsSolved = 500;",
    "        if (problemsSolved > 300) {",
    "            System.out.println(\"Offer Cracked!\");",
    "        }",
    "    }",
    "}"
  ]
};

export default function CodeCube() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [codeText, setCodeText] = useState("");
  const [selectedLang, setSelectedLang] = useState("Python");

  // Code writing automation
  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let text = "";
    let isDeleting = false;
    let interval: NodeJS.Timeout;

    const typeCode = () => {
      const activeLines = codeLines[selectedLang as keyof typeof codeLines] || codeLines["Python"];
      
      if (!isDeleting) {
        if (currentLine < activeLines.length) {
          const line = activeLines[currentLine];
          if (currentChar < line.length) {
            text += line[currentChar];
            setCodeText(text + "\n");
            currentChar++;
            interval = setTimeout(typeCode, 20);
          } else {
            text += "\n";
            setCodeText(text);
            currentLine++;
            currentChar = 0;
            interval = setTimeout(typeCode, 350); // Pause at end of line
          }
        } else {
          isDeleting = true;
          interval = setTimeout(typeCode, 2800); // Hold complete code
        }
      } else {
        if (text.length > 0) {
          text = text.slice(0, -1);
          setCodeText(text);
          interval = setTimeout(typeCode, 8);
        } else {
          isDeleting = false;
          currentLine = 0;
          currentChar = 0;
          interval = setTimeout(typeCode, 500);
        }
      }
    };

    typeCode();
    return () => clearTimeout(interval);
  }, [selectedLang]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{
        width: "520px",
        height: "500px",
        perspective: "1000px",
        marginLeft: "auto",
        marginRight: "-10px",
      }}
    >
      {/* Background glow matrix */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, rgba(99,102,241,0.04) 45%, transparent 70%)",
          filter: "blur(65px)",
          zIndex: 0,
        }}
      />

      {/* Orbiting Concentric Tracks (Dashed) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 1 }}>
        <div style={{ width: "340px", height: "180px", border: "1px dashed rgba(255,255,255,0.07)", borderRadius: "50%", transform: "rotateX(72deg)" }} />
        <div className="absolute" style={{ width: "420px", height: "220px", border: "1px dashed rgba(96,165,250,0.08)", borderRadius: "50%", transform: "rotateX(72deg) rotateY(5deg)" }} />
      </div>

      {/* ── Centerpiece: Interactive IDE Compiler Card ── */}
      <motion.div
        style={{
          width: "360px",
          height: "270px",
          background: "rgba(8, 8, 10, 0.98)",
          border: "2px solid rgba(47, 129, 255, 0.35)",
          borderRadius: "18px",
          transformStyle: "preserve-3d" as const,
          rotateX: 10,
          rotateY: -12,
          rotateZ: 1,
          boxShadow: `
            0 1px 0px rgba(47, 129, 255, 0.35),
            1px 2px 0px rgba(47, 129, 255, 0.35),
            2px 3px 0px rgba(47, 129, 255, 0.4),
            3px 4px 0px rgba(47, 129, 255, 0.4),
            4px 5px 0px rgba(47, 129, 255, 0.45),
            5px 6px 0px rgba(47, 129, 255, 0.45),
            6px 7px 0px rgba(47, 129, 255, 0.5),
            12px 16px 32px rgba(0, 0, 0, 0.92),
            0 0 35px rgba(47, 129, 255, 0.1)
          `,
          zIndex: 10,
        }}
        className="relative flex flex-col overflow-hidden"
      >
        {/* Compiler Top Bar */}
        <div
          style={{
            height: "44px",
            background: "rgba(18, 18, 24, 0.8)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Traffic light control dots */}
          <div style={{ display: "flex", gap: "6px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fbbf24" }} />
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
          </div>

          {/* Interactive Language Selector Tabs */}
          <div style={{ display: "flex", gap: "4px", background: "rgba(0,0,0,0.3)", padding: "2px", borderRadius: "6px" }}>
            {["Python", "C++", "Java"].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                style={{
                  padding: "3px 8px",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  borderRadius: "4px",
                  color: selectedLang === lang ? "#ffffff" : "#a1a1aa",
                  background: selectedLang === lang ? "var(--accent)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Run indicator dot */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
            <span style={{ fontSize: "10px", fontWeight: 700, color: "#a1a1aa", letterSpacing: "0.05em" }}>RUNNING</span>
          </div>
        </div>

        {/* Compiler Workspace Content */}
        <div style={{ flex: 1, padding: "16px", fontFamily: "monospace", fontSize: "12.5px", color: "#e4e4e7", overflow: "hidden", lineHeight: 1.6 }}>
          <div style={{ display: "flex", gap: "12px", height: "100%" }}>
            {/* Line numbers */}
            <div style={{ color: "#52525b", textAlign: "right", userSelect: "none" }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            {/* Dynamic code typing */}
            <div style={{ flex: 1, whiteSpace: "pre-wrap" as const }}>
              <span style={{ color: "#a78bfa" }}>{codeText.split("\n")[0]}</span>
              {codeText.split("\n").slice(1).join("\n")}
              <span className="blinking-cursor">|</span>
            </div>
          </div>
        </div>

        {/* Compiler Footer console status bar */}
        <div
          style={{
            height: "36px",
            background: "rgba(14, 14, 18, 0.9)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent)" }}>
            <Terminal style={{ width: "12px", height: "12px" }} />
            <span style={{ fontSize: "11px", fontWeight: 600 }}>Console Output</span>
          </div>
          <span style={{ fontSize: "10px", color: "#71717a", fontWeight: 500 }}>Process finished with exit code 0</span>
        </div>
      </motion.div>

      {/* ── Orbiting Student Placement Cards ── */}
      {PLACEMENTS.map((card, idx) => {
        return (
          <div
            key={card.name}
            style={{
              position: "absolute",
              zIndex: 15 + idx,
              animation: `float-card-${idx} ${14 + idx * 2}s linear infinite`,
            }}
          >
            <div
              style={{
                width: "210px",
                padding: "12px 14px",
                background: "rgba(10, 10, 10, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.6), 0 0 16px rgba(255,255,255,0.02)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {/* Profile Avatar Grid */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: card.avatarBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "#ffffff",
                  flexShrink: 0,
                }}
              >
                {card.initials}
              </div>

              {/* Placed student text data */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: "12.5px", fontWeight: 700, color: "#ffffff", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {card.name}
                </h4>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "3px" }}>
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontWeight: 800,
                      color: card.logoColor,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {card.company}
                  </span>
                </div>
              </div>
            </div>

            {/* Orbit keyframe generation inline */}
            <style>{`
              @keyframes float-card-${idx} {
                0% {
                  transform: rotate(0deg) translate(${card.radiusX}px) rotate(0deg) translateY(${Math.sin(idx) * 20}px);
                }
                100% {
                  transform: rotate(${card.speed > 0 ? 360 : -360}deg) translate(${card.radiusX}px) rotate(${card.speed > 0 ? -360 : 360}deg) translateY(${Math.sin(idx) * 20}px);
                }
              }
            `}</style>
          </div>
        );
      })}

      {/* ── Orbiting Language Badges ── */}
      {BADGES.map((badge, idx) => {
        const radiusX = 180 + idx * 30;
        const radiusY = 100 + idx * 15;
        const speed = 12 + idx * 4;

        return (
          <div
            key={badge.name}
            style={{
              position: "absolute",
              zIndex: 5,
              animation: `float-badge-${idx} ${speed}s linear infinite`,
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: badge.color,
                color: badge.text,
                fontSize: "9px",
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
              }}
            >
              {badge.name}
            </div>

            <style>{`
              @keyframes float-badge-${idx} {
                0% {
                  transform: rotate(0deg) translate(${radiusX}px, ${radiusY}px) rotate(0deg);
                }
                100% {
                  transform: rotate(360deg) translate(${radiusX}px, ${radiusY}px) rotate(-360deg);
                }
              }
            `}</style>
          </div>
        );
      })}

      {/* Blinking cursor styles */}
      <style>{`
        .blinking-cursor {
          animation: blink-cursor-anim 1s step-end infinite;
          color: var(--accent);
          font-weight: bold;
        }
        @keyframes blink-cursor-anim {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
