"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, ShieldCheck, Users, Sparkles, Compass, Lightbulb, BookOpen } from "lucide-react";
import { useEffect, useRef } from "react";

// Helper to convert hex colors to RGBA
function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ── Canvas: Matrix-style code rain ─────────────────────────────────────────
function CodeRainCanvas({ color = "#38bdf8" }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const fontSize = 12;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&<>{}[]()".split("");

    const draw = () => {
      ctx.fillStyle = "rgba(12, 12, 14, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const alpha = Math.random() > 0.7 ? 0.45 : 0.25;
        ctx.fillStyle = hexToRgba(color, alpha);
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const id = setInterval(draw, 50);
    return () => clearInterval(id);
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.7,
        borderRadius: "16px",
        pointerEvents: "none",
      }}
    />
  );
}

// ── Canvas: Floating network nodes ──────────────────────────────────────────
function NetworkCanvas({ color = "#60a5fa" }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const NUM = 28;
    type Dot = { x: number; y: number; vx: number; vy: number; r: number };
    const dots: Dot[] = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 2 + Math.random() * 1.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((a, i) => {
        dots.forEach((b, j) => {
          if (j <= i) return;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = hexToRgba(color, 0.3 * (1 - dist / 110));
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(color, 0.6);
        ctx.fill();

        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
      });
    };

    const id = setInterval(draw, 30);
    return () => clearInterval(id);
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.75,
        borderRadius: "16px",
        pointerEvents: "none",
      }}
    />
  );
}

// ── Pillar definitions ───────────────────────────────────────────────────────
const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    badge: "PURPOSE",
    color: "#38bdf8",
    bg: "rain" as const,
    desc1:
      "To help students develop practical skills, confidence, and awareness of opportunities through learning, mentorship, and community activities.",
    desc2:
      "Through workshops, hands-on practice, and mentorship — every resource is built to support your growth.",
    tags: ["Practical Skills", "Mentorship", "Community Activities", "Learning"],
  },
  {
    icon: Eye,
    title: "Our Vision",
    badge: "GOAL",
    color: "#818cf8",
    bg: "network" as const,
    desc1:
      "To build a strong student community where learners can connect, collaborate, and grow through shared experiences and opportunities.",
    desc2:
      "Creating a structured path where every student gets guidance and support.",
    tags: ["Connect & Collaborate", "Shared Experiences", "Growth", "Opportunities"],
  },
  {
    icon: Heart,
    title: "Peer Mentorship",
    badge: "COMMUNITY",
    color: "#2dd4bf",
    bg: "rain" as const,
    desc1:
      "Seniors share their experiences, preparation strategies, and guidance to help juniors navigate their academic and career journey.",
    desc2:
      "Learn directly from peers and seniors who have walked the path before.",
    tags: ["Senior Guidance", "Prep Strategies", "Academic Support", "Peer Learning"],
  },
  {
    icon: ShieldCheck,
    title: "College CRM Integration",
    badge: "TECH",
    color: "#60a5fa",
    bg: "network" as const,
    desc1:
      "We run entirely on College CRM — our proprietary task-tracking system ensuring total operational transparency and real-time team performance tracking.",
    desc2:
      "Paired with Vexta, our online evaluation engine — the full Nexus tech stack is built in-house, by students.",
    tags: ["Vexta Portal", "College CRM", "Live Reports", "Leaderboard"],
  },
];

const coreValues = [
  {
    title: "Excellence",
    icon: Sparkles,
    badge: "CORE VALUE",
    desc: "We encourage students to keep improving their skills and the quality of their work.",
    color: "#38bdf8",
  },
  {
    title: "Community",
    icon: Users,
    badge: "CORE VALUE",
    desc: "We learn from each other, support each other, and grow together.",
    color: "#60a5fa",
  },
  {
    title: "Innovation",
    icon: Lightbulb,
    badge: "CORE VALUE",
    desc: "We encourage students to experiment, build, and explore new ideas.",
    color: "#a78bfa",
  },
  {
    title: "Learning",
    icon: BookOpen,
    badge: "CORE VALUE",
    desc: "We believe learning becomes stronger when it is shared through practice, feedback, and collaboration.",
    color: "#34d399",
  },
];

const fadeUp = {
  hidden: { y: 32, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

// ── Individual Pillar Card ───────────────────────────────────────────────────
function PillarCard({ p, i }: { p: typeof pillars[0]; i: number }) {
  const Icon = p.icon;

  return (
    <motion.div
      custom={i}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4, borderColor: `${p.color}60`, transition: { duration: 0.2 } }}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        border: `1px solid ${p.color}35`,
        background: "rgba(16, 18, 24, 0.92)",
        backdropFilter: "blur(12px)",
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${p.color}20`,
        display: "flex",
        flexDirection: "column",
        minHeight: "260px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${p.color}, transparent 80%)`,
        }}
      />

      <div style={{ position: "absolute", inset: 0, zIndex: 0, borderRadius: "16px", overflow: "hidden" }}>
        {p.bg === "rain" && <CodeRainCanvas color={p.color} />}
        {p.bg === "network" && <NetworkCanvas color={p.color} />}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(12,14,20,0.5) 0%, rgba(12,14,20,0.85) 60%, rgba(12,14,20,0.98) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "-40px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${hexToRgba(p.color, 0.15)} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "24px 22px 22px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: `${p.color}18`,
              border: `1px solid ${p.color}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon style={{ width: "15px", height: "15px", color: p.color }} />
          </div>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: p.color,
            }}
          >
            {p.badge}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(16px, 1.6vw, 20px)",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "0.01em",
            textTransform: "uppercase" as const,
            marginBottom: "12px",
            lineHeight: 1.2,
          }}
        >
          {p.title}
        </h3>

        <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "#d1d5db", marginBottom: "14px" }}>
          {p.desc1}
        </p>

        <div
          style={{
            fontSize: "12.5px",
            lineHeight: 1.6,
            color: "#f8fafc",
            fontWeight: 500,
            padding: "10px 14px",
            borderRadius: "0 8px 8px 0",
            background: "rgba(255, 255, 255, 0.035)",
            borderLeft: `3px solid ${p.color}`,
            marginBottom: "20px",
          }}
        >
          {p.desc2}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px", marginTop: "auto" }}>
          {p.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "5px 11px",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 600,
                border: `1px solid ${p.color}45`,
                color: "#ffffff",
                background: `${p.color}18`,
                letterSpacing: "0.02em",
                backdropFilter: "blur(4px)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          top: "5%",
          left: "-8%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 65%)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="section-tag"
          style={{ marginBottom: "14px" }}
        >
          About Nexus
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: "680px", marginBottom: "52px" }}
        >
          <h2
            className="heading-display"
            style={{
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: 0.95,
              color: "var(--text-primary)",
              marginBottom: "24px",
            }}
          >
            Who We Are<span style={{ color: "var(--accent)" }}>.</span>
          </h2>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(14.5px, 1.4vw, 16.5px)",
              lineHeight: 1.8,
              marginBottom: "14px",
            }}
          >
            Nexus Community is a student-led community focused on helping students learn, collaborate, and explore opportunities beyond the classroom.
          </p>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(14px, 1.3vw, 15.5px)",
              lineHeight: 1.75,
            }}
          >
            Through workshops, peer learning, technical activities, mentorship, and community initiatives, Nexus provides students with opportunities to learn and grow together.
          </p>
        </motion.div>

        <div className="section-divider" style={{ marginBottom: "48px" }} />

        {/* 2×2 Pillar Grid */}
        <div
          className="pillars-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            marginBottom: "56px",
          }}
        >
          {pillars.map((p, i) => (
            <PillarCard key={p.badge + p.title} p={p} i={i} />
          ))}
        </div>

        {/* ── Core Values Grid (Excellence, Community, Innovation, Learning) ── */}
        <div style={{ marginTop: "32px", marginBottom: "48px" }}>
          <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "16px" }}>
            Our Core Values
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {coreValues.map((val, idx) => {
              const VIcon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  style={{
                    padding: "22px",
                    borderRadius: "16px",
                    border: `1px solid ${val.color}30`,
                    background: "rgba(15, 23, 42, 0.6)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: `${val.color}18`,
                        border: `1px solid ${val.color}35`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: val.color,
                      }}
                    >
                      <VIcon style={{ width: "16px", height: "16px" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: val.color }}>
                        {val.badge}
                      </div>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-display)" }}>
                        {val.title}
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "var(--text-secondary)" }}>
                    {val.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ marginTop: "32px" }}
        >
          <a
            href="https://vexta.collegecrm.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ gap: "10px" }}
          >
            <Users style={{ width: "15px", height: "15px" }} />
            Join Our Community
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
