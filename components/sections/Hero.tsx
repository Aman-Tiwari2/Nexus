"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

// Subtle star-dot background (white dots, not neon)
function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dots: Array<{ x: number; y: number; size: number; opacity: number }> = [];
    for (let i = 0; i < 120; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.4 + 0.05,
      });
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach((d) => {
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 204, ${d.opacity})`;
      ctx.fill();
    });

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 204, ${d.opacity})`;
        ctx.fill();
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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

  // Typewriter effect
  useEffect(() => {
    const word = rotatingWords[wordIdx];
    let timer: NodeJS.Timeout;
    if (!deleting) {
      if (charIdx < word.length) {
        timer = setTimeout(() => setCharIdx((c) => c + 1), 70);
      } else {
        timer = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => setCharIdx((c) => c - 1), 35);
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
      style={{ background: "#0d0d0d" }}
    >
      {/* Subtle dot field */}
      <StarField />

      {/* Very subtle gradient glow — not neon, just warmth */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          right: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0,229,204,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      {/* Main content — takes full height */}
      <div
        className="section-container flex-1 flex flex-col justify-center relative"
        style={{ zIndex: 2, paddingTop: "100px", paddingBottom: "40px" }}
      >
        <div className="grid lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Column (Content) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Community label */}
            <div className="section-tag mb-6 self-start">
              Nexus Community · Est. 2022
            </div>

            {/* Massive headline */}
            <h1
              className="font-black text-white leading-[0.92] tracking-tight mb-8"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(46px, 8vw, 110px)",
                letterSpacing: "-0.03em",
              }}
            >
              {rotatingWords[wordIdx].slice(0, charIdx)}
              <span
                className="inline-block w-[4px] align-middle ml-2"
                style={{
                  height: "0.85em",
                  background: "#00e5cc",
                  animation: "blink 1s step-end infinite",
                  borderRadius: "2px",
                }}
              />
            </h1>

            {/* Description */}
            <p
              className="text-base leading-relaxed mb-8 max-w-xl"
              style={{ color: "#888888", fontSize: "15px" }}
            >
              We are a student-driven community helping college students master
              coding, aptitude, hackathons, and real-world skills — so you can
              crack your dream placement.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://vexta.collegecrm.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: "14px", padding: "12px 28px" }}
              >
                Join Community
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#events"
                className="btn-secondary"
                style={{ fontSize: "14px", padding: "11px 28px" }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Events
              </a>
            </div>
          </div>

          {/* Right Column (Community Logo with move animation behind it) */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-12 lg:py-0">
            {/* Moving background glow/shape */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: "min(320px, 70vw)",
                height: "min(320px, 70vw)",
                background: "radial-gradient(circle, rgba(0, 229, 204, 0.15) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 70%)",
                filter: "blur(35px)",
                animation: "move-behind 8s ease-in-out infinite",
                zIndex: 1,
              }}
            />

            {/* Slow floating logo container */}
            <div
              className="relative flex items-center justify-center transition-all duration-300"
              style={{
                width: "clamp(200px, 22vw, 270px)",
                height: "clamp(200px, 22vw, 270px)",
                borderRadius: "50%",
                background: "#ffffff",
                padding: "20px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 80px rgba(0,229,204,0.15)",
                border: "2px solid rgba(255,255,255,0.05)",
                zIndex: 2,
                animation: "float-slow 6s ease-in-out infinite",
              }}
            >
              {/* Glowing / Sparkly Ring */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  top: "-6px",
                  left: "-6px",
                  right: "-6px",
                  bottom: "-6px",
                  background: "linear-gradient(45deg, #00e5cc, #8b5cf6, #00e5cc, #8b5cf6)",
                  backgroundSize: "300% 300%",
                  filter: "blur(8px)",
                  opacity: 0.85,
                  zIndex: -1,
                  animation: "sparkling-glow 3s ease infinite, rotate-glow 10s linear infinite"
                }}
              />

              {/* Sparkle 1 */}
              <div
                className="absolute text-[#00e5cc] pointer-events-none select-none"
                style={{
                  top: "5%",
                  right: "-5%",
                  fontSize: "24px",
                  filter: "drop-shadow(0 0 5px #00e5cc)",
                  animation: "sparkle-star 4s ease-in-out infinite",
                  animationDelay: "0s",
                }}
              >
                ✦
              </div>
              {/* Sparkle 2 */}
              <div
                className="absolute text-[#8b5cf6] pointer-events-none select-none"
                style={{
                  bottom: "5%",
                  left: "-10%",
                  fontSize: "20px",
                  filter: "drop-shadow(0 0 5px #8b5cf6)",
                  animation: "sparkle-star 5s ease-in-out infinite",
                  animationDelay: "1.5s",
                }}
              >
                ✦
              </div>
              {/* Sparkle 3 */}
              <div
                className="absolute text-[#00e5cc] pointer-events-none select-none"
                style={{
                  top: "65%",
                  right: "-10%",
                  fontSize: "18px",
                  filter: "drop-shadow(0 0 5px #00e5cc)",
                  animation: "sparkle-star 6s ease-in-out infinite",
                  animationDelay: "3s",
                }}
              >
                ✦
              </div>
              {/* Sparkle 4 */}
              <div
                className="absolute text-white pointer-events-none select-none"
                style={{
                  top: "-10%",
                  left: "20%",
                  fontSize: "22px",
                  filter: "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
                  animation: "sparkle-star 3s ease-in-out infinite",
                  animationDelay: "0.8s",
                }}
              >
                ✦
              </div>

              <img
                src="/images/logo.png"
                alt="Nexus Community Logo"
                className="w-[85%] h-[85%] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar of hero — like reference site (©2025 | /BUILDING SINCE 2022) */}
      <div
        className="section-container w-full relative flex justify-between items-center py-5"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          zIndex: 2,
        }}
      >
        <span style={{ color: "#808080", fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em" }}>
          ©{new Date().getFullYear()}
        </span>
        <span style={{ color: "#808080", fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          / Building Since 2022
        </span>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes move-behind {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(25px, -15px) scale(1.08); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes sparkling-glow {
          0%, 100% { opacity: 0.7; filter: blur(6px); }
          50% { opacity: 1; filter: blur(12px); }
        }
        @keyframes rotate-glow {
          0% { background-position: 0% 50%; transform: rotate(0deg); }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; transform: rotate(360deg); }
        }
        @keyframes sparkle-star {
          0%, 100% { transform: scale(0.3) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
