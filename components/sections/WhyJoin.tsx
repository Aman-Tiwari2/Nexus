"use client";

import { X, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const withoutCommunity = [
  "No clear roadmap for placement prep",
  "Confused about which tech stack to learn",
  "No access to mock tests or aptitude practice",
  "Isolated learning with zero peer support",
  "Miss important off-campus company deadlines",
  "Lack of guidance for technical HR rounds",
  "No resume optimization or ATS review",
  "Struggling alone without senior referral leads",
];

const withCommunity = [
  "Structured year-wise placement roadmap",
  "Expert guidance on in-demand technical skills",
  "Weekly coding contests & aptitude practice",
  "Supportive community of 1,500+ active peers",
  "Timely event alerts & placement drive notifications",
  "Real mock interviews & 1-on-1 resume reviews",
  "Hands-on hackathons to build real projects",
  "Direct connections & referrals from placed seniors",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
    },
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
          top: "20%",
          left: "-10%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(255,80,80,0.035) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(0,229,204,0.04) 0%, transparent 70%)",
          filter: "blur(90px)",
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
          style={{ marginBottom: "16px" }}
        >
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
            fontSize: "clamp(36px, 5.5vw, 68px)",
            marginBottom: "48px",
          }}
        >
          The Nexus<br />
          <span style={{ color: "var(--accent)" }}>Difference</span>
        </motion.h2>

        {/* Comparison Cards Grid (Perfect Equal-Height Grid) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
            gap: "24px",
            alignItems: "stretch",
            marginBottom: "48px",
          }}
        >
          {/* ── Card 1: Without Nexus ── */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, borderColor: "rgba(255,80,80,0.25)", boxShadow: "0 16px 40px rgba(255,80,80,0.08)" }}
            style={{
              padding: "32px 28px",
              borderRadius: "18px",
              border: "1px solid rgba(255,80,80,0.12)",
              background: "linear-gradient(180deg, rgba(255,80,80,0.02) 0%, rgba(14,14,14,0.95) 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.25s ease",
            }}
          >
            <div>
              {/* Header Badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(255,80,80,0.1)",
                    border: "1px solid rgba(255,80,80,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <X style={{ width: "16px", height: "16px", color: "#ff5050" }} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#ff5050",
                  }}
                >
                  Without Nexus
                </h3>
              </div>

              {/* Items List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {withoutCommunity.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <X style={{ width: "15px", height: "15px", color: "#ff6b6b", flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ fontSize: "13.5px", lineHeight: 1.6, color: "var(--text-secondary)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Card 2: With Nexus ── */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, borderColor: "rgba(0,229,204,0.4)", boxShadow: "0 16px 40px rgba(0,229,204,0.12)" }}
            style={{
              padding: "32px 28px",
              borderRadius: "18px",
              border: "1px solid rgba(0,229,204,0.2)",
              background: "linear-gradient(180deg, rgba(0,229,204,0.03) 0%, rgba(14,14,14,0.95) 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "all 0.25s ease",
            }}
          >
            <div>
              {/* Header Badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(0,229,204,0.12)",
                    border: "1px solid rgba(0,229,204,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Check style={{ width: "16px", height: "16px", color: "var(--accent)" }} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                  }}
                >
                  With Nexus
                </h3>
              </div>

              {/* Items List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {withCommunity.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <Check style={{ width: "15px", height: "15px", color: "var(--accent)", flexShrink: 0, marginTop: "3px" }} />
                    <span style={{ fontSize: "13.5px", lineHeight: 1.6, color: "var(--text-primary)", fontWeight: 500 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

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
