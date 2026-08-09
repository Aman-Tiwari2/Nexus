"use client";

import { X, CheckCircle2, ArrowRight, Sparkles, Zap, Users, Rocket, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const withoutNexusList = [
  "No clear roadmap or structure for placement preparation",
  "Confused about which tech stack or domain to focus on",
  "No access to real-time coding or aptitude evaluation engines",
  "Isolated learning with zero peer support or code reviews",
  "Miss important off-campus company updates & deadlines",
  "Lack of guidance for technical interviews & HR rounds",
  "No ATS resume optimization or portfolio feedback",
  "Struggling alone without senior referral linkages",
];

const withNexusList = [
  {
    title: "Career & Placement Ecosystem",
    desc: "Guided roadmaps, real-time preparation resources, and peer learning pools.",
    badge: "100% Guided",
  },
  {
    title: "Peer Mentorship Network",
    desc: "Learn directly from seniors who have walked the path with proven strategies.",
    badge: "Senior Led",
  },
  {
    title: "Vexta Evaluation Engine",
    desc: "Test your skills in real-time Aptitude, English, and Coding rounds.",
    badge: "Live Portal",
  },
  {
    title: "Hands-on Bootcamps & Challenges",
    desc: "Participate in domain workshops, hackathons, and win real rewards.",
    badge: "Hands-on",
  },
  {
    title: "College CRM Operations",
    desc: "Total operational transparency with live task-tracking & performance analytics.",
    badge: "Transparent",
  },
];

const keyPillars = [
  {
    icon: Zap,
    title: "10x Skill Growth",
    subtitle: "Accelerated Learning",
    desc: "Peer coding loops & live bootcamp sessions.",
    color: "#38bdf8",
  },
  {
    icon: Users,
    title: "Active Peer Network",
    subtitle: "Strong Community",
    desc: "Collaborate with 20+ active leads & student devs.",
    color: "#60a5fa",
  },
  {
    icon: Rocket,
    title: "Proprietary Vexta Engine",
    subtitle: "Live Scorecards",
    desc: "Compete on real-time coding & aptitude leaderboards.",
    color: "#a78bfa",
  },
  {
    icon: ShieldCheck,
    title: "Senior Mentorship & Prep",
    subtitle: "Career Guidance",
    desc: "Direct guidance from placed seniors for mock interviews & resume reviews.",
    color: "#34d399",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function WhyJoin() {
  return (
    <section
      id="why-join"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Ambient background glows */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(239,68,68,0.04) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "650px",
          height: "650px",
          background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1 }}>
        {/* Section Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="section-tag"
          style={{ marginBottom: "14px" }}
        >
          <Sparkles style={{ width: "13px", height: "13px", display: "inline", marginRight: "6px" }} />
          Why Join Nexus
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="heading-display"
          style={{
            fontSize: "clamp(38px, 5.5vw, 68px)",
            lineHeight: 1.05,
            marginBottom: "48px",
          }}
        >
          The Nexus<br />
          <span
            style={{
              background: "linear-gradient(135deg, #38bdf8 0%, #a78bfa 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Difference
          </span>
        </motion.h2>

        {/* ── High-Impact 2-Column Comparison Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "28px",
            alignItems: "stretch",
            marginBottom: "56px",
          }}
        >
          {/* ── Card 1: Without Nexus (Red Dark Theme) ── */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, borderColor: "rgba(239, 68, 68, 0.35)", boxShadow: "0 20px 50px rgba(239, 68, 68, 0.08)" }}
            style={{
              padding: "36px 30px",
              borderRadius: "24px",
              border: "1px solid rgba(239, 68, 68, 0.18)",
              background: "linear-gradient(180deg, rgba(239, 68, 68, 0.04) 0%, rgba(15, 23, 42, 0.92) 100%)",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: "rgba(239, 68, 68, 0.12)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <X style={{ width: "18px", height: "18px", color: "#ef4444" }} />
                  </div>
                  <div>
                    <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#ef4444" }}>
                      TRADITIONAL PATH
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "20px",
                        fontWeight: 800,
                        color: "#ffffff",
                        margin: 0,
                      }}
                    >
                      Without Nexus
                    </h3>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {withoutNexusList.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "rgba(239,68,68,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      <X style={{ width: "12px", height: "12px", color: "#f87171" }} />
                    </div>
                    <span style={{ fontSize: "14px", lineHeight: 1.6, color: "#94a3b8" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Card 2: With Nexus (Glowing Cyan-Blue Futuristic Theme) ── */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, borderColor: "rgba(56, 189, 248, 0.5)", boxShadow: "0 25px 60px rgba(56, 189, 248, 0.16)" }}
            style={{
              padding: "36px 30px",
              borderRadius: "24px",
              border: "1.5px solid rgba(56, 189, 248, 0.35)",
              background: "linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)",
              backdropFilter: "blur(14px)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.3s ease",
              boxShadow: "0 16px 40px rgba(56, 189, 248, 0.08)",
            }}
          >
            {/* Top Accent Gradient Line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, #38bdf8 0%, #a78bfa 100%)",
              }}
            />

            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: "rgba(56, 189, 248, 0.18)",
                      border: "1px solid rgba(56, 189, 248, 0.45)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle2 style={{ width: "20px", height: "20px", color: "#38bdf8" }} />
                  </div>
                  <div>
                    <span style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#38bdf8" }}>
                      THE NEXUS ECOSYSTEM
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "20px",
                        fontWeight: 800,
                        color: "#ffffff",
                        margin: 0,
                      }}
                    >
                      With Nexus
                    </h3>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 800,
                    padding: "4px 12px",
                    borderRadius: "999px",
                    background: "rgba(56, 189, 248, 0.15)",
                    color: "#38bdf8",
                    border: "1px solid rgba(56, 189, 248, 0.35)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  ⚡ Recommended
                </span>
              </div>

              {/* Enhanced Items List with Badges & Descriptions */}
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {withNexusList.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "rgba(56, 189, 248, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      <CheckCircle2 style={{ width: "14px", height: "14px", color: "#38bdf8" }} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "14.5px", fontWeight: 700, color: "#ffffff" }}>
                          {item.title}
                        </span>
                        <span
                          style={{
                            fontSize: "9.5px",
                            fontWeight: 800,
                            padding: "2px 8px",
                            borderRadius: "4px",
                            background: "rgba(96, 165, 250, 0.12)",
                            color: "#60a5fa",
                            border: "1px solid rgba(96, 165, 250, 0.25)",
                            textTransform: "uppercase",
                          }}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <p style={{ fontSize: "13px", lineHeight: 1.5, color: "#cbd5e1", marginTop: "3px", margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── 4-Card Pillar Highlights Row ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
            marginBottom: "48px",
          }}
        >
          {keyPillars.map((p, idx) => {
            const PIcon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -3, borderColor: `${p.color}50` }}
                style={{
                  padding: "22px",
                  borderRadius: "16px",
                  background: "rgba(15, 23, 42, 0.7)",
                  border: `1px solid ${p.color}25`,
                  backdropFilter: "blur(10px)",
                  transition: "all 0.25s ease",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: `${p.color}15`,
                    border: `1px solid ${p.color}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: p.color,
                    marginBottom: "14px",
                  }}
                >
                  <PIcon style={{ width: "18px", height: "18px" }} />
                </div>
                <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: p.color }}>
                  {p.subtitle}
                </div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff", fontFamily: "var(--font-display)", marginTop: "2px", marginBottom: "6px" }}>
                  {p.title}
                </div>
                <p style={{ fontSize: "12.5px", lineHeight: 1.5, color: "var(--text-secondary)", margin: 0 }}>
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <a
            href="https://vexta.collegecrm.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ gap: "10px" }}
          >
            Join Nexus Today — It&apos;s Free
            <ArrowRight style={{ width: "15px", height: "15px" }} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
