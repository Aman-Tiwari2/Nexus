"use client";

import { motion } from "framer-motion";
import { Terminal, Smartphone, LayoutGrid } from "lucide-react";

const products = [
  {
    icon: Terminal,
    title: "Vexta Assessment App",
    desc: "Our proprietary online evaluation platform. It conducts comprehensive tests across Aptitude, English Communication, and Coding logic, handling thousands of student submissions dynamically.",
    stats: ["Aptitude & Coding rounds", "All-India live leaderboards", "5,000+ test attempts completed"]
  },
  {
    icon: Smartphone,
    title: "Nexus Mobile App",
    desc: "An innovative mobile learning app where students can enhance their placement prep by playing competitive games. Practice technical concepts, DSA, and aptitude topics in a gamified environment.",
    stats: ["Play & Enhance performance", "Interactive skill quizzes", "1,200+ game challenges completed"]
  },
  {
    icon: LayoutGrid,
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
    <section id="achievements" className="section-padding" style={{ background: "#0d0d0d" }}>
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col mb-10 text-center items-center">
          <div className="section-tag" style={{ color: "#00e5cc" }}>Ecosystem</div>
          <h2
            className="font-black text-white leading-[0.95] mt-3"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(36px, 6vw, 72px)",
              letterSpacing: "-0.03em",
            }}
          >
            Flagship Platforms<br />
            <span style={{ color: "#00e5cc" }}>& Applications</span>
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
                  scale: 1.02,
                  borderColor: "rgba(0, 229, 204, 0.4)",
                  backgroundColor: "rgba(0, 229, 204, 0.01)",
                  boxShadow: "0 15px 35px -10px rgba(0, 229, 204, 0.15)",
                }}
                className="p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col h-full"
                style={{
                  background: "rgba(255,255,255,0.01)",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-10 h-10 mb-6 flex items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(0,229,204,0.08)",
                    border: "1px solid rgba(0,229,204,0.15)",
                  }}
                >
                  <Icon className="w-5 h-5 text-[#00e5cc]" />
                </div>

                <h3
                  className="font-bold text-white mb-3 text-lg"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.01em" }}
                >
                  {p.title}
                </h3>

                <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: "#a0a0a0" }}>
                  {p.desc}
                </p>

                <div className="flex flex-col gap-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  {p.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs" style={{ color: "#808080" }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#00e5cc" }} />
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
