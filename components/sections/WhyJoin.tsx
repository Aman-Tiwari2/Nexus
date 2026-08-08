"use client";

import { X, Check } from "lucide-react";
import { motion } from "framer-motion";

const withoutCommunity = [
  "No clear roadmap for placements",
  "Confused about what skills to learn",
  "No practice problems or mock tests",
  "Isolated — no peer support",
  "Miss important company deadlines",
  "Poor aptitude test performance",
];

const withCommunity = [
  "Structured year-wise roadmap",
  "Expert guidance on in-demand skills",
  "Weekly coding & aptitude sessions",
  "Supportive community of 1500+",
  "Event alerts & placement drives",
  "Mock interviews & resume reviews",
  "Hackathons to build real projects",
  "Connections with placed seniors",
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
      stiffness: 80,
      damping: 15,
    },
  },
};

export default function WhyJoin() {
  return (
    <section id="why-join" className="section-padding relative overflow-hidden" style={{ background: "#0d0d0d" }}>
      {/* Background Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0,229,204,0.02) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <div className="section-container relative z-10">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-tag text-center block w-full"
        >
          Why Join
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-black text-white leading-[0.95] mb-10 mt-3 text-center"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            letterSpacing: "-0.03em",
          }}
        >
          The Nexus<br />
          <span style={{ color: "#00e5cc" }}>Difference</span>
        </motion.h2>

        {/* Difference Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10"
        >
          {/* Without Nexus */}
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -5,
              borderColor: "rgba(255,80,80,0.25)",
              boxShadow: "0 15px 35px -10px rgba(255,80,80,0.06)",
            }}
            className="card p-10 transition-all duration-300 relative overflow-hidden flex flex-col"
            style={{
              background: "linear-gradient(180deg, rgba(255,80,80,0.01) 0%, rgba(0,0,0,0) 100%)",
              borderColor: "rgba(255,80,80,0.08)",
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.15)" }}>
                <X className="w-4 h-4" style={{ color: "#ff5050" }} />
              </div>
              <h3 className="font-bold uppercase tracking-widest text-lg" style={{ color: "#ff5050", fontSize: "12px", letterSpacing: "0.15em", fontFamily: "'Space Grotesk', sans-serif" }}>
                Without Nexus
              </h3>
            </div>
            <div className="flex flex-col gap-4.5">
              {withoutCommunity.map((item, i) => (
                <div key={i} className="flex items-start gap-3.5 group">
                  <X className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110" style={{ color: "#8a4a4a" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "#888888" }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* With Nexus */}
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -5,
              borderColor: "rgba(0,229,204,0.3)",
              boxShadow: "0 15px 35px -10px rgba(0,229,204,0.12)",
            }}
            className="card p-10 transition-all duration-300 relative overflow-hidden flex flex-col"
            style={{
              background: "linear-gradient(180deg, rgba(0,229,204,0.02) 0%, rgba(0,0,0,0) 100%)",
              borderColor: "rgba(0,229,204,0.12)",
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(0,229,204,0.08)", border: "1px solid rgba(0,229,204,0.15)" }}>
                <Check className="w-4 h-4" style={{ color: "#00e5cc" }} />
              </div>
              <h3 className="font-bold uppercase tracking-widest text-lg" style={{ color: "#00e5cc", fontSize: "12px", letterSpacing: "0.15em", fontFamily: "'Space Grotesk', sans-serif" }}>
                With Nexus
              </h3>
            </div>
            <div className="flex flex-col gap-4.5">
              {withCommunity.map((item, i) => (
                <div key={i} className="flex items-start gap-3.5 group">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110" style={{ color: "#00e5cc" }} />
                  <span className="text-sm leading-relaxed text-white">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <a
            href="https://vexta.collegecrm.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
            style={{ fontSize: "14px" }}
          >
            Join Nexus Today — It&apos;s Free
          </a>
        </motion.div>
      </div>
    </section>
  );
}
