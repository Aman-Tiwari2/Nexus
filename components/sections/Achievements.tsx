"use client";

import { motion } from "framer-motion";
import { Terminal, Smartphone, LayoutGrid } from "lucide-react";

const products = [
  {
    icon: Terminal,
    color: "#00e5cc",
    borderColor: "rgba(0, 229, 204, 0.3)",
    glowColor: "rgba(0, 229, 204, 0.12)",
    title: "Vextra Assessment App",
    desc: "Our proprietary online evaluation platform. It conducts comprehensive tests across Aptitude, English Communication, and Coding logic, handling thousands of student submissions dynamically.",
    stats: ["Aptitude & Coding rounds", "All-India live leaderboards", "5,000+ test attempts completed"]
  },
  {
    icon: Smartphone,
    color: "#ec4899",
    borderColor: "rgba(236, 72, 153, 0.3)",
    glowColor: "rgba(236, 72, 153, 0.12)",
    title: "Nexus Mobile App",
    desc: "An innovative mobile learning app where students can enhance their placement prep by playing competitive games. Practice technical concepts, DSA, and aptitude topics in a gamified environment.",
    stats: ["Play & Enhance performance", "Interactive skill quizzes", "1,200+ game challenges completed"]
  },
  {
    icon: LayoutGrid,
    color: "#8b5cf6",
    borderColor: "rgba(139, 92, 246, 0.3)",
    glowColor: "rgba(139, 92, 246, 0.12)",
    title: "Task Tracking Portal (College CRM)",
    desc: "Our dedicated internal operations portal used to maintain full visibility of contributions. Tracks team members' tasks performed, deadlines, and remaining workflow items seamlessly.",
    stats: ["Team progress dashboards", "Monitor task performance", "100% operational accountability"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 16,
    },
  },
};

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding" style={{ background: "var(--bg-primary)" }}>
      <div className="section-container">
        {/* Header */}
        <div style={{ marginBottom: "52px" }}>
          <div className="section-tag">Ecosystem</div>
          <h2
            className="heading-display"
            style={{ fontSize: "clamp(36px, 5.5vw, 68px)", marginTop: "8px" }}
          >
            Flagship Platforms<br />
            <span style={{ color: "var(--accent)" }}>& Applications</span>
          </h2>
        </div>

        {/* Flagship products grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {products.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  borderColor: p.borderColor,
                  boxShadow: `0 16px 36px ${p.glowColor}`,
                }}
                style={{
                  padding: "28px",
                  borderRadius: "16px",
                  border: `1px solid var(--border)`,
                  background: "var(--bg-card)",
                  display: "flex",
                  flexDirection: "column" as const,
                  height: "100%",
                  transition: "all 0.25s ease",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    background: `${p.color}15`,
                    border: `1px solid ${p.color}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Icon style={{ width: "20px", height: "20px", color: p.color }} />
                </div>

                <h3
                  className="font-bold text-white mb-3 text-lg"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.01em" }}
                >
                  {p.title}
                </h3>

                <p style={{ fontSize: "13px", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: "24px", flex: 1 }}>
                  {p.desc}
                </p>

                <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                  {p.stats.map((stat, sIdx) => (
                    <div key={sIdx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-secondary)" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                      {stat}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
