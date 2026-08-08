"use client";

import { motion } from "framer-motion";
import { Target, Eye, Heart, Zap, Users, BookOpen } from "lucide-react";

const coreValues = [
  { icon: Target, label: "Excellence", desc: "We push boundaries and strive for the best in everything we do." },
  { icon: Users, label: "Community", desc: "Together we grow stronger. Every student matters here." },
  { icon: Zap, label: "Innovation", desc: "Creative solutions and fresh approaches to learning." },
  { icon: BookOpen, label: "Learning", desc: "Continuous growth through practice, feedback and mentorship." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
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

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden" style={{ background: "#0d0d0d" }}>
      {/* Background radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          left: "-5%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(0,229,204,0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
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
          className="section-tag"
        >
          About Us
        </motion.div>

        {/* Large "Hey!" headline & Details */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start mb-16">
          {/* Left — big heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2
              className="font-black text-white leading-[0.9]"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(56px, 8vw, 100px)",
                letterSpacing: "-0.03em",
              }}
            >
              Who<br />We Are.
            </h2>
          </motion.div>

          {/* Center — description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            style={{ paddingTop: "8px" }}
          >
            <p className="text-base leading-relaxed mb-6" style={{ color: "#c0c0c0", fontSize: "16px" }}>
              We&apos;re a student-driven community based at college level, founded in 2022 to bridge the gap
              between academic education and industry requirements.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#c0c0c0", fontSize: "16px" }}>
              We equip students with technical skills, aptitude, and confidence needed to excel in placements
              and build successful careers.
            </p>
          </motion.div>

          {/* Right — details */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-4"
            style={{ paddingTop: "8px" }}
          >
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To bridge the gap between academic education and industry requirements by equipping students with technical skills and confidence.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                desc: "To become the most impactful student-run placement community in the region.",
              },
              {
                icon: Heart,
                title: "What Sets Us Apart",
                desc: "Seniors mentor juniors, sharing real experiences and roadmaps so no student has to figure it out alone.",
              },
              {
                icon: Users,
                title: "College CRM",
                desc: "We utilize College CRM, a dedicated internal task tracking and operations system, to keep records of team members' contributions, tasks performed, and remaining work.",
              },
            ].map((detail, idx) => {
              const Icon = detail.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(0, 229, 204, 0.4)",
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    boxShadow: "0 8px 30px -10px rgba(0, 229, 204, 0.12)",
                  }}
                  className="p-5 rounded-xl border transition-all duration-300 flex gap-4 items-start"
                  style={{
                    background: "rgba(255, 255, 255, 0.01)",
                    borderColor: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div
                    className="p-2 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{
                      background: "rgba(0, 229, 204, 0.06)",
                      border: "1px solid rgba(0, 229, 204, 0.12)",
                    }}
                  >
                    <Icon className="w-4 h-4 text-[#00e5cc]" />
                  </div>
                  <div>
                    <h3
                      className="text-xs font-bold uppercase tracking-widest text-white mb-1.5"
                      style={{ letterSpacing: "0.15em", fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {detail.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#a0a0a0" }}>
                      {detail.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Thin divider */}
        <div className="section-divider mb-14" />

        {/* Core Values */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-tag mb-10"
          >
            Core Values
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {coreValues.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.label}
                  variants={cardVariants}
                  whileHover={{
                    y: -6,
                    borderColor: "rgba(0, 229, 204, 0.35)",
                    boxShadow: "0 12px 32px -8px rgba(0, 229, 204, 0.15)",
                  }}
                  className="rounded-2xl border transition-all duration-300 group relative overflow-hidden flex flex-col"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Accent top strip */}
                  <div
                    className="w-full h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(90deg, #00e5cc, rgba(139,92,246,0.6))" }}
                  />

                  <div className="p-7 flex flex-col flex-1">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 mb-5 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: "rgba(0,229,204,0.08)",
                        border: "1px solid rgba(0,229,204,0.15)",
                        boxShadow: "0 4px 16px rgba(0, 229, 204, 0.06)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-[#00e5cc]" />
                    </div>

                    {/* Number + Label */}
                    <div className="mb-3">
                      <span
                        className="text-[10px] font-mono block mb-1"
                        style={{ color: "#555" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className="text-sm font-bold uppercase tracking-wide text-white"
                        style={{ letterSpacing: "0.08em", fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {v.label}
                      </h3>
                    </div>

                    {/* Divider */}
                    <div className="w-8 h-px mb-4" style={{ background: "rgba(0,229,204,0.25)" }} />

                    {/* Description */}
                    <p className="text-[13px] leading-relaxed flex-1" style={{ color: "#909090" }}>{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex justify-start"
        >
          <a
            href="https://vexta.collegecrm.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-full transition-all duration-200"
            style={{
              borderColor: "rgba(255,255,255,0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#00e5cc";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,229,204,0.15)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
              (e.currentTarget as HTMLElement).style.transform = "none";
            }}
          >
            <Users className="w-4 h-4 text-[#00e5cc]" />
            Join Our Community
          </a>
        </motion.div>
      </div>
    </section>
  );
}
