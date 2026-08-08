"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, ShieldCheck, Users } from "lucide-react";
import { useEffect, useRef } from "react";

// ── Canvas: Matrix-style code rain (for COMMUNITY block) ────────────────────
function CodeRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const fontSize = 13;
    const cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&<>{}[]()".split("");

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const alpha = Math.random() > 0.7 ? 1 : 0.65;
        ctx.fillStyle = `rgba(249, 115, 22, ${alpha})`;
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const id = setInterval(draw, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.6,
        borderRadius: "16px",
      }}
    />
  );
}

// ── Canvas: Floating network nodes (for TECH block) ─────────────────────────
function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const NUM = 32;
    type Dot = { x: number; y: number; vx: number; vy: number; r: number };
    const dots: Dot[] = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 2 + Math.random() * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      dots.forEach((a, i) => {
        dots.forEach((b, j) => {
          if (j <= i) return;
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(251, 146, 60, ${0.25 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      // Draw dots
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(249, 115, 22, 0.55)";
        ctx.fill();

        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
      });
    };

    const id = setInterval(draw, 30);
    return () => clearInterval(id);
  }, []);

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
    color: "#f97316",
    bg: "video" as const,
    videoSrc: "/videos/cyberpunk.mp4",
    desc1:
      "We bridge the gap between academic education and industry requirements by equipping students with technical skills, aptitude training, and placement confidence.",
    desc2:
      "From structured DSA roadmaps to mock interview sessions — every resource is built to get you placed.",
    tags: ["DSA Roadmaps", "Aptitude Prep", "Mock Interviews", "Resume Reviews", "Referrals"],
  },
  {
    icon: Eye,
    title: "Our Vision",
    badge: "GOAL",
    color: "#fb923c",
    bg: "video" as const,
    videoSrc: "/videos/coding.mp4",
    desc1:
      "Becoming the most impactful student-run tech and placement ecosystem across colleges — where every student has a clear, actionable path to their dream company.",
    desc2:
      "Whether you have 2 months or 12, we give you a structured step-by-step roadmap that keeps you on track.",
    tags: ["Structured Learning", "Focused Practice", "Expert Feedback", "Dream Offer"],
  },
  {
    icon: Heart,
    title: "Peer Mentorship",
    badge: "COMMUNITY",
    color: "#f97316",
    bg: "rain" as const,
    videoSrc: "",
    desc1:
      "Placed seniors directly mentor juniors — sharing real interview experiences, company-specific roadmaps, and honest referral opportunities.",
    desc2:
      "Train with guidance from people who cracked Google, Amazon, Microsoft, Flipkart and more.",
    tags: ["Google", "Amazon", "Microsoft", "Flipkart", "Infosys", "TCS", "Wipro"],
  },
  {
    icon: ShieldCheck,
    title: "College CRM Integration",
    badge: "TECH",
    color: "#fb923c",
    bg: "network" as const,
    videoSrc: "",
    desc1:
      "We run entirely on College CRM — our proprietary task-tracking system ensuring total operational transparency and real-time team performance tracking.",
    desc2:
      "Paired with Vexta, our online evaluation engine — the full Nexus tech stack is built in-house, by students.",
    tags: ["Vexta Portal", "College CRM", "Live Reports", "Leaderboard"],
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
      whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        border: `1px solid ${p.color}25`,
        background: "var(--bg-card)",
        display: "flex",
        flexDirection: "column",
        minHeight: "440px",
      }}
    >
      {/* ── Animated Background Layer ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, borderRadius: "16px", overflow: "hidden" }}>
        {p.bg === "video" && (
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.5,
              filter: "saturate(0.75) brightness(0.75)",
            }}
          >
            <source src={p.videoSrc} type="video/mp4" />
          </video>
        )}
        {p.bg === "rain" && <CodeRainCanvas />}
        {p.bg === "network" && <NetworkCanvas />}

        {/* Bottom-to-top dark fade so text is always legible */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(8,8,8,0.05) 0%, rgba(8,8,8,0.45) 50%, rgba(8,8,8,0.88) 100%)",
          }}
        />

        {/* Top-left corner accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            left: "-50px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${p.color}20 0%, transparent 65%)`,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Card Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "30px 26px 26px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: `${p.color}15`,
              border: `1px solid ${p.color}38`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon style={{ width: "14px", height: "14px", color: p.color }} />
          </div>
          <span
            style={{
              fontSize: "9px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              color: p.color,
            }}
          >
            {p.badge}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(15px, 1.6vw, 19px)",
            fontWeight: 800,
            color: "var(--text-primary)",
            letterSpacing: "0.01em",
            textTransform: "uppercase" as const,
            marginBottom: "12px",
            lineHeight: 1.2,
          }}
        >
          {p.title}
        </h3>

        {/* Thin orange divider */}
        <div
          style={{
            width: "36px",
            height: "2px",
            borderRadius: "2px",
            background: `linear-gradient(to right, ${p.color}, transparent)`,
            marginBottom: "14px",
          }}
        />

        {/* Desc 1 */}
        <p style={{ fontSize: "13px", lineHeight: 1.72, color: "var(--text-secondary)", marginBottom: "10px" }}>
          {p.desc1}
        </p>

        {/* Desc 2 */}
        <p style={{ fontSize: "12.5px", lineHeight: 1.65, color: `${p.color}aa`, fontWeight: 500, marginBottom: "20px" }}>
          {p.desc2}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "6px", marginTop: "auto" }}>
          {p.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "10.5px",
                fontWeight: 600,
                border: `1px solid ${p.color}28`,
                color: `${p.color}bb`,
                background: `${p.color}08`,
                letterSpacing: "0.02em",
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
      {/* Ambient background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "5%",
          left: "-8%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 65%)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1 }}>
        {/* Eyebrow */}
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

        {/* Heading */}
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
            We&apos;re a student-driven community established in{" "}
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>2022</span> to bridge
            the gap between college academics and real-world tech industry demands.
          </p>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(14px, 1.3vw, 15.5px)",
              lineHeight: 1.75,
            }}
          >
            From hands-on coding bootcamps and aptitude preparation to internal task management
            systems and placed senior mentorship —{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>
              Nexus empowers every student
            </span>{" "}
            to crack their dream role.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="section-divider" style={{ marginBottom: "48px" }} />

        {/* 2×2 Pillar Grid */}
        <div
          className="pillars-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          {pillars.map((p, i) => (
            <PillarCard key={p.badge} p={p} i={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ marginTop: "44px" }}
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
