"use client";

import { motion } from "framer-motion";
import { Award, Code2, Users2, Rocket, Calendar, Flag } from "lucide-react";

const milestones = [
  {
    year: "Earlier",
    icon: Code2,
    title: "Founded as hackallite",
    description: "Started with a core vision to build practical technical capabilities in students, organizing coding bootcamps and local programming sessions."
  },
  {
    year: "2025",
    icon: Users2,
    title: "Rebranded to Nexus & Team Hiring",
    description: "Officially rebranded to Nexus to establish a student placement community. Recruited our core team of developers and coordinators to scale operations."
  },
  {
    year: "2025",
    icon: Rocket,
    title: "Website Launch: Vexta Platform",
    description: "Built and launched our custom portal, Vexta. A specialized online testing suite where students compete in real-time Aptitude, English, and Coding rounds."
  },
  {
    year: "2025",
    icon: Award,
    title: "Grand Placement Drives & Goodies",
    description: "Hosted massive community placement challenges. Hundreds of participants joined to compete, winning tech goodies, certificates, and prizes."
  },
  {
    year: "2026",
    icon: Calendar,
    title: "HackNexus 2026 & Nexus App",
    description: "Prepping for our flagship HackNexus 2026 hackathon. Actively coding the Nexus mobile app to offer gamified placement practice."
  },
  {
    year: "Future",
    icon: Flag,
    title: "Scaling to Country-Level",
    description: "Our ultimate mission is to bring the Nexus ecosystem to a national scale, helping students across India master placement preparation."
  }
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

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 15,
    },
  },
};

export default function Timeline() {
  return (
    <section id="timeline" className="section-padding relative overflow-hidden" style={{ background: "#0d0d0d" }}>
      {/* Background radial glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0,229,204,0.015) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-10">
          <div className="section-tag" style={{ color: "#00e5cc" }}>Our Journey</div>
          <h2
            className="font-black text-white leading-[0.95] mt-3"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(36px, 6vw, 72px)",
              letterSpacing: "-0.03em",
            }}
          >
            Where We&apos;ve <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: "normal" }}>been</span>
          </h2>
        </div>

        {/* Clean, Cardless Timeline Layout */}
        <div className="relative max-w-3xl mx-auto" style={{ paddingLeft: "8px" }}>
          {/* Glowing vertical timeline line */}
          <div
            style={{
              position: "absolute",
              left: "20px",
              top: "8px",
              bottom: "8px",
              width: "2px",
              background: "linear-gradient(to bottom, #00e5cc 0%, rgba(139,92,246,0.5) 50%, rgba(255,255,255,0.05) 100%)",
              boxShadow: "0 0 15px rgba(0,229,204,0.15)",
            }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-1"
          >
            {milestones.map((item, i) => {
              const Icon = item.icon;
              const isLast = i === milestones.length - 1;
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="relative flex flex-col items-start gap-1 pb-12 last:pb-0 group"
                  style={{ paddingLeft: "48px" }}
                >
                  {/* Glowing Bullet Icon centered on 20px line */}
                  <div
                    className="rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      position: "absolute",
                      left: "7px",
                      top: "2px",
                      width: "26px",
                      height: "26px",
                      background: isLast ? "rgba(0,229,204,0.15)" : "rgba(139,92,246,0.15)",
                      border: `1px solid ${isLast ? "#00e5cc" : "rgba(139,92,246,0.5)"}`,
                      boxShadow: `0 0 10px ${isLast ? "rgba(0,229,204,0.2)" : "rgba(139,92,246,0.2)"}`,
                    }}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isLast ? "text-[#00e5cc]" : "text-purple-400"}`} />
                  </div>

                  {/* Milestone Year Badge */}
                  <div
                    className="text-xs font-mono uppercase font-bold"
                    style={{
                      color: isLast ? "#00e5cc" : "#a78bfa",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {item.year}
                  </div>

                  {/* Milestone Title */}
                  <h3
                    className="text-xl font-bold text-white mt-1 mb-2 group-hover:text-[#00e5cc] transition-colors duration-200"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.01em" }}
                  >
                    {item.title}
                  </h3>

                  {/* Milestone Description */}
                  <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#a0a0a0" }}>
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
