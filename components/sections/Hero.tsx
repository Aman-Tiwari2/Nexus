"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import CodeCube from "./CodeCube";

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 90; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.1 + 0.2;
        const opacity = Math.random() * 0.35 + 0.04;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 204, ${opacity})`;
        ctx.fill();
      }
    };

    render();
    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

const rotatingWords = ["Build Skills.", "Crack Placements.", "Shape Your Future."];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = rotatingWords[wordIdx];
    let timer: NodeJS.Timeout;
    if (!deleting) {
      if (charIdx < word.length) {
        timer = setTimeout(() => setCharIdx((c) => c + 1), 68);
      } else {
        timer = setTimeout(() => setDeleting(true), 2400);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => setCharIdx((c) => c - 1), 32);
      } else {
        timer = setTimeout(() => {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % rotatingWords.length);
        }, 0);
      }
    }
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <StarField />

      {/* Subtle ambient glows (Multi-Color) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "5%",
          right: "-5%",
          width: "650px",
          height: "650px",
          background: "radial-gradient(circle, rgba(0,229,204,0.06) 0%, transparent 65%)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "15%",
          left: "-10%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "40%",
          left: "30%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(236,72,153,0.04) 0%, transparent 65%)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <div
        className="section-container relative flex-1 flex flex-col justify-center"
        style={{ zIndex: 2, paddingTop: "clamp(96px, 12vw, 136px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
      >
        <div className="grid lg:grid-cols-[1fr_520px] gap-8 lg:gap-12 items-center w-full">

          {/* ── Left: Content ── */}
          <div className="flex flex-col max-w-xl">
            {/* Eyebrow label */}
            <div
              className="section-tag"
              style={{ marginBottom: "28px" }}
            >
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                background: "rgba(0,229,204,0.07)",
                border: "1px solid rgba(0,229,204,0.15)",
                borderRadius: "999px",
              }}>
                ✦ Nexus Community · Est. 2022
              </span>
            </div>

            {/* Main heading — crisp typewriter with fixed container height */}
            <div style={{ height: "clamp(60px, 8vw, 110px)", display: "flex", alignItems: "center", marginBottom: "24px" }}>
              <h1
                className="heading-display"
                style={{
                  fontSize: "clamp(32px, 4.5vw, 68px)",
                  lineHeight: 1.1,
                  color: "#ffffff",
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {rotatingWords[wordIdx].slice(0, charIdx)}
                <span
                  style={{
                    display: "inline-block",
                    width: "4px",
                    height: "0.82em",
                    background: "var(--accent)",
                    verticalAlign: "middle",
                    marginLeft: "6px",
                    borderRadius: "2px",
                    animation: "blink 1s step-end infinite",
                    WebkitTextFillColor: "initial",
                  }}
                />
              </h1>
            </div>

            {/* Description */}
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "clamp(14px, 1.5vw, 16px)",
                lineHeight: 1.75,
                maxWidth: "520px",
                marginBottom: "36px",
              }}
            >
              A student-driven community where students learn, collaborate, build skills, and explore opportunities beyond the classroom.
            </p>

            {/* CTA row */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
              <a
                href="https://vexta.collegecrm.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Join Community
                <ArrowRight style={{ width: "15px", height: "15px" }} />
              </a>
              <a
                href="#events"
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Events
              </a>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                gap: "36px",
                marginTop: "48px",
                paddingTop: "24px",
                borderTop: "1px solid var(--border)",
              }}
            >
              {[
                { value: "Growing", label: "Community", color: "#818cf8" },
                { value: "Student-Led", label: "Initiatives", color: "#38bdf8" },
                { value: "Since 2022", label: "Established", color: "#2dd4bf" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(18px, 2.2vw, 24px)",
                      color: s.color,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      letterSpacing: "0.06em",
                      marginTop: "4px",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Code Cube visual ── */}
          <div className="hidden lg:flex items-center justify-center flex-shrink-0">
            <CodeCube />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="section-container relative flex justify-between items-center"
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "16px",
          paddingBottom: "16px",
          zIndex: 2,
        }}
      >
        <span style={{ color: "var(--text-muted)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em" }}>
          
        </span>
        <span style={{ color: "var(--text-faint)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          
        </span>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes sparkling-glow {
          0%, 100% { opacity: 0.6; filter: blur(8px); }
          50% { opacity: 0.9; filter: blur(14px); }
        }
        @keyframes rotate-glow {
          0% { background-position: 0% 50%; transform: rotate(0deg); }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; transform: rotate(360deg); }
        }
        @keyframes sparkle-star {
          0%, 100% { transform: scale(0.2) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
