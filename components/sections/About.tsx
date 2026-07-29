"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Users, Zap, BookOpen, ShieldCheck, Code, Award, CheckCircle2 } from "lucide-react";

const coreValues = [
  { icon: Target, num: "01", label: "Excellence", desc: "We push boundaries and strive for the best in everything we do." },
  { icon: Users, num: "02", label: "Community", desc: "Together we grow stronger. Every student matters here." },
  { icon: Zap, num: "03", label: "Innovation", desc: "Creative solutions and fresh approaches to learning." },
  { icon: BookOpen, num: "04", label: "Learning", desc: "Continuous growth through practice, feedback and mentorship." },
];

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "Bridging academic education and industry requirements by equipping students with technical skills, aptitude, and placement confidence.",
    badge: "Purpose",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "Becoming the most impactful student-run placement and tech ecosystem across colleges nationwide.",
    badge: "Goal",
  },
  {
    icon: Heart,
    title: "Peer Mentorship",
    desc: "Placed seniors mentor juniors, sharing real interview experiences, roadmaps, and direct referral opportunities.",
    badge: "Community",
  },
  {
    icon: ShieldCheck,
    title: "College CRM Integration",
    desc: "We run on College CRM — our proprietary task-tracking system ensuring total operational transparency and team performance tracking.",
    badge: "Tech",
  },
];

const ecosystemBadges = [
  { icon: Code, label: "Placement Focused", count: "100% Practical" },
  { icon: Users, label: "Senior Mentors", count: "50+ Placed Seniors" },
  { icon: Award, label: "Tech Contests", count: "Weekly Challenges" },
  { icon: CheckCircle2, label: "Internal Tools", count: "Vexta & CRM Built" },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export default function About() {
  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%",
          left: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0,229,204,0.035) 0%, transparent 65%)",
          filter: "blur(90px)",
          zIndex: 0,
        }}
      />

      <div className="section-container relative" style={{ zIndex: 1 }}>
        
        {/* ── Top Eyebrow Tag ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="section-tag"
          style={{ marginBottom: "16px" }}
        >
          About Nexus
        </motion.div>

        {/* ── Main 2-Column Split Layout (Perfectly Balanced) ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "48px",
            marginBottom: "64px",
            alignItems: "stretch",
          }}
          className="about-main-grid"
        >
          {/* ── Left Column: Heading + Description + Feature Grid ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            <div>
              <h2
                className="heading-display"
                style={{
                  fontSize: "clamp(42px, 5.5vw, 76px)",
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
                  fontSize: "clamp(14.5px, 1.4vw, 16px)",
                  lineHeight: 1.8,
                  marginBottom: "16px",
                  maxWidth: "540px",
                }}
              >
                We&apos;re a student-driven community established in 2022 to bridge the gap
                between college academics and real-world tech industry demands.
              </p>

              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "clamp(14px, 1.3vw, 15.5px)",
                  lineHeight: 1.75,
                  marginBottom: "32px",
                  maxWidth: "540px",
                }}
              >
                From hands-on coding bootcamps and aptitude preparation to internal task management systems and placed senior mentorship — Nexus empowers every student to crack their dream role.
              </p>
            </div>

            {/* Dynamic Ecosystem Badges (Fills empty vertical space!) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px",
                marginTop: "12px",
              }}
            >
              {ecosystemBadges.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, borderColor: "rgba(0,229,204,0.3)" }}
                    style={{
                      padding: "14px 16px",
                      borderRadius: "12px",
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.02)",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "8px",
                        background: "rgba(0,229,204,0.08)",
                        border: "1px solid rgba(0,229,204,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon style={{ width: "16px", height: "16px", color: "var(--accent)" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
                        {b.label}
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                        {b.count}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ── Right Column: 2x2 Pillar Cards Grid ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "14px",
              alignContent: "stretch",
            }}
          >
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  whileHover={{
                    y: -4,
                    borderColor: "rgba(0,229,204,0.3)",
                    boxShadow: "0 12px 30px rgba(0,229,204,0.08)",
                  }}
                  style={{
                    padding: "24px",
                    borderRadius: "14px",
                    border: "1px solid var(--border)",
                    background: "var(--bg-card)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.22s ease",
                  }}
                >
                  <div>
                    {/* Header: icon + badge */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "10px",
                          background: "rgba(0,229,204,0.08)",
                          border: "1px solid rgba(0,229,204,0.18)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon style={{ width: "18px", height: "18px", color: "var(--accent)" }} />
                      </div>

                      <span
                        style={{
                          fontSize: "9.5px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          padding: "4px 10px",
                          borderRadius: "999px",
                          background: "rgba(255,255,255,0.04)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {p.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: "10px",
                        lineHeight: 1.3,
                      }}
                    >
                      {p.title}
                    </h3>

                    {/* Desc */}
                    <p style={{ fontSize: "13px", lineHeight: 1.65, color: "var(--text-secondary)" }}>
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Section Divider ── */}
        <div className="section-divider" style={{ marginBottom: "64px" }} />

        {/* ── Core Values Section ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="section-tag"
            style={{ marginBottom: "32px" }}
          >
            Core Values
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "14px",
            }}
          >
            {coreValues.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.label}
                  variants={fadeUp}
                  whileHover={{
                    y: -5,
                    borderColor: "rgba(0, 229, 204, 0.35)",
                    boxShadow: "0 12px 32px -8px rgba(0, 229, 204, 0.15)",
                  }}
                  style={{
                    padding: "24px 20px",
                    borderRadius: "14px",
                    border: "1px solid var(--border)",
                    background: "var(--bg-card)",
                    transition: "all 0.25s ease",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(0,229,204,0.07)",
                      border: "1px solid rgba(0,229,204,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Icon style={{ width: "16px", height: "16px", color: "var(--accent)" }} />
                  </div>

                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--text-primary)",
                      marginBottom: "8px",
                    }}
                  >
                    {v.num} — {v.label}
                  </div>

                  <p style={{ fontSize: "12.5px", lineHeight: 1.6, color: "var(--text-secondary)" }}>
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{ marginTop: "48px" }}
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
        @media (min-width: 1024px) {
          .about-main-grid {
            grid-template-columns: 1.1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
